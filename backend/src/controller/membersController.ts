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

    // Collect raw incoming fields from EITHER customData or req.body
    const raw = {
      contact_id:       customData?.contact_id    ?? req.body.contact_id,
      name:             customData?.name          ?? req.body.name,
      firstName:        customData?.firstName     ?? req.body.firstName,
      lastName:         customData?.lastName      ?? req.body.lastName,
      phone:            customData?.phone         ?? req.body.phone,
      email:            customData?.email         ?? req.body.email,
      memberType:       customData?.memberType    ?? req.body.memberType,
      membershipTerm:   customData?.membershipTerm ?? req.body.membershipTerm,
      address:          customData?.address       ?? req.body.address,
      role:             customData?.role          ?? req.body.role,
      department:       customData?.department    ?? req.body.department,
      additional:       customData?.additional    ?? req.body.additional,
    };

    // -------------------------------
    // NAME HANDLING (supports 2 formats)
    // -------------------------------
    let firstName = raw.firstName || "";
    let lastName = raw.lastName || "";

    // If webhook sends "name", split it
    if (!firstName && raw.name) {
      const parts = raw.name.trim().split(" ");
      firstName = parts.shift() || "";
      lastName = parts.join(" ") || "";
    }

    // -------------------------------
    // VALIDATION
    // -------------------------------
    if (!raw.email || !firstName) {
      return res.status(400).json({
        error: "Missing required fields: email, memberType, membershipTerm, firstName",
      });
    }

    // -------------------------------
    // FINAL DATA OBJECT (SENT TO SERVICE)
    // -------------------------------
    const memberData = {
      email: raw.email,
      phone: raw.phone || null,
      address: raw.address || null,
      memberType: raw.memberType as "new" | "renewal",
      membershipTerm: raw.membershipTerm,
      firstName,
      lastName,

      // Optional fields for your DB
      contact_id: raw.contact_id || null,
      role: raw.role || null,
      department: raw.department || null,
      additional: raw.additional || null,
    };

    // -------------------------------
    // CREATE MEMBER IN DATABASE
    // -------------------------------
    const member = await membersServices.createMember(memberData);

    return res.status(201).json(member);

  } catch (err: any) {
    console.error("❌ Error creating member:", err);
    return res.status(500).json({
      error: err.message || "Failed to create member",
    });
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

  getDeckingDetails: async (req: Request, res: Response) => {
  try {
    const data = await membersServices.getDeckingDetails(req.params.id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch decking details" });
  }
},

getPackageDetails: async (req: Request, res: Response) => {
  try {
    const data = await membersServices.getPackageDetails(req.params.id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch package details" });
  }
},
getAllDeckingWithDetails: async (_req: Request, res: Response) => {
  try {
    const data = await membersServices.getAllDeckingWithDetails();
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch decking details" });
  }
},
getAllActiveWithPackages: async (_req: Request, res: Response) => {
  try {
    const data = await membersServices.getAllActiveWithPackages();
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch active package details" });
  }
},


};
