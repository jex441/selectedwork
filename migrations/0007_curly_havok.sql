ALTER TABLE "sections_table" DROP CONSTRAINT "sections_table_user_id_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "section_attributes_table" DROP CONSTRAINT "section_attributes_table_user_id_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "users_table" ALTER COLUMN "authId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "sections_table" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "section_attributes_table" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "users_table" DROP COLUMN IF EXISTS "flagged";--> statement-breakpoint
ALTER TABLE "users_table" DROP COLUMN IF EXISTS "student";--> statement-breakpoint
DROP SCHEMA "my_schema";
