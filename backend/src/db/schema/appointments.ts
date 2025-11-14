import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { coaches } from "./coaches";
import { members } from "./members";

export const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),

  coachId: uuid("coach_id").notNull().references(() => coaches.id),
  clientId: uuid("client_id").notNull().references(() => members.id),

  deckingSessionId: uuid("decking_session_id"),
  paidSessionId: uuid("paid_session_id"),

  datetime: timestamp("datetime").notNull(),
  notes: text("notes"),

  createdBy: uuid("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Appointment = InferSelectModel<typeof appointments>;
export type NewAppointment = InferInsertModel<typeof appointments>;
