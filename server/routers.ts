import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { vipMembers } from "../drizzle/schema";
import { getDb } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // VIP Early Access Signup
  vip: router({
    signup: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          phone: z.string().optional(),
          role: z.string(),
          sport: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        // Generate unique access code
        const accessCode = Math.random().toString(36).substring(2, 14).toUpperCase();

        // Insert into database
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }
        
        await db.insert(vipMembers).values({
          email: input.email,
          phone: input.phone || null,
          role: input.role,
          sport: input.sport,
          accessCode,
          status: "pending",
        });

        // Notify owner
        await notifyOwner({
          title: "🏆 New VIP Member Signup!",
          content: `Email: ${input.email}\nRole: ${input.role}\nSport: ${input.sport}\nAccess Code: ${accessCode}`,
        });

        return {
          success: true,
          accessCode,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
