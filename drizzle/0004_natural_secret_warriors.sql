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
