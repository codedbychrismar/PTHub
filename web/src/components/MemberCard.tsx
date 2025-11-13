import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Mail, Phone, UserCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import type { DeckingMember, Coach } from "../types";
import { assessmentLabels, getSessionStatus } from "../utils";


interface MemberCardProps {
  member: DeckingMember;
  coachesList: Coach[];
  updateMemberCoach: (memberId: string, coachId: string | null) => void;
  activateTrial: (memberId: string) => void;
  onClick?: () => void; // <-- add this
}


export function MemberCard({ member, coachesList, updateMemberCoach, activateTrial }: MemberCardProps) {
  const [selectedCoachId, setSelectedCoachId] = useState<string>(member.assignedCoachId || "");
  const [activeTab, setActiveTab] = useState<"default" | "actions">("default");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="p-4 cursor-pointer hover:shadow-lg transition">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{member.fullName}</h3>
            {member.assignedCoachId && (
              <div className="flex items-center gap-1 text-primary">
                <UserCircle className="w-4 h-4" />
                <p className="text-sm">
                  {coachesList.find((c) => c.id === member.assignedCoachId)?.fullName}
                </p>
              </div>
            )}
          </div>
        </Card>
      </DialogTrigger>

      <DialogContent className="w-[400px] max-w-full right-0">
        <DialogHeader>
          <DialogTitle>{member.fullName}</DialogTitle>
          <div className="flex gap-2 mt-2">
            <Button
              variant={activeTab === "default" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("default")}
            >
              Info
            </Button>
            <Button
              variant={activeTab === "actions" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("actions")}
            >
              Actions
            </Button>
          </div>
        </DialogHeader>

        {activeTab === "default" && (
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <p>{member.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <p>{member.phoneNumber}</p>
            </div>
            <div className="pt-2 border-t space-y-1">
              {["assessment1", "assessment2", "assessment3"].map((a) => {
                const session = member.sessions.find((s) => s.assessment === a);
                const status = getSessionStatus(session);
                return (
                  <div key={a} className="flex justify-between items-center">
                    <p>{assessmentLabels[a]}</p>
                    <p
                      className={`font-semibold ${
                        status === "Signed"
                          ? "text-green-600"
                          : status === "Scheduled"
                          ? "text-blue-600"
                          : status === "Not Yet Signed"
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
          </div>
        )}

        {activeTab === "actions" && (
          <div className="mt-4 space-y-3">
            {/* Activate Trial */}
            {member.category === "coaches" && !member.activating && (
              <Button
                className="w-full text-xs bg-[#4A2EC4] hover:bg-blue-800"
                onClick={() => activateTrial(member.id)}
              >
                Activate Trial
              </Button>
            )}

            {/* View Signatures */}
            {member.sessions.length > 0 &&
              member.sessions.map((session) => (
                <Dialog key={session.id}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs w-full">
                      View Signature ({assessmentLabels[session.assessment]})
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {member.fullName} - {assessmentLabels[session.assessment]}
                      </DialogTitle>
                    </DialogHeader>
                    <img
                      src={session.signatureUrl}
                      alt="Signature"
                      className="w-full h-auto rounded-lg border"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Signed on {session.date}
                    </p>
                  </DialogContent>
                </Dialog>
              ))}

            {/* Assign Coach */}
            <div className="flex flex-col gap-2">
              <select
                value={selectedCoachId}
                onChange={(e) => setSelectedCoachId(e.target.value)}
                className="w-full border rounded p-2 text-sm"
              >
                <option value="">-- None --</option>
                {coachesList.map((coach) => (
                  <option key={coach.id} value={coach.id}>
                    {coach.fullName}
                  </option>
                ))}
              </select>
              <Button className="w-full mt-2 text-xs" onClick={() => updateMemberCoach(member.id, selectedCoachId || null)}>
                Save
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
