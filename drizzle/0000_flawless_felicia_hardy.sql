CREATE TABLE `module_progress` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`module_id` integer NOT NULL,
	`status` text DEFAULT 'not_started' NOT NULL,
	`progress` real DEFAULT 0 NOT NULL,
	`started_at` integer,
	`completed_at` integer,
	`last_accessed_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`module_id`) REFERENCES `modules`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `modules` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`training_id` integer NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`order` integer NOT NULL,
	`duration` integer,
	`content` text,
	FOREIGN KEY (`training_id`) REFERENCES `trainings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `training_progress` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`training_id` integer NOT NULL,
	`status` text DEFAULT 'not_started' NOT NULL,
	`progress` real DEFAULT 0 NOT NULL,
	`started_at` integer,
	`completed_at` integer,
	`last_accessed_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`training_id`) REFERENCES `trainings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `trainings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`duration` integer,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);