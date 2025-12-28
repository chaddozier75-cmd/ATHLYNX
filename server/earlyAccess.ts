import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { sports, earlyAccessSignups, users, InsertSport, InsertEarlyAccessSignup } from "../drizzle/schema";

/**
 * Initialize sports data with emojis
 */
export async function initializeSports() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot initialize sports: database not available");
    return;
  }

  const sportsData: InsertSport[] = [
    { name: "Football", emoji: "🏈", imageUrl: null },
    { name: "Basketball", emoji: "🏀", imageUrl: null },
    { name: "Baseball", emoji: "⚾", imageUrl: null },
    { name: "Soccer", emoji: "⚽", imageUrl: null },
    { name: "Tennis", emoji: "🎾", imageUrl: null },
    { name: "Volleyball", emoji: "🏐", imageUrl: null },
    { name: "Hockey", emoji: "🏒", imageUrl: null },
    { name: "Golf", emoji: "⛳", imageUrl: null },
    { name: "Swimming", emoji: "🏊", imageUrl: null },
    { name: "Track & Field", emoji: "🏃", imageUrl: null },
    { name: "Cycling", emoji: "🚴", imageUrl: null },
    { name: "Gymnastics", emoji: "🤸", imageUrl: null },
    { name: "Boxing", emoji: "🥊", imageUrl: null },
    { name: "Wrestling", emoji: "🤼", imageUrl: null },
    { name: "Lacrosse", emoji: "🥍", imageUrl: null },
    { name: "Softball", emoji: "🥎", imageUrl: null },
    { name: "Rugby", emoji: "🏉", imageUrl: null },
    { name: "Skiing", emoji: "⛷️", imageUrl: null },
    { name: "Snowboarding", emoji: "🏂", imageUrl: null },
    { name: "Skateboarding", emoji: "🛹", imageUrl: null },
  ];

  try {
    // Check if sports already exist
    const existingSports = await db.select().from(sports).limit(1);
    if (existingSports.length > 0) {
      console.log("[Database] Sports already initialized");
      return;
    }

    // Insert all sports
    await db.insert(sports).values(sportsData);
    console.log("[Database] Sports initialized successfully");
  } catch (error) {
    console.error("[Database] Failed to initialize sports:", error);
  }
}

/**
 * Get all sports
 */
export async function getAllSports() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get sports: database not available");
    return [];
  }

  try {
    return await db.select().from(sports);
  } catch (error) {
    console.error("[Database] Failed to get sports:", error);
    return [];
  }
}

/**
 * Get sport by ID
 */
export async function getSportById(sportId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get sport: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(sports).where(eq(sports.id, sportId)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get sport:", error);
    return undefined;
  }
}

/**
 * Create early access signup
 */
export async function createEarlyAccessSignup(data: InsertEarlyAccessSignup) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create early access signup: database not available");
    return undefined;
  }

  try {
    const result = await db.insert(earlyAccessSignups).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create early access signup:", error);
    throw error;
  }
}

/**
 * Get early access signup by user ID
 */
export async function getEarlyAccessSignupByUserId(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get early access signup: database not available");
    return undefined;
  }

  try {
    const result = await db
      .select()
      .from(earlyAccessSignups)
      .where(eq(earlyAccessSignups.userId, userId))
      .limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get early access signup:", error);
    return undefined;
  }
}

/**
 * Update early access signup confirmation status
 */
export async function markConfirmationEmailSent(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update confirmation status: database not available");
    return false;
  }

  try {
    await db
      .update(earlyAccessSignups)
      .set({ confirmationEmailSent: "yes" })
      .where(eq(earlyAccessSignups.userId, userId));
    return true;
  } catch (error) {
    console.error("[Database] Failed to update confirmation status:", error);
    return false;
  }
}

/**
 * Grant early access to user
 */
export async function grantEarlyAccess(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot grant early access: database not available");
    return false;
  }

  try {
    await db
      .update(earlyAccessSignups)
      .set({
        accessGranted: "yes",
        accessGrantedDate: new Date(),
      })
      .where(eq(earlyAccessSignups.userId, userId));
    return true;
  } catch (error) {
    console.error("[Database] Failed to grant early access:", error);
    return false;
  }
}

/**
 * Get all VIP early access signups
 */
export async function getVipSignups() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get VIP signups: database not available");
    return [];
  }

  try {
    return await db
      .select({
        signup: earlyAccessSignups,
        user: users,
        sport: sports,
      })
      .from(earlyAccessSignups)
      .leftJoin(users, eq(earlyAccessSignups.userId, users.id))
      .leftJoin(sports, eq(earlyAccessSignups.sportId, sports.id))
      .where(eq(earlyAccessSignups.isVip, "yes"));
  } catch (error) {
    console.error("[Database] Failed to get VIP signups:", error);
    return [];
  }
}
