import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Pencil, Trash2, Plus, Users } from "lucide-react";
import type { Coach } from "../types";
import { motion, AnimatePresence } from "framer-motion";

export function CoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCoach, setEditingCoach] = useState<Coach | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch coaches
  const fetchCoaches = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/api/coaches`);
      setCoaches(res.data);
    } catch (err) {
      console.error("Error fetching coaches:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  const openCreateModal = () => {
    setEditingCoach(null);
    setName("");
    setEmail("");
    setModalOpen(true);
  };

  const openEditModal = (coach: Coach) => {
    setEditingCoach(coach);
    setName(coach.fullName);
    setEmail(coach.email);
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingCoach) {
        await axios.put(`${BACKEND_URL}/api/coaches/${editingCoach.id}`, {
          fullName: name,
          email,
        });
      } else {
        await axios.post(`${BACKEND_URL}/api/coaches`, {
          fullName: name,
          email,
        });
      }

      setModalOpen(false);
      setEditingCoach(null);
      setName("");
      setEmail("");
      fetchCoaches();
    } catch (err) {
      console.error("Failed to save coach:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coach?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/coaches/${id}`);
      fetchCoaches();
    } catch (err) {
      console.error("Failed to delete coach:", err);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold flex items-center gap-2 text-slate-900">
            <Users className="w-5 h-5 text-slate-600" />
            Coaches
          </h1>
          <p className="text-sm text-slate-500">
            Manage personal trainers and assign them to members.
          </p>
        </div>

        <Button
          className="bg-purple-700 hover:bg-purple-800 text-white flex items-center gap-2"
          onClick={openCreateModal}
        >
          <Plus className="w-4 h-4" />
          Add Coach
        </Button>
      </div>

      {/* MODERN TABLE */}
      <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 border-b border-slate-300">
            <tr>
              <th className="p-3 text-left font-medium text-slate-600">Name</th>
              <th className="p-3 text-left font-medium text-slate-600">Email</th>
              <th className="p-3 text-left font-medium text-slate-600 w-32">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-slate-500">
                  Loading coaches…
                </td>
              </tr>
            ) : coaches.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-slate-400 italic">
                  No coaches found.
                </td>
              </tr>
            ) : (
              coaches.map((coach) => (
                <tr
                  key={coach.id}
                  className="border-t border-slate-200 hover:bg-slate-50 transition"
                >
                  <td className="p-3">{coach.fullName}</td>
                  <td className="p-3">{coach.email}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1 border-slate-300 hover:bg-slate-100"
                        onClick={() => openEditModal(coach)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex items-center gap-1"
                        onClick={() => handleDelete(coach.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      {/* MODAL POPUP */}
      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <Card className="w-[420px] p-6 border border-slate-200 shadow-xl rounded-xl bg-white space-y-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  {editingCoach ? "Edit Coach" : "Create Coach"}
                </h2>

                <div className="space-y-3">
                  <Input
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Input
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex gap-2 pt-3">
                  <Button
                    className="bg-slate-900 hover:bg-slate-800 flex-1 text-white"
                    onClick={handleSave}
                  >
                    {editingCoach ? "Update" : "Create"}
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1 text-slate-700 border-slate-300 hover:bg-slate-100"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
