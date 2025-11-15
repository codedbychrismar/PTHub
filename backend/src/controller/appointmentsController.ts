// controller/appointmentsController.ts
import { Request, Response } from "express";
import { appointmentsServices } from "../services/appointmentsServices";

export const appointmentsController = {

  createAppointment: async (req: Request, res: Response) => {
    try {
      const appt = await appointmentsServices.createAppointment(req.body);
      res.status(201).json(appt);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllAppointments: async (_req: Request, res: Response) => {
    try {
      res.json(await appointmentsServices.getAllAppointments());
    } catch {
      res.status(500).json({ error: "Error fetching appointments" });
    }
  },

  getAppointmentById: async (req: Request, res: Response) => {
    try {
      const appt = await appointmentsServices.getAppointmentById(req.params.id);
      appt ? res.json(appt) : res.status(404).json({ error: "Not found" });
    } catch {
      res.status(500).json({ error: "Error fetching appointment" });
    }
  },

  getAppointmentsByCoach: async (req: Request, res: Response) => {
    try {
      res.json(await appointmentsServices.getAppointmentsByCoach(req.params.coachId));
    } catch {
      res.status(500).json({ error: "Error fetching coach appointments" });
    }
  },

  getAppointmentsByMember: async (req: Request, res: Response) => {
    try {
      res.json(await appointmentsServices.getAppointmentsByMember(req.params.memberId));
    } catch {
      res.status(500).json({ error: "Error fetching member appointments" });
    }
  },

  updateAppointment: async (req: Request, res: Response) => {
    try {
      res.json(
        await appointmentsServices.updateAppointment(req.params.id, req.body)
      );
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteAppointment: async (req: Request, res: Response) => {
    try {
      await appointmentsServices.deleteAppointment(req.params.id);
      res.status(204).send();
    } catch {
      res.status(500).json({ error: "Error deleting appointment" });
    }
  },
};
