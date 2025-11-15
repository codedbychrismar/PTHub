import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { members } from "./members";
import { coaches } from "./coaches";
import { sessionStatusEnum } from "../enums/enum";
import { appointments } from "./appointments";

export const memberDeckingSessions = pgTable("member_decking_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),

  memberId: uuid("member_id").notNull().references(() => members.id),
  coachId: uuid("coach_id").references(() => coaches.id),

  label: text("label").notNull(), // Assessment, Free PT Assessment 1, Free PT Assessment 2

  status: sessionStatusEnum("status").notNull().default("not_scheduled"),

  appointmentId: uuid("appointment_id").references(() => appointments.id),
  scheduledDate: timestamp("scheduled_date"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type MemberDeckingSession = InferSelectModel<typeof memberDeckingSessions>;
export type NewMemberDeckingSession = InferInsertModel<typeof memberDeckingSessions>;
