import { useState } from "react";
import { Card } from "./../components/ui/card";
import { Badge } from "./../components/ui/badge";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { Search, Mail, Phone, CheckCircle, UserCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./../components/ui/dialog";
import { format } from "date-fns";

interface DeckingMember {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  category: "queue" | "not_interested" | "coaches";
  assignedCoach?: string;
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
}

export function DeckingPage() {
  const coachesList = ["Coach Mike Johnson", "Coach Sarah Williams", "Coach Ana Lopez"];

  const initialMembers: DeckingMember[] = [
    {
      id: "1",
      fullName: "Alex Turner",
      email: "alex.t@email.com",
      phoneNumber: "+1 (555) 111-2222",
      category: "queue",
      assessments: { assessment1: false, assessment2: false, assessment3: false },
      sessions: [],
    },
    {
      id: "2",
      fullName: "Jessica Brown",
      email: "jess.brown@email.com",
      phoneNumber: "+1 (555) 222-3333",
      category: "not_interested",
      assessments: { assessment1: false, assessment2: false, assessment3: false },
      sessions: [],
    },
    {
      id: "3",
      fullName: "David Chen",
      email: "d.chen@email.com",
      phoneNumber: "+1 (555) 333-4444",
      category: "coaches",
      assignedCoach: "Coach Mike Johnson",
      assessments: { assessment1: true, assessment2: true, assessment3: false },
      sessions: [
        {
          id: "s1",
          assessment: "assessment1",
          date: "2025-11-10T10:00:00Z",
          signatureUrl: "https://via.placeholder.com/150?text=Signature+1",
        },
      ],
    },
  ];

  const [membersState, setMembersState] = useState<DeckingMember[]>(initialMembers);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = membersState.filter((m) =>
    m.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const queueMembers = filteredMembers.filter((m) => m.category === "queue");
  const notInterestedMembers = filteredMembers.filter((m) => m.category === "not_interested");
  const coachMembers = filteredMembers.filter((m) => m.category === "coaches");

  const MemberCard = ({ member }: { member: DeckingMember }) => {
    const [selectedCoach, setSelectedCoach] = useState(member.assignedCoach || "");

    const assignCoach = () => {
      setMembersState((prev) =>
        prev.map((m) =>
          m.id === member.id
            ? { ...m, assignedCoach: selectedCoach, category: "coaches" }
            : m
        )
      );
    };

    return (
      <Card className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{member.fullName}</h3>

          {member.assignedCoach && (
            <div className="flex items-center gap-1 text-primary">
              <UserCircle className="w-4 h-4" />
              <p className="text-sm">{member.assignedCoach}</p>
            </div>
          )}
        </div>

        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <p>{member.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <p>{member.phoneNumber}</p>
          </div>
        </div>

        <div className="pt-2 border-t space-y-1">
          {["assessment1", "assessment2", "assessment3"].map((a, i) => (
            <div key={i} className="flex justify-between items-center text-sm">
              <p>{`Assessment ${i + 1}`}</p>
              {member.assessments[a as keyof typeof member.assessments] ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <X className="w-4 h-4 text-red-600" />
              )}
            </div>
          ))}
        </div>

        {/* BUTTON ROW */}
        <div className="flex gap-2 ">

          {/* Assign / Update Coach */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" className="flex-1 text-xs">
                {member.assignedCoach ? "Update Coach" : "Assign Coach"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Coach</DialogTitle>
              </DialogHeader>

              <select
                value={selectedCoach}
                onChange={(e) => setSelectedCoach(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="">Select coach...</option>
                {coachesList.map((coach) => (
                  <option key={coach} value={coach}>
                    {coach}
                  </option>
                ))}
              </select>

              <Button className="w-full mt-3" onClick={assignCoach} disabled={!selectedCoach}>
                Save
              </Button>
            </DialogContent>
          </Dialog>

          {/* View Signatures (only if has a coach) */}
          {member.category === "coaches" && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1 text-xs">
                  View Signatures
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Signatures for {member.fullName}</DialogTitle>
                </DialogHeader>

                {member.sessions.length === 0 ? (
                  <p className="text-center text-muted-foreground">No signatures yet.</p>
                ) : (
                  <div className="space-y-2 mt-2">
                    {member.sessions.map((s) => (
                      <div key={s.id} className="text-sm">
                        <p>Assessment: {s.assessment}</p>
                        <p className="text-muted-foreground">{format(new Date(s.date), "PPP p")}</p>
                        <img
                          src={s.signatureUrl}
                          alt="Signature"
                          className="w-full h-20 object-contain border rounded"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </DialogContent>
            </Dialog>
          )}

        </div>

      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6">
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

        {/* QUEUE */}
        <div className="flex flex-col">
          <div className="bg-purple-700 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
            <span>Queue</span>
            <span className="bg-purple-800 px-2 py-1 rounded text-sm">{queueMembers.length}</span>
          </div>
          <div className="bg-white border rounded-b-lg p-4 space-y-4 min-h-[300px] overflow-y-auto">
            {queueMembers.length === 0 ? (
              <p className="text-muted-foreground text-sm">No members waiting.</p>
            ) : (
              queueMembers.map((m) => <MemberCard key={m.id} member={m} />)
            )}
          </div>
        </div>

        {/* NOT INTERESTED */}
        <div className="flex flex-col">
          <div className="bg-purple-700 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
            <span>Not Interested</span>
            <span className="bg-purple-800 px-2 py-1 rounded text-sm">{notInterestedMembers.length}</span>
          </div>
          <div className="bg-white border rounded-b-lg p-4 space-y-4 min-h-[300px] overflow-y-auto">
            {notInterestedMembers.length === 0 ? (
              <p className="text-muted-foreground text-sm">None declined coaching.</p>
            ) : (
              notInterestedMembers.map((m) => <MemberCard key={m.id} member={m} />)
            )}
          </div>
        </div>

        {/* COACHES */}
        <div className="flex flex-col">
          <div className="bg-purple-700 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
            <span>Assigned to Coaches</span>
            <span className="bg-purple-800 px-2 py-1 rounded text-sm">{coachMembers.length}</span>
          </div>
          <div className="bg-white border rounded-b-lg p-4 space-y-4 min-h-[300px] overflow-y-auto">
            {coachMembers.length === 0 ? (
              <p className="text-muted-foreground text-sm">No members assigned yet.</p>
            ) : (
              coachMembers.map((m) => <MemberCard key={m.id} member={m} />)
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
