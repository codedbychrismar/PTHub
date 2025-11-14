import { Request, Response } from "express";
import { membersServices } from "../services/membersServices";

export const membersController = {
  // Create member
  // createMember: async (req: Request, res: Response) => {
  //   try {
  //     const member = await membersServices.createMember(req.body);
  //     res.status(201).json(member);
  //   } catch (err: any) {
  //     res.status(500).json({ error: err.message || "Failed to create member" });
  //   }
  // },

createMember: async (req: Request, res: Response) => {
  try {
    const { customData } = req.body;

    // Collect raw incoming fields
    const raw = {
      contact_id:   customData?.contact_id || req.body.contact_id,
      name:         customData?.name || req.body.name,
      phone:        customData?.phone || req.body.phone,
      email:        customData?.email || req.body.email,
      memberType:   customData?.memberType || req.body.memberType,
      membershipTerm: customData?.membershipTerm || req.body.membershipTerm,
      address:      customData?.address || req.body.address,
      role:         customData?.role || req.body.role,
      department:   customData?.department || req.body.department,
      additional:   customData?.additional || req.body.additional,
    };

    // Convert name → firstName + lastName
    let firstName = "";
    let lastName = "";

    if (raw.name) {
      const parts = raw.name.trim().split(" ");
      firstName = parts.shift() || "";
      lastName = parts.join(" ") || "";
    }

    // Validate required fields for TS + DB
    if (!raw.email || !raw.memberType || !raw.membershipTerm || !firstName) {
      return res.status(400).json({
        error:
          "Missing required fields: email, memberType, membershipTerm, firstName",
      });
    }

    // Build the actual DTO expected by your service
    const memberData = {
      email: raw.email,
      phone: raw.phone || null,
      address: raw.address || null,
      memberType: raw.memberType as "new" | "renewal",
      membershipTerm: raw.membershipTerm,
      firstName,
      lastName,
      // OPTIONAL / EXTRA fields your model might accept
      contact_id: raw.contact_id,
      role: raw.role,
      department: raw.department,
      additional: raw.additional,
    };

    const member = await membersServices.createMember(memberData);

    res.status(201).json(member);
  } catch (err: any) {
    console.error("❌ Error creating member:", err);
    res.status(500).json({ error: err.message || "Failed to create member" });
  }
},



  // Read
  getAllMembers: async (_req: Request, res: Response) => {
    try {
      res.status(200).json(await membersServices.getAllMembers());
    } catch {
      res.status(500).json({ error: "Failed to fetch members" });
    }
  },

  getMemberById: async (req: Request, res: Response) => {
    try {
      const member = await membersServices.getMemberById(req.params.id);
      member ? res.status(200).json(member) : res.status(404).json({ error: "Member not found" });
    } catch {
      res.status(500).json({ error: "Failed to fetch member" });
    }
  },

  updateMember: async (req: Request, res: Response) => {
    try {
      const updated = await membersServices.updateMember(req.params.id, req.body);
      updated ? res.status(200).json(updated) : res.status(404).json({ error: "Member not found" });
    } catch {
      res.status(500).json({ error: "Failed to update member" });
    }
  },

  deleteMember: async (req: Request, res: Response) => {
    try {
      await membersServices.deleteMember(req.params.id);
      res.status(204).send();
    } catch {
      res.status(500).json({ error: "Failed to delete member" });
    }
  },

  // Assign coach
  assignCoach: async (req: Request, res: Response) => {
    try {
      const { coachId } = req.body;
      if (!coachId) return res.status(400).json({ error: "coachId is required" });

      const result = await membersServices.assignCoach(req.params.id, coachId);
      res.status(200).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to assign coach" });
    }
  },

  // Activate member
  activateMember: async (req: Request, res: Response) => {
    try {
      const memberId = req.params.id;
      const { coachId, totalSessions, packageDuration, pricePaid } = req.body;

      if (!coachId || !totalSessions || !packageDuration) {
        return res.status(400).json({
          error: "coachId, totalSessions, and packageDuration are required",
        });
      }

      const updatedMember = await membersServices.activateMember(
        memberId,
        coachId,
        Number(totalSessions),
        packageDuration,
        pricePaid ? Number(pricePaid) : undefined
      );

      res.status(200).json(updatedMember);
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to activate member" });
    }
  },

  // Sessions
  getDeckingSessions: async (req: Request, res: Response) => {
    try {
      res.status(200).json(await membersServices.getDeckingSessionsByMember(req.params.id));
    } catch {
      res.status(500).json({ error: "Failed to fetch decking sessions" });
    }
  },

  getPaidSessions: async (req: Request, res: Response) => {
    try {
      res.status(200).json(await membersServices.getPaidSessionsByMember(req.params.id));
    } catch {
      res.status(500).json({ error: "Failed to fetch paid sessions" });
    }
  },

  // Status
  getDeckingMembers: async (_req: Request, res: Response) => {
    try {
      res.status(200).json(await membersServices.getDeckingMembers());
    } catch {
      res.status(500).json({ error: "Failed to fetch decking members" });
    }
  },

  getActiveMembers: async (_req: Request, res: Response) => {
    try {
      res.status(200).json(await membersServices.getActiveMembers());
    } catch {
      res.status(500).json({ error: "Failed to fetch active members" });
    }
  },
};
