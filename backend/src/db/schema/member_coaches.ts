import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { members } from "./members";
import { coaches } from "./coaches";

export const memberCoaches = pgTable("member_coaches", {
  id: uuid("id").primaryKey().defaultRandom(),
  memberId: uuid("member_id").notNull().references(() => members.id),
  coachId: uuid("coach_id").notNull().references(() => coaches.id),
  assignedAt: timestamp("assigned_at").defaultNow().notNull(),
});

export type MemberCoach = InferSelectModel<typeof memberCoaches>;
export type NewMemberCoach = InferInsertModel<typeof memberCoaches>;
