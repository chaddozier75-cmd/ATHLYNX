import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { sql } from "drizzle-orm";

export const medicalRouter = router({
  // Get all providers
  getProviders: publicProcedure
    .input(z.object({
      specialty: z.string().optional(),
      city: z.string().optional(),
      featured: z.boolean().optional(),
      search: z.string().optional(),
      limit: z.number().default(20),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      let whereClause = '1=1';
      if (input?.specialty) whereClause += ` AND specialty = '${input.specialty}'`;
      if (input?.city) whereClause += ` AND city = '${input.city}'`;
      if (input?.featured) whereClause += ` AND featured = 'yes'`;
      if (input?.search) whereClause += ` AND (name LIKE '%${input.search}%' OR specialty LIKE '%${input.search}%' OR bio LIKE '%${input.search}%')`;
      
      const result = await db.execute(sql.raw(`SELECT * FROM medical_providers WHERE ${whereClause} ORDER BY featured DESC, rating DESC LIMIT ${input?.limit || 20}`));
      return (result as any)[0] as any[];
    }),

  // Get single provider
  getProvider: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      const result = await db.execute(sql`SELECT * FROM medical_providers WHERE slug = ${input.slug} LIMIT 1`);
      return ((result as any)[0] as any[])[0] || null;
    }),

  // Get featured providers
  getFeatured: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT * FROM medical_providers WHERE featured = 'yes' ORDER BY rating DESC LIMIT 6`);
    return (result as any)[0] as any[];
  }),

  // Get specialties
  getSpecialties: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT DISTINCT specialty, COUNT(*) as count FROM medical_providers GROUP BY specialty`);
    return (result as any)[0] as any[];
  }),

  // Get my injury logs
  getMyInjuries: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT * FROM injury_logs WHERE userId = ${ctx.user.id} ORDER BY injuryDate DESC`);
    return (result as any)[0] as any[];
  }),

  // Add injury log
  addInjury: protectedProcedure
    .input(z.object({
      injuryType: z.string(),
      bodyPart: z.string(),
      severity: z.enum(['minor', 'moderate', 'severe']),
      description: z.string().optional(),
      injuryDate: z.string(),
      diagnosedBy: z.string().optional(),
      treatment: z.string().optional(),
      recoveryPlan: z.string().optional(),
      estimatedRecoveryDays: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      await db.execute(sql`INSERT INTO injury_logs (userId, injuryType, bodyPart, severity, description, injuryDate, diagnosedBy, treatment, recoveryPlan, estimatedRecoveryDays, status) VALUES (${ctx.user.id}, ${input.injuryType}, ${input.bodyPart}, ${input.severity}, ${input.description || null}, ${input.injuryDate}, ${input.diagnosedBy || null}, ${input.treatment || null}, ${input.recoveryPlan || null}, ${input.estimatedRecoveryDays || null}, 'active')`);
      
      return { success: true };
    }),

  // Update injury status
  updateInjuryStatus: protectedProcedure
    .input(z.object({
      injuryId: z.number(),
      status: z.enum(['active', 'recovering', 'recovered']),
      notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      await db.execute(sql`UPDATE injury_logs SET status = ${input.status}, notes = ${input.notes || null}, updatedAt = NOW() WHERE id = ${input.injuryId} AND userId = ${ctx.user.id}`);
      
      return { success: true };
    }),

  // Get stats
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const providerResult = await db.execute(sql`SELECT COUNT(*) as count FROM medical_providers`);
    const verifiedResult = await db.execute(sql`SELECT COUNT(*) as count FROM medical_providers WHERE verified = 'yes'`);
    return {
      totalProviders: ((providerResult as any)[0] as any[])[0]?.count || 0,
      verifiedProviders: ((verifiedResult as any)[0] as any[])[0]?.count || 0,
    };
  }),
});
