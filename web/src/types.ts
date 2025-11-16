// src/types.ts

export type DeckingCategory = "queue" | "not_interested" | "coaches";

export type AssessmentKey = "assessment1" | "assessment2" | "assessment3";

export interface DeckingSession {
  id: string;
  memberId: string;
  coachId: string | null;
  label: string;
  status: string;
  appointmentId: string | null;
  scheduledDate: string | null;
  createdAt: string;
}

export interface AssignedCoach {
  coachId: string;
  fullName: string;
  email: string;
}

export interface DeckingMember {
  id: string;
  contactId?: string | null; // <-- ADD THIS
  brandAmbassador: string | null;
  memberType: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  birthday: string;
  address: string;
  membershipTerm: string;
  startDate: string | null;
  endDate: string | null;
  keyfob: string;
  status: string;
  createdAt: string;

  // New fields you needed
  deckingSessions: DeckingSession[];
  assignedCoaches: AssignedCoach[];
  assignedCoachId?: string | null;

  // Optional but used in UI
  category?: "queue" | "not_interested" | "coaches";
  activating?: boolean;
}


export interface Coach {
  id: string;
  fullName: string;
  email: string;
}
