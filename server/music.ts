import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { sql } from "drizzle-orm";

export const musicRouter = router({
  // Get all playlists
  getPlaylists: publicProcedure
    .input(z.object({
      category: z.string().optional(),
      mood: z.string().optional(),
      sport: z.string().optional(),
      featured: z.boolean().optional(),
      limit: z.number().default(20),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      let whereClause = '1=1';
      if (input?.category) whereClause += ` AND category = '${input.category}'`;
      if (input?.mood) whereClause += ` AND mood = '${input.mood}'`;
      if (input?.sport) whereClause += ` AND sport = '${input.sport}'`;
      if (input?.featured) whereClause += ` AND featured = 'yes'`;
      
      const result = await db.execute(sql.raw(`SELECT * FROM playlists WHERE ${whereClause} ORDER BY featured DESC, playCount DESC LIMIT ${input?.limit || 20}`));
      return (result as any)[0] as any[];
    }),

  // Get single playlist
  getPlaylist: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      const result = await db.execute(sql`SELECT * FROM playlists WHERE slug = ${input.slug} LIMIT 1`);
      return ((result as any)[0] as any[])[0] || null;
    }),

  // Get featured playlists
  getFeatured: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT * FROM playlists WHERE featured = 'yes' ORDER BY playCount DESC LIMIT 6`);
    return (result as any)[0] as any[];
  }),

  // Get playlist categories
  getCategories: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT DISTINCT category, COUNT(*) as count FROM playlists GROUP BY category`);
    return (result as any)[0] as any[];
  }),

  // Get moods
  getMoods: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT DISTINCT mood, COUNT(*) as count FROM playlists WHERE mood IS NOT NULL GROUP BY mood`);
    return (result as any)[0] as any[];
  }),

  // Increment play count
  incrementPlayCount: publicProcedure
    .input(z.object({ playlistId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      await db.execute(sql`UPDATE playlists SET playCount = playCount + 1 WHERE id = ${input.playlistId}`);
      return { success: true };
    }),

  // Like playlist
  likePlaylist: protectedProcedure
    .input(z.object({ playlistId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      await db.execute(sql`UPDATE playlists SET likeCount = likeCount + 1 WHERE id = ${input.playlistId}`);
      return { success: true };
    }),

  // Get music stats
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const playlistResult = await db.execute(sql`SELECT COUNT(*) as count FROM playlists`);
    const playResult = await db.execute(sql`SELECT SUM(playCount) as total FROM playlists`);
    const trackResult = await db.execute(sql`SELECT SUM(totalTracks) as total FROM playlists`);
    return {
      playlists: ((playlistResult as any)[0] as any[])[0]?.count || 0,
      totalPlays: ((playResult as any)[0] as any[])[0]?.total || 0,
      totalTracks: ((trackResult as any)[0] as any[])[0]?.total || 0,
    };
  }),
});
