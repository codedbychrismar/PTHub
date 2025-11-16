import { Request, Response } from "express";
import { db } from "../db/index";
import { members } from "../db/schema/members";
import { memberDeckingSessions } from "../db/schema/member_decking_sessions";
import { eq, and, ilike } from "drizzle-orm";

export const webhookController = {
  // ---------------------------------------------------
  // 1. Webhook: mark scheduled
  // ---------------------------------------------------
  markScheduled: async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, assessmentsession, sessionLabel, customData } = req.body;

      const fName = customData?.firstName ?? firstName;
      const lName = customData?.lastName ?? lastName;
      const mail = customData?.email ?? email;
      const session = sessionLabel;

      if (!mail || !session) {
        return res.status(400).json({ error: "email and sessionLabel are required" });
      }

      const validLabels = ["Assessment", "Free PT Assessment 1", "Free PT Assessment 2"];
      if (!validLabels.includes(session)) {
        return res.status(400).json({ error: "Invalid sessionLabel" });
      }


      const member = await db
        .select()
        .from(members)
        .where(
          and(
            eq(members.email, mail),
            eq(members.firstName, fName),
            eq(members.lastName, lName)
          )
        );

      if (!member.length) return res.status(404).json({ error: "Member not found" });
  console.log("Updating scheduledDate:", assessmentsession);

      const updated = await db
        .update(memberDeckingSessions)
        .set({
          status: "scheduled",
          scheduledDate: assessmentsession || null, // <-- here we store the slot
        })
        .where(
          and(
            eq(memberDeckingSessions.memberId, member[0].id),
            ilike(memberDeckingSessions.label, session) // case-insensitive match
          )
        )
        .returning();


      if (!updated.length) return res.status(404).json({ error: "Session not found" });

      res.status(200).json({ message: "Session marked scheduled", updated: updated[0] });

    } catch (err: any) {
      console.error("Webhook Scheduled Error:", err);
      res.status(500).json({ error: err.message });
    }
  },

  // ---------------------------------------------------
  // 2. Webhook: mark not_signed
  // ---------------------------------------------------
  markNotSigned: async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, assessmentsession, sessionLabel, customData } = req.body;

      const fName = customData?.firstName ?? firstName;
      const lName = customData?.lastName ?? lastName;
      const mail = customData?.email ?? email;
      const session = sessionLabel;

      if (!mail || !session) {
        return res.status(400).json({ error: "email and sessionLabel are required" });
      }

      const validLabels = ["Assessment", "Free PT Assessment 1", "Free PT Assessment 2"];
      if (!validLabels.includes(session)) {
        return res.status(400).json({ error: "Invalid sessionLabel" });
      }

      console.log("Webhook markNotSigned received:", { fName, lName, mail, session, assessmentsession });

      const member = await db
        .select()
        .from(members)
        .where(
          and(
            eq(members.email, mail),
            eq(members.firstName, fName),
            eq(members.lastName, lName)
          )
        );

      if (!member.length) return res.status(404).json({ error: "Member not found" });

      const updated = await db
        .update(memberDeckingSessions)
        .set({
          status: "not_signed",
          scheduledDate: assessmentsession || null,
        })
        .where(
          and(
            eq(memberDeckingSessions.memberId, member[0].id),
            ilike(memberDeckingSessions.label, session)
          )
        )
        .returning();

      if (!updated.length) return res.status(404).json({ error: "Session not found" });

      res.status(200).json({ message: "Session marked not_signed", updated: updated[0] });

    } catch (err: any) {
      console.error("Webhook Not Signed Error:", err);
      res.status(500).json({ error: err.message });
    }
  },

  // ---------------------------------------------------
  // 3. Mobile route: mark signed (with image URL)
  // ---------------------------------------------------
  markSigned: async (req: Request, res: Response) => {
    try {
      const { email, sessionLabel, signatureUrl } = req.body;

      if (!email || !sessionLabel || !signatureUrl) {
        return res.status(400).json({ error: "email, sessionLabel, and signatureUrl are required" });
      }

      const validLabels = ["Assessment", "Free PT Assessment 1", "Free PT Assessment 2"];
      if (!validLabels.includes(sessionLabel)) {
        return res.status(400).json({ error: "Invalid sessionLabel" });
      }

      console.log("Webhook markSigned received:", { email, sessionLabel, signatureUrl });

      const member = await db
        .select()
        .from(members)
        .where(eq(members.email, email));

      if (!member.length) return res.status(404).json({ error: "Member not found" });

      const updated = await db
        .update(memberDeckingSessions)
        .set({
          status: "signed",
          scheduledDate: new Date().toISOString(), // store timestamp as text
          // TODO: store signatureUrl in another table/column if needed
        })
        .where(
          and(
            eq(memberDeckingSessions.memberId, member[0].id),
            ilike(memberDeckingSessions.label, sessionLabel)
          )
        )
        .returning();

      if (!updated.length) return res.status(404).json({ error: "Session not found" });

      res.status(200).json({ message: "Session marked signed", updated: updated[0] });

    } catch (err: any) {
      console.error("Mobile Sign Error:", err);
      res.status(500).json({ error: err.message });
    }
  }
};
