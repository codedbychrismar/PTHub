import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { members } from "./members";
import { coaches } from "./coaches";

export const sessionLogs = pgTable("session_logs", {
  id: uuid("id").primaryKey().defaultRandom(),

  memberId: uuid("member_id")
    .references(() => members.id, { onDelete: "cascade" })
    .notNull(),

  // Use empty string "" for free trial instead of null
  coachId: text("coach_id").default("").notNull(),

  sessionDate: timestamp("session_date").defaultNow().notNull(),
  signature: text("signature").notNull(),
  notes: text("notes"),
});

export type SessionLog = InferSelectModel<typeof sessionLogs>;
export type NewSessionLog = InferInsertModel<typeof sessionLogs>;
