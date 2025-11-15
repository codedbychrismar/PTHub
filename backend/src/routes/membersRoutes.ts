import express from "express";
import { membersController } from "../controller/membersController";

const router = express.Router();

// CRUD
router.post("/", membersController.createMember);
router.get("/", membersController.getAllMembers);
router.get("/:id", membersController.getMemberById);
router.put("/:id", membersController.updateMember);
router.delete("/:id", membersController.deleteMember);

// Coach
router.post("/:id/assign-coach", membersController.assignCoach);

// Activation
router.post("/:id/activate", membersController.activateMember);

// Session containers
router.get("/:id/decking-sessions", membersController.getDeckingSessions);
router.get("/:id/paid-sessions", membersController.getPaidSessions);

// Status filters
router.get("/status/decking/all", membersController.getDeckingMembers);
router.get("/status/active/all", membersController.getActiveMembers);

// Decking details
router.get("/:id/decking-details", membersController.getDeckingDetails);

// Package details
router.get("/:id/package-details", membersController.getPackageDetails);

router.get("/status/decking/details", membersController.getAllDeckingWithDetails);
router.get("/status/active/details", membersController.getAllActiveWithPackages);

export default router;
