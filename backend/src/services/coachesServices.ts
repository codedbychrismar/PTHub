import { db } from "../db/index";
import { coaches, NewCoach } from "../db/schema/coaches";
import { eq } from "drizzle-orm";

export const coachesServices = {
  // Create a new coach
  createCoach: async (coachData: NewCoach) => {
    const newCoach = await db.insert(coaches).values(coachData).returning();
    return newCoach[0];
  },

  // Get all coaches
  getAllCoaches: async () => {
    return await db.select().from(coaches);
  },

  // Get a coach by ID
  getCoachById: async (id: string) => {
    const coach = await db.select().from(coaches).where(eq(coaches.id, id));
    return coach[0];
  },

  // Update a coach by ID
  updateCoach: async (id: string, updateData: Partial<NewCoach>) => {
    const updated = await db.update(coaches).set(updateData).where(eq(coaches.id, id)).returning();
    return updated[0];
  },

  // Delete a coach by ID
  deleteCoach: async (id: string) => {
    await db.delete(coaches).where(eq(coaches.id, id));
  },
};
