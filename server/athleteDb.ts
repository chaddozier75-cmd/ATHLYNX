import { eq, and, desc, asc, sql, like, or } from "drizzle-orm";
import { getDb } from "./db";
import { 
  athleteProfiles, 
  baseballHittingStats, 
  baseballPitchingStats, 
  baseballFieldingStats,
  colleges,
  collegeInterests,
  collegeVisits,
  videos,
  messages,
  botConversations,
  botMessages,
  nilDeals,
  subscriptions,
  creditTransactions,
  follows,
  notifications,
} from "../drizzle/schema";

/**
 * Query helpers for athlete profiles and related data
 */

// ============================================================================
// ATHLETE PROFILES
// ============================================================================

export async function getAthleteProfileByUserId(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const [profile] = await db
    .select()
    .from(athleteProfiles)
    .where(eq(athleteProfiles.userId, userId));
  return profile;
}

export async function getAthleteProfileById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const [profile] = await db
    .select()
    .from(athleteProfiles)
    .where(eq(athleteProfiles.id, id));
  return profile;
}

export async function createAthleteProfile(data: typeof athleteProfiles.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const [result] = await db.insert(athleteProfiles).values(data).returning();
  return result;
}

export async function updateAthleteProfile(id: number, data: Partial<typeof athleteProfiles.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(athleteProfiles).set(data).where(eq(athleteProfiles.id, id));
  return getAthleteProfileById(id);
}

export async function searchAthleteProfiles(filters: {
  sport?: number;
  position?: string;
  gradYear?: number;
  state?: string;
  commitmentStatus?: string;
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return [];
  
  let query = db.select().from(athleteProfiles).where(eq(athleteProfiles.isSearchable, true)).$dynamic();
  
  if (filters.sport) {
    query = query.where(eq(athleteProfiles.sportId, filters.sport));
  }
  if (filters.position) {
    query = query.where(eq(athleteProfiles.primaryPosition, filters.position));
  }
  if (filters.gradYear) {
    query = query.where(eq(athleteProfiles.gradYear, filters.gradYear));
  }
  if (filters.state) {
    query = query.where(eq(athleteProfiles.state, filters.state));
  }
  if (filters.commitmentStatus) {
    query = query.where(eq(athleteProfiles.commitmentStatus, filters.commitmentStatus as any));
  }
  
  query = query.orderBy(desc(athleteProfiles.updatedAt));
  
  if (filters.limit) {
    query = query.limit(filters.limit);
  }
  if (filters.offset) {
    query = query.offset(filters.offset);
  }
  
  return query;
}

// ============================================================================
// BASEBALL STATS
// ============================================================================

export async function getHittingStatsByAthleteId(athleteProfileId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(baseballHittingStats)
    .where(eq(baseballHittingStats.athleteProfileId, athleteProfileId))
    .orderBy(desc(baseballHittingStats.season));
}

export async function createHittingStats(data: typeof baseballHittingStats.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const [result] = await db.insert(baseballHittingStats).values(data).returning();
  return result;
}

export async function getPitchingStatsByAthleteId(athleteProfileId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(baseballPitchingStats)
    .where(eq(baseballPitchingStats.athleteProfileId, athleteProfileId))
    .orderBy(desc(baseballPitchingStats.season));
}

export async function createPitchingStats(data: typeof baseballPitchingStats.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const [result] = await db.insert(baseballPitchingStats).values(data).returning();
  return result;
}

export async function getFieldingStatsByAthleteId(athleteProfileId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(baseballFieldingStats)
    .where(eq(baseballFieldingStats.athleteProfileId, athleteProfileId))
    .orderBy(desc(baseballFieldingStats.season));
}

export async function createFieldingStats(data: typeof baseballFieldingStats.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const [result] = await db.insert(baseballFieldingStats).values(data).returning();
  return result;
}

// ============================================================================
// COLLEGES
// ============================================================================

export async function getAllColleges() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(colleges).orderBy(asc(colleges.name));
}

export async function getCollegeById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const [college] = await db.select().from(colleges).where(eq(colleges.id, id));
  return college;
}

