import { pgTable, uuid, text, timestamp, integer, numeric, date, boolean, pgEnum } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { coaches } from "./coaches";
// ENUMS
export const memberStatusEnum = pgEnum("member_status", ["decking", "active", "not_interested"] as const);
export const memberTypeEnum = pgEnum("member_type", ["new", "renewal"] as const);

export const members = pgTable("members", {
  id: uuid("id").primaryKey().defaultRandom(),

  brandAmbassador: text("brand_ambassador"),
  memberType: memberTypeEnum("member_type").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  birthday: date("birthday"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  country: text("country"),
  postalCode: text("postal_code"),

  emergencyName: text("emergency_name"),
  emergencyRelationship: text("emergency_relationship"),
  emergencyNumber: text("emergency_number"),

  membershipTerm: text("membership_term").notNull(),

  startDate: date("start_date"),
  endDate: date("end_date"),
  keyfobFee: numeric("keyfob_fee"),
  joiningFee: numeric("joining_fee"),
  recurringFee: numeric("recurring_fee"),

  parqHeartCondition: boolean("parq_heart_condition").default(false),
  parqChestPainDuringExercise: boolean("parq_chest_pain_during_exercise").default(false),
  parqChestPainRecent: boolean("parq_chest_pain_recent").default(false),
  parqDizziness: boolean("parq_dizziness").default(false),
  parqJointProblem: boolean("parq_joint_problem").default(false),
  parqBloodPressureMedication: boolean("parq_blood_pressure_medication").default(false),
  parqOtherReason: boolean("parq_other_reason").default(false),

  // Trial session counters (applies if status = decking)
  totalSessions: integer("total_sessions").notNull().default(3),
  usedSessions: integer("used_sessions").notNull().default(0),
  remainingSessions: integer("remaining_sessions").notNull().default(3),
  assignedCoachId: uuid("assigned_coach_id").references(() => coaches.id).default(""),


  status: memberStatusEnum("status").default("decking").notNull(), 
  packageType: text("package_type").default("none").notNull(),
  purchaseDate: date("purchase_date"),
  expirationDate: date("expiration_date"),
  pricePaid: numeric("price_paid"),

  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Member = InferSelectModel<typeof members>;
export type NewMember = InferInsertModel<typeof members>;
