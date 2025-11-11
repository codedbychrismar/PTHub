import { Request, Response } from "express";
import { membersServices } from "../services/membersServices";

export const membersController = {
  // --- Standard member CRUD ---
  createMember: async (req: Request, res: Response) => {
    try {
      const newMember = await membersServices.createMember(req.body);
      res.status(201).json(newMember);
    } catch {
      res.status(500).json({ error: "Failed to create member" });
    }
  },

  getAllMembers: async (req: Request, res: Response) => {
    try {
      const allMembers = await membersServices.getAllMembers();
      res.status(200).json(allMembers);
    } catch {
      res.status(500).json({ error: "Failed to fetch members" });
    }
  },

  getMemberById: async (req: Request, res: Response) => {
    try {
      const member = await membersServices.getMemberById(req.params.id);
      if (member) res.status(200).json(member);
      else res.status(404).json({ error: "Member not found" });
    } catch {
      res.status(500).json({ error: "Failed to fetch member" });
    }
  },

  getMembersByCoachId: async (req: Request, res: Response) => {
    try {
      const membersByCoach = await membersServices.getMembersByCoachId(req.params.coachId);
      res.status(200).json(membersByCoach);
    } catch {
      res.status(500).json({ error: "Failed to fetch members by coach" });
    }
  },

  updateMember: async (req: Request, res: Response) => {
    try {
      const updatedMember = await membersServices.updateMember(req.params.id, req.body);
      if (updatedMember) res.status(200).json(updatedMember);
      else res.status(404).json({ error: "Member not found" });
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

  // --- Free trial sessions ---
  logFreeTrialSession: async (req: Request, res: Response) => {
    try {
      const { signature, notes } = req.body;
      if (!signature) return res.status(400).json({ error: "Signature is required" });

      const updatedMember = await membersServices.logFreeTrialSession(req.params.id, signature, notes);
      res.status(201).json(updatedMember);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to log free trial session" });
    }
  },

  getFreeTrialSessions: async (req: Request, res: Response) => {
    try {
      const sessions = await membersServices.getFreeTrialSessions(req.params.id);
      res.status(200).json(sessions);
    } catch {
      res.status(500).json({ error: "Failed to fetch free trial sessions" });
    }
  },

  // --- Assign coach ---
  assignCoach: async (req: Request, res: Response) => {
    try {
      const { memberId, coachId, totalSessions } = req.body;
      if (!memberId || !coachId) return res.status(400).json({ error: "memberId and coachId are required" });

      const assigned = await membersServices.assignCoach(memberId, coachId, totalSessions || 0);
      res.status(201).json(assigned);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to assign coach" });
    }
  },

  getCoachesByMember: async (req: Request, res: Response) => {
    try {
      const coaches = await membersServices.getCoachesByMember(req.params.memberId);
      res.status(200).json(coaches);
    } catch {
      res.status(500).json({ error: "Failed to fetch coaches for member" });
    }
  },
};
