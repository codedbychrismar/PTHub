import { Request, Response } from "express";
import { coachesServices } from "../services/coachesServices";

export const coachesController = {
  createCoach: async (req: Request, res: Response) => {
    try {
      const newCoach = await coachesServices.createCoach(req.body);
      res.status(201).json(newCoach);
    } catch (error) {
      console.error("Create Coach Error", error);
      res.status(500).json({ error: "Failed to create coach" });
    }
  },

  getAllCoaches: async (req: Request, res: Response) => {
    try {
      const allCoaches = await coachesServices.getAllCoaches();
      res.status(200).json(allCoaches);
    } catch {
      res.status(500).json({ error: "Failed to fetch coaches" });
    }
  },

  getCoachById: async (req: Request, res: Response) => {
    try {
      const coach = await coachesServices.getCoachById(req.params.id);
      if (coach) res.status(200).json(coach);
      else res.status(404).json({ error: "Coach not found" });
    } catch {
      res.status(500).json({ error: "Failed to fetch coach" });
    }
  },

  updateCoach: async (req: Request, res: Response) => {
    try {
      const updatedCoach = await coachesServices.updateCoach(req.params.id, req.body);
      if (updatedCoach) res.status(200).json(updatedCoach);
      else res.status(404).json({ error: "Coach not found" });
    } catch {
      res.status(500).json({ error: "Failed to update coach" });
    }
  },

  deleteCoach: async (req: Request, res: Response) => {
    try {
      await coachesServices.deleteCoach(req.params.id);
      res.status(204).send();
    } catch {
      res.status(500).json({ error: "Failed to delete coach" });
    }
  }
};
