import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import * as athleteDb from "./athleteDb";
import { invokeLLM } from "./_core/llm";
import { storagePut } from "./storage";

/**
 * Application routers
 * Define your tRPC procedures here
 */

export const appRouter = router({
  // ============================================================================
  // AUTH
  // ============================================================================
  auth: router({
    me: publicProcedure.query(({ ctx }) => {
      return ctx.user ?? null;
    }),

    logout: protectedProcedure.mutation(async ({ ctx }) => {
      // Logout logic handled by _core
      return { success: true };
    }),
  }),

  // ============================================================================
  // ATHLETE PROFILES
  // ============================================================================
  athleteProfiles: router({
    // Get current user's athlete profile
    getMyProfile: protectedProcedure.query(async ({ ctx }) => {
      const profile = await athleteDb.getAthleteProfileByUserId(ctx.user.id);
      return profile;
    }),

    // Get athlete profile by ID (public)
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const profile = await athleteDb.getAthleteProfileById(input.id);
        if (!profile) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Profile not found" });
        }
        return profile;
      }),

    // Create athlete profile
    create: protectedProcedure
      .input(
        z.object({
          firstName: z.string(),
          lastName: z.string(),
          dateOfBirth: z.date(),
          sportId: z.number(),
          primaryPosition: z.string(),
          secondaryPosition: z.string().optional(),
          height: z.number().optional(),
          weight: z.number().optional(),
          bats: z.enum(["R", "L", "S"]).optional(),
          throws: z.enum(["R", "L"]).optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          highSchool: z.string().optional(),
          gradYear: z.number(),
          gpa: z.number().optional(),
          satScore: z.number().optional(),
          actScore: z.number().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Check if user already has a profile
        const existing = await athleteDb.getAthleteProfileByUserId(ctx.user.id);
        if (existing) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Profile already exists",
          });
        }

        const profile = await athleteDb.createAthleteProfile({
          userId: ctx.user.id,
          ...input,
        });

        return profile;
      }),

    // Update athlete profile
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          firstName: z.string().optional(),
          lastName: z.string().optional(),
          dateOfBirth: z.date().optional(),
          primaryPosition: z.string().optional(),
          secondaryPosition: z.string().optional(),
          height: z.number().optional(),
          weight: z.number().optional(),
          bats: z.enum(["R", "L", "S"]).optional(),
          throws: z.enum(["R", "L"]).optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          highSchool: z.string().optional(),
          gradYear: z.number().optional(),
          gpa: z.number().optional(),
          satScore: z.number().optional(),
          actScore: z.number().optional(),
          bio: z.string().optional(),
          instagramHandle: z.string().optional(),
          twitterHandle: z.string().optional(),
          tiktokHandle: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;

        // Verify ownership
        const profile = await athleteDb.getAthleteProfileById(id);
        if (!profile || profile.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        const updated = await athleteDb.updateAthleteProfile(id, data);
        return updated;
      }),

    // Search athlete profiles
    search: publicProcedure
      .input(
        z.object({
          sport: z.number().optional(),
          position: z.string().optional(),
          gradYear: z.number().optional(),
          state: z.string().optional(),
          commitmentStatus: z.string().optional(),
          limit: z.number().default(20),
          offset: z.number().default(0),
        })
      )
      .query(async ({ input }) => {
        const profiles = await athleteDb.searchAthleteProfiles(input);
        return profiles;
      }),
  }),

  // ============================================================================
  // BASEBALL STATS
  // ============================================================================
  baseballStats: router({
    // Get hitting stats
    getHittingStats: publicProcedure
      .input(z.object({ athleteProfileId: z.number() }))
      .query(async ({ input }) => {
        const stats = await athleteDb.getHittingStatsByAthleteId(input.athleteProfileId);
        return stats;
      }),

    // Create hitting stats
    createHittingStats: protectedProcedure
      .input(
        z.object({
          athleteProfileId: z.number(),
          season: z.number(),
          gamesPlayed: z.number().optional(),
          atBats: z.number().optional(),
          runs: z.number().optional(),
          hits: z.number().optional(),
          doubles: z.number().optional(),
          triples: z.number().optional(),
          homeRuns: z.number().optional(),
          rbi: z.number().optional(),
          stolenBases: z.number().optional(),
          caughtStealing: z.number().optional(),
          walks: z.number().optional(),
          strikeouts: z.number().optional(),
          battingAverage: z.number().optional(),
          onBasePercentage: z.number().optional(),
          sluggingPercentage: z.number().optional(),
          ops: z.number().optional(),
          exitVelocity: z.number().optional(),
          launchAngle: z.number().optional(),
          sixtyYardDash: z.number().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Verify ownership
        const profile = await athleteDb.getAthleteProfileById(input.athleteProfileId);
        if (!profile || profile.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        const stats = await athleteDb.createHittingStats(input);
        return stats;
      }),

    // Get pitching stats
    getPitchingStats: publicProcedure
      .input(z.object({ athleteProfileId: z.number() }))
      .query(async ({ input }) => {
        const stats = await athleteDb.getPitchingStatsByAthleteId(input.athleteProfileId);
        return stats;
      }),

    // Create pitching stats
    createPitchingStats: protectedProcedure
      .input(
        z.object({
          athleteProfileId: z.number(),
          season: z.number(),
          gamesPlayed: z.number().optional(),
          gamesStarted: z.number().optional(),
          wins: z.number().optional(),
          losses: z.number().optional(),
          saves: z.number().optional(),
          inningsPitched: z.number().optional(),
          hits: z.number().optional(),
          runs: z.number().optional(),
          earnedRuns: z.number().optional(),
          walks: z.number().optional(),
          strikeouts: z.number().optional(),
          era: z.number().optional(),
          whip: z.number().optional(),
          fastballVelocity: z.number().optional(),
          curveball: z.boolean().optional(),
          slider: z.boolean().optional(),
          changeup: z.boolean().optional(),
          cutter: z.boolean().optional(),
          splitter: z.boolean().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Verify ownership
        const profile = await athleteDb.getAthleteProfileById(input.athleteProfileId);
        if (!profile || profile.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        const stats = await athleteDb.createPitchingStats(input);
        return stats;
      }),

    // Get fielding stats
    getFieldingStats: publicProcedure
      .input(z.object({ athleteProfileId: z.number() }))
      .query(async ({ input }) => {
        const stats = await athleteDb.getFieldingStatsByAthleteId(input.athleteProfileId);
        return stats;
      }),

    // Create fielding stats
    createFieldingStats: protectedProcedure
      .input(
        z.object({
          athleteProfileId: z.number(),
          season: z.number(),
          position: z.string(),
          gamesPlayed: z.number().optional(),
          innings: z.number().optional(),
          putouts: z.number().optional(),
          assists: z.number().optional(),
          errors: z.number().optional(),
          fieldingPercentage: z.number().optional(),
          throwingVelocity: z.number().optional(),
          popTime: z.number().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Verify ownership
        const profile = await athleteDb.getAthleteProfileById(input.athleteProfileId);
        if (!profile || profile.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        const stats = await athleteDb.createFieldingStats(input);
        return stats;
      }),
  }),

  // ============================================================================
  // COLLEGES
  // ============================================================================
  colleges: router({
    // Get all colleges
    getAll: publicProcedure.query(async () => {
      const colleges = await athleteDb.getAllColleges();
      return colleges;
    }),

    // Get college by ID
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const college = await athleteDb.getCollegeById(input.id);
        if (!college) {
          throw new TRPCError({ code: "NOT_FOUND", message: "College not found" });
        }
        return college;
      }),

    // Search colleges
    search: publicProcedure
      .input(
        z.object({
          name: z.string().optional(),
          division: z.string().optional(),
          state: z.string().optional(),
          limit: z.number().default(20),
        })
      )
      .query(async ({ input }) => {
        const colleges = await athleteDb.searchColleges(input);
        return colleges;
      }),

    // Get committed athletes by college
    getCommittedAthletes: publicProcedure
      .input(z.object({ collegeId: z.number() }))
      .query(async ({ input }) => {
        const athletes = await athleteDb.getCommittedAthletesByCollegeId(input.collegeId);
        return athletes;
      }),
  }),

  // ============================================================================
  // AI BOTS
  // ============================================================================
  aiBots: router({
    // Get user's bot conversations
    getConversations: protectedProcedure.query(async ({ ctx }) => {
      const conversations = await athleteDb.getBotConversationsByUserId(ctx.user.id);
      return conversations;
    }),

    // Create new bot conversation
    createConversation: protectedProcedure
      .input(
        z.object({
          botType: z.enum([
            "training",
            "recruiting",
            "nil",
            "video_analysis",
            "social_media",
            "career_path",
          ]),
          title: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const conversation = await athleteDb.createBotConversation({
          userId: ctx.user.id,
          botType: input.botType,
          title: input.title || `${input.botType} conversation`,
        });
        return conversation;
      }),

    // Get messages in a conversation
    getMessages: protectedProcedure
      .input(z.object({ conversationId: z.number() }))
      .query(async ({ input }) => {
        const messages = await athleteDb.getBotMessagesByConversationId(input.conversationId);
        return messages;
      }),

    // Send message to bot
    sendMessage: protectedProcedure
      .input(
        z.object({
          conversationId: z.number(),
          message: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Check user has enough credits (1 credit per message)
        if (ctx.user.creditsBalance < 1) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Insufficient credits",
          });
        }

        // Save user message
        await athleteDb.createBotMessage({
          conversationId: input.conversationId,
          role: "user",
          content: input.message,
          creditsUsed: 0,
        });

        // Get bot type from conversation
        const conversation = await athleteDb.getBotConversationsByUserId(ctx.user.id);
        const currentConversation = conversation.find(
          (c) => c.id === input.conversationId
        );

        if (!currentConversation) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }

        // Get system prompt based on bot type
        const systemPrompts = {
          training: "You are a professional baseball training coach. Provide expert advice on drills, workouts, technique, and skill development.",
          recruiting: "You are a college recruiting expert. Help athletes navigate the recruiting process, find colleges, and communicate with coaches.",
          nil: "You are an NIL (Name, Image, Likeness) expert. Help athletes find brand partnerships, negotiate deals, and build their personal brand.",
          video_analysis: "You are a baseball video analysis expert. Analyze swing mechanics, pitching form, and fielding technique. Provide actionable feedback.",
          social_media: "You are a social media strategist for athletes. Help athletes create content, grow their following, and engage with fans.",
          career_path: "You are a baseball career advisor. Help athletes decide between college and pro, understand draft projections, and plan their future.",
        };

        // Call LLM
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: systemPrompts[currentConversation.botType],
            },
            { role: "user", content: input.message },
          ],
        });

        const botResponse = response.choices[0].message.content;

        // Save bot response
        await athleteDb.createBotMessage({
          conversationId: input.conversationId,
          role: "assistant",
          content: botResponse,
          creditsUsed: 1,
        });

        // Deduct credits from user
        await athleteDb.createCreditTransaction({
          userId: ctx.user.id,
          amount: -1,
          type: "usage",
          description: `AI Bot: ${currentConversation.botType}`,
          balanceBefore: ctx.user.creditsBalance,
          balanceAfter: ctx.user.creditsBalance - 1,
        });

        return { response: botResponse };
      }),
  }),

  // ============================================================================
  // VIDEOS
  // ============================================================================
  videos: router({
    // Get videos by athlete
    getByAthleteId: publicProcedure
      .input(z.object({ athleteProfileId: z.number() }))
      .query(async ({ input }) => {
        const videos = await athleteDb.getVideosByAthleteId(input.athleteProfileId);
        return videos;
      }),

    // Upload video
    uploadVideo: protectedProcedure
      .input(
        z.object({
          athleteProfileId: z.number(),
          title: z.string(),
          description: z.string().optional(),
          videoType: z.enum(["highlight", "game_footage", "showcase", "skills"]),
          videoUrl: z.string(),
          thumbnailUrl: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Verify ownership
        const profile = await athleteDb.getAthleteProfileById(input.athleteProfileId);
        if (!profile || profile.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        const video = await athleteDb.createVideo(input);
        return video;
      }),

    // Increment video views
    incrementViews: publicProcedure
      .input(z.object({ videoId: z.number() }))
      .mutation(async ({ input }) => {
        await athleteDb.incrementVideoViews(input.videoId);
        return { success: true };
      }),
  }),

  // ============================================================================
  // MESSAGES
  // ============================================================================
  messages: router({
    // Get user's messages
    getMyMessages: protectedProcedure.query(async ({ ctx }) => {
      const messages = await athleteDb.getMessagesByUserId(ctx.user.id);
      return messages;
    }),

    // Send message
    sendMessage: protectedProcedure
      .input(
        z.object({
          recipientId: z.number(),
          subject: z.string(),
          content: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const message = await athleteDb.createMessage({
          senderId: ctx.user.id,
          recipientId: input.recipientId,
          subject: input.subject,
          content: input.content,
        });

        // Create notification for recipient
        await athleteDb.createNotification({
          userId: input.recipientId,
          type: "new_message",
          title: "New Message",
          content: `You have a new message from ${ctx.user.name}`,
        });

        return message;
      }),

    // Mark message as read
    markAsRead: protectedProcedure
      .input(z.object({ messageId: z.number() }))
      .mutation(async ({ input }) => {
        await athleteDb.markMessageAsRead(input.messageId);
        return { success: true };
      }),
  }),

  // ============================================================================
  // NIL DEALS
  // ============================================================================
  nilDeals: router({
    // Get deals by athlete
    getByAthleteId: protectedProcedure
      .input(z.object({ athleteProfileId: z.number() }))
      .query(async ({ ctx, input }) => {
        // Verify ownership
        const profile = await athleteDb.getAthleteProfileById(input.athleteProfileId);
        if (!profile || profile.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        const deals = await athleteDb.getNilDealsByAthleteId(input.athleteProfileId);
        return deals;
      }),

    // Create NIL deal
    createDeal: protectedProcedure
      .input(
        z.object({
          athleteProfileId: z.number(),
          brandName: z.string(),
          dealType: z.string(),
          dealAmount: z.number(),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Verify ownership
        const profile = await athleteDb.getAthleteProfileById(input.athleteProfileId);
        if (!profile || profile.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        const deal = await athleteDb.createNilDeal({
          ...input,
          platformCommission: input.dealAmount * 0.15, // 15% commission
          status: "pending",
        });

        return deal;
      }),
  }),

  // ============================================================================
  // FOLLOWS
  // ============================================================================
  follows: router({
    // Get user's follows
    getMyFollows: protectedProcedure.query(async ({ ctx }) => {
      const follows = await athleteDb.getFollowsByUserId(ctx.user.id);
      return follows;
    }),

    // Follow athlete
    followAthlete: protectedProcedure
      .input(z.object({ athleteId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const follow = await athleteDb.followAthlete(ctx.user.id, input.athleteId);

        // Create notification
        const profile = await athleteDb.getAthleteProfileById(input.athleteId);
        if (profile) {
          await athleteDb.createNotification({
            userId: profile.userId,
            type: "new_follower",
            title: "New Follower",
            content: `${ctx.user.name} started following you`,
          });
        }

        return follow;
      }),

    // Unfollow athlete
    unfollowAthlete: protectedProcedure
      .input(z.object({ athleteId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await athleteDb.unfollowAthlete(ctx.user.id, input.athleteId);
        return { success: true };
      }),
  }),

  // ============================================================================
  // NOTIFICATIONS
  // ============================================================================
  notifications: router({
    // Get user's notifications
    getMyNotifications: protectedProcedure.query(async ({ ctx }) => {
      const notifications = await athleteDb.getNotificationsByUserId(ctx.user.id);
      return notifications;
    }),

    // Mark notification as read
    markAsRead: protectedProcedure
      .input(z.object({ notificationId: z.number() }))
      .mutation(async ({ input }) => {
        await athleteDb.markNotificationAsRead(input.notificationId);
        return { success: true };
      }),
  }),

  // ============================================================================
  // SPORTS
  // ============================================================================
  sports: router({
    // Get all sports
    getAll: publicProcedure.query(async () => {
      const sports = await athleteDb.getAllSports();
      return sports;
    }),

    // Get sport by ID
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const sport = await athleteDb.getSportById(input.id);
        if (!sport) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Sport not found" });
        }
        return sport;
      }),
  }),

  // ============================================================================
  // SYSTEM
  // ============================================================================
  system: router({
    // Health check
    health: publicProcedure.query(() => {
      return { status: "ok", timestamp: new Date() };
    }),
  }),
});

export type AppRouter = typeof appRouter;
