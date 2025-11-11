CREATE TYPE "public"."member_status" AS ENUM('decking', 'active', 'expired');--> statement-breakpoint
CREATE TYPE "public"."member_type" AS ENUM('new', 'renewal');--> statement-breakpoint
CREATE TYPE "public"."membership_term" AS ENUM('6_months', '12_months', '18_months');--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"coach_id" uuid NOT NULL,
	"client_id" uuid NOT NULL,
	"datetime" timestamp NOT NULL,
	"notes" text,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "coaches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "coaches_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brand_ambassador" text,
	"member_type" "member_type" NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"birthday" date,
	"address" text,
	"city" text,
	"state" text,
	"country" text,
	"postal_code" text,
	"emergency_name" text,
	"emergency_relationship" text,
	"emergency_number" text,
	"membership_term" "membership_term" NOT NULL,
	"start_date" date,
	"end_date" date,
	"keyfob_fee" numeric,
	"joining_fee" numeric,
	"recurring_fee" numeric,
	"name_on_account" text,
	"bank" text,
	"account_number" text,
	"credit_card_number" text,
	"expiry_date" text,
	"parq_heart_condition" boolean DEFAULT false,
	"parq_chest_pain_during_exercise" boolean DEFAULT false,
	"parq_chest_pain_recent" boolean DEFAULT false,
	"parq_dizziness" boolean DEFAULT false,
	"parq_joint_problem" boolean DEFAULT false,
	"parq_blood_pressure_medication" boolean DEFAULT false,
	"parq_other_reason" boolean DEFAULT false,
	"total_sessions" integer DEFAULT 3 NOT NULL,
	"used_sessions" integer DEFAULT 0 NOT NULL,
	"remaining_sessions" integer DEFAULT 3 NOT NULL,
	"status" "member_status" DEFAULT 'decking' NOT NULL,
	"package_type" text DEFAULT 'none' NOT NULL,
	"purchase_date" date,
	"expiration_date" date,
	"price_paid" numeric,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member_coaches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_id" uuid NOT NULL,
	"coach_id" uuid NOT NULL,
	"total_sessions" integer DEFAULT 0 NOT NULL,
	"used_sessions" integer DEFAULT 0 NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_id" uuid NOT NULL,
	"coach_id" text DEFAULT '' NOT NULL,
	"session_date" timestamp DEFAULT now() NOT NULL,
	"signature" text NOT NULL,
	"notes" text
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_coach_id_coaches_id_fk" FOREIGN KEY ("coach_id") REFERENCES "public"."coaches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_client_id_members_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_coaches" ADD CONSTRAINT "member_coaches_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_coaches" ADD CONSTRAINT "member_coaches_coach_id_coaches_id_fk" FOREIGN KEY ("coach_id") REFERENCES "public"."coaches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_logs" ADD CONSTRAINT "session_logs_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;