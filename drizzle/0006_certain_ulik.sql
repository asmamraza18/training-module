ALTER TABLE `users` ADD `quiz_result` real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `quiz` DROP COLUMN `status`;