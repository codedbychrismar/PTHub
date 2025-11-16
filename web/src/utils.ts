// src/utils.ts

export const assessmentLabels = {
  assessment1: "Assessment",
  assessment2: "Free PT Assessment 1",
  assessment3: "Free PT Assessment 2",
};

// map your label to a key (this probably already exists)
export function mapSessionLabelToKey(label: string): "assessment1" | "assessment2" | "assessment3" {
  if (label === "Assessment") return "assessment1";
  if (label === "Free PT Assessment 1") return "assessment2";
  if (label === "Free PT Assessment 2") return "assessment3";
  throw new Error(`Unknown session label: ${label}`);
}

export function getSessionStatus(
  session: { status: string } | undefined
): "scheduled" | "not_scheduled" | "not_signed" | "signed" | "unknown" {
  if (!session) return "unknown";

  const s = session.status;
  switch (s) {
    case "scheduled":
      return "scheduled";
    case "not_scheduled":
      return "not_scheduled";
    case "not_signed":
      return "not_signed";
    case "signed":
      return "signed";
    default:
      return "unknown";
  }
}
