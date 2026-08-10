/**
 * Set (or reset) the admin panel password.
 *
 *   pnpm admin:set-password '<new password>'
 *
 * Also the recovery path if you use `pnpm db:push`: push creates the AdminCredential table from the
 * schema but never inserts a row, so the panel would have no credential to check against. Running
 * this once fills it in.
 *
 * The password is taken as an argument rather than read from a file so it is never committed.
 */
import { db } from "../lib/db"
import { adminCredential, ADMIN_CREDENTIAL_ID } from "../lib/db/schema"
import { hashPassword } from "../lib/admin/password"
import { eq } from "drizzle-orm"

async function main() {
    const password = process.argv[2]

    if (!password) {
        console.error("Usage: pnpm admin:set-password '<new password>'")
        process.exit(1)
    }
    if (password.length < 8) {
        console.error("Refusing to set a password shorter than 8 characters.")
        process.exit(1)
    }

    const passwordHash = await hashPassword(password)

    // Upsert, so this works whether the row exists (rotation) or not (post db:push).
    // Resetting the lockout is deliberate: setting a new password should clear a lockout the old
    // one earned, otherwise you can lock yourself out of your own reset.
    await db
        .insert(adminCredential)
        .values({ id: ADMIN_CREDENTIAL_ID, passwordHash, failedAttempts: 0, lockedUntil: null })
        .onConflictDoUpdate({
            target: adminCredential.id,
            set: { passwordHash, failedAttempts: 0, lockedUntil: null, updatedAt: new Date() },
        })

    const [row] = await db
        .select({ id: adminCredential.id })
        .from(adminCredential)
        .where(eq(adminCredential.id, ADMIN_CREDENTIAL_ID))

    if (!row) {
        console.error("Password was not written - check DATABASE_URL points at the right database.")
        process.exit(1)
    }

    console.log("Admin password updated. Any existing admin sessions remain valid until they expire.")
    process.exit(0)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
