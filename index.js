var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  insertTermSchema: () => insertTermSchema,
  terms: () => terms
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var terms = pgTable("terms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  section: text("section").notNull(),
  term: text("term").notNull(),
  definition: text("definition").notNull(),
  usageExample: text("usage_example"),
  englishEquivalent: text("english_equivalent"),
  relatedTerms: text("related_terms").array(),
  source: text("source")
});
var insertTermSchema = createInsertSchema(terms).omit({
  id: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, ilike, or } from "drizzle-orm";
var DatabaseStorage = class {
  async getAllTerms() {
    return await db.select().from(terms);
  }
  async getTermById(id) {
    const [term] = await db.select().from(terms).where(eq(terms.id, id));
    return term || void 0;
  }
  async getTermsBySection(section) {
    return await db.select().from(terms).where(eq(terms.section, section));
  }
  async searchTerms(query) {
    const pattern = `%${query}%`;
    return await db.select().from(terms).where(
      or(
        ilike(terms.term, pattern),
        ilike(terms.definition, pattern),
        ilike(terms.englishEquivalent, pattern),
        ilike(terms.usageExample, pattern)
      )
    );
  }
  async createTerm(insertTerm) {
    const [term] = await db.insert(terms).values(insertTerm).returning();
    return term;
  }
  async createTerms(insertTerms) {
    if (insertTerms.length === 0) return [];
    return await db.insert(terms).values(insertTerms).returning();
  }
  async deleteAllTerms() {
    await db.delete(terms);
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import multer from "multer";
import * as XLSX from "xlsx";
var upload = multer({ storage: multer.memoryStorage() });
async function registerRoutes(app2) {
  app2.get("/api/terms", async (req, res) => {
    try {
      const terms2 = await storage.getAllTerms();
      res.json(terms2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch terms" });
    }
  });
  app2.get("/api/terms/:id", async (req, res) => {
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
  app2.get("/api/terms/search", async (req, res) => {
    try {
      const query = req.query.q;
      if (!query) {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
      }
      const terms2 = await storage.searchTerms(query);
      res.json(terms2);
    } catch (error) {
      res.status(500).json({ error: "Failed to search terms" });
    }
  });
  app2.post("/api/upload-excel", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);
      const terms2 = data.map((row) => {
        const relatedTermsStr = row["\u0421\u043C\u0435\u0436\u043D\u044B\u0435 \u0442\u0435\u0440\u043C\u0438\u043D\u044B"] || row["Related Terms"] || "";
        const relatedTerms = relatedTermsStr ? relatedTermsStr.split(/[,;]/).map((t) => t.trim()).filter(Boolean) : [];
        return {
          section: row["\u0420\u0430\u0437\u0434\u0435\u043B"] || row["Section"] || "",
          term: row["\u0422\u0435\u0440\u043C\u0438\u043D"] || row["Term"] || "",
          definition: row["\u041E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435"] || row["Definition"] || "",
          usageExample: row["\u041F\u0440\u0438\u043C\u0435\u0440 \u0443\u043F\u043E\u0442\u0440\u0435\u0431\u043B\u0435\u043D\u0438\u044F"] || row["Usage Example"] || null,
          englishEquivalent: row["A\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u0438\u0439 \u044D\u043A\u0432\u0438\u0432\u0430\u043B\u0435\u043D\u0442"] || row["English Equivalent"] || null,
          relatedTerms: relatedTerms.length > 0 ? relatedTerms : null,
          source: row["\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A"] || row["Source"] || null
        };
      });
      const validatedTerms = terms2.map((term) => insertTermSchema.parse(term));
      await storage.deleteAllTerms();
      const createdTerms = await storage.createTerms(validatedTerms);
      res.json({
        success: true,
        count: createdTerms.length,
        message: `Successfully imported ${createdTerms.length} terms`
      });
    } catch (error) {
      console.error("Excel upload error:", error);
      res.status(500).json({ error: error.message || "Failed to process Excel file" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
