DROP TABLE `athlete_profiles`;--> statement-breakpoint
DROP TABLE `baseball_fielding_stats`;--> statement-breakpoint
DROP TABLE `baseball_hitting_stats`;--> statement-breakpoint
DROP TABLE `baseball_pitching_stats`;--> statement-breakpoint
DROP TABLE `bot_conversations`;--> statement-breakpoint
DROP TABLE `bot_messages`;--> statement-breakpoint
DROP TABLE `college_interests`;--> statement-breakpoint
DROP TABLE `college_visits`;--> statement-breakpoint
DROP TABLE `colleges`;--> statement-breakpoint
DROP TABLE `credit_transactions`;--> statement-breakpoint
DROP TABLE `follows`;--> statement-breakpoint
DROP TABLE `messages`;--> statement-breakpoint
DROP TABLE `nil_deals`;--> statement-breakpoint
DROP TABLE `notifications`;--> statement-breakpoint
DROP TABLE `subscriptions`;--> statement-breakpoint
DROP TABLE `videos`;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `subscriptionTier`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `creditsBalance`;