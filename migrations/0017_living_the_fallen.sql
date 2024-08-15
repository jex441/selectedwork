ALTER TABLE "users_table" ADD COLUMN "customerId" text;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "subscriptionId" text;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "hibernate" boolean DEFAULT false NOT NULL;