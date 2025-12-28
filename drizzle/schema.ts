import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "athlete", "parent", "coach", "scout", "agent", "brand"]).default("user").notNull(),
  subscriptionTier: mysqlEnum("subscriptionTier", ["free", "basic", "pro", "elite"]).default("free").notNull(),
  creditsBalance: int("creditsBalance").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Sports table for athlete sport selection and email customization
 */
export const sports = mysqlTable("sports", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  emoji: varchar("emoji", { length: 10 }).notNull(),
  imageUrl: text("imageUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Sport = typeof sports.$inferSelect;
export type InsertSport = typeof sports.$inferInsert;

/**
 * Early access signups table for VIP beta users
 */
export const earlyAccessSignups = mysqlTable("early_access_signups", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  sportId: int("sportId").references(() => sports.id),
  isVip: mysqlEnum("isVip", ["yes", "no"]).default("no").notNull(),
  accessGranted: mysqlEnum("accessGranted", ["yes", "no"]).default("no").notNull(),
  confirmationEmailSent: mysqlEnum("confirmationEmailSent", ["yes", "no"]).default("no").notNull(),
  signupDate: timestamp("signupDate").defaultNow().notNull(),
  accessGrantedDate: timestamp("accessGrantedDate"),
});

export type EarlyAccessSignup = typeof earlyAccessSignups.$inferSelect;
export type InsertEarlyAccessSignup = typeof earlyAccessSignups.$inferInsert;

/**
 * Athlete profiles - core player information
 */
export const athleteProfiles = mysqlTable("athlete_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  sportId: int("sportId").notNull().references(() => sports.id),
  
  // Basic Info
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  dateOfBirth: timestamp("dateOfBirth"),
  profilePhotoUrl: text("profilePhotoUrl"),
  jerseyNumber: varchar("jerseyNumber", { length: 10 }),
  
  // Physical Measurements
  heightFeet: int("heightFeet"),
  heightInches: int("heightInches"),
  weight: int("weight"),
  
  // Baseball Specific
  primaryPosition: varchar("primaryPosition", { length: 50 }),
  secondaryPosition: varchar("secondaryPosition", { length: 50 }),
  bats: mysqlEnum("bats", ["L", "R", "S"]), // Left, Right, Switch
  throws: mysqlEnum("throws", ["L", "R"]), // Left, Right
  
  // Location
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }),
  country: varchar("country", { length: 100 }).default("USA"),
  
  // School Info
  highSchool: varchar("highSchool", { length: 200 }),
  gradYear: int("gradYear"),
  gpa: decimal("gpa", { precision: 3, scale: 2 }),
  satScore: int("satScore"),
  actScore: int("actScore"),
  
  // Team Info
  travelTeam: varchar("travelTeam", { length: 200 }),
  clubTeam: varchar("clubTeam", { length: 200 }),
  
  // Contact & Social
  phoneNumber: varchar("phoneNumber", { length: 20 }),
  instagramHandle: varchar("instagramHandle", { length: 100 }),
  twitterHandle: varchar("twitterHandle", { length: 100 }),
  tiktokHandle: varchar("tiktokHandle", { length: 100 }),
  
  // Recruiting Status
  commitmentStatus: mysqlEnum("commitmentStatus", ["uncommitted", "committed", "signed"]).default("uncommitted"),
  committedCollegeId: int("committedCollegeId").references(() => colleges.id),
  commitmentDate: timestamp("commitmentDate"),
  
  // Profile Settings
  isPublic: boolean("isPublic").default(true),
  isSearchable: boolean("isSearchable").default(true),
  
  // Rankings
  nationalRank: int("nationalRank"),
  stateRank: int("stateRank"),
  positionRank: int("positionRank"),
  
  // Bio
  bio: text("bio"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AthleteProfile = typeof athleteProfiles.$inferSelect;
export type InsertAthleteProfile = typeof athleteProfiles.$inferInsert;

/**
 * Baseball hitting statistics
 */
export const baseballHittingStats = mysqlTable("baseball_hitting_stats", {
  id: int("id").autoincrement().primaryKey(),
  athleteProfileId: int("athleteProfileId").notNull().references(() => athleteProfiles.id),
  
  season: varchar("season", { length: 20 }).notNull(), // e.g., "2024", "2024 Summer"
  level: varchar("level", { length: 50 }), // e.g., "Varsity", "Travel", "Showcase"
  
  // Counting Stats
  gamesPlayed: int("gamesPlayed").default(0),
  atBats: int("atBats").default(0),
  runs: int("runs").default(0),
  hits: int("hits").default(0),
  doubles: int("doubles").default(0),
  triples: int("triples").default(0),
  homeRuns: int("homeRuns").default(0),
  rbi: int("rbi").default(0),
  walks: int("walks").default(0),
  strikeouts: int("strikeouts").default(0),
  stolenBases: int("stolenBases").default(0),
  caughtStealing: int("caughtStealing").default(0),
  hitByPitch: int("hitByPitch").default(0),
  sacrificeFlies: int("sacrificeFlies").default(0),
  sacrificeBunts: int("sacrificeBunts").default(0),
  
  // Calculated Stats (stored for performance)
  battingAverage: decimal("battingAverage", { precision: 4, scale: 3 }),
  onBasePercentage: decimal("onBasePercentage", { precision: 4, scale: 3 }),
  sluggingPercentage: decimal("sluggingPercentage", { precision: 4, scale: 3 }),
  ops: decimal("ops", { precision: 5, scale: 3 }),
  
  // Physical Measurements
  exitVelocity: int("exitVelocity"), // mph
  sixtyYardDash: decimal("sixtyYardDash", { precision: 4, scale: 2 }), // seconds
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BaseballHittingStats = typeof baseballHittingStats.$inferSelect;
export type InsertBaseballHittingStats = typeof baseballHittingStats.$inferInsert;

/**
 * Baseball pitching statistics
 */
export const baseballPitchingStats = mysqlTable("baseball_pitching_stats", {
  id: int("id").autoincrement().primaryKey(),
  athleteProfileId: int("athleteProfileId").notNull().references(() => athleteProfiles.id),
  
  season: varchar("season", { length: 20 }).notNull(),
  level: varchar("level", { length: 50 }),
  
  // Counting Stats
  gamesPlayed: int("gamesPlayed").default(0),
  gamesStarted: int("gamesStarted").default(0),
  wins: int("wins").default(0),
  losses: int("losses").default(0),
  saves: int("saves").default(0),
  completeGames: int("completeGames").default(0),
  shutouts: int("shutouts").default(0),
  inningsPitched: decimal("inningsPitched", { precision: 5, scale: 1 }).default("0.0"),
  hitsAllowed: int("hitsAllowed").default(0),
  runsAllowed: int("runsAllowed").default(0),
  earnedRuns: int("earnedRuns").default(0),
  walks: int("walks").default(0),
  strikeouts: int("strikeouts").default(0),
  homeRunsAllowed: int("homeRunsAllowed").default(0),
  hitBatsmen: int("hitBatsmen").default(0),
  wildPitches: int("wildPitches").default(0),
  balks: int("balks").default(0),
  
  // Calculated Stats
  era: decimal("era", { precision: 4, scale: 2 }),
  whip: decimal("whip", { precision: 4, scale: 2 }),
  strikeoutsPer9: decimal("strikeoutsPer9", { precision: 4, scale: 2 }),
  walksPer9: decimal("walksPer9", { precision: 4, scale: 2 }),
  
  // Velocity
  fastballVelocity: int("fastballVelocity"), // mph
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BaseballPitchingStats = typeof baseballPitchingStats.$inferSelect;
export type InsertBaseballPitchingStats = typeof baseballPitchingStats.$inferInsert;

/**
 * Baseball fielding statistics
 */
export const baseballFieldingStats = mysqlTable("baseball_fielding_stats", {
  id: int("id").autoincrement().primaryKey(),
  athleteProfileId: int("athleteProfileId").notNull().references(() => athleteProfiles.id),
  
  season: varchar("season", { length: 20 }).notNull(),
  position: varchar("position", { length: 50 }).notNull(),
  
  gamesPlayed: int("gamesPlayed").default(0),
  putouts: int("putouts").default(0),
  assists: int("assists").default(0),
  errors: int("errors").default(0),
  doublePlays: int("doublePlays").default(0),
  fieldingPercentage: decimal("fieldingPercentage", { precision: 4, scale: 3 }),
  
  // Position Specific
  throwingVelocity: int("throwingVelocity"), // mph (for all positions)
  popTime: decimal("popTime", { precision: 3, scale: 2 }), // seconds (catchers only)
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BaseballFieldingStats = typeof baseballFieldingStats.$inferSelect;
export type InsertBaseballFieldingStats = typeof baseballFieldingStats.$inferInsert;

/**
 * Colleges/Universities
 */
export const colleges = mysqlTable("colleges", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  logoUrl: text("logoUrl"),
  
  // Location
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }),
  country: varchar("country", { length: 100 }).default("USA"),
  address: text("address"),
  
  // Athletic Info
  division: mysqlEnum("division", ["D1", "D2", "D3", "NAIA", "JUCO"]),
  conference: varchar("conference", { length: 100 }),
  
  // Baseball Program
  baseballHeadCoach: varchar("baseballHeadCoach", { length: 200 }),
  baseballStadium: varchar("baseballStadium", { length: 200 }),
  teamColors: varchar("teamColors", { length: 100 }),
  websiteUrl: text("websiteUrl"),
  
  // School Info
  enrollment: int("enrollment"),
  tuition: int("tuition"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type College = typeof colleges.$inferSelect;
export type InsertCollege = typeof colleges.$inferInsert;

/**
 * College interest tracking (athletes interested in colleges)
 */
export const collegeInterests = mysqlTable("college_interests", {
  id: int("id").autoincrement().primaryKey(),
  athleteProfileId: int("athleteProfileId").notNull().references(() => athleteProfiles.id),
  collegeId: int("collegeId").notNull().references(() => colleges.id),
  interestLevel: mysqlEnum("interestLevel", ["high", "medium", "low"]).default("medium"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CollegeInterest = typeof collegeInterests.$inferSelect;
export type InsertCollegeInterest = typeof collegeInterests.$inferInsert;

/**
 * College visits tracking
 */
export const collegeVisits = mysqlTable("college_visits", {
  id: int("id").autoincrement().primaryKey(),
  athleteProfileId: int("athleteProfileId").notNull().references(() => athleteProfiles.id),
  collegeId: int("collegeId").notNull().references(() => colleges.id),
  visitType: mysqlEnum("visitType", ["official", "unofficial", "camp"]).notNull(),
  visitDate: timestamp("visitDate"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CollegeVisit = typeof collegeVisits.$inferSelect;
export type InsertCollegeVisit = typeof collegeVisits.$inferInsert;

/**
 * Videos (highlights, game footage, skills)
 */
export const videos = mysqlTable("videos", {
  id: int("id").autoincrement().primaryKey(),
  athleteProfileId: int("athleteProfileId").notNull().references(() => athleteProfiles.id),
  
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  videoUrl: text("videoUrl").notNull(),
  thumbnailUrl: text("thumbnailUrl"),
  
  category: mysqlEnum("category", ["highlight", "game", "showcase", "skills", "training"]).notNull(),
  duration: int("duration"), // seconds
  views: int("views").default(0),
  
  isPublic: boolean("isPublic").default(true),
  isFeatured: boolean("isFeatured").default(false),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Video = typeof videos.$inferSelect;
export type InsertVideo = typeof videos.$inferInsert;

/**
 * Messages between users (athletes, coaches, scouts, etc.)
 */
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  senderId: int("senderId").notNull().references(() => users.id),
  recipientId: int("recipientId").notNull().references(() => users.id),
  
  subject: varchar("subject", { length: 200 }),
  content: text("content").notNull(),
  
  isRead: boolean("isRead").default(false),
  readAt: timestamp("readAt"),
  
  // Thread support
  threadId: int("threadId"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * AI Bot conversations
 */
export const botConversations = mysqlTable("bot_conversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  
  botType: mysqlEnum("botType", ["training", "recruiting", "nil", "video_analysis", "social_media", "career_path"]).notNull(),
  
  title: varchar("title", { length: 200 }),
  creditsUsed: int("creditsUsed").default(0),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BotConversation = typeof botConversations.$inferSelect;
export type InsertBotConversation = typeof botConversations.$inferInsert;

/**
 * AI Bot messages within conversations
 */
export const botMessages = mysqlTable("bot_messages", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull().references(() => botConversations.id),
  
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BotMessage = typeof botMessages.$inferSelect;
export type InsertBotMessage = typeof botMessages.$inferInsert;

/**
 * NIL (Name, Image, Likeness) Deals
 */
export const nilDeals = mysqlTable("nil_deals", {
  id: int("id").autoincrement().primaryKey(),
  athleteProfileId: int("athleteProfileId").notNull().references(() => athleteProfiles.id),
  brandId: int("brandId").notNull().references(() => users.id), // Brand user account
  
  dealType: mysqlEnum("dealType", ["social_post", "appearance", "autograph", "endorsement", "other"]).notNull(),
  dealAmount: decimal("dealAmount", { precision: 10, scale: 2 }).notNull(),
  platformCommission: decimal("platformCommission", { precision: 10, scale: 2 }),
  
  description: text("description"),
  requirements: text("requirements"),
  
  status: mysqlEnum("status", ["pending", "accepted", "completed", "cancelled"]).default("pending"),
  
  startDate: timestamp("startDate"),
  endDate: timestamp("endDate"),
  completedDate: timestamp("completedDate"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NilDeal = typeof nilDeals.$inferSelect;
export type InsertNilDeal = typeof nilDeals.$inferInsert;

/**
 * Subscriptions tracking
 */
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  
  tier: mysqlEnum("tier", ["free", "basic", "pro", "elite"]).notNull(),
  status: mysqlEnum("status", ["active", "cancelled", "expired"]).default("active"),
  
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  
  currentPeriodStart: timestamp("currentPeriodStart"),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  cancelAtPeriodEnd: boolean("cancelAtPeriodEnd").default(false),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

/**
 * Credit transactions
 */
export const creditTransactions = mysqlTable("credit_transactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  
  amount: int("amount").notNull(), // Positive for purchase, negative for usage
  type: mysqlEnum("type", ["purchase", "usage", "bonus", "refund"]).notNull(),
  description: text("description"),
  
  // For purchases
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  
  // For usage
  botConversationId: int("botConversationId").references(() => botConversations.id),
  
  balanceAfter: int("balanceAfter").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CreditTransaction = typeof creditTransactions.$inferSelect;
export type InsertCreditTransaction = typeof creditTransactions.$inferInsert;

/**
 * Follows/Subscriptions (users following athletes)
 */
export const follows = mysqlTable("follows", {
  id: int("id").autoincrement().primaryKey(),
  followerId: int("followerId").notNull().references(() => users.id),
  followedAthleteId: int("followedAthleteId").notNull().references(() => athleteProfiles.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Follow = typeof follows.$inferSelect;
export type InsertFollow = typeof follows.$inferInsert;

/**
 * Notifications
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  
  type: mysqlEnum("type", ["message", "follow", "commitment", "ranking_update", "nil_deal", "system"]).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  content: text("content"),
  
  isRead: boolean("isRead").default(false),
  readAt: timestamp("readAt"),
  
  // Optional link
  linkUrl: text("linkUrl"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;
