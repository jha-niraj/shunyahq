import { createId } from "@paralleldrive/cuid2";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const contact = pgTable(
	"Contact",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => createId()),
		inquiryType: text("inquiryType").notNull(),
		name: text("name").notNull(),
		email: text("email").notNull(),
		message: text("message").notNull(),
		createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" })
			.notNull()
			.defaultNow()
			.$onUpdate(() => new Date()),
	},
	(table) => [index("Contact_email_idx").on(table.email)]
);

export type Contact = typeof contact.$inferSelect;
export type NewContact = typeof contact.$inferInsert;
