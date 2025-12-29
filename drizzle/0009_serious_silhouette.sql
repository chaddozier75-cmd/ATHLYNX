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
ALTER TABLE `fca_comments` ADD CONSTRAINT `fca_comments_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `fca_prayer_requests` ADD CONSTRAINT `fca_prayer_requests_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `fca_testimonies` ADD CONSTRAINT `fca_testimonies_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;