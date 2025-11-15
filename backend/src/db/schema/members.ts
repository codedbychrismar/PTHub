import { pgTable, uuid, text, date } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { memberStatusEnum } from "../enums/enum";

export const members = pgTable("members", {
  id: uuid("id").primaryKey().defaultRandom(),
  contactId: text("contact_id").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").default(""),
  address: text("address").default(""),
  birthday: text("birthday").default(""),        // text to avoid CRM format issues
  membershipTerm: text("membership_term").notNull(),
  startDate: text("start_date"),                 // text, set manually
  endDate: text("end_date"),                     // text, set manually
  keyfob: text("keyfob").default(""),
  status: memberStatusEnum("status").default("decking").notNull(),
  createdAt: date("created_at").defaultNow().notNull(), // proper date with default
});

export type Member = InferSelectModel<typeof members>;
export type NewMember = InferInsertModel<typeof members>;
