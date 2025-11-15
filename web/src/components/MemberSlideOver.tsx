// src/components/MemberSlideOver.tsx
import { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "./ui/button";
import type { DeckingMember, Coach } from "../types";


interface Props {
  member: DeckingMember;
  coachesList: Coach[];
  onClose: () => void;
  updateMemberCoach: (id: string, coachId: string | null) => void;
  activateTrial: (id: string) => void;
}

export function MemberSlideOver({
  member,
  coachesList,
  onClose,
  updateMemberCoach,
  activateTrial,
}: Props) {
  // Set "actions" as default tab
  const [activeTab, setActiveTab] = useState<"info" | "actions">("actions");
  const [selectedCoachId, setSelectedCoachId] = useState(
    member.assignedCoachId || ""
  );

 

  const activeTabClasses =
    "bg-purple-600 text-white shadow px-3 py-1 rounded-md";
  const inactiveTabClasses =
    "bg-purple-200 text-purple-900 px-3 py-1 rounded-md hover:bg-purple-300";

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed  z-40"
        onClick={onClose}
      />

        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-end">
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="h-screen w-[380px] bg-white shadow-2xl border-l border-slate-200 p-5 flex flex-col"
          >
          {/* HEADER — Tabs placed here */}
          <div className="flex justify-between items-center mb-4">
            {/* Member Info */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {member.fullName}
              </h2>
              <p className="text-xs text-slate-500">
                {member.email} · {member.phone}
              </p>
            </div>

            {/* Tabs + X */}
            <div className="flex items-center gap-2">

              <button
                className={
                  activeTab === "actions" ? activeTabClasses : inactiveTabClasses
                }
                onClick={() => setActiveTab("actions")}
              >
                Actions
              </button>

              <button
                className={
                  activeTab === "info" ? activeTabClasses : inactiveTabClasses
                }
                onClick={() => setActiveTab("info")}
              >
                Info
              </button>



              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-slate-100"
              >
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700 transition" />
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="mt-2 flex-1 overflow-y-auto space-y-4 text-sm">
            {/* INFO TAB */}
            {activeTab === "info" && (
              <div className="space-y-4">
                  <section>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase mb-1">Assigned Coaches</h3>
                  {member.assignedCoaches.length === 0 ? (
                    <p className="text-xs text-slate-500">No coach assigned.</p>
                  ) : (
                    <div className="space-y-1 text-xs">
                      {member.assignedCoaches.map((c) => (
                        <p key={c.coachId}>• {c.fullName} ({c.email})</p>
                      ))}
                    </div>
                  )}
                </section>
                <section>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase mb-1">Personal Info</h3>
                  <div className="space-y-1 text-xs">
                    <p><span className="font-medium">Full Name:</span> {member.fullName}</p>
                    <p><span className="font-medium">First Name:</span> {member.firstName}</p>
                    <p><span className="font-medium">Last Name:</span> {member.lastName}</p>
                    <p><span className="font-medium">Member Type:</span> {member.memberType || "N/A"}</p>
                    <p><span className="font-medium">Brand Ambassador:</span> {member.brandAmbassador || "N/A"}</p>
                    <p><span className="font-medium">Birthday:</span> {member.birthday || "N/A"}</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase mb-1">Contact & Address</h3>
                  <div className="space-y-1 text-xs">
                    <p><span className="font-medium">Email:</span> {member.email}</p>
                    <p><span className="font-medium">Phone:</span> {member.phone}</p>
                    <p><span className="font-medium">Address:</span> {member.address}, {member.city}, {member.state}, {member.country} {member.postalCode}</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase mb-1">Emergency Contact</h3>
                  <div className="space-y-1 text-xs">
                    <p><span className="font-medium">Name:</span> {member.emergencyName || "None"}</p>
                    <p><span className="font-medium">Relationship:</span> {member.emergencyRelationship || "None"}</p>
                    <p><span className="font-medium">Contact Number:</span> {member.emergencyNumber || "None"}</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase mb-1">Membership & Purchase</h3>
                  <div className="space-y-1 text-xs">
                    <p><span className="font-medium">Membership Term:</span> {member.membershipTerm || "N/A"}</p>
                    <p><span className="font-medium">Package Type:</span> {member.packageType || "N/A"}</p>
                    <p><span className="font-medium">Start Date:</span> {member.startDate || "N/A"}</p>
                    <p><span className="font-medium">End Date:</span> {member.endDate || "N/A"}</p>
                    <p><span className="font-medium">Purchase Date:</span> {member.purchaseDate || "N/A"}</p>
                    <p><span className="font-medium">Expiration Date:</span> {member.expirationDate || "N/A"}</p>
                    <p><span className="font-medium">Price Paid:</span> {member.pricePaid ?? "N/A"}</p>
                    <p><span className="font-medium">Notes:</span> {member.notes || "N/A"}</p>
                    <p><span className="font-medium">Status:</span> {member.status}</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase mb-1">Fees</h3>
                  <div className="space-y-1 text-xs">
                    <p><span className="font-medium">Keyfob Fee:</span> {member.keyfobFee ?? "N/A"}</p>
                    <p><span className="font-medium">Joining Fee:</span> {member.joiningFee ?? "N/A"}</p>
                    <p><span className="font-medium">Recurring Fee:</span> {member.recurringFee ?? "N/A"}</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase mb-1">PAR-Q Responses</h3>
                  <ul className="list-disc ml-5 space-y-0.5 text-xs">
                    <li>Heart Condition: {member.parqHeartCondition ? "Yes" : "No"}</li>
                    <li>Chest Pain During Exercise: {member.parqChestPainDuringExercise ? "Yes" : "No"}</li>
                    <li>Recent Chest Pain: {member.parqChestPainRecent ? "Yes" : "No"}</li>
                    <li>Dizziness: {member.parqDizziness ? "Yes" : "No"}</li>
                    <li>Joint Problems: {member.parqJointProblem ? "Yes" : "No"}</li>
                    <li>Blood Pressure Medication: {member.parqBloodPressureMedication ? "Yes" : "No"}</li>
                    <li>Other Reason: {member.parqOtherReason ? "Yes" : "No"}</li>
                  </ul>
                </section>


              </div>
            )}


            {/* ACTIONS TAB */}
            {activeTab === "actions" && (
              <div className="space-y-4">


                {/* Decking Sessions */}
                <section>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase mb-1">
                    Decking Sessions
                  </h3>

                  {member.deckingSessions.length === 0 ? (
                    <p className="text-xs text-slate-500">No decking sessions yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {member.deckingSessions.map((s) => (
                        <div
                          key={s.id}
                          className="border border-slate-200 rounded-md p-2"
                        >
                          <p className="text-xs font-medium">{s.label}</p>
                          <p className="text-[11px] text-slate-500">
                            Status: {s.status}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Scheduled: {s.scheduledDate || "Not scheduled"}
                          </p>

                          {/* Buttons for each session */}
                          <div className="flex gap-2 mt-2">
                            <Button className="h-6 px-2 text-[11px]">
                              Make Appointment
                            </Button>
                            <Button variant="outline" className="h-6 px-2 text-[11px]">
                              View Signature
                            </Button>
                          </div>
                        
                        </div>

                        
                      ))}

                      
                    </div>

                    
                  )}

                  
                </section>

                {/* Assign Coach */}
                <section className="space-y-2">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase">
                    Assign Coach
                  </h3>

                  <select
                    value={selectedCoachId}
                    onChange={(e) => setSelectedCoachId(e.target.value)}
                    className="w-full border rounded-md p-2 text-sm"
                  >
                    <option value="">-- None --</option>
                    {coachesList.map((coach) => (
                      <option key={coach.id} value={coach.id}>
                        {coach.fullName}
                      </option>
                    ))}
                  </select>

                  <Button
                    className="w-full"
                    onClick={() =>
                      updateMemberCoach(member.id, selectedCoachId || null)
                    }
                  >
                    Save Coach
                  </Button>
                </section>

                {/* Activate Trial */}
                {member.category === "coaches" && !member.activating && (
                  <Button
                    className="w-full bg-purple-700 hover:bg-purple-800"
                    onClick={() => activateTrial(member.id)}
                  >
                    Activate Trial
                  </Button>
                )}

                {member.category === "coaches" && member.activating && (
                  <Button className="w-full bg-purple-400" disabled>
                    Activating…
                  </Button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
