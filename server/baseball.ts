import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { sql } from "drizzle-orm";

export const baseballRouter = router({
  // Get all players
  getPlayers: publicProcedure
    .input(z.object({
      position: z.string().optional(),
      graduationYear: z.number().optional(),
      state: z.string().optional(),
      minRating: z.number().optional(),
      search: z.string().optional(),
      limit: z.number().default(20),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      let whereClause = '1=1';
      if (input?.position) whereClause += ` AND (position = '${input.position}' OR secondaryPosition = '${input.position}')`;
      if (input?.graduationYear) whereClause += ` AND graduationYear = ${input.graduationYear}`;
      if (input?.state) whereClause += ` AND state = '${input.state}'`;
      if (input?.minRating) whereClause += ` AND rating >= ${input.minRating}`;
      if (input?.search) whereClause += ` AND (firstName LIKE '%${input.search}%' OR lastName LIKE '%${input.search}%' OR school LIKE '%${input.search}%')`;
      
      const result = await db.execute(sql.raw(`SELECT * FROM baseball_players WHERE ${whereClause} ORDER BY rating DESC, nationalRank ASC LIMIT ${input?.limit || 20}`));
      return (result as any)[0] as any[];
    }),

  // Get single player
  getPlayer: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      const result = await db.execute(sql`SELECT * FROM baseball_players WHERE slug = ${input.slug} LIMIT 1`);
      return ((result as any)[0] as any[])[0] || null;
    }),

  // Get player stats
  getPlayerStats: publicProcedure
    .input(z.object({ playerId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      const result = await db.execute(sql`SELECT * FROM baseball_stats WHERE playerId = ${input.playerId} ORDER BY season DESC`);
      return (result as any)[0] as any[];
    }),

  // Get top ranked players
  getTopRanked: publicProcedure
    .input(z.object({
      graduationYear: z.number().optional(),
      limit: z.number().default(10),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      let whereClause = '1=1';
      if (input?.graduationYear) whereClause += ` AND graduationYear = ${input.graduationYear}`;
      
      const result = await db.execute(sql.raw(`SELECT * FROM baseball_players WHERE ${whereClause} ORDER BY rating DESC, nationalRank ASC LIMIT ${input?.limit || 10}`));
      return (result as any)[0] as any[];
    }),

  // Get showcase events
  getEvents: publicProcedure
    .input(z.object({
      eventType: z.string().optional(),
      state: z.string().optional(),
      featured: z.boolean().optional(),
      status: z.string().optional(),
      limit: z.number().default(20),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      let whereClause = '1=1';
      if (input?.eventType) whereClause += ` AND eventType = '${input.eventType}'`;
      if (input?.state) whereClause += ` AND state = '${input.state}'`;
      if (input?.featured) whereClause += ` AND featured = 'yes'`;
      if (input?.status) whereClause += ` AND status = '${input.status}'`;
      
      const result = await db.execute(sql.raw(`SELECT * FROM showcase_events WHERE ${whereClause} ORDER BY featured DESC, startDate ASC LIMIT ${input?.limit || 20}`));
      return (result as any)[0] as any[];
    }),

  // Get single event
  getEvent: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      const result = await db.execute(sql`SELECT * FROM showcase_events WHERE slug = ${input.slug} LIMIT 1`);
      return ((result as any)[0] as any[])[0] || null;
    }),

  // Get upcoming events
  getUpcomingEvents: publicProcedure
    .input(z.object({ limit: z.number().default(6) }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      const result = await db.execute(sql.raw(`SELECT * FROM showcase_events WHERE status = 'upcoming' ORDER BY startDate ASC LIMIT ${input?.limit || 6}`));
      return (result as any)[0] as any[];
    }),

  // Get stats
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const playerResult = await db.execute(sql`SELECT COUNT(*) as count FROM baseball_players`);
    const verifiedResult = await db.execute(sql`SELECT COUNT(*) as count FROM baseball_players WHERE verified = 'yes'`);
    const eventResult = await db.execute(sql`SELECT COUNT(*) as count FROM showcase_events WHERE status = 'upcoming'`);
    return {
      totalPlayers: ((playerResult as any)[0] as any[])[0]?.count || 0,
      verifiedPlayers: ((verifiedResult as any)[0] as any[])[0]?.count || 0,
      upcomingEvents: ((eventResult as any)[0] as any[])[0]?.count || 0,
    };
  }),

  // Get positions for filter
  getPositions: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT DISTINCT position, COUNT(*) as count FROM baseball_players GROUP BY position ORDER BY count DESC`);
    return (result as any)[0] as any[];
  }),

  // Get graduation years for filter
  getGraduationYears: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT DISTINCT graduationYear, COUNT(*) as count FROM baseball_players WHERE graduationYear IS NOT NULL GROUP BY graduationYear ORDER BY graduationYear ASC`);
    return (result as any)[0] as any[];
  }),
});
