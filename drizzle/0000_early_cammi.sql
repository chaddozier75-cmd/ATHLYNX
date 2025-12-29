CREATE TABLE `access_control` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`resource` varchar(100) NOT NULL,
	`resourceId` int,
	`permission` enum('read','write','delete','admin') NOT NULL,
	`grantedBy` int,
	`reason` text,
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `access_control_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ai_match_recommendations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`schoolSubscriptionId` int NOT NULL,
	`athleteId` int NOT NULL,
	`matchScore` decimal(5,2) NOT NULL,
	`confidence` enum('low','medium','high','very_high') NOT NULL,
	`matchReasons` json,
	`aiAnalysis` text,
	`schoolNeed` varchar(255),
	`athleteFit` text,
	`status` enum('new','viewed','contacted','passed','committed') NOT NULL DEFAULT 'new',
	`feedback` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ai_match_recommendations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `athlete_commitments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`athleteId` int NOT NULL,
	`eventId` int,
	`collegeName` varchar(255) NOT NULL,
	`collegeLogoUrl` varchar(500),
	`sport` varchar(100) NOT NULL,
	`position` varchar(100),
	`announcementDate` timestamp,
	`finalistSchools` json,
	`streamUrl` varchar(500),
	`highlightReelUrl` varchar(500),
	`pressReleaseText` text,
	`status` enum('pending','announced','signed') NOT NULL DEFAULT 'pending',
	`viewCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `athlete_commitments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `athlete_views` (
	`id` int AUTO_INCREMENT NOT NULL,
	`schoolSubscriptionId` int NOT NULL,
	`athleteId` int NOT NULL,
	`viewedBy` varchar(255),
	`viewType` enum('profile','video','stats','contact') NOT NULL,
	`viewedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `athlete_views_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`action` varchar(100) NOT NULL,
	`resource` varchar(100) NOT NULL,
	`resourceId` int,
	`ipAddress` varchar(45),
	`userAgent` text,
	`details` json,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bot_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`description` text,
	`icon` varchar(50),
	`parentId` int,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bot_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `bot_categories_name_unique` UNIQUE(`name`),
	CONSTRAINT `bot_categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `bot_creators` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`displayName` varchar(100) NOT NULL,
	`bio` text,
	`avatarUrl` text,
	`websiteUrl` text,
	`twitterHandle` varchar(50),
	`githubHandle` varchar(50),
	`stripeAccountId` varchar(255),
	`verified` enum('yes','no') NOT NULL DEFAULT 'no',
	`totalSales` int NOT NULL DEFAULT 0,
	`totalRevenue` decimal(10,2) NOT NULL DEFAULT '0.00',
	`rating` decimal(3,2) NOT NULL DEFAULT '0.00',
	`reviewCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bot_creators_id` PRIMARY KEY(`id`),
	CONSTRAINT `bot_creators_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `bot_favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`botId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bot_favorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bot_purchases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`botId` int NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'USD',
	`stripePaymentIntentId` varchar(255),
	`stripeChargeId` varchar(255),
	`status` enum('pending','completed','refunded','failed') NOT NULL DEFAULT 'pending',
	`refundedAt` timestamp,
	`refundReason` text,
	`subscriptionId` varchar(255),
	`subscriptionStatus` enum('active','cancelled','past_due','unpaid'),
	`subscriptionEndsAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bot_purchases_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bot_reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`botId` int NOT NULL,
	`purchaseId` int,
	`rating` int NOT NULL,
	`title` varchar(200),
	`content` text,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`helpfulCount` int NOT NULL DEFAULT 0,
	`creatorResponse` text,
	`creatorRespondedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bot_reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bot_tag_mappings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`botId` int NOT NULL,
	`tagId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bot_tag_mappings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bot_tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`slug` varchar(50) NOT NULL,
	`usageCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bot_tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `bot_tags_name_unique` UNIQUE(`name`),
	CONSTRAINT `bot_tags_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `bot_usage_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`botId` int NOT NULL,
	`sessionStart` timestamp NOT NULL DEFAULT (now()),
	`sessionEnd` timestamp,
	`messageCount` int NOT NULL DEFAULT 0,
	`tokensUsed` int NOT NULL DEFAULT 0,
	`userRating` int,
	`feedback` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bot_usage_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bots` (
	`id` int AUTO_INCREMENT NOT NULL,
	`creatorId` int NOT NULL,
	`categoryId` int,
	`name` varchar(200) NOT NULL,
	`slug` varchar(200) NOT NULL,
	`tagline` varchar(300),
	`description` text NOT NULL,
	`iconUrl` text,
	`bannerUrl` text,
	`screenshotUrls` json,
	`demoVideoUrl` text,
	`pricingModel` enum('free','one_time','subscription','freemium') NOT NULL DEFAULT 'free',
	`price` decimal(10,2) NOT NULL DEFAULT '0.00',
	`currency` varchar(3) NOT NULL DEFAULT 'USD',
	`systemPrompt` text,
	`modelConfig` json,
	`capabilities` json,
	`apiEndpoint` text,
	`downloads` int NOT NULL DEFAULT 0,
	`activeUsers` int NOT NULL DEFAULT 0,
	`rating` decimal(3,2) NOT NULL DEFAULT '0.00',
	`reviewCount` int NOT NULL DEFAULT 0,
	`status` enum('draft','pending_review','published','rejected','suspended') NOT NULL DEFAULT 'draft',
	`featured` enum('yes','no') NOT NULL DEFAULT 'no',
	`rejectionReason` text,
	`version` varchar(20) NOT NULL DEFAULT '1.0.0',
	`changelog` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`publishedAt` timestamp,
	CONSTRAINT `bots_id` PRIMARY KEY(`id`),
	CONSTRAINT `bots_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `college_database` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`logoUrl` varchar(500),
	`primaryColor` varchar(7),
	`secondaryColor` varchar(7),
	`mascot` varchar(100),
	`fightSongUrl` varchar(500),
	`division` varchar(50),
	`conference` varchar(100),
	`location` varchar(255),
	`website` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `college_database_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `consent_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`consentType` enum('parental_consent','medical_data','mental_health','injury_tracking','data_sharing','aoc_medical_referral','marketing','research') NOT NULL,
	`granted` enum('yes','no') NOT NULL,
	`grantedBy` varchar(255),
	`grantedByEmail` varchar(320),
	`grantedByRelation` varchar(50),
	`ipAddress` varchar(45),
	`consentDocument` text,
	`expiresAt` timestamp,
	`revokedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `consent_records_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `creator_payouts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`creatorId` int NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'USD',
	`platformFee` decimal(10,2) NOT NULL,
	`netAmount` decimal(10,2) NOT NULL,
	`stripeTransferId` varchar(255),
	`stripePayoutId` varchar(255),
	`status` enum('pending','processing','completed','failed') NOT NULL DEFAULT 'pending',
	`failureReason` text,
	`periodStart` timestamp NOT NULL,
	`periodEnd` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `creator_payouts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `credit_transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`amount` int NOT NULL,
	`type` enum('purchase','grant','refund','bonus') NOT NULL,
	`description` text,
	`stripePaymentId` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `credit_transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `credit_usage` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`actionType` varchar(100) NOT NULL,
	`creditsUsed` int NOT NULL,
	`result` text,
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `credit_usage_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `early_access_signups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`sportId` int,
	`isVip` enum('yes','no') NOT NULL DEFAULT 'no',
	`accessGranted` enum('yes','no') NOT NULL DEFAULT 'no',
	`confirmationEmailSent` enum('yes','no') NOT NULL DEFAULT 'no',
	`signupDate` timestamp NOT NULL DEFAULT (now()),
	`accessGrantedDate` timestamp,
	CONSTRAINT `early_access_signups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employee_access_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employeeId` int NOT NULL,
	`action` varchar(100) NOT NULL,
	`resource` varchar(100) NOT NULL,
	`resourceId` int,
	`justification` text,
	`approved` enum('yes','no','pending') NOT NULL DEFAULT 'pending',
	`approvedBy` int,
	`flagged` enum('yes','no') NOT NULL DEFAULT 'no',
	`flagReason` text,
	`ipAddress` varchar(45),
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `employee_access_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fca_blog_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`excerpt` text NOT NULL,
	`author` varchar(255) NOT NULL DEFAULT 'Chad A. Dozier',
	`publishDate` date NOT NULL,
	`featured` enum('yes','no') NOT NULL DEFAULT 'no',
	`category` varchar(100),
	`tags` json,
	`featuredImageUrl` text,
	`views` int NOT NULL DEFAULT 0,
	`likes` int NOT NULL DEFAULT 0,
	`shares` int NOT NULL DEFAULT 0,
	`metaTitle` varchar(255),
	`metaDescription` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fca_blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `fca_blog_posts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `fca_comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`userName` varchar(255) NOT NULL,
	`comment` text NOT NULL,
	`contentType` enum('devotional','podcast','blog','prayer','testimony') NOT NULL,
	`contentId` int NOT NULL,
	`parentCommentId` int,
	`likes` int NOT NULL DEFAULT 0,
	`approved` enum('yes','no','pending') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fca_comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fca_daily_verses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`verse` text NOT NULL,
	`reference` varchar(100) NOT NULL,
	`translation` varchar(50) NOT NULL DEFAULT 'NIV',
	`displayDate` date NOT NULL,
	`views` int NOT NULL DEFAULT 0,
	`shares` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `fca_daily_verses_id` PRIMARY KEY(`id`),
	CONSTRAINT `fca_daily_verses_displayDate_unique` UNIQUE(`displayDate`)
);
--> statement-breakpoint
CREATE TABLE `fca_devotionals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`scripture` text NOT NULL,
	`scriptureReference` varchar(100) NOT NULL,
	`prayer` text,
	`author` varchar(255) NOT NULL DEFAULT 'Chad A. Dozier',
	`publishDate` date NOT NULL,
	`featured` enum('yes','no') NOT NULL DEFAULT 'no',
	`category` varchar(100),
	`views` int NOT NULL DEFAULT 0,
	`likes` int NOT NULL DEFAULT 0,
	`shares` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fca_devotionals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fca_podcasts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`audioUrl` text NOT NULL,
	`duration` int NOT NULL,
	`episodeNumber` int NOT NULL,
	`season` int NOT NULL DEFAULT 1,
	`host` varchar(255) NOT NULL DEFAULT 'Chad A. Dozier',
	`guest` varchar(255),
	`publishDate` date NOT NULL,
	`featured` enum('yes','no') NOT NULL DEFAULT 'no',
	`category` varchar(100),
	`plays` int NOT NULL DEFAULT 0,
	`likes` int NOT NULL DEFAULT 0,
	`downloads` int NOT NULL DEFAULT 0,
	`thumbnailUrl` text,
	`keywords` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fca_podcasts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fca_prayer_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`userName` varchar(255) NOT NULL,
	`isAnonymous` enum('yes','no') NOT NULL DEFAULT 'no',
	`title` varchar(255) NOT NULL,
	`request` text NOT NULL,
	`category` varchar(100),
	`status` enum('active','answered','archived') NOT NULL DEFAULT 'active',
	`answeredDate` date,
	`testimony` text,
	`prayerCount` int NOT NULL DEFAULT 0,
	`approved` enum('yes','no','pending') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fca_prayer_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fca_testimonies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`athleteName` varchar(255) NOT NULL,
	`sport` varchar(100) NOT NULL,
	`school` varchar(255),
	`title` varchar(255) NOT NULL,
	`testimony` text NOT NULL,
	`scripture` text,
	`photoUrl` text,
	`videoUrl` text,
	`featured` enum('yes','no') NOT NULL DEFAULT 'no',
	`publishDate` date NOT NULL,
	`views` int NOT NULL DEFAULT 0,
	`likes` int NOT NULL DEFAULT 0,
	`shares` int NOT NULL DEFAULT 0,
	`approved` enum('yes','no','pending') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fca_testimonies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `medical_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`recordType` enum('injury','mental_health','physical_assessment','treatment_plan','medical_clearance','orthopedic_evaluation') NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`severity` enum('low','medium','high','critical'),
	`status` enum('active','resolved','ongoing','cleared') NOT NULL DEFAULT 'active',
	`diagnosisDate` date,
	`resolvedDate` date,
	`providerId` int,
	`providerName` varchar(255),
	`providerNotes` text,
	`attachments` json,
	`metadata` json,
	`isConfidential` enum('yes','no') NOT NULL DEFAULT 'yes',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `medical_records_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ncaa_compliance` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`complianceType` enum('recruiting_contact','nil_deal','transfer_portal','amateurism_status','eligibility_check') NOT NULL,
	`status` enum('compliant','pending_review','violation','cleared') NOT NULL DEFAULT 'pending_review',
	`details` json,
	`reviewedBy` int,
	`reviewedAt` timestamp,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ncaa_compliance_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `nil_contracts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`brandName` varchar(255) NOT NULL,
	`brandContact` varchar(255),
	`contractValue` decimal(10,2) NOT NULL,
	`contractType` enum('social_media','appearance','endorsement','merchandise','content_creation','other') NOT NULL,
	`startDate` date NOT NULL,
	`endDate` date,
	`status` enum('pending','active','completed','terminated') NOT NULL DEFAULT 'pending',
	`contractDocument` text,
	`taxReported` enum('yes','no') NOT NULL DEFAULT 'no',
	`taxYear` int,
	`complianceApproved` enum('yes','no','pending') NOT NULL DEFAULT 'pending',
	`schoolApproved` enum('yes','no','pending','not_required') NOT NULL DEFAULT 'pending',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `nil_contracts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `school_subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`schoolName` varchar(255) NOT NULL,
	`contactName` varchar(255) NOT NULL,
	`contactEmail` varchar(320) NOT NULL,
	`contactPhone` varchar(20),
	`tier` enum('free','pro','elite','enterprise') NOT NULL DEFAULT 'free',
	`monthlyPrice` decimal(10,2),
	`billingCycle` enum('monthly','annual') NOT NULL DEFAULT 'monthly',
	`stripeCustomerId` varchar(255),
	`stripeSubscriptionId` varchar(255),
	`athleteViewsLimit` int,
	`athleteViewsUsed` int NOT NULL DEFAULT 0,
	`searchesLimit` int,
	`searchesUsed` int NOT NULL DEFAULT 0,
	`realTimeAlerts` enum('yes','no') NOT NULL DEFAULT 'no',
	`aiMatching` enum('yes','no') NOT NULL DEFAULT 'no',
	`apiAccess` enum('yes','no') NOT NULL DEFAULT 'no',
	`exportData` enum('yes','no') NOT NULL DEFAULT 'no',
	`status` enum('active','paused','cancelled','trial') NOT NULL DEFAULT 'trial',
	`trialEndsAt` timestamp,
	`subscriptionStartDate` timestamp,
	`subscriptionEndDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `school_subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `security_incidents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`incidentType` enum('unauthorized_access','data_breach','phishing_attempt','malware','insider_threat','policy_violation','other') NOT NULL,
	`severity` enum('low','medium','high','critical') NOT NULL,
	`description` text NOT NULL,
	`affectedUsers` json,
	`detectedBy` int,
	`detectedAt` timestamp NOT NULL DEFAULT (now()),
	`resolvedBy` int,
	`resolvedAt` timestamp,
	`status` enum('open','investigating','resolved','false_alarm') NOT NULL DEFAULT 'open',
	`actionsTaken` text,
	`notificationsSent` enum('yes','no') NOT NULL DEFAULT 'no',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `security_incidents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `signing_day_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`sport` varchar(100) NOT NULL,
	`eventDate` timestamp NOT NULL,
	`description` text,
	`streamUrl` varchar(500),
	`status` enum('upcoming','live','completed') NOT NULL DEFAULT 'upcoming',
	`viewerCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `signing_day_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `signing_day_streams` (
	`id` int AUTO_INCREMENT NOT NULL,
	`commitmentId` int NOT NULL,
	`streamKey` varchar(255) NOT NULL,
	`streamUrl` varchar(500) NOT NULL,
	`playbackUrl` varchar(500),
	`status` enum('scheduled','live','ended','archived') NOT NULL DEFAULT 'scheduled',
	`startTime` timestamp,
	`endTime` timestamp,
	`peakViewers` int NOT NULL DEFAULT 0,
	`totalViews` int NOT NULL DEFAULT 0,
	`chatEnabled` enum('yes','no') NOT NULL DEFAULT 'yes',
	`recordingUrl` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `signing_day_streams_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`emoji` varchar(10) NOT NULL,
	`imageUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sports_id` PRIMARY KEY(`id`),
	CONSTRAINT `sports_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `stream_chat` (
	`id` int AUTO_INCREMENT NOT NULL,
	`streamId` int NOT NULL,
	`userId` int NOT NULL,
	`username` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`isModerated` enum('yes','no') NOT NULL DEFAULT 'no',
	CONSTRAINT `stream_chat_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transfer_portal_alerts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`schoolSubscriptionId` int NOT NULL,
	`sport` varchar(100),
	`positions` json,
	`minRating` decimal(5,2),
	`maxRating` decimal(5,2),
	`states` json,
	`previousDivision` varchar(50),
	`minNilValuation` decimal(10,2),
	`alertName` varchar(255) NOT NULL,
	`alertType` enum('email','sms','push','all') NOT NULL DEFAULT 'email',
	`frequency` enum('instant','daily','weekly') NOT NULL DEFAULT 'instant',
	`active` enum('yes','no') NOT NULL DEFAULT 'yes',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `transfer_portal_alerts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transfer_portal_analytics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` date NOT NULL,
	`sport` varchar(100) NOT NULL,
	`totalEntered` int NOT NULL DEFAULT 0,
	`totalCommitted` int NOT NULL DEFAULT 0,
	`totalWithdrawn` int NOT NULL DEFAULT 0,
	`positionBreakdown` json,
	`divisionBreakdown` json,
	`avgRating` decimal(5,2),
	`topRatedAthletes` json,
	`avgNilValuation` decimal(10,2),
	`totalNilValue` decimal(12,2),
	`trendDirection` enum('up','down','stable'),
	`percentChange` decimal(5,2),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `transfer_portal_analytics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transfer_portal_athletes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`sport` varchar(100) NOT NULL,
	`position` varchar(100),
	`year` varchar(50),
	`heightInches` int,
	`weightPounds` int,
	`hometown` varchar(255),
	`homeState` varchar(2),
	`highSchool` varchar(255),
	`previousSchool` varchar(255) NOT NULL,
	`previousConference` varchar(100),
	`previousDivision` varchar(50),
	`portalEntryDate` date NOT NULL,
	`portalStatus` enum('entered','committed','withdrawn') NOT NULL DEFAULT 'entered',
	`newSchool` varchar(255),
	`commitmentDate` date,
	`expectedDecisionDate` date,
	`on3Rating` decimal(5,2),
	`on3Rank` int,
	`twoFourSevenRating` decimal(5,4),
	`twoFourSevenRank` int,
	`rivalsRating` decimal(5,2),
	`rivalsRank` int,
	`espnRating` int,
	`espnRank` int,
	`compositeRating` decimal(5,2),
	`compositeRank` int,
	`stars` int,
	`nilValuation` decimal(10,2),
	`nilDeals` int DEFAULT 0,
	`estimatedNilEarnings` decimal(10,2),
	`stats` json,
	`gpa` decimal(3,2),
	`testScores` json,
	`eligibilityYears` int,
	`profileImageUrl` varchar(500),
	`highlightReelUrl` varchar(500),
	`hudlUrl` varchar(500),
	`twitterHandle` varchar(100),
	`instagramHandle` varchar(100),
	`tiktokHandle` varchar(100),
	`twitterFollowers` int,
	`instagramFollowers` int,
	`tiktokFollowers` int,
	`interestedSchools` json,
	`officialVisits` json,
	`offers` json,
	`dataSource` json,
	`lastScraped` timestamp NOT NULL DEFAULT (now()),
	`verified` enum('yes','no') NOT NULL DEFAULT 'no',
	`featured` enum('yes','no') NOT NULL DEFAULT 'no',
	`premium` enum('yes','no') NOT NULL DEFAULT 'no',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `transfer_portal_athletes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`aiCredits` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
CREATE TABLE `verification_codes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`code` varchar(10) NOT NULL,
	`type` enum('2fa','email_verify','password_reset') NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`used` enum('yes','no') NOT NULL DEFAULT 'no',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `verification_codes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vip_members` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`role` varchar(50) NOT NULL,
	`sport` varchar(100) NOT NULL,
	`accessCode` varchar(12) NOT NULL,
	`status` enum('pending','approved','active') NOT NULL DEFAULT 'pending',
	`signupDate` timestamp NOT NULL DEFAULT (now()),
	`approvedDate` timestamp,
	CONSTRAINT `vip_members_id` PRIMARY KEY(`id`),
	CONSTRAINT `vip_members_email_unique` UNIQUE(`email`),
	CONSTRAINT `vip_members_accessCode_unique` UNIQUE(`accessCode`)
);
--> statement-breakpoint
ALTER TABLE `access_control` ADD CONSTRAINT `access_control_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `access_control` ADD CONSTRAINT `access_control_grantedBy_users_id_fk` FOREIGN KEY (`grantedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ai_match_recommendations` ADD CONSTRAINT `ai_match_recommendations_schoolSubscriptionId_school_subscriptions_id_fk` FOREIGN KEY (`schoolSubscriptionId`) REFERENCES `school_subscriptions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ai_match_recommendations` ADD CONSTRAINT `ai_match_recommendations_athleteId_transfer_portal_athletes_id_fk` FOREIGN KEY (`athleteId`) REFERENCES `transfer_portal_athletes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `athlete_commitments` ADD CONSTRAINT `athlete_commitments_athleteId_users_id_fk` FOREIGN KEY (`athleteId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `athlete_commitments` ADD CONSTRAINT `athlete_commitments_eventId_signing_day_events_id_fk` FOREIGN KEY (`eventId`) REFERENCES `signing_day_events`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `athlete_views` ADD CONSTRAINT `athlete_views_schoolSubscriptionId_school_subscriptions_id_fk` FOREIGN KEY (`schoolSubscriptionId`) REFERENCES `school_subscriptions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `athlete_views` ADD CONSTRAINT `athlete_views_athleteId_transfer_portal_athletes_id_fk` FOREIGN KEY (`athleteId`) REFERENCES `transfer_portal_athletes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bot_creators` ADD CONSTRAINT `bot_creators_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bot_favorites` ADD CONSTRAINT `bot_favorites_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bot_favorites` ADD CONSTRAINT `bot_favorites_botId_bots_id_fk` FOREIGN KEY (`botId`) REFERENCES `bots`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bot_purchases` ADD CONSTRAINT `bot_purchases_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bot_purchases` ADD CONSTRAINT `bot_purchases_botId_bots_id_fk` FOREIGN KEY (`botId`) REFERENCES `bots`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bot_reviews` ADD CONSTRAINT `bot_reviews_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bot_reviews` ADD CONSTRAINT `bot_reviews_botId_bots_id_fk` FOREIGN KEY (`botId`) REFERENCES `bots`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bot_reviews` ADD CONSTRAINT `bot_reviews_purchaseId_bot_purchases_id_fk` FOREIGN KEY (`purchaseId`) REFERENCES `bot_purchases`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bot_tag_mappings` ADD CONSTRAINT `bot_tag_mappings_botId_bots_id_fk` FOREIGN KEY (`botId`) REFERENCES `bots`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bot_tag_mappings` ADD CONSTRAINT `bot_tag_mappings_tagId_bot_tags_id_fk` FOREIGN KEY (`tagId`) REFERENCES `bot_tags`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bot_usage_sessions` ADD CONSTRAINT `bot_usage_sessions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bot_usage_sessions` ADD CONSTRAINT `bot_usage_sessions_botId_bots_id_fk` FOREIGN KEY (`botId`) REFERENCES `bots`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bots` ADD CONSTRAINT `bots_creatorId_bot_creators_id_fk` FOREIGN KEY (`creatorId`) REFERENCES `bot_creators`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bots` ADD CONSTRAINT `bots_categoryId_bot_categories_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `bot_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `consent_records` ADD CONSTRAINT `consent_records_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `creator_payouts` ADD CONSTRAINT `creator_payouts_creatorId_bot_creators_id_fk` FOREIGN KEY (`creatorId`) REFERENCES `bot_creators`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `credit_transactions` ADD CONSTRAINT `credit_transactions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `credit_usage` ADD CONSTRAINT `credit_usage_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `early_access_signups` ADD CONSTRAINT `early_access_signups_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `early_access_signups` ADD CONSTRAINT `early_access_signups_sportId_sports_id_fk` FOREIGN KEY (`sportId`) REFERENCES `sports`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employee_access_logs` ADD CONSTRAINT `employee_access_logs_employeeId_users_id_fk` FOREIGN KEY (`employeeId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employee_access_logs` ADD CONSTRAINT `employee_access_logs_approvedBy_users_id_fk` FOREIGN KEY (`approvedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `fca_comments` ADD CONSTRAINT `fca_comments_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `fca_prayer_requests` ADD CONSTRAINT `fca_prayer_requests_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `fca_testimonies` ADD CONSTRAINT `fca_testimonies_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `medical_records` ADD CONSTRAINT `medical_records_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ncaa_compliance` ADD CONSTRAINT `ncaa_compliance_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ncaa_compliance` ADD CONSTRAINT `ncaa_compliance_reviewedBy_users_id_fk` FOREIGN KEY (`reviewedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `nil_contracts` ADD CONSTRAINT `nil_contracts_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `security_incidents` ADD CONSTRAINT `security_incidents_detectedBy_users_id_fk` FOREIGN KEY (`detectedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `security_incidents` ADD CONSTRAINT `security_incidents_resolvedBy_users_id_fk` FOREIGN KEY (`resolvedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `signing_day_streams` ADD CONSTRAINT `signing_day_streams_commitmentId_athlete_commitments_id_fk` FOREIGN KEY (`commitmentId`) REFERENCES `athlete_commitments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stream_chat` ADD CONSTRAINT `stream_chat_streamId_signing_day_streams_id_fk` FOREIGN KEY (`streamId`) REFERENCES `signing_day_streams`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stream_chat` ADD CONSTRAINT `stream_chat_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transfer_portal_alerts` ADD CONSTRAINT `transfer_portal_alerts_schoolSubscriptionId_school_subscriptions_id_fk` FOREIGN KEY (`schoolSubscriptionId`) REFERENCES `school_subscriptions`(`id`) ON DELETE no action ON UPDATE no action;