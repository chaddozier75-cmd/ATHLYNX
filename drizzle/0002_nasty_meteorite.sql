CREATE TABLE `algorithm_recommendations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`recommendationType` varchar(100) NOT NULL,
	`recommendedItemId` int,
	`recommendedItemType` varchar(100),
	`score` decimal(5,4),
	`wasViewed` enum('yes','no') NOT NULL DEFAULT 'no',
	`wasClicked` enum('yes','no') NOT NULL DEFAULT 'no',
	`wasConverted` enum('yes','no') NOT NULL DEFAULT 'no',
	`viewedAt` timestamp,
	`clickedAt` timestamp,
	`convertedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `algorithm_recommendations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `daily_analytics_summary` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` date NOT NULL,
	`totalUsers` int NOT NULL DEFAULT 0,
	`newUsers` int NOT NULL DEFAULT 0,
	`activeUsers` int NOT NULL DEFAULT 0,
	`totalSessions` int NOT NULL DEFAULT 0,
	`totalPageViews` int NOT NULL DEFAULT 0,
	`avgSessionDuration` int NOT NULL DEFAULT 0,
	`bounceRate` decimal(5,2),
	`conversionRate` decimal(5,2),
	`topPages` json,
	`topReferrers` json,
	`deviceBreakdown` json,
	`socialMediaBreakdown` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `daily_analytics_summary_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `feature_usage` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`featureName` varchar(100) NOT NULL,
	`featureCategory` varchar(100),
	`usageCount` int NOT NULL DEFAULT 1,
	`totalDuration` int NOT NULL DEFAULT 0,
	`lastUsedAt` timestamp NOT NULL DEFAULT (now()),
	`firstUsedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `feature_usage_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `page_views` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`sessionId` varchar(64) NOT NULL,
	`pagePath` varchar(500) NOT NULL,
	`pageTitle` varchar(255),
	`referrer` varchar(500),
	`userAgent` text,
	`ipAddress` varchar(45),
	`deviceType` enum('desktop','tablet','mobile'),
	`browser` varchar(50),
	`os` varchar(50),
	`country` varchar(100),
	`city` varchar(100),
	`duration` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `page_views_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `social_media_referrals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`platform` enum('facebook','instagram','twitter','tiktok','youtube','linkedin','snapchat','threads','whatsapp','wechat','other') NOT NULL,
	`referralUrl` varchar(500),
	`campaignId` varchar(100),
	`postId` varchar(255),
	`clickCount` int NOT NULL DEFAULT 1,
	`signupCount` int NOT NULL DEFAULT 0,
	`conversionCount` int NOT NULL DEFAULT 0,
	`lastClickAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `social_media_referrals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`sessionId` varchar(64) NOT NULL,
	`eventType` varchar(100) NOT NULL,
	`eventCategory` varchar(100),
	`eventAction` varchar(255),
	`eventLabel` varchar(255),
	`eventValue` int,
	`pagePath` varchar(500),
	`elementId` varchar(100),
	`elementClass` varchar(255),
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_referrals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`referrerId` int NOT NULL,
	`referredUserId` int,
	`referralCode` varchar(20) NOT NULL,
	`status` enum('pending','clicked','signed_up','converted','rewarded') NOT NULL DEFAULT 'pending',
	`rewardType` varchar(50),
	`rewardAmount` int,
	`rewardedAt` timestamp,
	`clickedAt` timestamp,
	`signedUpAt` timestamp,
	`convertedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_referrals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`sessionId` varchar(64) NOT NULL,
	`startTime` timestamp NOT NULL DEFAULT (now()),
	`endTime` timestamp,
	`pageCount` int NOT NULL DEFAULT 0,
	`eventCount` int NOT NULL DEFAULT 0,
	`totalDuration` int,
	`entryPage` varchar(500),
	`exitPage` varchar(500),
	`referrerSource` varchar(255),
	`referrerMedium` varchar(100),
	`referrerCampaign` varchar(255),
	`deviceType` enum('desktop','tablet','mobile'),
	`isConverted` enum('yes','no') NOT NULL DEFAULT 'no',
	`conversionType` varchar(100),
	CONSTRAINT `user_sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_sessions_sessionId_unique` UNIQUE(`sessionId`)
);
--> statement-breakpoint
ALTER TABLE `algorithm_recommendations` ADD CONSTRAINT `algorithm_recommendations_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `feature_usage` ADD CONSTRAINT `feature_usage_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `page_views` ADD CONSTRAINT `page_views_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `social_media_referrals` ADD CONSTRAINT `social_media_referrals_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_events` ADD CONSTRAINT `user_events_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_referrals` ADD CONSTRAINT `user_referrals_referrerId_users_id_fk` FOREIGN KEY (`referrerId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_referrals` ADD CONSTRAINT `user_referrals_referredUserId_users_id_fk` FOREIGN KEY (`referredUserId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_sessions` ADD CONSTRAINT `user_sessions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;