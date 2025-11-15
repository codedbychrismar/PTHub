import { db } from "../db/index";
import { members, NewMember } from "../db/schema/members";
import { coaches } from "../db/schema/coaches";
import { memberCoaches, NewMemberCoach } from "../db/schema/member_coaches";

import { memberDeckingSessions, NewMemberDeckingSession } from "../db/schema/member_decking_sessions";
import { memberSessionPackages, NewMemberSessionPackage } from "../db/schema/member_session_packages";
import { memberPaidSessions, NewMemberPaidSession } from "../db/schema/member_paid_sessions";

import { eq, and, inArray } from "drizzle-orm";
import { sql } from "drizzle-orm"; // keep for other uses, not needed for arrays

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


  
  // ---------------------------------------------------
  // GET MEMBERS WITH DECKING DETAILS
  // ---------------------------------------------------

getDeckingDetails: async (memberId: string) => {
  const member = await db
    .select()
    .from(members)
    .where(eq(members.id, memberId));

  if (!member.length) throw new Error("Member not found");

  const deckingSessions = await db
    .select()
    .from(memberDeckingSessions)
    .where(eq(memberDeckingSessions.memberId, memberId));

  const assignedCoaches = await db
    .select()
    .from(memberCoaches)
    .where(eq(memberCoaches.memberId, memberId));

  return {
    ...member[0],
    deckingSessions,
    assignedCoaches,
  };
},

  // ---------------------------------------------------
  // GET MEMBERS WITH PACKAGE DETAILS
  // ---------------------------------------------------

getPackageDetails: async (memberId: string) => {
  const member = await db
    .select()
    .from(members)
    .where(eq(members.id, memberId));

  if (!member.length) throw new Error("Member not found");

  const packages = await db
    .select()
    .from(memberSessionPackages)
    .where(eq(memberSessionPackages.memberId, memberId));

  const allSessions = await db
    .select()
    .from(memberPaidSessions)
    .where(eq(memberPaidSessions.memberId, memberId));

  // Group paid sessions under their package
  const packagesWithSessions = packages.map((pkg) => ({
    ...pkg,
    sessions: allSessions.filter((s) => s.packageId === pkg.id),
  }));

  const assignedCoaches = await db
    .select()
    .from(memberCoaches)
    .where(eq(memberCoaches.memberId, memberId));

  return {
    ...member[0],
    packages: packagesWithSessions,
    assignedCoaches,
  };
},

getAllDeckingWithDetails: async () => {
  const allMembers = await db
    .select()
    .from(members)
    .where(eq(members.status, "decking"));

  if (!allMembers.length) return [];

  const memberIds = allMembers.map((m) => m.id);

  // ✅ FIX: use inArray()
  const sessions = await db
    .select()
    .from(memberDeckingSessions)
    .where(inArray(memberDeckingSessions.memberId, memberIds));

  const coachesList = await db.select().from(coaches);

  const memberCoachRelations = await db
    .select()
    .from(memberCoaches)
    .where(inArray(memberCoaches.memberId, memberIds));

  const result = allMembers.map((m) => {
    const mSessions = sessions.filter((s) => s.memberId === m.id);
    const mCoachLinks = memberCoachRelations.filter((c) => c.memberId === m.id);

    const assignedCoaches = mCoachLinks.map((link) => {
      const coach = coachesList.find((c) => c.id === link.coachId);
      return coach
        ? { coachId: coach.id, fullName: coach.fullName, email: coach.email }
        : { coachId: link.coachId };
    });

    return {
      ...m,
      fullName: `${m.firstName} ${m.lastName}`,
      deckingSessions: mSessions,
      assignedCoaches,
    };
  });

  return result;
},

  // ---------------------------------------------------
  // GET ACTIVE MEMBERS WITH PACKAGES & SESSIONS
  // ---------------------------------------------------

getAllActiveWithPackages: async () => {
  // 1. Fetch active members
  const activeMembers = await db
    .select()
    .from(members)
    .where(eq(members.status, "active"));

  if (!activeMembers.length) return [];

  const memberIds = activeMembers.map((m) => m.id);

  // 2. Fetch all packages for these members
  const packages = await db
    .select()
    .from(memberSessionPackages)
    .where(sql`${memberSessionPackages.memberId} = ANY(${memberIds})`);

  // 3. Fetch all paid sessions
  const paidSessions = await db
    .select()
    .from(memberPaidSessions)
    .where(sql`${memberPaidSessions.memberId} = ANY(${memberIds})`);

  // 4. Fetch coaches
  const coachList = await db.select().from(coaches);

  // 5. Fetch coach-member links (assigned coaches)
  const coachLinks = await db
    .select()
    .from(memberCoaches)
    .where(sql`${memberCoaches.memberId} = ANY(${memberIds})`);

  // 6. Build result shape
  const result = activeMembers.map((m) => {
    const memberPackage = packages.find((p) => p.memberId === m.id);

    const sessions = paidSessions
      .filter((s) => s.memberId === m.id)
      .map((s) => {
        const coach = coachList.find((c) => c.id === s.coachId);
        return {
          id: s.id,
          label: s.label,
          status: s.status,
          scheduledDate: s.scheduledDate,
          coach: coach
            ? { id: coach.id, fullName: coach.fullName }
            : { id: s.coachId, fullName: "Unassigned" }
        };
      });

    const assignedCoaches = coachLinks
      .filter((cl) => cl.memberId === m.id)
      .map((cl) => {
        const coach = coachList.find((c) => c.id === cl.coachId);
        return coach
          ? { coachId: coach.id, fullName: coach.fullName, email: coach.email }
          : { coachId: cl.coachId };
      });

    return {
      id: m.id,
      fullName: `${m.firstName} ${m.lastName}`,
      email: m.email,
      phone: m.phone,

      package: memberPackage
        ? {
            id: memberPackage.id,
            name: memberPackage.name,
            totalSessions: memberPackage.totalSessions,
            usedSessions: memberPackage.usedSessions,
            startDate: memberPackage.startDate,
            expirationDate: memberPackage.expirationDate,
            price: memberPackage.price
          }
        : null,

      sessions,
      assignedCoaches,
    };
  });

  return result;
}


};
