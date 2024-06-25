CREATE TABLE IF NOT EXISTS "media_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"url" text,
	"type" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sections_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"page_id" integer NOT NULL,
	"type" text,
	"order" integer,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "section_attributes_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"tag" text,
	"value" text,
	"section_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "works_table" RENAME TO "items_table";--> statement-breakpoint
ALTER TABLE "items_table" RENAME COLUMN "mainImg" TO "media_table_id";--> statement-breakpoint
ALTER TABLE "items_table" DROP CONSTRAINT "works_table_user_id_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "items_table" ALTER COLUMN "media_table_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "items_table" ALTER COLUMN "media_table_id" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sections_table" ADD CONSTRAINT "sections_table_page_id_pages_table_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sections_table" ADD CONSTRAINT "sections_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "section_attributes_table" ADD CONSTRAINT "section_attributes_table_section_id_sections_table_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "section_attributes_table" ADD CONSTRAINT "section_attributes_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "items_table" ADD CONSTRAINT "items_table_media_table_id_media_table_id_fk" FOREIGN KEY ("media_table_id") REFERENCES "public"."media_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "items_table" ADD CONSTRAINT "items_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "pages_table" DROP COLUMN IF EXISTS "subheading";--> statement-breakpoint
ALTER TABLE "pages_table" DROP COLUMN IF EXISTS "content";