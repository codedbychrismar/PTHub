// src/types.ts

export interface DeckingMember {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  category: "queue" | "not_interested" | "coaches";
  assignedCoachId?: string;
  assessments: {
    assessment1: boolean;
    assessment2: boolean;
    assessment3: boolean;
  };
  sessions: {
    id: string;
    assessment: "assessment1" | "assessment2" | "assessment3";
    date: string;
    signatureUrl: string;
  }[];
  activating?: boolean;
  totalSessions?: number;
  packageDuration?: string;
}

export interface Coach {
  id: string;
  fullName: string;
  email: string;
}
