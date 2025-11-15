// src/utils.ts

import type { AssessmentKey, DeckingSession } from "./types";

export const assessmentLabels: Record<AssessmentKey, string> = {
  assessment1: "Assessment 1",
  assessment2: "Free PT Assessment 1",
  assessment3: "Free PT Assessment 2",
};

export function mapSessionLabelToKey(label: string): AssessmentKey | null {
  const lower = label.toLowerCase();

  // Adjust if your labels ever change
  if (lower.includes("assessment 1") && !lower.includes("free")) return "assessment1";
  if (lower.includes("free pt assessment 1")) return "assessment2";
  if (lower.includes("free pt assessment 2")) return "assessment3";

  return null;
}

export function getSessionStatus(session?: DeckingSession): string {
  if (!session) return "Not Yet Scheduled";

  // Tune this depending on your backend statuses
  if (session.status === "completed") return "Signed";
  if (session.scheduledDate) return "Scheduled";

  return "Not Yet Scheduled";
}
