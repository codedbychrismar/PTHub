import { pgTable, uuid, integer, timestamp, date, numeric, text } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { members } from "./members";
import { coaches } from "./coaches";

export const memberSessionPackages = pgTable("member_session_packages", {
  id: uuid("id").primaryKey().defaultRandom(),

  memberId: uuid("member_id").notNull().references(() => members.id),
  coachId: uuid("coach_id").notNull().references(() => coaches.id),

  name: text("name"), // e.g. "12 PT Sessions - 3 Months"
  totalSessions: integer("total_sessions").notNull(),
  usedSessions: integer("used_sessions").notNull().default(0),

  startDate: date("start_date").notNull(),
  expirationDate: date("expiration_date"),

  price: numeric("price"),
  notes: text("notes"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type MemberSessionPackage = InferSelectModel<typeof memberSessionPackages>;
export type NewMemberSessionPackage = InferInsertModel<typeof memberSessionPackages>;
