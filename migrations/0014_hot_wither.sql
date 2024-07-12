CREATE TABLE IF NOT EXISTS "about_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"template" text NOT NULL,
	"heading" text,
	"subheading" text,
	"text" text,
	"linkSrc1" text,
	"linkText1" text,
	"linkSrc2" text,
	"linkText2" text,
	"linkSrc3" text,
	"linkText3" text,
	"imgSrc" text,
	"imgCaption" text,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "about_table" ADD CONSTRAINT "about_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
