import { db } from "../db/index";
import { members, NewMember } from "../db/schema/members";
import { coaches } from "../db/schema/coaches";
import { memberCoaches, NewMemberCoach } from "../db/schema/member_coaches";
import { eq, and } from "drizzle-orm";
import { sessions, NewSession } from "../db/schema/sessions";

export const membersServices = {
  // --- Member CRUD ---
  createMember: async (memberData: NewMember) => {
    // Force all new members to start as decking (trial)
    const newMemberData: NewMember = {
      ...memberData,
      status: "decking",
      packageType: "trial",
      totalSessions: 3,
      usedSessions: 0,
      remainingSessions: 3,
      notes: "New decking member — 3 trial sessions only",
      createdAt: new Date(),
    };

    const newMember = await db.insert(members).values(newMemberData).returning();
    return newMember[0];
  },

  getAllMembers: async () => db.select().from(members),
  getMemberById: async (id: string) => (await db.select().from(members).where(eq(members.id, id)))[0],
  updateMember: async (id: string, updateData: Partial<NewMember>) =>
    (await db.update(members).set(updateData).where(eq(members.id, id)).returning())[0],
  deleteMember: async (id: string) => db.delete(members).where(eq(members.id, id)),

  // --- Member-Coach ---
assignCoach: async (memberId: string, coachId: string) => {
  // Check if already assigned
  const exists = await db
    .select()
    .from(memberCoaches)
    .where(and(eq(memberCoaches.memberId, memberId), eq(memberCoaches.coachId, coachId)));
  if (exists.length) return exists[0];

  // Insert assignment
  const newAssignment: NewMemberCoach = { memberId, coachId, assignedAt: new Date() };
  const inserted = await db.insert(memberCoaches).values(newAssignment).returning();

  // Also update members table for decking members
  const member = await db.select().from(members).where(eq(members.id, memberId));
  if (member[0].status === "decking") {
    await db
      .update(members)
      .set({ assignedCoachId: coachId })
      .where(eq(members.id, memberId));
  }

  return inserted[0];
},

activateMember: async (
  memberId: string,
  coachId: string,
  totalSessions: number,
  packageDuration: string // e.g., "1 month", "3 months", "6 months"
) => {
  // 1. Update member to active
  const updated = await db.update(members)
    .set({
      status: "active",
      assignedCoachId: coachId,
      totalSessions,
      remainingSessions: totalSessions,
      packageType: packageDuration,
      notes: `Converted from trial to active membership with ${totalSessions} sessions`,
    })
    .where(eq(members.id, memberId))
    .returning();

  if (!updated.length) throw new Error("Member not found");

  // 2. Track member-coach assignment
  const exists = await db
    .select()
    .from(memberCoaches)
    .where(and(eq(memberCoaches.memberId, memberId), eq(memberCoaches.coachId, coachId)));

  if (!exists.length) {
    await db.insert(memberCoaches).values({ memberId, coachId, assignedAt: new Date() });
  }

  // 3. Optionally, pre-create empty personal sessions
  const sessionInserts: NewSession[] = Array.from({ length: totalSessions }, (_, i) => ({
    memberId,
    coachId,
    type: "personal",
    sessionDate: new Date(), 
    assessment: `session${i + 1}`,
    signatureUrl: "",
    notes: "",
  }));

  await db.insert(sessions).values(sessionInserts);

  return updated[0];
},


  getMembersByCoach: async (coachId: string) =>
    db.select().from(memberCoaches).where(eq(memberCoaches.coachId, coachId)),

  getAssignedCoaches: async (memberId: string) =>
    db.select({
      coachId: coaches.id,
      fullName: coaches.fullName,
      email: coaches.email,
    })
      .from(memberCoaches)
      .leftJoin(coaches, eq(memberCoaches.coachId, coaches.id))
      .where(eq(memberCoaches.memberId, memberId)),

  // --- Session Management ---
  logSession: async (
    memberId: string,
    coachId: string,
    type: "trial" | "personal",
    signatureUrl: string,
    assessment: string,
    notes?: string
  ) => {
    // Check member exists
    const member = await db.select().from(members).where(eq(members.id, memberId));
    if (!member.length) throw new Error("Member not found");

    // Check member-coach assignment
    const assignment = await db.select().from(memberCoaches).where(and(eq(memberCoaches.memberId, memberId), eq(memberCoaches.coachId, coachId)));
    if (!assignment.length) throw new Error("Coach not assigned to this member");

    // Trial session limit per member-coach pair
    if (type === "trial") {
      const trialCount = await db.select().from(sessions).where(
        and(eq(sessions.memberId, memberId), eq(sessions.coachId, coachId), eq(sessions.type, "trial"))
      );
      if (trialCount.length >= 3) throw new Error("Trial session limit reached for this coach");
    }

    const newSession = await db.insert(sessions).values({
      memberId,
      coachId,
      type,
      signatureUrl,
      assessment,
      notes,
    } as NewSession).returning();

    // Update member trial counters if decking
    if (type === "trial") {
      const used = member[0].usedSessions + 1;
      await db.update(members).set({
        usedSessions: used,
        remainingSessions: member[0].totalSessions - used,
      }).where(eq(members.id, memberId));
    }

    return newSession[0];
  },

  getSessionsByMember: async (memberId: string, type?: "trial" | "personal") => {
    return db.select().from(sessions).where((aliases) =>
      type ? and(eq(aliases.memberId, memberId), eq(aliases.type, type)) : eq(aliases.memberId, memberId)
    );
  },

  // --- Member Status ---
  getDeckingMembers: async () => db.select().from(members).where(eq(members.status, "decking")),
  getActiveMembers: async () => db.select().from(members).where(eq(members.status, "active")),
};
