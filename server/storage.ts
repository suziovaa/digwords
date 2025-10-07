import { type Term, type InsertTerm } from "@shared/schema";
import { randomUUID } from "crypto";

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

export class MemStorage implements IStorage {
  private terms: Map<string, Term>;

  constructor() {
    this.terms = new Map();
  }

  async getAllTerms(): Promise<Term[]> {
    return Array.from(this.terms.values());
  }

  async getTermById(id: string): Promise<Term | undefined> {
    return this.terms.get(id);
  }

  async getTermsBySection(section: string): Promise<Term[]> {
    return Array.from(this.terms.values()).filter(
      (term) => term.section === section
    );
  }

  async searchTerms(query: string): Promise<Term[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.terms.values()).filter(
      (term) =>
        term.term.toLowerCase().includes(lowerQuery) ||
        term.definition.toLowerCase().includes(lowerQuery) ||
        term.englishEquivalent?.toLowerCase().includes(lowerQuery) ||
        term.usageExample?.toLowerCase().includes(lowerQuery)
    );
  }

  async createTerm(insertTerm: InsertTerm): Promise<Term> {
    const id = randomUUID();
    const term: Term = {
      id,
      section: insertTerm.section,
      term: insertTerm.term,
      definition: insertTerm.definition,
      usageExample: insertTerm.usageExample ?? null,
      englishEquivalent: insertTerm.englishEquivalent ?? null,
      relatedTerms: insertTerm.relatedTerms ?? null,
      source: insertTerm.source ?? null,
    };
    this.terms.set(id, term);
    return term;
  }

  async createTerms(insertTerms: InsertTerm[]): Promise<Term[]> {
    const createdTerms: Term[] = [];
    for (const insertTerm of insertTerms) {
      const term = await this.createTerm(insertTerm);
      createdTerms.push(term);
    }
    return createdTerms;
  }

  async deleteAllTerms(): Promise<void> {
    this.terms.clear();
  }
}

export const storage = new MemStorage();
