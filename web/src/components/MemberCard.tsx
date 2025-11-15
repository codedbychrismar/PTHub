// src/components/MemberCard.tsx

import { Card } from "./ui/card";
import { UserCircle } from "lucide-react";
import {
  assessmentLabels,
  getSessionStatus,
  mapSessionLabelToKey,
} from "../utils";
import type { DeckingMember, Coach, AssessmentKey } from "../types";

interface MemberCardProps {
  member: DeckingMember;
  coachesList: Coach[];
  onSelect: () => void;
}

export function MemberCard({ member, coachesList, onSelect }: MemberCardProps) {
  const assignedCoach =
    member.assignedCoachId
      ? coachesList.find((c) => c.id === member.assignedCoachId)
      : member.assignedCoaches?.[0];

  const assessmentKeys: AssessmentKey[] = [
    "assessment1",
    "assessment2",
    "assessment3",
  ];

  return (
    <Card
      className="p-4 cursor-pointer hover:shadow-lg transition rounded-lg border border-slate-200"
      onClick={onSelect}
    >
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            {member.fullName}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {member.email} · {member.phone}
          </p>
        </div>

        {assignedCoach && (
          <div className="flex items-center gap-1 text-purple-700 bg-purple-50 px-2 py-1 rounded-full">
            <UserCircle className="w-4 h-4" />
            <p className="text-xs font-medium truncate max-w-[140px]">
              {assignedCoach.fullName}
            </p>
          </div>
        )}
      </div>

      <div className="mt-3 space-y-1.5 text-xs">
        {assessmentKeys.map((key) => {
          const session = member.deckingSessions.find(
            (s) => mapSessionLabelToKey(s.label) === key
          );
          const status = getSessionStatus(session);

          return (
            <div key={key} className="flex justify-between items-center">
              <p className="text-slate-600">{assessmentLabels[key]}</p>
              <p
                className={`font-semibold ${
                  status === "Signed"
                    ? "text-green-600"
                    : status === "Scheduled"
                    ? "text-blue-600"
                    : status === "Not Yet Scheduled"
                    ? "text-orange-600"
                    : "text-gray-600"
                }`}
              >
                {status}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
