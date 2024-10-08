CREATE TABLE IF NOT EXISTS "landing_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"visibility" boolean DEFAULT false NOT NULL,
	"heading" text,
	"subheading" text,
	"imgSrc" text,
	"template" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "work_table" ALTER COLUMN "sold" SET DATA TYPE boolean;--> statement-breakpoint
ALTER TABLE "work_table" ALTER COLUMN "sold" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "cv_table" ADD COLUMN "pdf" text;--> statement-breakpoint
ALTER TABLE "cv_table" ADD COLUMN "pdfName" text;--> statement-breakpoint
ALTER TABLE "media_table" ADD COLUMN "idx" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "instagram" text;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "sideNav" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "template" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "landing_table" ADD CONSTRAINT "landing_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
