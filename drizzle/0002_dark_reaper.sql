CREATE TABLE `quiz` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`training_id` integer NOT NULL,
	`question` text NOT NULL,
	`options` text NOT NULL,
	`correct_answer` integer NOT NULL,
	`status` text DEFAULT 'not_started' NOT NULL,
	FOREIGN KEY (`training_id`) REFERENCES `trainings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP INDEX IF EXISTS "users_email_unique";--> statement-breakpoint
ALTER TABLE `modules` ALTER COLUMN "description" TO "description" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `modules` ADD `icon` text;--> statement-breakpoint
ALTER TABLE `modules` ADD `recommended` text NOT NULL;--> statement-breakpoint
ALTER TABLE `modules` DROP COLUMN `training_id`;--> statement-breakpoint
ALTER TABLE `modules` DROP COLUMN `order`;--> statement-breakpoint
ALTER TABLE `modules` DROP COLUMN `duration`;--> statement-breakpoint
ALTER TABLE `modules` DROP COLUMN `content`;--> statement-breakpoint
ALTER TABLE `trainings` ADD `thumbnail` text;--> statement-breakpoint
ALTER TABLE `trainings` ADD `order` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `trainings` ADD `module_id` integer NOT NULL REFERENCES modules(id);--> statement-breakpoint
ALTER TABLE `trainings` DROP COLUMN `created_at`;