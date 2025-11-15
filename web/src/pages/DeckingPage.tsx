// src/pages/DeckingPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";

import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { MemberCard } from "@/components/MemberCard";
import { MemberSlideOver } from "@/components/MemberSlideOver";

import type { DeckingMember, Coach } from "../types";

export function DeckingPage() {
  const [membersState, setMembersState] = useState<DeckingMember[]>([]);
  const [coachesList, setCoachesList] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<DeckingMember | null>(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/members/status/decking/details`);

        const mapped: DeckingMember[] = (res.data || []).map((m: any) => {
          const assignedCoaches = m.assignedCoaches ?? [];
          const deckingSessions = m.deckingSessions ?? [];
          const hasCoach = assignedCoaches.length > 0;

          return {
            id: m.id,
            brandAmbassador: m.brandAmbassador ?? null,
            memberType: m.memberType ?? "",
            firstName: m.firstName ?? "",
            lastName: m.lastName ?? "",
            fullName: m.fullName ?? `${m.firstName ?? ""} ${m.lastName ?? ""}`.trim(),
            email: m.email ?? "",
            phone: m.phone ?? "",
            birthday: m.birthday ?? "",
            address: m.address ?? "",
            city: m.city ?? "",
            state: m.state ?? "",
            country: m.country ?? "",
            postalCode: m.postalCode ?? "",
            emergencyName: m.emergencyName ?? null,
            emergencyRelationship: m.emergencyRelationship ?? null,
            emergencyNumber: m.emergencyNumber ?? null,
            membershipTerm: m.membershipTerm ?? "",
            startDate: m.startDate ?? null,
            endDate: m.endDate ?? null,
            keyfobFee: m.keyfobFee ?? null,
            joiningFee: m.joiningFee ?? null,
            recurringFee: m.recurringFee ?? null,
            parqHeartCondition: m.parqHeartCondition ?? false,
            parqChestPainDuringExercise: m.parqChestPainDuringExercise ?? false,
            parqChestPainRecent: m.parqChestPainRecent ?? false,
            parqDizziness: m.parqDizziness ?? false,
            parqJointProblem: m.parqJointProblem ?? false,
            parqBloodPressureMedication: m.parqBloodPressureMedication ?? false,
            parqOtherReason: m.parqOtherReason ?? false,
            status: m.status ?? "",
            packageType: m.packageType ?? "",
            purchaseDate: m.purchaseDate ?? null,
            expirationDate: m.expirationDate ?? null,
            pricePaid: m.pricePaid ?? null,
            notes: m.notes ?? null,
            createdAt: m.createdAt ?? "",
            deckingSessions,
            assignedCoaches,
            category: hasCoach ? "coaches" : "queue",
            assignedCoachId: hasCoach ? assignedCoaches[0].coachId : undefined,
            activating: false,
          };
        });

        setMembersState(mapped);

        // Build a unique coaches list
        const coachesMap = new Map<string, Coach>();
        mapped.forEach((m) => {
          m.assignedCoaches.forEach((c) => {
            coachesMap.set(c.coachId, {
              id: c.coachId,
              fullName: c.fullName,
              email: c.email,
            });
          });
        });
        setCoachesList(Array.from(coachesMap.values()));
      } catch (err) {
        console.error("Error fetching decking members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [BACKEND_URL]);

  // Filter members based on search
  const filteredMembers = membersState.filter((m) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      m.fullName.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.phone.toLowerCase().includes(q)
    );
  });

  const queueMembers = filteredMembers.filter((m) => m.category === "queue");
  const notInterestedMembers = filteredMembers.filter((m) => m.category === "not_interested");
  const coachMembers = filteredMembers.filter((m) => m.category === "coaches");

  // --- NEW: function to call backend and update state ---
  const handleUpdateMemberCoach = async (memberId: string, coachId: string | null) => {
    try {
      await axios.post(`${BACKEND_URL}/api/members/${memberId}/assign-coach`, {
        coachId,
      });

      setMembersState((prev) =>
        prev.map((m) => {
          if (m.id !== memberId) return m;

          const nextCategory = coachId ? "coaches" : "queue";
          const coach = coachId && coachesList.find((c) => c.id === coachId);

          return {
            ...m,
            assignedCoachId: coachId || undefined,
            category: nextCategory,
            assignedCoaches:
              coach && coachId
                ? [
                    {
                      coachId: coach.id,
                      fullName: coach.fullName,
                      email: coach.email,
                    },
                  ]
                : [],
          };
        })
      );

      console.log("Coach assigned successfully");
    } catch (err: any) {
      console.error("Failed to assign coach:", err);
      alert(err.response?.data?.error || "Failed to assign coach");
    }
  };

  return (
    <div className="p-6 space-y-6 flex gap-6">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Decking Members</h1>
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            {membersState.length} On Trial
          </Badge>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {loading ? (
          <div className="mt-10 text-sm text-muted-foreground">Loading members…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              { title: "Queue", members: queueMembers },
              { title: "Not Interested", members: notInterestedMembers },
              { title: "Assigned to Coaches", members: coachMembers },
            ].map((group) => (
              <div key={group.title} className="flex flex-col">
                <div className="bg-purple-700 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
                  <span className="font-medium text-sm">{group.title}</span>
                  <span className="bg-purple-900 px-2 py-1 rounded text-xs">
                    {group.members.length}
                  </span>
                </div>
                <div className="bg-white border border-slate-200 rounded-b-lg p-3 space-y-3 h-[80vh] overflow-y-auto">
                  {group.members.length === 0 ? (
                    <p className="text-muted-foreground text-sm w-100 text-center">No members here yet.</p>
                  ) : (
                    group.members.map((m) => (
                      <MemberCard
                        key={m.id}
                        member={m}
                        coachesList={coachesList}
                        onSelect={() => setSelectedMember(m)}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slide-over */}
      {selectedMember && (
        <MemberSlideOver
          member={selectedMember}
          coachesList={coachesList}
          onClose={() => setSelectedMember(null)}
          updateMemberCoach={handleUpdateMemberCoach} // <-- use backend-enabled function
          activateTrial={(id) => {
            setMembersState((prev) =>
              prev.map((m) => (m.id === id ? { ...m, activating: true } : m))
            );
          }}
        />
      )}
    </div>
  );
}
