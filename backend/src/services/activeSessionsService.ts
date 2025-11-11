import { db } from "../db/index";
import { sessionLogs } from "../db/schema/session_logs";
import { memberCoaches } from "../db/schema/member_coaches";
import { and, eq } from "drizzle-orm";

export const logActiveSession = async (
  memberId: string,
  coachId: string,
  signature: string,
  notes?: string
) => {
  // Check if coach is assigned to member
  const assignment = await db
    .select()
    .from(memberCoaches)
    .where(
      and(
        eq(memberCoaches.memberId, memberId),
        eq(memberCoaches.coachId, coachId)
      )
    );

  if (!assignment[0]) {
    throw new Error("This coach is not assigned to this member");
  }

  const { totalSessions, usedSessions } = assignment[0];

  if (usedSessions >= totalSessions) {
    throw new Error("All sessions with this coach are already used");
  }

  // Insert session log
  await db.insert(sessionLogs).values({
    memberId,
    coachId,
    signature,
    notes,
  });

  // Increment used sessions
  const updated = await db
    .update(memberCoaches)
    .set({ usedSessions: usedSessions + 1 })
    .where(
      and(
        eq(memberCoaches.memberId, memberId),
        eq(memberCoaches.coachId, coachId)
      )
    )
    .returning();

  return updated[0];
};
