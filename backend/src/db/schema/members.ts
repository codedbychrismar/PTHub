import { pgTable, uuid, text, timestamp, date } from "drizzle-orm/pg-core";
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
  birthday: text("birthday"), // <-- now text, avoids formatting issues
  membershipTerm: text("membership_term").notNull(),
  startDate: date("start_date").defaultNow(), // remains date
  endDate: date("end_date"), // remains date
  keyfob: text("keyfob").default(""),
  status: memberStatusEnum("status").default("decking").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(), // remains timestamp
});

export type Member = InferSelectModel<typeof members>;
export type NewMember = InferInsertModel<typeof members>;
