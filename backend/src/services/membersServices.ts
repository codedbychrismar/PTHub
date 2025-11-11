import { db } from "../db/index";
import { members, NewMember } from "../db/schema/members";
import { sessionLogs } from "../db/schema/session_logs";
import { memberCoaches } from "../db/schema/member_coaches";
import { eq, sql, and } from "drizzle-orm";

export const membersServices = {
  createMember: async (memberData: NewMember) => {
    const newMember = await db.insert(members).values(memberData).returning();
    return newMember[0];
  },

  getAllMembers: async () => db.select().from(members),

  getMemberById: async (id: string) => {
    const result = await db.select().from(members).where(eq(members.id, id));
    return result[0];
  },

  getMembersByCoachId: async (coachId: string) => {
    return await db
      .select({
        memberId: memberCoaches.memberId,
        fullName: members.firstName, // adjusted
        packageType: members.packageType,
        status: members.status,
      })
      .from(memberCoaches)
      .leftJoin(members, eq(memberCoaches.memberId, members.id))
      .where(eq(memberCoaches.coachId, coachId));
  },

  updateMember: async (id: string, updateData: Partial<NewMember>) => {
    const updated = await db.update(members)
      .set(updateData)
      .where(eq(members.id, id))
      .returning();
    return updated[0];
  },

  deleteMember: async (id: string) => {
    await db.delete(members).where(eq(members.id, id));
  },

  assignCoach: async (memberId: string, coachId: string, totalSessions: number = 0) => {
    const existing = await db
      .select()
      .from(memberCoaches)
      .where(and(eq(memberCoaches.memberId, memberId), eq(memberCoaches.coachId, coachId)));

    if (existing.length > 0) return existing[0];

    const assigned = await db
      .insert(memberCoaches)
      .values({
        memberId,
        coachId,
        totalSessions,
        usedSessions: 0,
        notes: "",
      })
      .returning();

    return assigned[0];
  },

  getCoachesByMember: async (memberId: string) => {
    return await db
      .select({
        coachId: memberCoaches.coachId,
        totalSessions: memberCoaches.totalSessions,
        usedSessions: memberCoaches.usedSessions,
      })
      .from(memberCoaches)
      .where(eq(memberCoaches.memberId, memberId));
  },

  logFreeTrialSession: async (memberId: string, signature: string, notes?: string) => {
    const allSessions = await db.select().from(sessionLogs).where(eq(sessionLogs.memberId, memberId));
    const used = allSessions.filter(s => s.coachId === "").length;

    if (used >= 3) throw new Error("Free trial sessions limit reached");

    await db.insert(sessionLogs).values({
      memberId,
      coachId: "", // Free trial
      signature,
      notes,
    });

    const updated = await db.update(members)
      .set({
        usedSessions: used + 1,
        remainingSessions: sql`${members.totalSessions} - ${used + 1}`,
      })
      .where(eq(members.id, memberId))
      .returning();

    return updated[0];
  },

  getFreeTrialSessions: async (memberId: string) => {
    const allSessions = await db.select().from(sessionLogs).where(eq(sessionLogs.memberId, memberId));
    return allSessions
      .filter(s => s.coachId === "")
      .sort((a, b) => new Date(a.sessionDate).getTime() - new Date(b.sessionDate).getTime())
      .map((s, index) => ({ sessionNumber: index + 1, ...s }));
  },
};
