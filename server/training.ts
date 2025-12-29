import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { sql } from "drizzle-orm";

export const trainingRouter = router({
  // Get all workouts
  getWorkouts: publicProcedure
    .input(z.object({
      category: z.string().optional(),
      sport: z.string().optional(),
      difficulty: z.string().optional(),
      featured: z.boolean().optional(),
      limit: z.number().default(20),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      let whereClause = '1=1';
      if (input?.category) whereClause += ` AND category = '${input.category}'`;
      if (input?.sport) whereClause += ` AND sport = '${input.sport}'`;
      if (input?.difficulty) whereClause += ` AND difficulty = '${input.difficulty}'`;
      if (input?.featured) whereClause += ` AND featured = 'yes'`;
      
      const result = await db.execute(sql.raw(`SELECT * FROM workouts WHERE ${whereClause} ORDER BY featured DESC, viewCount DESC LIMIT ${input?.limit || 20}`));
      return (result as any)[0] as any[];
    }),

  // Get single workout
  getWorkout: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      const result = await db.execute(sql`SELECT * FROM workouts WHERE slug = ${input.slug} LIMIT 1`);
      return ((result as any)[0] as any[])[0] || null;
    }),

  // Get workout categories
  getCategories: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT DISTINCT category, COUNT(*) as count FROM workouts GROUP BY category`);
    return (result as any)[0] as any[];
  }),

  // Get sports list
  getSports: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT DISTINCT sport, COUNT(*) as count FROM workouts WHERE sport IS NOT NULL GROUP BY sport`);
    return (result as any)[0] as any[];
  }),

  // Get featured workouts
  getFeatured: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT * FROM workouts WHERE featured = 'yes' ORDER BY viewCount DESC LIMIT 6`);
    return (result as any)[0] as any[];
  }),

  // Increment view count
  incrementView: publicProcedure
    .input(z.object({ workoutId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      await db.execute(sql`UPDATE workouts SET viewCount = viewCount + 1 WHERE id = ${input.workoutId}`);
      return { success: true };
    }),

  // Like workout
  likeWorkout: protectedProcedure
    .input(z.object({ workoutId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      await db.execute(sql`UPDATE workouts SET likeCount = likeCount + 1 WHERE id = ${input.workoutId}`);
      return { success: true };
    }),

  // Get all gyms
  getGyms: publicProcedure
    .input(z.object({
      city: z.string().optional(),
      state: z.string().optional(),
      priceRange: z.string().optional(),
      featured: z.boolean().optional(),
      limit: z.number().default(20),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      let whereClause = '1=1';
      if (input?.city) whereClause += ` AND city = '${input.city}'`;
      if (input?.state) whereClause += ` AND state = '${input.state}'`;
      if (input?.priceRange) whereClause += ` AND priceRange = '${input.priceRange}'`;
      if (input?.featured) whereClause += ` AND featured = 'yes'`;
      
      const result = await db.execute(sql.raw(`SELECT * FROM gyms WHERE ${whereClause} ORDER BY featured DESC, rating DESC LIMIT ${input?.limit || 20}`));
      return (result as any)[0] as any[];
    }),

  // Get single gym
  getGym: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      const result = await db.execute(sql`SELECT * FROM gyms WHERE slug = ${input.slug} LIMIT 1`);
      return ((result as any)[0] as any[])[0] || null;
    }),

  // Get featured gyms
  getFeaturedGyms: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT * FROM gyms WHERE featured = 'yes' ORDER BY rating DESC LIMIT 6`);
    return (result as any)[0] as any[];
  }),

  // Get gym cities
  getGymCities: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT DISTINCT city, state, COUNT(*) as count FROM gyms GROUP BY city, state`);
    return (result as any)[0] as any[];
  }),

  // Get training stats
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const workoutResult = await db.execute(sql`SELECT COUNT(*) as count FROM workouts`);
    const gymResult = await db.execute(sql`SELECT COUNT(*) as count FROM gyms`);
    const viewResult = await db.execute(sql`SELECT SUM(viewCount) as total FROM workouts`);
    return {
      workouts: ((workoutResult as any)[0] as any[])[0]?.count || 0,
      gyms: ((gymResult as any)[0] as any[])[0]?.count || 0,
      totalViews: ((viewResult as any)[0] as any[])[0]?.total || 0,
    };
  }),
});
