CREATE TABLE "settings" (
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp,
	"id" integer
);
