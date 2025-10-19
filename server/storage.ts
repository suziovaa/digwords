import { type Term, type InsertTerm, terms } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, or } from "drizzle-orm";

export interface IStorage {
  // Terms
  getAllTerms(): Promise<Term[]>;
  getTermById(id: string): Promise<Term | undefined>;
  getTermsBySection(section: string): Promise<Term[]>;
  searchTerms(query: string): Promise<Term[]>;
  createTerm(term: InsertTerm): Promise<Term>;
  createTerms(terms: InsertTerm[]): Promise<Term[]>;
  deleteAllTerms(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getAllTerms(): Promise<Term[]> {
    return await db.select().from(terms);
  }

  async getTermById(id: string): Promise<Term | undefined> {
    const [term] = await db.select().from(terms).where(eq(terms.id, id));
    return term || undefined;
  }

  async getTermsBySection(section: string): Promise<Term[]> {
    return await db.select().from(terms).where(eq(terms.section, section));
  }

  async searchTerms(query: string): Promise<Term[]> {
    const pattern = `%${query}%`;
    return await db
      .select()
      .from(terms)
      .where(
        or(
          ilike(terms.term, pattern),
          ilike(terms.definition, pattern),
          ilike(terms.englishEquivalent, pattern),
          ilike(terms.usageExample, pattern)
        )
      );
  }

  async createTerm(insertTerm: InsertTerm): Promise<Term> {
    const [term] = await db.insert(terms).values(insertTerm).returning();
    return term;
  }

  async createTerms(insertTerms: InsertTerm[]): Promise<Term[]> {
    if (insertTerms.length === 0) return [];
    return await db.insert(terms).values(insertTerms).returning();
  }

  async deleteAllTerms(): Promise<void> {
    await db.delete(terms);
  }
}

export const storage = new DatabaseStorage();
