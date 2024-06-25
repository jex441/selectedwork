ALTER TABLE "users_table" RENAME COLUMN "name" TO "firstName";--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "lastName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "username" text NOT NULL;