// services/appointmentsServices.ts
import { db } from "../db/index";
import { appointments, NewAppointment } from "../db/schema/appointments";
import { memberDeckingSessions } from "../db/schema/member_decking_sessions";
import { memberPaidSessions } from "../db/schema/member_paid_sessions";
import { eq } from "drizzle-orm";

export const appointmentsServices = {

  // -----------------------------------------------------
  // CREATE APPOINTMENT
  // -----------------------------------------------------
  createAppointment: async (data: NewAppointment) => {
    const [created] = await db.insert(appointments).values(data).returning();

    // If decking session is linked → update session record
    if (data.deckingSessionId) {
      await db.update(memberDeckingSessions)
        .set({
          appointmentId: created.id,
          status: "scheduled",
          scheduledDate: data.datetime
        })
        .where(eq(memberDeckingSessions.id, data.deckingSessionId));
    }

    // If paid session is linked → update session record
    if (data.paidSessionId) {
      await db.update(memberPaidSessions)
        .set({
          appointmentId: created.id,
          status: "scheduled",
          scheduledDate: data.datetime
        })
        .where(eq(memberPaidSessions.id, data.paidSessionId));
    }

    return created;
  },

  // -----------------------------------------------------
  // GET ALL APPOINTMENTS
  // -----------------------------------------------------
  getAllAppointments: async () => {
    return db.select().from(appointments);
  },

  // -----------------------------------------------------
  // GET APPOINTMENT BY ID
  // -----------------------------------------------------
  getAppointmentById: async (id: string) => {
    const [appt] = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, id));
    return appt;
  },

  // -----------------------------------------------------
  // GET APPOINTMENTS FOR COACH
  // -----------------------------------------------------
  getAppointmentsByCoach: async (coachId: string) => {
    return db
      .select()
      .from(appointments)
      .where(eq(appointments.coachId, coachId));
  },

  // -----------------------------------------------------
  // GET APPOINTMENTS FOR MEMBER
  // -----------------------------------------------------
  getAppointmentsByMember: async (memberId: string) => {
    return db
      .select()
      .from(appointments)
      .where(eq(appointments.clientId, memberId));
  },

  // -----------------------------------------------------
  // UPDATE APPOINTMENT
  // -----------------------------------------------------
  updateAppointment: async (id: string, data: Partial<NewAppointment>) => {
    const [existing] = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, id));

    if (!existing) throw new Error("Appointment not found");

    const [updated] = await db
      .update(appointments)
      .set(data)
      .where(eq(appointments.id, id))
      .returning();

    return updated;
  },

  // -----------------------------------------------------
  // DELETE APPOINTMENT
  // -----------------------------------------------------
  deleteAppointment: async (id: string) => {
    // Remove appointment link from sessions
    await db.update(memberDeckingSessions)
      .set({ appointmentId: null, status: "not_scheduled", scheduledDate: null })
      .where(eq(memberDeckingSessions.appointmentId, id));

    await db.update(memberPaidSessions)
      .set({ appointmentId: null, status: "not_scheduled", scheduledDate: null })
      .where(eq(memberPaidSessions.appointmentId, id));

    return db.delete(appointments).where(eq(appointments.id, id));
  },
};
