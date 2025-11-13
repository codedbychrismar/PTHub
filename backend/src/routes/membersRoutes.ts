import express from "express";
import { membersController } from "../controller/membersController";

const router = express.Router();

// CRUD
router.post("/", membersController.createMember);
router.get("/", membersController.getAllMembers);
router.get("/:id", membersController.getMemberById);
router.put("/:id", membersController.updateMember);
router.delete("/:id", membersController.deleteMember);

// Member-Coach
router.post("/:id/assign-coach", membersController.assignCoach);
router.get("/:id/assigned-coaches", membersController.getAssignedCoaches);
router.get("/coach/:coachId", membersController.getMembersByCoach);

// Sessions
router.post("/:id/sessions", membersController.logSession);
router.get("/:id/sessions", membersController.getSessionsByMember);

// Member Status
router.get("/status/decking", membersController.getDeckingMembers);
router.get("/status/active", membersController.getActiveMembers);
router.post("/:id/activate", membersController.activateMember);

export default router;
