import { pgTable, uuid, text, timestamp, integer, numeric, date, pgEnum } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { coaches } from "./coaches";

export const memberStatusEnum = pgEnum("member_status", ["decking", "active", "expired"]);

export const members = pgTable("members", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: text("full_name").notNull(),
  phoneNumber: text("phone_number"),
  email: text("email"),
  coachId: uuid("coach_id").references(() => coaches.id, { onDelete: "set null" }),
  packageType: text("package_type").notNull(),
  totalSessions: integer("total_sessions").notNull(),
  usedSessions: integer("used_sessions").default(0).notNull(),
  remainingSessions: integer("remaining_sessions").notNull(),
  purchaseDate: date("purchase_date").notNull(),
  expirationDate: date("expiration_date").notNull(),
  pricePaid: numeric("price_paid").notNull(),
  notes: text("notes"),
  status: memberStatusEnum("status").default("decking").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),  
});

export type Member = InferSelectModel<typeof members>;
export type NewMember = InferInsertModel<typeof members>;
