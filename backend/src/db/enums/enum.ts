import { pgEnum } from "drizzle-orm/pg-core";

export const sessionStatusEnum = pgEnum("session_status", [
  "not_scheduled",
  "scheduled",
  "not_signed",
  "signed",
] as const);

export const sessionTypeEnum = pgEnum("session_type", [
  "decking",   // the 3 assessments
  "personal",  // paid sessions
] as const);


export const memberStatusEnum = pgEnum("member_status", [
"decking", 
"active", 
"not_interested"
] as const);

export const memberTypeEnum = pgEnum("member_type", [
    "new",
    "renewal"
] as const);