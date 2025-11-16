import { Router } from "express";
import { webhookController } from "../controller/webhookController";

const router = Router();

// Webhook routes
router.post("/assessment/scheduled", webhookController.markScheduled);
router.post("/assessment/not_signed", webhookController.markNotSigned);

// Mobile route
router.post("/assessment/signed", webhookController.markSigned);

export default router;
