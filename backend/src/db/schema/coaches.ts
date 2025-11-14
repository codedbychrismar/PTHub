import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const coaches = pgTable("coaches", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),

  signedSessions: integer("signed_sessions").notNull().default(0),
  notSignedSessions: integer("not_signed_sessions").notNull().default(0),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Coach = InferSelectModel<typeof coaches>;
export type NewCoach = InferInsertModel<typeof coaches>;
