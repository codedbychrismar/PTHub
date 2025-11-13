import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { members } from "./members";
import { coaches } from "./coaches";

export const sessionTypeEnum = pgEnum("session_type", ["trial", "personal"] as const);

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  memberId: uuid("member_id").notNull().references(() => members.id),
  coachId: uuid("coach_id").notNull().references(() => coaches.id),
  type: sessionTypeEnum("type").notNull(), 
  sessionDate: timestamp("session_date").defaultNow().notNull(),
  assessment: text("assessment").notNull(),
  signatureUrl: text("signature_url").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Session = InferSelectModel<typeof sessions>;
export type NewSession = InferInsertModel<typeof sessions>;
