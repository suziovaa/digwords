import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const terms = pgTable("terms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  section: text("section").notNull(),
  term: text("term").notNull(),
  definition: text("definition").notNull(),
  usageExample: text("usage_example"),
  englishEquivalent: text("english_equivalent"),
  relatedTerms: text("related_terms").array(),
  source: text("source"),
});

export const insertTermSchema = createInsertSchema(terms).omit({
  id: true,
});

export type InsertTerm = z.infer<typeof insertTermSchema>;
export type Term = typeof terms.$inferSelect;
