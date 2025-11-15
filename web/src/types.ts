// src/types.ts

export type DeckingCategory = "queue" | "not_interested" | "coaches";

export type AssessmentKey = "assessment1" | "assessment2" | "assessment3";

export interface DeckingSession {
  id: string;
  memberId: string;
  coachId: string;
  label: string; // e.g. "Assessment 1", "Free PT Assessment 1"
  status: string; // e.g. "not_scheduled", "scheduled", "completed"
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
  brandAmbassador: string | null;
  memberType: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  birthday: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;

  emergencyName: string | null;
  emergencyRelationship: string | null;
  emergencyNumber: string | null;

  membershipTerm: string;
  startDate: string | null;
  endDate: string | null;

  keyfobFee: number | null;
  joiningFee: number | null;
  recurringFee: number | null;

  parqHeartCondition: boolean;
  parqChestPainDuringExercise: boolean;
  parqChestPainRecent: boolean;
  parqDizziness: boolean;
  parqJointProblem: boolean;
  parqBloodPressureMedication: boolean;
  parqOtherReason: boolean;

  status: string;
  packageType: string;
  purchaseDate: string | null;
  expirationDate: string | null;
  pricePaid: number | null;
  notes: string | null;

  createdAt: string;

  deckingSessions: DeckingSession[];
  assignedCoaches: AssignedCoach[];

  // UI-only fields
  category: DeckingCategory;
  assignedCoachId?: string;
  activating?: boolean;
}

export interface Coach {
  id: string;
  fullName: string;
  email: string;
}
