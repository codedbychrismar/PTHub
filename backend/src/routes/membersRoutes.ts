import express from "express";
import { membersController } from "../controller/membersController";

const router = express.Router();

// Standard CRUD
router.post("/", membersController.createMember);
router.get("/", membersController.getAllMembers);
router.get("/coach/:coachId", membersController.getMembersByCoachId);
router.get("/:id", membersController.getMemberById);
router.put("/:id", membersController.updateMember);
router.delete("/:id", membersController.deleteMember);

// Free trial
router.post("/:id/free-trial-session", membersController.logFreeTrialSession);
router.get("/:id/free-trial-sessions", membersController.getFreeTrialSessions);

// Assign coach
router.post("/assign-coach", membersController.assignCoach);
router.get("/:memberId/coaches", membersController.getCoachesByMember);

export default router;
