CREATE TABLE `athlete_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`sportId` int NOT NULL,
	`firstName` varchar(100) NOT NULL,
	`lastName` varchar(100) NOT NULL,
	`dateOfBirth` timestamp,
	`profilePhotoUrl` text,
	`jerseyNumber` varchar(10),
	`heightFeet` int,
	`heightInches` int,
	`weight` int,
	`primaryPosition` varchar(50),
	`secondaryPosition` varchar(50),
	`bats` enum('L','R','S'),
	`throws` enum('L','R'),
	`city` varchar(100),
	`state` varchar(50),
	`country` varchar(100) DEFAULT 'USA',
	`highSchool` varchar(200),
	`gradYear` int,
	`gpa` decimal(3,2),
	`satScore` int,
	`actScore` int,
	`travelTeam` varchar(200),
	`clubTeam` varchar(200),
	`phoneNumber` varchar(20),
	`instagramHandle` varchar(100),
	`twitterHandle` varchar(100),
	`tiktokHandle` varchar(100),
	`commitmentStatus` enum('uncommitted','committed','signed') DEFAULT 'uncommitted',
	`committedCollegeId` int,
	`commitmentDate` timestamp,
	`isPublic` boolean DEFAULT true,
	`isSearchable` boolean DEFAULT true,
	`nationalRank` int,
	`stateRank` int,
	`positionRank` int,
	`bio` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `athlete_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `baseball_fielding_stats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`athleteProfileId` int NOT NULL,
	`season` varchar(20) NOT NULL,
	`position` varchar(50) NOT NULL,
	`gamesPlayed` int DEFAULT 0,
	`putouts` int DEFAULT 0,
	`assists` int DEFAULT 0,
	`errors` int DEFAULT 0,
	`doublePlays` int DEFAULT 0,
	`fieldingPercentage` decimal(4,3),
	`throwingVelocity` int,
	`popTime` decimal(3,2),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `baseball_fielding_stats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `baseball_hitting_stats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`athleteProfileId` int NOT NULL,
	`season` varchar(20) NOT NULL,
	`level` varchar(50),
	`gamesPlayed` int DEFAULT 0,
	`atBats` int DEFAULT 0,
	`runs` int DEFAULT 0,
	`hits` int DEFAULT 0,
	`doubles` int DEFAULT 0,
	`triples` int DEFAULT 0,
	`homeRuns` int DEFAULT 0,
	`rbi` int DEFAULT 0,
	`walks` int DEFAULT 0,
	`strikeouts` int DEFAULT 0,
	`stolenBases` int DEFAULT 0,
	`caughtStealing` int DEFAULT 0,
	`hitByPitch` int DEFAULT 0,
	`sacrificeFlies` int DEFAULT 0,
	`sacrificeBunts` int DEFAULT 0,
	`battingAverage` decimal(4,3),
	`onBasePercentage` decimal(4,3),
	`sluggingPercentage` decimal(4,3),
	`ops` decimal(5,3),
	`exitVelocity` int,
	`sixtyYardDash` decimal(4,2),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `baseball_hitting_stats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `baseball_pitching_stats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`athleteProfileId` int NOT NULL,
	`season` varchar(20) NOT NULL,
	`level` varchar(50),
	`gamesPlayed` int DEFAULT 0,
	`gamesStarted` int DEFAULT 0,
	`wins` int DEFAULT 0,
	`losses` int DEFAULT 0,
	`saves` int DEFAULT 0,
	`completeGames` int DEFAULT 0,
	`shutouts` int DEFAULT 0,
	`inningsPitched` decimal(5,1) DEFAULT '0.0',
	`hitsAllowed` int DEFAULT 0,
	`runsAllowed` int DEFAULT 0,
	`earnedRuns` int DEFAULT 0,
	`walks` int DEFAULT 0,
	`strikeouts` int DEFAULT 0,
	`homeRunsAllowed` int DEFAULT 0,
	`hitBatsmen` int DEFAULT 0,
	`wildPitches` int DEFAULT 0,
	`balks` int DEFAULT 0,
	`era` decimal(4,2),
	`whip` decimal(4,2),
	`strikeoutsPer9` decimal(4,2),
	`walksPer9` decimal(4,2),
	`fastballVelocity` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `baseball_pitching_stats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bot_conversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`botType` enum('training','recruiting','nil','video_analysis','social_media','career_path') NOT NULL,
	`title` varchar(200),
	`creditsUsed` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bot_conversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bot_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversationId` int NOT NULL,
	`role` enum('user','assistant') NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bot_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `college_interests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`athleteProfileId` int NOT NULL,
	`collegeId` int NOT NULL,
	`interestLevel` enum('high','medium','low') DEFAULT 'medium',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `college_interests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `college_visits` (
	`id` int AUTO_INCREMENT NOT NULL,
	`athleteProfileId` int NOT NULL,
	`collegeId` int NOT NULL,
	`visitType` enum('official','unofficial','camp') NOT NULL,
	`visitDate` timestamp,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `college_visits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `colleges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`logoUrl` text,
	`city` varchar(100),
	`state` varchar(50),
	`country` varchar(100) DEFAULT 'USA',
	`address` text,
	`division` enum('D1','D2','D3','NAIA','JUCO'),
	`conference` varchar(100),
	`baseballHeadCoach` varchar(200),
	`baseballStadium` varchar(200),
	`teamColors` varchar(100),
	`websiteUrl` text,
	`enrollment` int,
	`tuition` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `colleges_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `credit_transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`amount` int NOT NULL,
	`type` enum('purchase','usage','bonus','refund') NOT NULL,
	`description` text,
	`stripePaymentIntentId` varchar(255),
	`botConversationId` int,
	`balanceAfter` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `credit_transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `follows` (
	`id` int AUTO_INCREMENT NOT NULL,
	`followerId` int NOT NULL,
	`followedAthleteId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `follows_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`senderId` int NOT NULL,
	`recipientId` int NOT NULL,
	`subject` varchar(200),
	`content` text NOT NULL,
	`isRead` boolean DEFAULT false,
	`readAt` timestamp,
	`threadId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `nil_deals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`athleteProfileId` int NOT NULL,
	`brandId` int NOT NULL,
	`dealType` enum('social_post','appearance','autograph','endorsement','other') NOT NULL,
	`dealAmount` decimal(10,2) NOT NULL,
	`platformCommission` decimal(10,2),
	`description` text,
	`requirements` text,
	`status` enum('pending','accepted','completed','cancelled') DEFAULT 'pending',
	`startDate` timestamp,
	`endDate` timestamp,
	`completedDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `nil_deals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('message','follow','commitment','ranking_update','nil_deal','system') NOT NULL,
	`title` varchar(200) NOT NULL,
	`content` text,
	`isRead` boolean DEFAULT false,
	`readAt` timestamp,
	`linkUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`tier` enum('free','basic','pro','elite') NOT NULL,
	`status` enum('active','cancelled','expired') DEFAULT 'active',
	`stripeCustomerId` varchar(255),
	`stripeSubscriptionId` varchar(255),
	`currentPeriodStart` timestamp,
	`currentPeriodEnd` timestamp,
	`cancelAtPeriodEnd` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `videos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`athleteProfileId` int NOT NULL,
	`title` varchar(200) NOT NULL,
	`description` text,
	`videoUrl` text NOT NULL,
	`thumbnailUrl` text,
	`category` enum('highlight','game','showcase','skills','training') NOT NULL,
	`duration` int,
	`views` int DEFAULT 0,
	`isPublic` boolean DEFAULT true,
	`isFeatured` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `videos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','athlete','parent','coach','scout','agent','brand') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionTier` enum('free','basic','pro','elite') DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `creditsBalance` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `athlete_profiles` ADD CONSTRAINT `athlete_profiles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `athlete_profiles` ADD CONSTRAINT `athlete_profiles_sportId_sports_id_fk` FOREIGN KEY (`sportId`) REFERENCES `sports`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `athlete_profiles` ADD CONSTRAINT `athlete_profiles_committedCollegeId_colleges_id_fk` FOREIGN KEY (`committedCollegeId`) REFERENCES `colleges`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `baseball_fielding_stats` ADD CONSTRAINT `baseball_fielding_stats_athleteProfileId_athlete_profiles_id_fk` FOREIGN KEY (`athleteProfileId`) REFERENCES `athlete_profiles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `baseball_hitting_stats` ADD CONSTRAINT `baseball_hitting_stats_athleteProfileId_athlete_profiles_id_fk` FOREIGN KEY (`athleteProfileId`) REFERENCES `athlete_profiles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `baseball_pitching_stats` ADD CONSTRAINT `baseball_pitching_stats_athleteProfileId_athlete_profiles_id_fk` FOREIGN KEY (`athleteProfileId`) REFERENCES `athlete_profiles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bot_conversations` ADD CONSTRAINT `bot_conversations_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bot_messages` ADD CONSTRAINT `bot_messages_conversationId_bot_conversations_id_fk` FOREIGN KEY (`conversationId`) REFERENCES `bot_conversations`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `college_interests` ADD CONSTRAINT `college_interests_athleteProfileId_athlete_profiles_id_fk` FOREIGN KEY (`athleteProfileId`) REFERENCES `athlete_profiles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `college_interests` ADD CONSTRAINT `college_interests_collegeId_colleges_id_fk` FOREIGN KEY (`collegeId`) REFERENCES `colleges`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `college_visits` ADD CONSTRAINT `college_visits_athleteProfileId_athlete_profiles_id_fk` FOREIGN KEY (`athleteProfileId`) REFERENCES `athlete_profiles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `college_visits` ADD CONSTRAINT `college_visits_collegeId_colleges_id_fk` FOREIGN KEY (`collegeId`) REFERENCES `colleges`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `credit_transactions` ADD CONSTRAINT `credit_transactions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `credit_transactions` ADD CONSTRAINT `credit_transactions_botConversationId_bot_conversations_id_fk` FOREIGN KEY (`botConversationId`) REFERENCES `bot_conversations`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `follows` ADD CONSTRAINT `follows_followerId_users_id_fk` FOREIGN KEY (`followerId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `follows` ADD CONSTRAINT `follows_followedAthleteId_athlete_profiles_id_fk` FOREIGN KEY (`followedAthleteId`) REFERENCES `athlete_profiles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_senderId_users_id_fk` FOREIGN KEY (`senderId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_recipientId_users_id_fk` FOREIGN KEY (`recipientId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `nil_deals` ADD CONSTRAINT `nil_deals_athleteProfileId_athlete_profiles_id_fk` FOREIGN KEY (`athleteProfileId`) REFERENCES `athlete_profiles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `nil_deals` ADD CONSTRAINT `nil_deals_brandId_users_id_fk` FOREIGN KEY (`brandId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `videos` ADD CONSTRAINT `videos_athleteProfileId_athlete_profiles_id_fk` FOREIGN KEY (`athleteProfileId`) REFERENCES `athlete_profiles`(`id`) ON DELETE no action ON UPDATE no action;