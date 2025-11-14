import { useState, useEffect } from "react";
import { Badge } from "./../components/ui/badge";
import { Input } from "./../components/ui/input";
import { Search } from "lucide-react";
import { format } from "date-fns";
import { MemberCard } from "@/components/MemberCard";
import { X } from "lucide-react";

interface DeckingMember {
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

interface Coach {
  id: string;
  fullName: string;
  email: string;
}

export function DeckingPage() {
  const [membersState, setMembersState] = useState<DeckingMember[]>([]);
  const [coachesList, setCoachesList] = useState<Coach[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<DeckingMember | null>(null);

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const assessmentLabels: Record<string, string> = {
    assessment1: "Assessment 1",
    assessment2: "Free PT Session 1",
    assessment3: "Free PT Session 2",
  };

  function getSessionStatus(session: { date?: string; signatureUrl?: string } | undefined) {
    if (!session) return "Not Yet Scheduled";
    if (session.date && !session.signatureUrl) return "Scheduled";
    if (session.date && session.signatureUrl === "") return "Not Yet Signed";
    if (session.signatureUrl) return "Signed";
    return "Not Yet Scheduled";
  }

  // Fetch decking members
  useEffect(() => {
    fetch(`${VITE_BACKEND_URL}/api/members/status/decking/all`)
      .then((res) => res.json())
      .then((data) => {
        const uniqueMembers = Array.from(new Map(data.map((d: any) => [d.id, d])).values());
        const mapped: DeckingMember[] = uniqueMembers.map((d: any) => {
          const member: DeckingMember = {
            id: d.id,
            fullName: `${d.firstName} ${d.lastName}`,
            email: d.email,
            phoneNumber: d.phone,
            category: d.assignedCoachId ? "coaches" : "queue",
            assignedCoachId: d.assignedCoachId || undefined,
            assessments: { assessment1: false, assessment2: false, assessment3: false },
            sessions:
              d.sessions?.map((s: any) => ({
                id: s.id,
                assessment: s.assessment,
                date: format(new Date(s.sessionDate), "PPpp"),
                signatureUrl: s.signature,
              })) || [],
          };

          member.sessions.forEach((s) => {
            if (s.assessment === "assessment1") member.assessments.assessment1 = true;
            if (s.assessment === "assessment2") member.assessments.assessment2 = true;
            if (s.assessment === "assessment3") member.assessments.assessment3 = true;
          });

          return member;
        });

        setMembersState(mapped);
      })
      .catch((err) => console.error("Error fetching decking members:", err));
  }, []);

  // Fetch coaches
  useEffect(() => {
    fetch(`${VITE_BACKEND_URL}/api/coaches`, { headers: { "Content-Type": "application/json" } })
      .then((res) => res.json())
      .then((data: Coach[]) => setCoachesList(data))
      .catch((err) => console.error("Error fetching coaches:", err));
  }, []);

  const filteredMembers = membersState.filter((m) =>
    m.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const queueMembers = filteredMembers.filter((m) => m.category === "queue");
  const notInterestedMembers = filteredMembers.filter((m) => m.category === "not_interested");
  const coachMembers = filteredMembers.filter((m) => m.category === "coaches");

  return (
    <div className="p-6 space-y-6 flex gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Decking Members</h1>
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            {membersState.length} On Trial
          </Badge>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[
            { title: "Queue", members: queueMembers },
            { title: "Not Interested", members: notInterestedMembers },
            { title: "Assigned to Coaches", members: coachMembers },
          ].map((group) => (
            <div key={group.title} className="flex flex-col">
              <div className="bg-purple-700 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
                <span>{group.title}</span>
                <span className="bg-purple-800 px-2 py-1 rounded text-sm">{group.members.length}</span>
              </div>
              <div className="bg-white border rounded-b-lg p-4 space-y-4 min-h-[300px] overflow-y-auto">
                {group.members.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No members here.</p>
                ) : (
                  group.members.map((m) => (
                    <MemberCard
                      key={m.id}
                      member={m}
                      coachesList={coachesList}
                      // Update coach assignment
                      updateMemberCoach={(memberId, coachId) => {
                        setMembersState((prev) =>
                          prev.map((mem) =>
                            mem.id === memberId
                              ? {
                                  ...mem,
                                  assignedCoachId: coachId || undefined, // Keep type DeckingMember
                                  category: coachId ? "coaches" : "queue", // Update category
                                }
                              : mem
                          )
                        );
                      }}

                      // Activate trial
                      activateTrial={(memberId) => {
                        setMembersState((prev) =>
                          prev.map((mem) =>
                            mem.id === memberId
                              ? { ...mem, activating: true } // Type still DeckingMember
                              : mem
                          )
                        );
                      }}

                      onClick={() => setSelectedMember(m)}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right-hand Slide-over Popup */}
      {selectedMember && (
        <div className="w-96 border-l bg-white shadow-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{selectedMember.fullName}</h2>
            <button onClick={() => setSelectedMember(null)}>
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-2">
            <p>
              <strong>Email:</strong> {selectedMember.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedMember.phoneNumber}
            </p>
            <p>
              <strong>Assigned Coach:</strong>{" "}
              {coachesList.find((c) => c.id === selectedMember.assignedCoachId)?.fullName ||
                "None"}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Assessments</h3>
            {["assessment1", "assessment2", "assessment3"].map((a) => {
              const session = selectedMember.sessions.find((s) => s.assessment === a);
              const status = getSessionStatus(session);
              return (
                <div key={a} className="flex justify-between text-sm mb-1">
                  <span>{assessmentLabels[a]}</span>
                  <span
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
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
