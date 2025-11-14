import { db } from "../db/index";
import { members, NewMember } from "../db/schema/members";
import { coaches } from "../db/schema/coaches";
import { memberCoaches, NewMemberCoach } from "../db/schema/member_coaches";

import { memberDeckingSessions, NewMemberDeckingSession } from "../db/schema/member_decking_sessions";
import { memberSessionPackages, NewMemberSessionPackage } from "../db/schema/member_session_packages";
import { memberPaidSessions, NewMemberPaidSession } from "../db/schema/member_paid_sessions";

import { eq, and, sql } from "drizzle-orm";

export const membersServices = {

  // ---------------------------------------------------
  // CRUD
  // ---------------------------------------------------

  getAllMembers: async () =>
    db.select().from(members),

  getMemberById: async (id: string) =>
    (await db.select().from(members).where(eq(members.id, id)))[0],

  updateMember: async (id: string, updateData: Partial<NewMember>) =>
    (await db.update(members).set(updateData).where(eq(members.id, id)).returning())[0],

  deleteMember: async (id: string) =>
    db.delete(members).where(eq(members.id, id)),

  // ---------------------------------------------------
  // 1. CREATE MEMBER + AUTO CREATE 3 DECKING SESSIONS
  // ---------------------------------------------------
  createMember: async (memberData: NewMember) => {
    const now = new Date();

    const newMemberData: NewMember = {
      ...memberData,
      status: "decking",
      packageType: "none",
      createdAt: now,
    };

    const result = await db.insert(members).values(newMemberData).returning();
    const member = result[0];

    // Create 3 onboarding sessions
    const deckingRows: NewMemberDeckingSession[] = [
      { memberId: member.id, label: "Assessment 1", status: "not_scheduled" },
      { memberId: member.id, label: "Free PT Assessment 1", status: "not_scheduled" },
      { memberId: member.id, label: "Free PT Assessment 2", status: "not_scheduled" },
    ];

    await db.insert(memberDeckingSessions).values(deckingRows);

    return member;
  },

  // ---------------------------------------------------
  // 2. ASSIGN COACH
  // ---------------------------------------------------

assignCoach: async (memberId: string, coachId: string) => {
  // 1. Insert into member_coaches if not existing
  const existing = await db
    .select()
    .from(memberCoaches)
    .where(
      and(
        eq(memberCoaches.memberId, memberId),
        eq(memberCoaches.coachId, coachId)
      )
    );

  if (!existing.length) {
    await db.insert(memberCoaches).values({
      memberId,
      coachId,
      assignedAt: new Date()
    });
  }

  // 2. Update only NOT completed decking sessions
  await db
    .update(memberDeckingSessions)
    .set({ coachId })
    .where(
      and(
        eq(memberDeckingSessions.memberId, memberId),
        sql`${memberDeckingSessions.status} != 'signed'`
      )
    );

  return {
    message: "Coach assigned successfully",
    memberId,
    coachId
  };
},




  // ---------------------------------------------------
  // 3. ACTIVATE MEMBER (BUY PACKAGE)
  // ---------------------------------------------------
  activateMember: async (
    memberId: string,
    coachId: string,
    totalSessions: number,
    packageDuration: string,
    pricePaid?: number
  ) => {
    const now = new Date();

    // 1. Update member
    const updated = await db
      .update(members)
      .set({
        status: "active",
        packageType: packageDuration,
        purchaseDate: now.toISOString().slice(0, 10),
        pricePaid: pricePaid !== undefined ? String(pricePaid) : null,
      })
      .where(eq(members.id, memberId))
      .returning();

    if (!updated.length) throw new Error("Member not found");
    if (totalSessions <= 0) throw new Error("totalSessions must be greater than 0");

    // 2. Ensure coach is linked to the member
    const relation = await db
      .select()
      .from(memberCoaches)
      .where(and(eq(memberCoaches.memberId, memberId), eq(memberCoaches.coachId, coachId)));

    if (!relation.length) {
      await db.insert(memberCoaches).values({
        memberId,
        coachId,
        assignedAt: now,
      });
    }

    // 3. Create package

      const pkg: NewMemberSessionPackage = {
        memberId,
        coachId,
        name: `${totalSessions} PT Sessions - ${packageDuration}`,
        totalSessions,
        usedSessions: 0,

        // FIX: Drizzle date() expects a string "YYYY-MM-DD"
        startDate: now.toISOString().slice(0, 10),

        expirationDate: null, // keep as null for now

        price: pricePaid !== undefined ? String(pricePaid) : null,
        notes: "",

        // createdAt IS a timestamp column so a Date object is fine.
        createdAt: now,
      };


    const [packageRow] = await db.insert(memberSessionPackages).values(pkg).returning();

    // 4. Auto-generate paid session containers
    const paidSessions: NewMemberPaidSession[] = Array.from(
      { length: totalSessions },
      (_, i) => ({
        memberId,
        coachId,
        packageId: packageRow.id,
        label: `Session ${i + 1} of ${totalSessions}`,
        status: "not_scheduled",
        createdAt: now,
      })
    );

    await db.insert(memberPaidSessions).values(paidSessions);

    return updated[0];
  },

  // ---------------------------------------------------
  // 4. FETCH SESSIONS (DECKING)
  // ---------------------------------------------------
  getDeckingSessionsByMember: async (memberId: string) =>
    db.select().from(memberDeckingSessions).where(eq(memberDeckingSessions.memberId, memberId)),

  // ---------------------------------------------------
  // 5. FETCH SESSIONS (PAID)
  // ---------------------------------------------------
  getPaidSessionsByMember: async (memberId: string) =>
    db.select().from(memberPaidSessions).where(eq(memberPaidSessions.memberId, memberId)),

  // ---------------------------------------------------
  // 6. FETCH MEMBERS BY STATUS
  // ---------------------------------------------------
  getDeckingMembers: async () =>
    db.select().from(members).where(eq(members.status, "decking")),

  getActiveMembers: async () =>
    db.select().from(members).where(eq(members.status, "active")),
};
