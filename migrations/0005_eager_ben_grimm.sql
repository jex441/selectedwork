ALTER TABLE "items_table" DROP CONSTRAINT "items_table_media_table_id_media_table_id_fk";
--> statement-breakpoint
ALTER TABLE "media_table" ADD COLUMN "item_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "domain" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "flagged" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "student" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "url" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media_table" ADD CONSTRAINT "media_table_item_id_items_table_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "items_table" DROP COLUMN IF EXISTS "media_table_id";