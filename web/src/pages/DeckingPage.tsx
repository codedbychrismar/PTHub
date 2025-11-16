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

  // ------------------------
  // Fetch members
  // ------------------------
  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/members/status/decking/details`);
      const mapped: DeckingMember[] = (res.data || []).map((m: any) => {
        const assignedCoaches = m.assignedCoaches ?? [];
        return {
          ...m,
          fullName: m.fullName ?? `${m.firstName ?? ""} ${m.lastName ?? ""}`.trim(),
          assignedCoaches,
          assignedCoachId: assignedCoaches[0]?.coachId ?? null,
          category: assignedCoaches.length > 0 ? "coaches" : "queue",
        };
      });
      setMembersState(mapped);

      if (selectedMember) {
        const updatedSelected = mapped.find((x) => x.id === selectedMember.id) || null;
        setSelectedMember(updatedSelected);
      }
    } catch (err) {
      console.error("Error fetching decking members:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [BACKEND_URL]);

  // ------------------------
  // Fetch coaches
  // ------------------------
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/coaches`)
      .then((res) => setCoachesList(res.data))
      .catch((err) => console.error("Failed to fetch coaches", err));
  }, [BACKEND_URL]);

  // ------------------------
  // Search filter
  // ------------------------
  const filteredMembers = membersState.filter((m) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      m.fullName.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.phone.toLowerCase().includes(q)
    );
  });

  // ------------------------
  // Update member session (optimistic)
  // ------------------------
  const updateMemberSession = (
    memberId: string,
    sessionLabel: string,
    status: string,
    scheduledDate: string | null
  ) => {
    setMembersState((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          const updatedMember = {
            ...m,
            deckingSessions: m.deckingSessions.map((s) =>
              s.label === sessionLabel
                ? { ...s, status, scheduledDate }
                : { ...s }
            ),
          };

          // Sync selectedMember if modal is open
          if (selectedMember?.id === memberId) {
            setSelectedMember(updatedMember);
          }

          return updatedMember;
        }
        return m;
      })
    );
  };

  // ------------------------
  // Assign / Unassign coach
  // ------------------------
  const handleUpdateMemberCoach = async (memberId: string, coachId: string | null) => {
    try {
      await axios.post(`${BACKEND_URL}/api/members/${memberId}/assign-coach`, { coachId });
      fetchMembers(); // refresh state after update
    } catch (err: any) {
      console.error("Failed to assign coach:", err);
      alert(err.response?.data?.error || "Failed to assign coach");
    }
  };

  const queueMembers = filteredMembers.filter((m) => m.category === "queue");
  const notInterestedMembers = filteredMembers.filter((m) => m.category === "not_interested");
  const coachMembers = filteredMembers.filter((m) => m.category === "coaches");

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
          updateMemberCoach={handleUpdateMemberCoach}
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
