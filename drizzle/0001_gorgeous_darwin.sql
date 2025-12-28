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
ALTER TABLE `early_access_signups` ADD CONSTRAINT `early_access_signups_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `early_access_signups` ADD CONSTRAINT `early_access_signups_sportId_sports_id_fk` FOREIGN KEY (`sportId`) REFERENCES `sports`(`id`) ON DELETE no action ON UPDATE no action;