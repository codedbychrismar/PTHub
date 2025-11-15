// routes/appointmentsRoutes.ts
import express from "express";
import { appointmentsController } from "../controller/appointmentsController";

const router = express.Router();

// CREATE
router.post("/", appointmentsController.createAppointment);

// READ
router.get("/", appointmentsController.getAllAppointments);
router.get("/:id", appointmentsController.getAppointmentById);
router.get("/coach/:coachId", appointmentsController.getAppointmentsByCoach);
router.get("/member/:memberId", appointmentsController.getAppointmentsByMember);

// UPDATE
router.put("/:id", appointmentsController.updateAppointment);

// DELETE
router.delete("/:id", appointmentsController.deleteAppointment);

export default router;
