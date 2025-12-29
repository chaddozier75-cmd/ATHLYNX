import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { sql } from "drizzle-orm";

export const careersRouter = router({
  // Get all jobs
  getJobs: publicProcedure
    .input(z.object({
      category: z.string().optional(),
      locationType: z.string().optional(),
      employmentType: z.string().optional(),
      athletePreferred: z.boolean().optional(),
      veteranPreferred: z.boolean().optional(),
      featured: z.boolean().optional(),
      search: z.string().optional(),
      limit: z.number().default(20),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      let whereClause = '1=1';
      if (input?.category) whereClause += ` AND category = '${input.category}'`;
      if (input?.locationType) whereClause += ` AND locationType = '${input.locationType}'`;
      if (input?.employmentType) whereClause += ` AND employmentType = '${input.employmentType}'`;
      if (input?.athletePreferred) whereClause += ` AND athletePreferred = 'yes'`;
      if (input?.veteranPreferred) whereClause += ` AND veteranPreferred = 'yes'`;
      if (input?.featured) whereClause += ` AND featured = 'yes'`;
      if (input?.search) whereClause += ` AND (title LIKE '%${input.search}%' OR company LIKE '%${input.search}%' OR description LIKE '%${input.search}%')`;
      
      const result = await db.execute(sql.raw(`SELECT * FROM jobs WHERE ${whereClause} ORDER BY featured DESC, createdAt DESC LIMIT ${input?.limit || 20}`));
      return (result as any)[0] as any[];
    }),

  // Get single job
  getJob: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      const result = await db.execute(sql`SELECT * FROM jobs WHERE slug = ${input.slug} LIMIT 1`);
      return ((result as any)[0] as any[])[0] || null;
    }),

  // Get featured jobs
  getFeatured: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT * FROM jobs WHERE featured = 'yes' ORDER BY createdAt DESC LIMIT 6`);
    return (result as any)[0] as any[];
  }),

  // Get job categories
  getCategories: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT DISTINCT category, COUNT(*) as count FROM jobs GROUP BY category`);
    return (result as any)[0] as any[];
  }),

  // Increment view count
  incrementJobView: publicProcedure
    .input(z.object({ jobId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      await db.execute(sql`UPDATE jobs SET viewCount = viewCount + 1 WHERE id = ${input.jobId}`);
      return { success: true };
    }),

  // Get/Create athlete profile
  getMyProfile: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.execute(sql`SELECT * FROM athlete_profiles WHERE userId = ${ctx.user.id} LIMIT 1`);
    return ((result as any)[0] as any[])[0] || null;
  }),

  // Update athlete profile
  updateProfile: protectedProcedure
    .input(z.object({
      headline: z.string().optional(),
      bio: z.string().optional(),
      sport: z.string().optional(),
      position: z.string().optional(),
      school: z.string().optional(),
      graduationYear: z.number().optional(),
      gpa: z.number().optional(),
      achievements: z.string().optional(),
      skills: z.string().optional(),
      experience: z.string().optional(),
      education: z.string().optional(),
      certifications: z.string().optional(),
      linkedinUrl: z.string().optional(),
      lookingForWork: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      // Check if profile exists
      const existing = await db.execute(sql`SELECT id FROM athlete_profiles WHERE userId = ${ctx.user.id} LIMIT 1`);
      const existingProfile = ((existing as any)[0] as any[])[0];
      
      if (existingProfile) {
        // Update existing
        await db.execute(sql`UPDATE athlete_profiles SET 
          headline = ${input.headline || null},
          bio = ${input.bio || null},
          sport = ${input.sport || null},
          position = ${input.position || null},
          school = ${input.school || null},
          graduationYear = ${input.graduationYear || null},
          gpa = ${input.gpa || null},
          achievements = ${input.achievements || null},
          skills = ${input.skills || null},
          experience = ${input.experience || null},
          education = ${input.education || null},
          certifications = ${input.certifications || null},
          linkedinUrl = ${input.linkedinUrl || null},
          lookingForWork = ${input.lookingForWork ? 'yes' : 'no'},
          updatedAt = NOW()
          WHERE userId = ${ctx.user.id}`);
      } else {
        // Create new
        await db.execute(sql`INSERT INTO athlete_profiles (userId, headline, bio, sport, position, school, graduationYear, gpa, achievements, skills, experience, education, certifications, linkedinUrl, lookingForWork) VALUES (${ctx.user.id}, ${input.headline || null}, ${input.bio || null}, ${input.sport || null}, ${input.position || null}, ${input.school || null}, ${input.graduationYear || null}, ${input.gpa || null}, ${input.achievements || null}, ${input.skills || null}, ${input.experience || null}, ${input.education || null}, ${input.certifications || null}, ${input.linkedinUrl || null}, ${input.lookingForWork ? 'yes' : 'no'})`);
      }
      
      return { success: true };
    }),

  // Get stats
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const jobResult = await db.execute(sql`SELECT COUNT(*) as count FROM jobs`);
    const profileResult = await db.execute(sql`SELECT COUNT(*) as count FROM athlete_profiles`);
    const athleteJobsResult = await db.execute(sql`SELECT COUNT(*) as count FROM jobs WHERE athletePreferred = 'yes'`);
    return {
      totalJobs: ((jobResult as any)[0] as any[])[0]?.count || 0,
      totalProfiles: ((profileResult as any)[0] as any[])[0]?.count || 0,
      athletePreferredJobs: ((athleteJobsResult as any)[0] as any[])[0]?.count || 0,
    };
  }),
});
