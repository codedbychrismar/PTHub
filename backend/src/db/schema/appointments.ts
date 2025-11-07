import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { coaches } from "./coaches";
import { members } from "./members";

export const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),
  coachId: uuid("coach_id").notNull().references(() => coaches.id, { onDelete: "cascade" }),
  clientId: uuid("client_id").notNull().references(() => members.id, { onDelete: "cascade" }),
  datetime: timestamp("datetime").notNull(),
  notes: text("notes"),
  createdBy: uuid("created_by").notNull(), // can store head coach or coach ID
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Appointment = InferSelectModel<typeof appointments>;
export type NewAppointment = InferInsertModel<typeof appointments>;
