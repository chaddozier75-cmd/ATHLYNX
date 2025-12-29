import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { sql } from "drizzle-orm";

export const veteransRouter = router({
  // Get all resources
  getResources: publicProcedure
    .input(z.object({
      category: z.string().optional(),
      resourceType: z.string().optional(),
      featured: z.boolean().optional(),
      limit: z.number().default(20),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      let whereClause = '1=1';
      if (input?.category) whereClause += ` AND category = '${input.category}'`;
      if (input?.resourceType) whereClause += ` AND resourceType = '${input.resourceType}'`;
      if (input?.featured) whereClause += ` AND featured = 'yes'`;
      
      const result = await db.execute(sql.raw(`SELECT * FROM veteran_resources WHERE ${whereClause} ORDER BY featured DESC, viewCount DESC LIMIT ${input?.limit || 20}`));
      return (result as any)[0] as any[];
    }),

  // Get single resource
  getResource: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      const result = await db.execute(sql`SELECT * FROM veteran_resources WHERE slug = ${input.slug} LIMIT 1`);
      return ((result as any)[0] as any[])[0] || null;
    }),

  // Get featured resources
  getFeatured: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT * FROM veteran_resources WHERE featured = 'yes' ORDER BY viewCount DESC LIMIT 6`);
    return (result as any)[0] as any[];
  }),

  // Get categories
  getCategories: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT DISTINCT category, COUNT(*) as count FROM veteran_resources GROUP BY category`);
    return (result as any)[0] as any[];
  }),

  // Increment view count
  incrementView: publicProcedure
    .input(z.object({ resourceId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      await db.execute(sql`UPDATE veteran_resources SET viewCount = viewCount + 1 WHERE id = ${input.resourceId}`);
      return { success: true };
    }),

  // Get stats
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const resourceResult = await db.execute(sql`SELECT COUNT(*) as count FROM veteran_resources`);
    const viewResult = await db.execute(sql`SELECT SUM(viewCount) as total FROM veteran_resources`);
    return {
      resources: ((resourceResult as any)[0] as any[])[0]?.count || 0,
      totalViews: ((viewResult as any)[0] as any[])[0]?.total || 0,
    };
  }),
});
