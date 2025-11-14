import { pgTable, uuid, text, timestamp, integer, numeric, date, boolean } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { coaches } from "./coaches";
import { memberStatusEnum, memberTypeEnum } from "../enums/enum";

export const members = pgTable("members", {
  id: uuid("id").primaryKey().defaultRandom(),

  // Identification / Marketing
  brandAmbassador: text("brand_ambassador").default(""),

  // Core info
  memberType: memberTypeEnum("member_type").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),

  phone: text("phone").default(""),
  birthday: date("birthday"),

  address: text("address").default(""),
  city: text("city").default(""),
  state: text("state").default(""),
  country: text("country").default(""),
  postalCode: text("postal_code").default(""),

  // Emergency Contact
  emergencyName: text("emergency_name").default(""),
  emergencyRelationship: text("emergency_relationship").default(""),
  emergencyNumber: text("emergency_number").default(""),

  // Membership Info
  membershipTerm: text("membership_term").notNull(),

  startDate: date("start_date"),
  endDate: date("end_date"),

  // Fees (numeric() returns string → defaults must be string)
  keyfobFee: numeric("keyfob_fee").default("0"),
  joiningFee: numeric("joining_fee").default("0"),
  recurringFee: numeric("recurring_fee").default("0"),

  // PAR-Q
  parqHeartCondition: boolean("parq_heart_condition").default(false),
  parqChestPainDuringExercise: boolean("parq_chest_pain_during_exercise").default(false),
  parqChestPainRecent: boolean("parq_chest_pain_recent").default(false),
  parqDizziness: boolean("parq_dizziness").default(false),
  parqJointProblem: boolean("parq_joint_problem").default(false),
  parqBloodPressureMedication: boolean("parq_blood_pressure_medication").default(false),
  parqOtherReason: boolean("parq_other_reason").default(false),

  // Status
  status: memberStatusEnum("status").default("decking").notNull(),
  packageType: text("package_type").default("none").notNull(),

  purchaseDate: date("purchase_date"),
  expirationDate: date("expiration_date"),

  pricePaid: numeric("price_paid").default("0"), // still string for numeric()

  // Notes
  notes: text("notes").default(""),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Member = InferSelectModel<typeof members>;
export type NewMember = InferInsertModel<typeof members>;
