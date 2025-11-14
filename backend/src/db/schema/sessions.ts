import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { members } from "./members";
import { coaches } from "./coaches";
import { memberDeckingSessions } from "./member_decking_sessions";
import { memberPaidSessions } from "./member_paid_sessions";
import { sessionTypeEnum } from "../enums/enum";

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),

  memberId: uuid("member_id").notNull().references(() => members.id),
  coachId: uuid("coach_id").notNull().references(() => coaches.id),

  type: sessionTypeEnum("type").notNull(), // "decking" or "personal"

  deckingSessionId: uuid("decking_session_id").references(() => memberDeckingSessions.id),
  paidSessionId: uuid("paid_session_id").references(() => memberPaidSessions.id),

  sessionDate: timestamp("session_date").defaultNow().notNull(),
  assessment: text("assessment"),
  signatureUrl: text("signature_url"), // null = not signed
  notes: text("notes"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Session = InferSelectModel<typeof sessions>;
export type NewSession = InferInsertModel<typeof sessions>;