export async function searchColleges(filters: {
  name?: string;
  division?: string;
  state?: string;
  limit?: number;
}) {
  const db = await getDb();
  if (!db) return [];
  
  let query = db.select().from(colleges).$dynamic();
  
  if (filters.name) {
    query = query.where(like(colleges.name, `%${filters.name}%`));
  }
  if (filters.division) {
    query = query.where(eq(colleges.division, filters.division as any));
  }
  if (filters.state) {
    query = query.where(eq(colleges.state, filters.state));
  }
  
  query = query.orderBy(asc(colleges.name));
  
  if (filters.limit) {
    query = query.limit(filters.limit);
  }
  
  return query;
}

export async function getCommittedAthletesByCollegeId(collegeId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(athleteProfiles)
    .where(eq(athleteProfiles.committedCollegeId, collegeId))
    .orderBy(desc(athleteProfiles.commitmentDate));
}

// ============================================================================
// VIDEOS
// ============================================================================

export async function getVideosByAthleteId(athleteProfileId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(videos)
    .where(eq(videos.athleteProfileId, athleteProfileId))
    .orderBy(desc(videos.createdAt));
}

export async function createVideo(data: typeof videos.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const [result] = await db.insert(videos).values(data).returning();
  return result;
}

export async function incrementVideoViews(videoId: number) {
  const db = await getDb();
  if (!db) return;
  
  await db
    .update(videos)
    .set({ views: sql`${videos.views} + 1` })
    .where(eq(videos.id, videoId));
}

// ============================================================================
// MESSAGES
// ============================================================================

export async function getMessagesByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(messages)
    .where(or(eq(messages.senderId, userId), eq(messages.recipientId, userId)))
    .orderBy(desc(messages.createdAt));
}

export async function createMessage(data: typeof messages.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const [result] = await db.insert(messages).values(data).returning();
  return result;
}

export async function markMessageAsRead(messageId: number) {
  const db = await getDb();
  if (!db) return;
  
  await db
    .update(messages)
    .set({ isRead: true, readAt: new Date() })
    .where(eq(messages.id, messageId));
}

// ============================================================================
// AI BOT CONVERSATIONS
// ============================================================================

export async function getBotConversationsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(botConversations)
    .where(eq(botConversations.userId, userId))
    .orderBy(desc(botConversations.updatedAt));
}

export async function createBotConversation(data: typeof botConversations.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const [result] = await db.insert(botConversations).values(data).returning();
  return result;
}

export async function getBotMessagesByConversationId(conversationId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(botMessages)
    .where(eq(botMessages.conversationId, conversationId))
    .orderBy(asc(botMessages.createdAt));
}

export async function createBotMessage(data: typeof botMessages.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const [result] = await db.insert(botMessages).values(data).returning();
  return result;
}

// ============================================================================
// NIL DEALS
// ============================================================================

export async function getNilDealsByAthleteId(athleteProfileId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(nilDeals)
    .where(eq(nilDeals.athleteProfileId, athleteProfileId))
    .orderBy(desc(nilDeals.createdAt));
}

export async function createNilDeal(data: typeof nilDeals.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const [result] = await db.insert(nilDeals).values(data).returning();
  return result;
}

export async function updateNilDealStatus(dealId: number, status: string) {
  const db = await getDb();
  if (!db) return;
  
  await db
    .update(nilDeals)
    .set({ status: status as any })
    .where(eq(nilDeals.id, dealId));
}

// ============================================================================
// FOLLOWS
// ============================================================================

export async function getFollowsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(follows)
    .where(eq(follows.followerId, userId))
    .orderBy(desc(follows.createdAt));
}

export async function followAthlete(followerId: number, athleteId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const [result] = await db.insert(follows).values({
    followerId,
    followedAthleteId: athleteId,
  }).returning();
  return result;
}

export async function unfollowAthlete(followerId: number, athleteId: number) {
  const db = await getDb();
  if (!db) return;
  
  await db
    .delete(follows)
    .where(
      and(
        eq(follows.followerId, followerId),
        eq(follows.followedAthleteId, athleteId)
      )
    );
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export async function getNotificationsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt));
}

export async function createNotification(data: typeof notifications.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const [result] = await db.insert(notifications).values(data).returning();
  return result;
}

export async function markNotificationAsRead(notificationId: number) {
  const db = await getDb();
  if (!db) return;
  
  await db
    .update(notifications)
    .set({ isRead: true, readAt: new Date() })
    .where(eq(notifications.id, notificationId));
}
