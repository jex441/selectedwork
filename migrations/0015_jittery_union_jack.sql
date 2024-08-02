CREATE TABLE IF NOT EXISTS "collection_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"index" integer,
	"idx" serial NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"template" text NOT NULL,
	"heading" text,
	"subheading" text,
	"description" text,
	"linkSrc1" text,
	"linkText1" text,
	"linkSrc2" text,
	"linkText2" text,
	"imgSrc" text,
	"imgCaption" text,
	"visibility" text DEFAULT 'private',
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contact_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"template" text NOT NULL,
	"heading" text,
	"subheading" text,
	"text" text,
	"linkSrc1" text,
	"linkText1" text,
	"linkSrc2" text,
	"linkText2" text,
	"instagram" text,
	"tiktok" text,
	"facebook" text,
	"twitter" text,
	"linkedin" text,
	"email" text,
	"phone" text,
	"address" text,
	"imgSrc" text,
	"imgCaption" text,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cv_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"template" text NOT NULL,
	"heading" text,
	"subheading" text,
	"imgSrc" text,
	"imgCaption" text,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cv_section_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"categoryId" text NOT NULL,
	"category" text NOT NULL,
	"title" text,
	"organization" text,
	"location" text,
	"startDate" text,
	"endDate" text,
	"bulletPoint1" text,
	"bulletPoint2" text,
	"bulletPoint3" text,
	"order" integer,
	"cv_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "work_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"index" integer,
	"idx" serial NOT NULL,
	"title" text,
	"medium" text,
	"description" text,
	"year" text,
	"height" text,
	"width" text,
	"depth" text,
	"unit" text,
	"price" text,
	"currency" text,
	"sold" text DEFAULT 'false',
	"location" text,
	"displayHeight" text,
	"displayWidth" text,
	"hidden" text DEFAULT 'false',
	"collection_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
DROP TABLE "items_table";--> statement-breakpoint
DROP TABLE "sections_table";--> statement-breakpoint
DROP TABLE "section_attributes_table";--> statement-breakpoint
ALTER TABLE "media_table" DROP CONSTRAINT "media_table_item_id_items_table_id_fk";
--> statement-breakpoint
ALTER TABLE "media_table" ALTER COLUMN "url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "about_table" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "media_table" ADD COLUMN "work_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "media_table" ADD COLUMN "main" text DEFAULT 'false';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collection_table" ADD CONSTRAINT "collection_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contact_table" ADD CONSTRAINT "contact_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cv_table" ADD CONSTRAINT "cv_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cv_section_table" ADD CONSTRAINT "cv_section_table_cv_id_cv_table_id_fk" FOREIGN KEY ("cv_id") REFERENCES "public"."cv_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "work_table" ADD CONSTRAINT "work_table_collection_id_collection_table_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collection_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media_table" ADD CONSTRAINT "media_table_work_id_work_table_id_fk" FOREIGN KEY ("work_id") REFERENCES "public"."work_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "media_table" DROP COLUMN IF EXISTS "item_id";--> statement-breakpoint
ALTER TABLE "media_table" DROP COLUMN IF EXISTS "title";