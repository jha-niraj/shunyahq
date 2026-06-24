CREATE TABLE "Contact" (
	"id" text PRIMARY KEY NOT NULL,
	"inquiryType" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "Contact_email_idx" ON "Contact" USING btree ("email");