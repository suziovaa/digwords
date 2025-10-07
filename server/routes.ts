import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import * as XLSX from "xlsx";
import { insertTermSchema } from "@shared/schema";

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all terms
  app.get("/api/terms", async (req, res) => {
    try {
      const terms = await storage.getAllTerms();
      res.json(terms);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch terms" });
    }
  });

  // Get term by ID
  app.get("/api/terms/:id", async (req, res) => {
    try {
      const term = await storage.getTermById(req.params.id);
      if (!term) {
        return res.status(404).json({ error: "Term not found" });
      }
      res.json(term);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch term" });
    }
  });

  // Search terms
  app.get("/api/terms/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
      }
      const terms = await storage.searchTerms(query);
      res.json(terms);
    } catch (error) {
      res.status(500).json({ error: "Failed to search terms" });
    }
  });

  // Upload Excel file to populate dictionary
  app.post("/api/upload-excel", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      const terms = data.map((row: any) => {
        const relatedTermsStr = row["Смежные термины"] || row["Related Terms"] || "";
        const relatedTerms = relatedTermsStr
          ? relatedTermsStr.split(/[,;]/).map((t: string) => t.trim()).filter(Boolean)
          : [];

        return {
          section: row["Раздел"] || row["Section"] || "",
          term: row["Термин"] || row["Term"] || "",
          definition: row["Определение"] || row["Definition"] || "",
          usageExample: row["Пример употребления"] || row["Usage Example"] || null,
          englishEquivalent: row["Aнглийский эквивалент"] || row["English Equivalent"] || null,
          relatedTerms: relatedTerms.length > 0 ? relatedTerms : null,
          source: row["Источник"] || row["Source"] || null,
        };
      });

      // Validate all terms
      const validatedTerms = terms.map((term) => insertTermSchema.parse(term));

      // Clear existing terms and insert new ones
      await storage.deleteAllTerms();
      const createdTerms = await storage.createTerms(validatedTerms);

      res.json({
        success: true,
        count: createdTerms.length,
        message: `Successfully imported ${createdTerms.length} terms`,
      });
    } catch (error: any) {
      console.error("Excel upload error:", error);
      res.status(500).json({ error: error.message || "Failed to process Excel file" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
