import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "./_core/trpc";
import { getDb } from "./db";
import { sql } from "drizzle-orm";
import { notifyOwner } from "./_core/notification";

export const partnersRouter = router({
  // Authenticate partner with access code
  authenticate: publicProcedure
    .input(z.object({
      accessCode: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const result = await db.execute(sql.raw(
        `SELECT id, name, company, email, access_level, expires_at, is_active 
         FROM partners 
         WHERE access_code = '${input.accessCode.replace(/'/g, "''")}' AND is_active = 'yes'`
      ));
      const partners = (result as any)[0];
      
      const partner = (partners as any[])[0];
      
      if (!partner) {
        return { success: false, error: "Invalid access code" };
      }
      
      // Check expiration
      if (partner.expires_at && new Date(partner.expires_at) < new Date()) {
        return { success: false, error: "Access code has expired" };
      }
      
      // Log the access
      await db.execute(sql.raw(
        `INSERT INTO partner_access_logs (partner_id, action) VALUES (${partner.id}, 'login')`
      ));
      
      // Notify owner of partner login
      await notifyOwner({
        title: `🤝 Partner Portal Login: ${partner.company}`,
        content: `${partner.name} from ${partner.company} just logged into the Partner Portal.\n\nAccess Level: ${partner.access_level}\nTime: ${new Date().toISOString()}`,
      });
      
      return {
        success: true,
        partner: {
          id: partner.id,
          name: partner.name,
          company: partner.company,
          accessLevel: partner.access_level,
        },
      };
    }),

  // Get documents for authenticated partner
  getDocuments: publicProcedure
    .input(z.object({
      partnerId: z.number(),
      category: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      let query = `SELECT id, title, description, file_url, category, created_at 
                   FROM partner_documents 
                   WHERE partner_id = ${input.partnerId} AND is_active = 'yes'`;
      
      if (input.category) {
        query += ` AND category = '${input.category}'`;
      }
      
      query += ` ORDER BY created_at DESC`;
      
      const result = await db.execute(sql.raw(query));
      
      return (result as any)[0] as any[];
    }),

  // Log document download
  logDownload: publicProcedure
    .input(z.object({
      partnerId: z.number(),
      documentId: z.number(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      await db.execute(sql.raw(
        `INSERT INTO partner_access_logs (partner_id, action, document_id) 
         VALUES (${input.partnerId}, 'download', ${input.documentId})`
      ));
      
      // Get document and partner info for notification
      const docsResult = await db.execute(sql.raw(
        `SELECT d.title, p.name, p.company 
         FROM partner_documents d 
         JOIN partners p ON d.partner_id = p.id 
         WHERE d.id = ${input.documentId}`
      ));
      const docs = (docsResult as any)[0];
      const doc = (docs as any[])[0];
      
      if (doc) {
        await notifyOwner({
          title: `📥 Document Downloaded: ${doc.title}`,
          content: `${doc.name} from ${doc.company} downloaded "${doc.title}".\n\nTime: ${new Date().toISOString()}`,
        });
      }
      
      return { success: true };
    }),

  // Admin: Get all partners
  adminGetPartners: protectedProcedure
    .query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Admin access required');
      }
      
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      const result = await db.execute(sql.raw(
        `SELECT id, name, company, email, access_code, access_level, expires_at, is_active, created_at 
         FROM partners 
         ORDER BY created_at DESC`
      ));
      
      return (result as any)[0] as any[];
    }),

  // Admin: Create partner
  adminCreatePartner: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      company: z.string().min(1),
      email: z.string().email().optional(),
      accessCode: z.string().min(6),
      accessLevel: z.enum(['standard', 'premium', 'executive']),
      expiresAt: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Admin access required');
      }
      
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const emailVal = input.email ? `'${input.email.replace(/'/g, "''")}'` : 'NULL';
      const expiresVal = input.expiresAt ? `'${input.expiresAt}'` : 'NULL';
      await db.execute(sql.raw(
        `INSERT INTO partners (name, company, email, access_code, access_level, expires_at) 
         VALUES ('${input.name.replace(/'/g, "''")}', '${input.company.replace(/'/g, "''")}', ${emailVal}, '${input.accessCode.replace(/'/g, "''")}', '${input.accessLevel}', ${expiresVal})`
      ));
      
      return { success: true };
    }),

  // Admin: Add document for partner
  adminAddDocument: protectedProcedure
    .input(z.object({
      partnerId: z.number(),
      title: z.string().min(1),
      description: z.string().optional(),
      fileUrl: z.string().url(),
      category: z.enum(['quotes', 'proposals', 'technical', 'presentations', 'contracts', 'other']),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Admin access required');
      }
      
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const descVal = input.description ? `'${input.description.replace(/'/g, "''")}'` : 'NULL';
      await db.execute(sql.raw(
        `INSERT INTO partner_documents (partner_id, title, description, file_url, category) 
         VALUES (${input.partnerId}, '${input.title.replace(/'/g, "''")}', ${descVal}, '${input.fileUrl.replace(/'/g, "''")}', '${input.category}')`
      ));
      
      return { success: true };
    }),

  // Admin: Get access logs
  adminGetAccessLogs: protectedProcedure
    .input(z.object({
      partnerId: z.number().optional(),
      limit: z.number().default(100),
    }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Admin access required');
      }
      
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      let query = `SELECT l.*, p.name as partner_name, p.company, d.title as document_title 
                   FROM partner_access_logs l 
                   JOIN partners p ON l.partner_id = p.id 
                   LEFT JOIN partner_documents d ON l.document_id = d.id`;
      const params: any[] = [];
      
      if (input.partnerId) {
        query += ` WHERE l.partner_id = ?`;
        params.push(input.partnerId);
      }
      
      query += ` ORDER BY l.created_at DESC LIMIT ${input.limit}`;
      
      const result = await db.execute(sql.raw(query));
      
      return (result as any)[0] as any[];
    }),
});
