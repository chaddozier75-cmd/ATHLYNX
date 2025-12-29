import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, decimal, date } from "drizzle-orm/mysql-core";

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
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  aiCredits: int("aiCredits").default(0).notNull(),
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
 * VIP Members table for early access signups (pre-auth)
 * Stores signup data before users create accounts
 */
export const vipMembers = mysqlTable("vip_members", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  role: varchar("role", { length: 50 }).notNull(), // Athlete, Parent, Coach, Brand
  sport: varchar("sport", { length: 100 }).notNull(),
  accessCode: varchar("accessCode", { length: 12 }).notNull().unique(),
  status: mysqlEnum("status", ["pending", "approved", "active"]).default("pending").notNull(),
  signupDate: timestamp("signupDate").defaultNow().notNull(),
  approvedDate: timestamp("approvedDate"),
});

export type VipMember = typeof vipMembers.$inferSelect;
export type InsertVipMember = typeof vipMembers.$inferInsert;

/**
 * Credit transactions table - tracks all credit purchases and grants
 */
export const creditTransactions = mysqlTable("credit_transactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  amount: int("amount").notNull(), // Positive for purchases, negative for usage
  type: mysqlEnum("type", ["purchase", "grant", "refund", "bonus"]).notNull(),
  description: text("description"),
  stripePaymentId: varchar("stripePaymentId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CreditTransaction = typeof creditTransactions.$inferSelect;
export type InsertCreditTransaction = typeof creditTransactions.$inferInsert;

/**
 * Credit usage table - tracks AI feature usage and credit deductions
 */
export const creditUsage = mysqlTable("credit_usage", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  actionType: varchar("actionType", { length: 100 }).notNull(), // "training_plan", "video_analysis", etc.
  creditsUsed: int("creditsUsed").notNull(),
  result: text("result"), // Store AI response or result summary
  metadata: text("metadata"), // JSON string for additional data
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CreditUsage = typeof creditUsage.$inferSelect;
export type InsertCreditUsage = typeof creditUsage.$inferInsert;


/**
 * ============================================
 * COMPLIANCE & SECURITY INFRASTRUCTURE
 * ============================================
 */

/**
 * Audit logs - Track ALL system access and data modifications
 * Required for HIPAA, FERPA, and security compliance
 */
export const auditLogs = mysqlTable("audit_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  action: varchar("action", { length: 100 }).notNull(), // e.g., "view_medical_record", "update_profile", "delete_data"
  resource: varchar("resource", { length: 100 }).notNull(), // e.g., "medical_records", "athlete_profile"
  resourceId: int("resourceId"), // ID of the resource being accessed
  ipAddress: varchar("ipAddress", { length: 45 }), // IPv4 or IPv6
  userAgent: text("userAgent"),
  details: json("details"), // Additional context
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = typeof auditLogs.$inferInsert;

/**
 * Consent records - Track parental/guardian consent for minors
 * Required for COPPA, HIPAA, and legal compliance
 */
export const consentRecords = mysqlTable("consent_records", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  consentType: mysqlEnum("consentType", [
    "parental_consent",
    "medical_data",
    "mental_health",
    "injury_tracking",
    "data_sharing",
    "aoc_medical_referral",
    "marketing",
    "research"
  ]).notNull(),
  granted: mysqlEnum("granted", ["yes", "no"]).notNull(),
  grantedBy: varchar("grantedBy", { length: 255 }), // "self" or parent/guardian name
  grantedByEmail: varchar("grantedByEmail", { length: 320 }),
  grantedByRelation: varchar("grantedByRelation", { length: 50 }), // "self", "parent", "guardian"
  ipAddress: varchar("ipAddress", { length: 45 }),
  consentDocument: text("consentDocument"), // URL to signed consent form
  expiresAt: timestamp("expiresAt"), // Some consents expire
  revokedAt: timestamp("revokedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ConsentRecord = typeof consentRecords.$inferSelect;
export type InsertConsentRecord = typeof consentRecords.$inferInsert;

/**
 * Medical records - HIPAA-compliant medical data storage
 * Encrypted at rest, access logged, restricted access
 */
export const medicalRecords = mysqlTable("medical_records", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  recordType: mysqlEnum("recordType", [
    "injury",
    "mental_health",
    "physical_assessment",
    "treatment_plan",
    "medical_clearance",
    "orthopedic_evaluation"
  ]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  severity: mysqlEnum("severity", ["low", "medium", "high", "critical"]),
  status: mysqlEnum("status", ["active", "resolved", "ongoing", "cleared"]).default("active").notNull(),
  diagnosisDate: date("diagnosisDate"),
  resolvedDate: date("resolvedDate"),
  providerId: int("providerId"), // Reference to medical provider
  providerName: varchar("providerName", { length: 255 }),
  providerNotes: text("providerNotes"), // Encrypted
  attachments: json("attachments"), // URLs to encrypted files
  metadata: json("metadata"), // Additional structured data
  isConfidential: mysqlEnum("isConfidential", ["yes", "no"]).default("yes").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MedicalRecord = typeof medicalRecords.$inferSelect;
export type InsertMedicalRecord = typeof medicalRecords.$inferInsert;

/**
 * Access control - Who can access what data
 * Implements role-based access control (RBAC)
 */
export const accessControl = mysqlTable("access_control", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  resource: varchar("resource", { length: 100 }).notNull(), // e.g., "medical_records", "athlete_profiles"
  resourceId: int("resourceId"), // Specific resource ID (null = all)
  permission: mysqlEnum("permission", ["read", "write", "delete", "admin"]).notNull(),
  grantedBy: int("grantedBy").references(() => users.id),
  reason: text("reason"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AccessControl = typeof accessControl.$inferSelect;
export type InsertAccessControl = typeof accessControl.$inferInsert;

/**
 * NCAA compliance tracking
 * Track recruiting contacts, NIL deals, transfer portal status
 */
export const ncaaCompliance = mysqlTable("ncaa_compliance", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  complianceType: mysqlEnum("complianceType", [
    "recruiting_contact",
    "nil_deal",
    "transfer_portal",
    "amateurism_status",
    "eligibility_check"
  ]).notNull(),
  status: mysqlEnum("status", ["compliant", "pending_review", "violation", "cleared"]).default("pending_review").notNull(),
  details: json("details"),
  reviewedBy: int("reviewedBy").references(() => users.id),
  reviewedAt: timestamp("reviewedAt"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NcaaCompliance = typeof ncaaCompliance.$inferSelect;
export type InsertNcaaCompliance = typeof ncaaCompliance.$inferInsert;

/**
 * NIL contracts - Track all NIL deals for tax and compliance
 */
export const nilContracts = mysqlTable("nil_contracts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  brandName: varchar("brandName", { length: 255 }).notNull(),
  brandContact: varchar("brandContact", { length: 255 }),
  contractValue: decimal("contractValue", { precision: 10, scale: 2 }).notNull(),
  contractType: mysqlEnum("contractType", [
    "social_media",
    "appearance",
    "endorsement",
    "merchandise",
    "content_creation",
    "other"
  ]).notNull(),
  startDate: date("startDate").notNull(),
  endDate: date("endDate"),
  status: mysqlEnum("status", ["pending", "active", "completed", "terminated"]).default("pending").notNull(),
  contractDocument: text("contractDocument"), // URL to signed contract
  taxReported: mysqlEnum("taxReported", ["yes", "no"]).default("no").notNull(),
  taxYear: int("taxYear"),
  complianceApproved: mysqlEnum("complianceApproved", ["yes", "no", "pending"]).default("pending").notNull(),
  schoolApproved: mysqlEnum("schoolApproved", ["yes", "no", "pending", "not_required"]).default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NilContract = typeof nilContracts.$inferSelect;
export type InsertNilContract = typeof nilContracts.$inferInsert;

/**
 * Security incidents - Track security events and breaches
 */
export const securityIncidents = mysqlTable("security_incidents", {
  id: int("id").autoincrement().primaryKey(),
  incidentType: mysqlEnum("incidentType", [
    "unauthorized_access",
    "data_breach",
    "phishing_attempt",
    "malware",
    "insider_threat",
    "policy_violation",
    "other"
  ]).notNull(),
  severity: mysqlEnum("severity", ["low", "medium", "high", "critical"]).notNull(),
  description: text("description").notNull(),
  affectedUsers: json("affectedUsers"), // Array of user IDs
  detectedBy: int("detectedBy").references(() => users.id),
  detectedAt: timestamp("detectedAt").defaultNow().notNull(),
  resolvedBy: int("resolvedBy").references(() => users.id),
  resolvedAt: timestamp("resolvedAt"),
  status: mysqlEnum("status", ["open", "investigating", "resolved", "false_alarm"]).default("open").notNull(),
  actionsTaken: text("actionsTaken"),
  notificationsSent: mysqlEnum("notificationsSent", ["yes", "no"]).default("no").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SecurityIncident = typeof securityIncidents.$inferSelect;
export type InsertSecurityIncident = typeof securityIncidents.$inferInsert;

/**
 * Employee access logs - Track internal employee access to sensitive data
 * Required for insider threat monitoring
 */
export const employeeAccessLogs = mysqlTable("employee_access_logs", {
  id: int("id").autoincrement().primaryKey(),
  employeeId: int("employeeId").notNull().references(() => users.id),
  action: varchar("action", { length: 100 }).notNull(),
  resource: varchar("resource", { length: 100 }).notNull(),
  resourceId: int("resourceId"),
  justification: text("justification"), // Why did they access this?
  approved: mysqlEnum("approved", ["yes", "no", "pending"]).default("pending").notNull(),
  approvedBy: int("approvedBy").references(() => users.id),
  flagged: mysqlEnum("flagged", ["yes", "no"]).default("no").notNull(),
  flagReason: text("flagReason"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type EmployeeAccessLog = typeof employeeAccessLogs.$inferSelect;
export type InsertEmployeeAccessLog = typeof employeeAccessLogs.$inferInsert;


/**
 * ============================================
 * NATIONAL SIGNING DAY PLATFORM
 * ============================================
 */

/**
 * Signing Day Events - Major signing day events by sport
 */
export const signingDayEvents = mysqlTable("signing_day_events", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  sport: varchar("sport", { length: 100 }).notNull(),
  eventDate: timestamp("eventDate").notNull(),
  description: text("description"),
  streamUrl: varchar("streamUrl", { length: 500 }),
  status: mysqlEnum("status", ["upcoming", "live", "completed"]).default("upcoming").notNull(),
  viewerCount: int("viewerCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SigningDayEvent = typeof signingDayEvents.$inferSelect;
export type InsertSigningDayEvent = typeof signingDayEvents.$inferInsert;

/**
 * Athlete Commitments - Track college commitments and announcements
 */
export const athleteCommitments = mysqlTable("athlete_commitments", {
  id: int("id").autoincrement().primaryKey(),
  athleteId: int("athleteId").notNull().references(() => users.id),
  eventId: int("eventId").references(() => signingDayEvents.id),
  collegeName: varchar("collegeName", { length: 255 }).notNull(),
  collegeLogoUrl: varchar("collegeLogoUrl", { length: 500 }),
  sport: varchar("sport", { length: 100 }).notNull(),
  position: varchar("position", { length: 100 }),
  announcementDate: timestamp("announcementDate"),
  finalistSchools: json("finalistSchools"), // Array of school names
  streamUrl: varchar("streamUrl", { length: 500 }),
  highlightReelUrl: varchar("highlightReelUrl", { length: 500 }),
  pressReleaseText: text("pressReleaseText"),
  status: mysqlEnum("status", ["pending", "announced", "signed"]).default("pending").notNull(),
  viewCount: int("viewCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AthleteCommitment = typeof athleteCommitments.$inferSelect;
export type InsertAthleteCommitment = typeof athleteCommitments.$inferInsert;

/**
 * Signing Day Streams - Live stream sessions for commitments
 */
export const signingDayStreams = mysqlTable("signing_day_streams", {
  id: int("id").autoincrement().primaryKey(),
  commitmentId: int("commitmentId").notNull().references(() => athleteCommitments.id),
  streamKey: varchar("streamKey", { length: 255 }).notNull(),
  streamUrl: varchar("streamUrl", { length: 500 }).notNull(),
  playbackUrl: varchar("playbackUrl", { length: 500 }),
  status: mysqlEnum("status", ["scheduled", "live", "ended", "archived"]).default("scheduled").notNull(),
  startTime: timestamp("startTime"),
  endTime: timestamp("endTime"),
  peakViewers: int("peakViewers").default(0).notNull(),
  totalViews: int("totalViews").default(0).notNull(),
  chatEnabled: mysqlEnum("chatEnabled", ["yes", "no"]).default("yes").notNull(),
  recordingUrl: varchar("recordingUrl", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SigningDayStream = typeof signingDayStreams.$inferSelect;
export type InsertSigningDayStream = typeof signingDayStreams.$inferInsert;

/**
 * Stream Chat - Live chat messages during signing day streams
 */
export const streamChat = mysqlTable("stream_chat", {
  id: int("id").autoincrement().primaryKey(),
  streamId: int("streamId").notNull().references(() => signingDayStreams.id),
  userId: int("userId").notNull().references(() => users.id),
  username: varchar("username", { length: 255 }).notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  isModerated: mysqlEnum("isModerated", ["yes", "no"]).default("no").notNull(),
});

export type StreamChatMessage = typeof streamChat.$inferSelect;
export type InsertStreamChatMessage = typeof streamChat.$inferInsert;

/**
 * College Database - All colleges/universities for commitments
 */
export const collegeDatabase = mysqlTable("college_database", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  logoUrl: varchar("logoUrl", { length: 500 }),
  primaryColor: varchar("primaryColor", { length: 7 }), // Hex color
  secondaryColor: varchar("secondaryColor", { length: 7 }),
  mascot: varchar("mascot", { length: 100 }),
  fightSongUrl: varchar("fightSongUrl", { length: 500 }),
  division: varchar("division", { length: 50 }), // D1, D2, D3, NAIA, JUCO
  conference: varchar("conference", { length: 100 }),
  location: varchar("location", { length: 255 }),
  website: varchar("website", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type College = typeof collegeDatabase.$inferSelect;
export type InsertCollege = typeof collegeDatabase.$inferInsert;


/**
 * ============================================
 * TRANSFER PORTAL INTELLIGENCE PLATFORM
 * Data marketplace for schools to find athletes
 * ============================================
 */

/**
 * Transfer Portal Athletes - Complete database of athletes in transfer portal
 * Scraped from NCAA, On3, 247Sports, Rivals, ESPN
 */
export const transferPortalAthletes = mysqlTable("transfer_portal_athletes", {
  id: int("id").autoincrement().primaryKey(),
  // Basic Info
  name: varchar("name", { length: 255 }).notNull(),
  sport: varchar("sport", { length: 100 }).notNull(),
  position: varchar("position", { length: 100 }),
  year: varchar("year", { length: 50 }), // FR, SO, JR, SR, RS-FR, etc.
  heightInches: int("heightInches"),
  weightPounds: int("weightPounds"),
  hometown: varchar("hometown", { length: 255 }),
  homeState: varchar("homeState", { length: 2 }),
  highSchool: varchar("highSchool", { length: 255 }),
  
  // Current/Previous School
  previousSchool: varchar("previousSchool", { length: 255 }).notNull(),
  previousConference: varchar("previousConference", { length: 100 }),
  previousDivision: varchar("previousDivision", { length: 50 }), // D1, D2, D3, NAIA, JUCO
  
  // Portal Status
  portalEntryDate: date("portalEntryDate").notNull(),
  portalStatus: mysqlEnum("portalStatus", ["entered", "committed", "withdrawn"]).default("entered").notNull(),
  newSchool: varchar("newSchool", { length: 255 }),
  commitmentDate: date("commitmentDate"),
  expectedDecisionDate: date("expectedDecisionDate"),
  
  // Ratings & Rankings
  on3Rating: decimal("on3Rating", { precision: 5, scale: 2 }),
  on3Rank: int("on3Rank"),
  twoFourSevenRating: decimal("twoFourSevenRating", { precision: 5, scale: 4 }),
  twoFourSevenRank: int("twoFourSevenRank"),
  rivalsRating: decimal("rivalsRating", { precision: 5, scale: 2 }),
  rivalsRank: int("rivalsRank"),
  espnRating: int("espnRating"),
  espnRank: int("espnRank"),
  compositeRating: decimal("compositeRating", { precision: 5, scale: 2 }), // Our calculated composite
  compositeRank: int("compositeRank"),
  stars: int("stars"), // 2-5 star rating
  
  // NIL Data
  nilValuation: decimal("nilValuation", { precision: 10, scale: 2 }), // From On3
  nilDeals: int("nilDeals").default(0),
  estimatedNilEarnings: decimal("estimatedNilEarnings", { precision: 10, scale: 2 }),
  
  // Stats & Performance
  stats: json("stats"), // Sport-specific stats
  gpa: decimal("gpa", { precision: 3, scale: 2 }),
  testScores: json("testScores"), // SAT, ACT
  eligibilityYears: int("eligibilityYears"),
  
  // Media
  profileImageUrl: varchar("profileImageUrl", { length: 500 }),
  highlightReelUrl: varchar("highlightReelUrl", { length: 500 }),
  hudlUrl: varchar("hudlUrl", { length: 500 }),
  
  // Social Media
  twitterHandle: varchar("twitterHandle", { length: 100 }),
  instagramHandle: varchar("instagramHandle", { length: 100 }),
  tiktokHandle: varchar("tiktokHandle", { length: 100 }),
  twitterFollowers: int("twitterFollowers"),
  instagramFollowers: int("instagramFollowers"),
  tiktokFollowers: int("tiktokFollowers"),
  
  // Recruiting Interest
  interestedSchools: json("interestedSchools"), // Array of school names
  officialVisits: json("officialVisits"), // Array of visit data
  offers: json("offers"), // Array of scholarship offers
  
  // Data Sources
  dataSource: json("dataSource"), // Which sites we scraped from
  lastScraped: timestamp("lastScraped").defaultNow().notNull(),
  
  // Metadata
  verified: mysqlEnum("verified", ["yes", "no"]).default("no").notNull(),
  featured: mysqlEnum("featured", ["yes", "no"]).default("no").notNull(),
  premium: mysqlEnum("premium", ["yes", "no"]).default("no").notNull(), // Premium data tier
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TransferPortalAthlete = typeof transferPortalAthletes.$inferSelect;
export type InsertTransferPortalAthlete = typeof transferPortalAthletes.$inferInsert;

/**
 * School Subscriptions - Schools pay for transfer portal data access
 */
export const schoolSubscriptions = mysqlTable("school_subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  schoolName: varchar("schoolName", { length: 255 }).notNull(),
  contactName: varchar("contactName", { length: 255 }).notNull(),
  contactEmail: varchar("contactEmail", { length: 320 }).notNull(),
  contactPhone: varchar("contactPhone", { length: 20 }),
  
  // Subscription Tier
  tier: mysqlEnum("tier", ["free", "pro", "elite", "enterprise"]).default("free").notNull(),
  // Free: Basic search, limited results
  // Pro ($499/month): Advanced search, 100 athlete views/month
  // Elite ($2,999/month): Unlimited search, real-time alerts, AI matching
  // Enterprise ($25,000+/year): Custom data feeds, API access, dedicated support
  
  // Billing
  monthlyPrice: decimal("monthlyPrice", { precision: 10, scale: 2 }),
  billingCycle: mysqlEnum("billingCycle", ["monthly", "annual"]).default("monthly").notNull(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  
  // Usage Limits
  athleteViewsLimit: int("athleteViewsLimit"), // null = unlimited
  athleteViewsUsed: int("athleteViewsUsed").default(0).notNull(),
  searchesLimit: int("searchesLimit"),
  searchesUsed: int("searchesUsed").default(0).notNull(),
  
  // Features
  realTimeAlerts: mysqlEnum("realTimeAlerts", ["yes", "no"]).default("no").notNull(),
  aiMatching: mysqlEnum("aiMatching", ["yes", "no"]).default("no").notNull(),
  apiAccess: mysqlEnum("apiAccess", ["yes", "no"]).default("no").notNull(),
  exportData: mysqlEnum("exportData", ["yes", "no"]).default("no").notNull(),
  
  // Status
  status: mysqlEnum("status", ["active", "paused", "cancelled", "trial"]).default("trial").notNull(),
  trialEndsAt: timestamp("trialEndsAt"),
  subscriptionStartDate: timestamp("subscriptionStartDate"),
  subscriptionEndDate: timestamp("subscriptionEndDate"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SchoolSubscription = typeof schoolSubscriptions.$inferSelect;
export type InsertSchoolSubscription = typeof schoolSubscriptions.$inferInsert;

/**
 * Athlete Views - Track which schools viewed which athletes
 */
export const athleteViews = mysqlTable("athlete_views", {
  id: int("id").autoincrement().primaryKey(),
  schoolSubscriptionId: int("schoolSubscriptionId").notNull().references(() => schoolSubscriptions.id),
  athleteId: int("athleteId").notNull().references(() => transferPortalAthletes.id),
  viewedBy: varchar("viewedBy", { length: 255 }), // Coach/recruiter name
  viewType: mysqlEnum("viewType", ["profile", "video", "stats", "contact"]).notNull(),
  viewedAt: timestamp("viewedAt").defaultNow().notNull(),
});

export type AthleteView = typeof athleteViews.$inferSelect;
export type InsertAthleteView = typeof athleteViews.$inferInsert;

/**
 * Transfer Portal Alerts - Real-time alerts for schools
 */
export const transferPortalAlerts = mysqlTable("transfer_portal_alerts", {
  id: int("id").autoincrement().primaryKey(),
  schoolSubscriptionId: int("schoolSubscriptionId").notNull().references(() => schoolSubscriptions.id),
  
  // Alert Criteria
  sport: varchar("sport", { length: 100 }),
  positions: json("positions"), // Array of positions
  minRating: decimal("minRating", { precision: 5, scale: 2 }),
  maxRating: decimal("maxRating", { precision: 5, scale: 2 }),
  states: json("states"), // Array of state codes
  previousDivision: varchar("previousDivision", { length: 50 }),
  minNilValuation: decimal("minNilValuation", { precision: 10, scale: 2 }),
  
  // Alert Settings
  alertName: varchar("alertName", { length: 255 }).notNull(),
  alertType: mysqlEnum("alertType", ["email", "sms", "push", "all"]).default("email").notNull(),
  frequency: mysqlEnum("frequency", ["instant", "daily", "weekly"]).default("instant").notNull(),
  active: mysqlEnum("active", ["yes", "no"]).default("yes").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TransferPortalAlert = typeof transferPortalAlerts.$inferSelect;
export type InsertTransferPortalAlert = typeof transferPortalAlerts.$inferInsert;

/**
 * AI Match Recommendations - AI-powered athlete-school matching
 */
export const aiMatchRecommendations = mysqlTable("ai_match_recommendations", {
  id: int("id").autoincrement().primaryKey(),
  schoolSubscriptionId: int("schoolSubscriptionId").notNull().references(() => schoolSubscriptions.id),
  athleteId: int("athleteId").notNull().references(() => transferPortalAthletes.id),
  
  // Match Score
  matchScore: decimal("matchScore", { precision: 5, scale: 2 }).notNull(), // 0-100
  confidence: mysqlEnum("confidence", ["low", "medium", "high", "very_high"]).notNull(),
  
  // Match Reasons
  matchReasons: json("matchReasons"), // Array of reasons why this is a good match
  aiAnalysis: text("aiAnalysis"), // Detailed AI-generated analysis
  
  // School Needs
  schoolNeed: varchar("schoolNeed", { length: 255 }), // Position need
  athleteFit: text("athleteFit"), // Why athlete fits the need
  
  // Status
  status: mysqlEnum("status", ["new", "viewed", "contacted", "passed", "committed"]).default("new").notNull(),
  feedback: text("feedback"), // School's feedback on recommendation
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AiMatchRecommendation = typeof aiMatchRecommendations.$inferSelect;
export type InsertAiMatchRecommendation = typeof aiMatchRecommendations.$inferInsert;

/**
 * Transfer Portal Analytics - Track portal trends and insights
 */
export const transferPortalAnalytics = mysqlTable("transfer_portal_analytics", {
  id: int("id").autoincrement().primaryKey(),
  
  // Time Period
  date: date("date").notNull(),
  sport: varchar("sport", { length: 100 }).notNull(),
  
  // Portal Activity
  totalEntered: int("totalEntered").default(0).notNull(),
  totalCommitted: int("totalCommitted").default(0).notNull(),
  totalWithdrawn: int("totalWithdrawn").default(0).notNull(),
  
  // By Position
  positionBreakdown: json("positionBreakdown"), // Count by position
  
  // By Division
  divisionBreakdown: json("divisionBreakdown"), // D1, D2, D3, etc.
  
  // By Rating
  avgRating: decimal("avgRating", { precision: 5, scale: 2 }),
  topRatedAthletes: json("topRatedAthletes"), // Top 10 athletes that day
  
  // NIL Insights
  avgNilValuation: decimal("avgNilValuation", { precision: 10, scale: 2 }),
  totalNilValue: decimal("totalNilValue", { precision: 12, scale: 2 }),
  
  // Trends
  trendDirection: mysqlEnum("trendDirection", ["up", "down", "stable"]),
  percentChange: decimal("percentChange", { precision: 5, scale: 2 }),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TransferPortalAnalytics = typeof transferPortalAnalytics.$inferSelect;
export type InsertTransferPortalAnalytics = typeof transferPortalAnalytics.$inferInsert;

/**
 * Fellowship of Christian Athletes (FCA) - Daily Devotionals
 */
export const fcaDevotionals = mysqlTable("fca_devotionals", {
  id: int("id").autoincrement().primaryKey(),
  
  // Content
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(), // Main devotional text
  scripture: text("scripture").notNull(), // Bible verse(s)
  scriptureReference: varchar("scriptureReference", { length: 100 }).notNull(), // e.g. "John 3:16"
  prayer: text("prayer"), // Closing prayer
  
  // Metadata
  author: varchar("author", { length: 255 }).default("Chad A. Dozier").notNull(),
  publishDate: date("publishDate").notNull(),
  featured: mysqlEnum("featured", ["yes", "no"]).default("no").notNull(),
  category: varchar("category", { length: 100 }), // e.g. "Perseverance", "Faith", "Victory"
  
  // Engagement
  views: int("views").default(0).notNull(),
  likes: int("likes").default(0).notNull(),
  shares: int("shares").default(0).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FcaDevotional = typeof fcaDevotionals.$inferSelect;
export type InsertFcaDevotional = typeof fcaDevotionals.$inferInsert;

/**
 * FCA Podcasts - "Faith & The Field" with Chad A. Dozier
 */
export const fcaPodcasts = mysqlTable("fca_podcasts", {
  id: int("id").autoincrement().primaryKey(),
  
  // Content
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  audioUrl: text("audioUrl").notNull(), // S3 URL to audio file
  duration: int("duration").notNull(), // Duration in seconds
  episodeNumber: int("episodeNumber").notNull(),
  season: int("season").default(1).notNull(),
  
  // Metadata
  host: varchar("host", { length: 255 }).default("Chad A. Dozier").notNull(),
  guest: varchar("guest", { length: 255 }), // Guest athlete/coach
  publishDate: date("publishDate").notNull(),
  featured: mysqlEnum("featured", ["yes", "no"]).default("no").notNull(),
  category: varchar("category", { length: 100 }), // e.g. "Testimony", "Interview", "Teaching"
  
  // Engagement
  plays: int("plays").default(0).notNull(),
  likes: int("likes").default(0).notNull(),
  downloads: int("downloads").default(0).notNull(),
  
  // SEO
  thumbnailUrl: text("thumbnailUrl"),
  keywords: text("keywords"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FcaPodcast = typeof fcaPodcasts.$inferSelect;
export type InsertFcaPodcast = typeof fcaPodcasts.$inferInsert;

/**
 * FCA Blog Posts - Faith-based sports stories
 */
export const fcaBlogPosts = mysqlTable("fca_blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  
  // Content
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(), // Full blog post (markdown)
  excerpt: text("excerpt").notNull(), // Short summary
  
  // Metadata
  author: varchar("author", { length: 255 }).default("Chad A. Dozier").notNull(),
  publishDate: date("publishDate").notNull(),
  featured: mysqlEnum("featured", ["yes", "no"]).default("no").notNull(),
  category: varchar("category", { length: 100 }), // e.g. "Testimony", "Faith & Sports", "Leadership"
  tags: json("tags"), // Array of tags
  
  // Media
  featuredImageUrl: text("featuredImageUrl"),
  
  // Engagement
  views: int("views").default(0).notNull(),
  likes: int("likes").default(0).notNull(),
  shares: int("shares").default(0).notNull(),
  
  // SEO
  metaTitle: varchar("metaTitle", { length: 255 }),
  metaDescription: text("metaDescription"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FcaBlogPost = typeof fcaBlogPosts.$inferSelect;
export type InsertFcaBlogPost = typeof fcaBlogPosts.$inferInsert;

/**
 * FCA Prayer Requests - Prayer Wall
 */
export const fcaPrayerRequests = mysqlTable("fca_prayer_requests", {
  id: int("id").autoincrement().primaryKey(),
  
  // User
  userId: int("userId").notNull().references(() => users.id),
  userName: varchar("userName", { length: 255 }).notNull(),
  isAnonymous: mysqlEnum("isAnonymous", ["yes", "no"]).default("no").notNull(),
  
  // Content
  title: varchar("title", { length: 255 }).notNull(),
  request: text("request").notNull(),
  category: varchar("category", { length: 100 }), // e.g. "Injury", "Competition", "Personal", "Family"
  
  // Status
  status: mysqlEnum("status", ["active", "answered", "archived"]).default("active").notNull(),
  answeredDate: date("answeredDate"),
  testimony: text("testimony"), // How prayer was answered
  
  // Engagement
  prayerCount: int("prayerCount").default(0).notNull(), // How many people prayed
  
  // Moderation
  approved: mysqlEnum("approved", ["yes", "no", "pending"]).default("pending").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FcaPrayerRequest = typeof fcaPrayerRequests.$inferSelect;
export type InsertFcaPrayerRequest = typeof fcaPrayerRequests.$inferInsert;

/**
 * FCA Testimonies - Athlete faith stories
 */
export const fcaTestimonies = mysqlTable("fca_testimonies", {
  id: int("id").autoincrement().primaryKey(),
  
  // User
  userId: int("userId").notNull().references(() => users.id),
  athleteName: varchar("athleteName", { length: 255 }).notNull(),
  sport: varchar("sport", { length: 100 }).notNull(),
  school: varchar("school", { length: 255 }),
  
  // Content
  title: varchar("title", { length: 255 }).notNull(),
  testimony: text("testimony").notNull(), // Full testimony
  scripture: text("scripture"), // Favorite verse
  
  // Media
  photoUrl: text("photoUrl"),
  videoUrl: text("videoUrl"),
  
  // Metadata
  featured: mysqlEnum("featured", ["yes", "no"]).default("no").notNull(),
  publishDate: date("publishDate").notNull(),
  
  // Engagement
  views: int("views").default(0).notNull(),
  likes: int("likes").default(0).notNull(),
  shares: int("shares").default(0).notNull(),
  
  // Moderation
  approved: mysqlEnum("approved", ["yes", "no", "pending"]).default("pending").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FcaTestimony = typeof fcaTestimonies.$inferSelect;
export type InsertFcaTestimony = typeof fcaTestimonies.$inferInsert;

/**
 * FCA Comments - Community engagement on devotionals, podcasts, blogs
 */
export const fcaComments = mysqlTable("fca_comments", {
  id: int("id").autoincrement().primaryKey(),
  
  // User
  userId: int("userId").notNull().references(() => users.id),
  userName: varchar("userName", { length: 255 }).notNull(),
  
  // Content
  comment: text("comment").notNull(),
  
  // Reference (what they're commenting on)
  contentType: mysqlEnum("contentType", ["devotional", "podcast", "blog", "prayer", "testimony"]).notNull(),
  contentId: int("contentId").notNull(), // ID of the devotional/podcast/blog/etc
  
  // Threading
  parentCommentId: int("parentCommentId"), // For replies
  
  // Engagement
  likes: int("likes").default(0).notNull(),
  
  // Moderation
  approved: mysqlEnum("approved", ["yes", "no", "pending"]).default("pending").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FcaComment = typeof fcaComments.$inferSelect;
export type InsertFcaComment = typeof fcaComments.$inferInsert;

/**
 * FCA Daily Verses - Verse of the Day rotation
 */
export const fcaDailyVerses = mysqlTable("fca_daily_verses", {
  id: int("id").autoincrement().primaryKey(),
  
  // Content
  verse: text("verse").notNull(), // Full verse text
  reference: varchar("reference", { length: 100 }).notNull(), // e.g. "Philippians 4:13"
  translation: varchar("translation", { length: 50 }).default("NIV").notNull(),
  
  // Scheduling
  displayDate: date("displayDate").notNull().unique(), // Date to display this verse
  
  // Engagement
  views: int("views").default(0).notNull(),
  shares: int("shares").default(0).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type FcaDailyVerse = typeof fcaDailyVerses.$inferSelect;
export type InsertFcaDailyVerse = typeof fcaDailyVerses.$inferInsert;
