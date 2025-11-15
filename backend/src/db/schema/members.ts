import { pgTable, uuid, text, timestamp, integer, numeric, date, boolean } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { coaches } from "./coaches";
import { memberStatusEnum, memberTypeEnum } from "../enums/enum";

export const members = pgTable("members", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(), 
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").default(""),
  birthday: date("birthday"),
  address: text("address").default(""),
  membershipTerm: text("membership_term").notNull(),
  startDate: date("start_date"),
  endDate: date("end_date"),
  keyfob: text("keyfob_fee").default(""),
  status: memberStatusEnum("status").default("decking").notNull(),
  pricePaid: numeric("price_paid").default("0"), // still string for numeric()
  notes: text("notes").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Member = InferSelectModel<typeof members>;
export type NewMember = InferInsertModel<typeof members>;
