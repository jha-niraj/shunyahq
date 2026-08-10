import { createId } from "@paralleldrive/cuid2";
import { boolean, index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

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
		/** Did they opt in to the SyncHQ AI intake session at the end of the contact flow?
		 *  Nullable so records created before the step existed stay valid. */
		intakeOptIn: boolean("intakeOptIn"),
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

/**
 * The admin panel's single credential.
 *
 * There is no user table and no email: /admin is one private surface behind one password, so a
 * whole identity model would be scaffolding around a single secret. The table holds exactly one
 * row, keyed on a fixed id so a second credential cannot be inserted by accident.
 *
 * `passwordHash` is scrypt with a per-row salt (see lib/admin/password.ts) - never the password
 * itself, so a database dump does not hand over access.
 *
 * `failedAttempts` / `lockedUntil` are stored here rather than in memory on purpose: an in-process
 * counter resets on every deploy and is per-instance, which makes it useless against exactly the
 * patient brute-force it is supposed to stop.
 */
/** The one row's primary key. Read by id so a stray second row can never become the credential. */
export const ADMIN_CREDENTIAL_ID = "singleton";

export const adminCredential = pgTable("AdminCredential", {
	id: text("id").primaryKey(),
	passwordHash: text("passwordHash").notNull(),
	failedAttempts: integer("failedAttempts").notNull().default(0),
	lockedUntil: timestamp("lockedUntil", { precision: 3, mode: "date" }),
	lastLoginAt: timestamp("lastLoginAt", { precision: 3, mode: "date" }),
	createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" })
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export type AdminCredential = typeof adminCredential.$inferSelect;
