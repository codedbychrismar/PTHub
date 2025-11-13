
export const assessmentLabels: Record<string, string> = {
  assessment1: "Assessment 1",
  assessment2: "Free PT Session 1",
  assessment3: "Free PT Session 2",
};

export function getSessionStatus(session: { sessionDate?: string; signatureUrl?: string } | undefined) {
  if (!session) return "Not Yet Scheduled";
  if (session.sessionDate && !session.signatureUrl) return "Scheduled";
  if (session.sessionDate && session.signatureUrl === "") return "Not Yet Signed";
  if (session.signatureUrl) return "Signed";
  return "Not Yet Scheduled";
}
