import express from "express";
import { coachesController } from "../controller/coachesController";

const router = express.Router();

// CRUD routes
router.post("/", coachesController.createCoach); // Create
router.get("/", coachesController.getAllCoaches); // Read all
router.get("/:id", coachesController.getCoachById); // Read one
router.put("/:id", coachesController.updateCoach); // Update
router.delete("/:id", coachesController.deleteCoach); // Delete

export default router;
