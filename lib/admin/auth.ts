import "server-only"

import { cookies } from "next/headers"
import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { adminCredential, ADMIN_CREDENTIAL_ID } from "@/lib/db/schema"
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "./session"

/**
 * Server-side admin gate.
 *
 * `middleware.ts` already turns unauthenticated traffic away at the edge, but middleware alone is
 * NOT a security boundary for this app:
 *
 *  - Server actions are POSTs to the page's own route. A matcher that only guards page navigations
 *    leaves them reachable, so every admin action calls `requireAdmin()` itself.
 *  - Middleware verifies the signature and expiry but cannot reach Postgres from the edge, so it
 *    cannot know the password has since been rotated. That check lives here.
 *
 * The rule this file exists to enforce: nothing in /admin reads or writes data without going
 * through `requireAdmin()` first. `server-only` makes importing it from a client component a build
 * error rather than a runtime surprise.
 */

/** Bumped whenever the password changes, which invalidates every session minted before it. */
function credentialVersion(updatedAt: Date): string {
    return String(updatedAt.getTime())
}

export async function getAdminCredential() {
    const [row] = await db
        .select()
        .from(adminCredential)
        .where(eq(adminCredential.id, ADMIN_CREDENTIAL_ID))
        .limit(1)

    return row ?? null
}

export { credentialVersion }

/**
 * True only for a signed, unexpired session whose credential version still matches the row in the
 * database. Never throws - a database that is down returns false, so an outage locks the panel
 * rather than opening it.
 */
export async function isAdminAuthenticated(): Promise<boolean> {
    try {
        const store = await cookies()
        const payload = await verifySessionToken(store.get(ADMIN_SESSION_COOKIE)?.value)
        if (!payload) return false

        const credential = await getAdminCredential()
        if (!credential) return false

        return payload.cv === credentialVersion(credential.updatedAt)
    } catch {
        return false
    }
}

/**
 * Guard for admin server actions. Throws rather than returning a flag so a forgotten `if` cannot
 * silently leave an action open.
 */
export async function requireAdmin(): Promise<void> {
    if (!(await isAdminAuthenticated())) {
        throw new Error("Not authorised")
    }
}
