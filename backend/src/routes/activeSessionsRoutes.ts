import express from "express";
import { activeSessionsController } from "../controller/activeSessionsController";

const router = express.Router();

// Log a new session for a member under a coach
// POST body: { signature: string, notes?: string }
router.post("/:coachId/member/:memberId/session", activeSessionsController.logSession);

export default router;
