import { Request, Response } from "express";
import { logActiveSession } from "../services/activeSessionsService";

export const activeSessionsController = {
  logSession: async (req: Request, res: Response) => {
    try {
      const { memberId, coachId } = req.params;
      const { signature, notes } = req.body;

      if (!signature)
        return res.status(400).json({ error: "Signature is required" });

      const updated = await logActiveSession(memberId, coachId, signature, notes);
      res.status(201).json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message || "Failed to log session" });
    }
  },
};
