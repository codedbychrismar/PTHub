import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { members } from "./members";
import { coaches } from "./coaches";
import { memberSessionPackages } from "./member_session_packages";
import { sessionStatusEnum } from "../enums/enum";
import { appointments } from "./appointments";

export const memberPaidSessions = pgTable("member_paid_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),

  memberId: uuid("member_id").notNull().references(() => members.id),
  coachId: uuid("coach_id").notNull().references(() => coaches.id),
  packageId: uuid("package_id").notNull().references(() => memberSessionPackages.id),

  label: text("label").notNull(), // "Session 1 of 12"
  status: sessionStatusEnum("status").notNull().default("not_scheduled"),

  appointmentId: uuid("appointment_id").references(() => appointments.id),
  scheduledDate: timestamp("scheduled_date"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type MemberPaidSession = InferSelectModel<typeof memberPaidSessions>;
export type NewMemberPaidSession = InferInsertModel<typeof memberPaidSessions>;
