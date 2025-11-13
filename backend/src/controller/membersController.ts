import { Request, Response } from "express";
import { membersServices } from "../services/membersServices";

export const membersController = {
  createMember: async (req: Request, res: Response) => {
    try {
      const member = await membersServices.createMember(req.body);
      res.status(201).json(member);
    } catch (err: any) {
      console.error("Error creating member:", err);
      res.status(500).json({ error: "Failed to create member" });
    }
  },

  getAllMembers: async (req: Request, res: Response) => {
    try { res.status(200).json(await membersServices.getAllMembers()); }
    catch { res.status(500).json({ error: "Failed to fetch members" }); }
  },

  getMemberById: async (req: Request, res: Response) => {
    try {
      const member = await membersServices.getMemberById(req.params.id);
      member ? res.status(200).json(member) : res.status(404).json({ error: "Member not found" });
    } catch { res.status(500).json({ error: "Failed to fetch member" }); }
  },

  updateMember: async (req: Request, res: Response) => {
    try {
      const updated = await membersServices.updateMember(req.params.id, req.body);
      updated ? res.status(200).json(updated) : res.status(404).json({ error: "Member not found" });
    } catch { res.status(500).json({ error: "Failed to update member" }); }
  },

  deleteMember: async (req: Request, res: Response) => {
    try { await membersServices.deleteMember(req.params.id); res.status(204).send(); }
    catch { res.status(500).json({ error: "Failed to delete member" }); }
  },

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

  activateMember: async (req: Request, res: Response) => {
    try {
      const memberId = req.params.id;
      const { coachId, totalSessions, packageDuration } = req.body;

      if (!coachId || !totalSessions || !packageDuration) {
        return res.status(400).json({ error: "coachId, totalSessions, and packageDuration are required" });
      }

      const updatedMember = await membersServices.activateMember(
        memberId,
        coachId,
        totalSessions,
        packageDuration
      );

      res.status(200).json(updatedMember);
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to activate member" });
    }
  },



  getAssignedCoaches: async (req: Request, res: Response) => {
    try { 
      const coaches = await membersServices.getAssignedCoaches(req.params.id);
      res.status(200).json(coaches);
    } catch { res.status(500).json({ error: "Failed to fetch assigned coaches" }); }
  },

  logSession: async (req: Request, res: Response) => {
    try {
      const { coachId, type, signatureUrl, assessment, notes } = req.body;
      if (!coachId || !type || !signatureUrl || !assessment) return res.status(400).json({ error: "Missing required fields" });
      const session = await membersServices.logSession(req.params.id, coachId, type, signatureUrl, assessment, notes);
      res.status(201).json(session);
    } catch (err: any) { res.status(400).json({ error: err.message || "Failed to log session" }); }
  },

  getSessionsByMember: async (req: Request, res: Response) => {
    try {
      const type = req.query.type as "trial" | "personal" | undefined;
      res.status(200).json(await membersServices.getSessionsByMember(req.params.id, type));
    } catch { res.status(500).json({ error: "Failed to fetch sessions" }); }
  },

  getDeckingMembers: async (req: Request, res: Response) => {
    try {
      const deckingMembers = await membersServices.getDeckingMembers();
      res.status(200).json(deckingMembers);
    } catch { res.status(500).json([]); }
  },

  getActiveMembers: async (req: Request, res: Response) => {
    try { res.status(200).json(await membersServices.getActiveMembers()); }
    catch { res.status(500).json({ error: "Failed to fetch active members" }); }
  },

  getMembersByCoach: async (req: Request, res: Response) => {
  try {
    const coachId = req.params.coachId;
    const members = await membersServices.getMembersByCoach(coachId);
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch members by coach" });
  }
},

};
