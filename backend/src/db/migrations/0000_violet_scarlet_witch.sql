CREATE TYPE "public"."member_status" AS ENUM('decking', 'active', 'not_interested');--> statement-breakpoint
CREATE TYPE "public"."member_type" AS ENUM('new', 'renewal');--> statement-breakpoint
CREATE TYPE "public"."session_status" AS ENUM('not_scheduled', 'scheduled', 'not_signed', 'signed');--> statement-breakpoint
CREATE TYPE "public"."session_type" AS ENUM('decking', 'personal');--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"coach_id" uuid NOT NULL,
	"client_id" uuid NOT NULL,
	"decking_session_id" uuid,
	"paid_session_id" uuid,
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
	"signed_sessions" integer DEFAULT 0 NOT NULL,
	"not_signed_sessions" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "coaches_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"contact_id" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text DEFAULT '',
	"address" text DEFAULT '',
	"birthday" text DEFAULT '',
	"membership_term" text NOT NULL,
	"start_date" text,
	"end_date" text,
	"keyfob" text DEFAULT '',
	"status" "member_status" DEFAULT 'decking' NOT NULL,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member_coaches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_id" uuid NOT NULL,
	"coach_id" uuid NOT NULL,
	"assigned_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member_decking_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_id" uuid NOT NULL,
	"coach_id" uuid,
	"label" text NOT NULL,
	"status" "session_status" DEFAULT 'not_scheduled' NOT NULL,
	"appointment_id" uuid,
	"scheduled_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member_paid_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_id" uuid NOT NULL,
	"coach_id" uuid NOT NULL,
	"package_id" uuid NOT NULL,
	"label" text NOT NULL,
	"status" "session_status" DEFAULT 'not_scheduled' NOT NULL,
	"appointment_id" uuid,
	"scheduled_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member_session_packages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_id" uuid NOT NULL,
	"coach_id" uuid NOT NULL,
	"name" text,
	"total_sessions" integer NOT NULL,
	"used_sessions" integer DEFAULT 0 NOT NULL,
	"start_date" date NOT NULL,
	"expiration_date" date,
	"purchase_date" date,
	"price" numeric,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_id" uuid NOT NULL,
	"coach_id" uuid NOT NULL,
	"type" "session_type" NOT NULL,
	"decking_session_id" uuid,
	"paid_session_id" uuid,
	"session_date" timestamp DEFAULT now() NOT NULL,
	"assessment" text,
	"signature_url" text,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_coach_id_coaches_id_fk" FOREIGN KEY ("coach_id") REFERENCES "public"."coaches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_client_id_members_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_coaches" ADD CONSTRAINT "member_coaches_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_coaches" ADD CONSTRAINT "member_coaches_coach_id_coaches_id_fk" FOREIGN KEY ("coach_id") REFERENCES "public"."coaches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_decking_sessions" ADD CONSTRAINT "member_decking_sessions_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_decking_sessions" ADD CONSTRAINT "member_decking_sessions_coach_id_coaches_id_fk" FOREIGN KEY ("coach_id") REFERENCES "public"."coaches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_decking_sessions" ADD CONSTRAINT "member_decking_sessions_appointment_id_appointments_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "public"."appointments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_paid_sessions" ADD CONSTRAINT "member_paid_sessions_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_paid_sessions" ADD CONSTRAINT "member_paid_sessions_coach_id_coaches_id_fk" FOREIGN KEY ("coach_id") REFERENCES "public"."coaches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_paid_sessions" ADD CONSTRAINT "member_paid_sessions_package_id_member_session_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."member_session_packages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_paid_sessions" ADD CONSTRAINT "member_paid_sessions_appointment_id_appointments_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "public"."appointments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_session_packages" ADD CONSTRAINT "member_session_packages_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_session_packages" ADD CONSTRAINT "member_session_packages_coach_id_coaches_id_fk" FOREIGN KEY ("coach_id") REFERENCES "public"."coaches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_coach_id_coaches_id_fk" FOREIGN KEY ("coach_id") REFERENCES "public"."coaches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_decking_session_id_member_decking_sessions_id_fk" FOREIGN KEY ("decking_session_id") REFERENCES "public"."member_decking_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_paid_session_id_member_paid_sessions_id_fk" FOREIGN KEY ("paid_session_id") REFERENCES "public"."member_paid_sessions"("id") ON DELETE no action ON UPDATE no action;