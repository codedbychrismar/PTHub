import { pgTable, uuid, timestamp, integer, text } from "drizzle-orm/pg-core";
import { members } from "./members";
import { coaches } from "./coaches";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const memberCoaches = pgTable("member_coaches", {
  id: uuid("id").primaryKey().defaultRandom(),
  memberId: uuid("member_id").references(() => members.id, { onDelete: "cascade" }).notNull(),
  coachId: uuid("coach_id").references(() => coaches.id, { onDelete: "cascade" }).notNull(),

  // Each coach assigned to a member has independent sessions
  totalSessions: integer("total_sessions").notNull().default(0),
  usedSessions: integer("used_sessions").notNull().default(0),

  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type MemberCoach = InferSelectModel<typeof memberCoaches>;
export type NewMemberCoach = InferInsertModel<typeof memberCoaches>;
