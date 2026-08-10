"use server"

import { cookies } from "next/headers"
import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { adminCredential, ADMIN_CREDENTIAL_ID } from "@/lib/db/schema"
import { verifyPassword } from "@/lib/admin/password"
import { credentialVersion, getAdminCredential, isAdminAuthenticated } from "@/lib/admin/auth"
import {
    ADMIN_SESSION_COOKIE,
    ADMIN_SESSION_MAX_AGE_SECONDS,
    createSessionToken,
    isSessionSecretConfigured,
} from "@/lib/admin/session"

/**
 * Login and logout for the admin panel.
 *
 * Threat model this is written against: someone who can hit the endpoint as often as they like and
 * has read the source. So -
 *
 *  - The password never leaves the server. The client posts it once and gets back a boolean.
 *  - Comparison is constant-time scrypt (lib/admin/password.ts), so response timing does not leak
 *    how much of a guess was right.
 *  - Failures are counted IN THE DATABASE and lock the credential. An in-memory counter would be
 *    per-instance and reset on deploy, which is no protection at all against a patient attacker.
 *  - Every failure returns the same message. "Wrong password" versus "no credential configured"
 *    tells an attacker which half of the system to attack next.
 */

/** Failed attempts allowed before the panel locks. */
const MAX_ATTEMPTS = 5
/** How long a lockout lasts. */
const LOCKOUT_MS = 15 * 60 * 1000

type LoginResult = { ok: true } | { ok: false; error: string; lockedUntil?: number }

const GENERIC_FAILURE = "Incorrect password."

export async function adminLogin(password: string): Promise<LoginResult> {
    // Fail closed on a missing signing secret. Without it no valid session can be minted, so
    // accepting the password would leave the user typing a correct password into a door that never
    // opens - this at least says why. It is the one specific error worth surfacing, because it is a
    // deployment mistake rather than an attack.
    if (!isSessionSecretConfigured()) {
        return {
            ok: false,
            error: "Admin sign-in is not configured: ADMIN_SESSION_SECRET is missing or shorter than 32 characters.",
        }
    }

    if (typeof password !== "string" || password.length === 0 || password.length > 512) {
        return { ok: false, error: GENERIC_FAILURE }
    }

    try {
        const credential = await getAdminCredential()
        if (!credential) return { ok: false, error: GENERIC_FAILURE }

        const now = new Date()
        if (credential.lockedUntil && credential.lockedUntil > now) {
            return {
                ok: false,
                error: "Too many attempts. Try again later.",
                lockedUntil: credential.lockedUntil.getTime(),
            }
        }

        const valid = await verifyPassword(password, credential.passwordHash)

        if (!valid) {
            const failedAttempts = credential.failedAttempts + 1
            const locked = failedAttempts >= MAX_ATTEMPTS
            await db
                .update(adminCredential)
                .set({
                    failedAttempts: locked ? 0 : failedAttempts,
                    lockedUntil: locked ? new Date(Date.now() + LOCKOUT_MS) : null,
                })
                .where(eq(adminCredential.id, ADMIN_CREDENTIAL_ID))

            if (locked) {
                return {
                    ok: false,
                    error: "Too many attempts. Try again later.",
                    lockedUntil: Date.now() + LOCKOUT_MS,
                }
            }
            return { ok: false, error: GENERIC_FAILURE }
        }

        // Success. Clear the counter, but do NOT touch `updatedAt` - it is the credential version
        // every live session is bound to, so bumping it here would sign the user out of every other
        // tab the moment they signed in.
        await db
            .update(adminCredential)
            .set({ failedAttempts: 0, lockedUntil: null, lastLoginAt: now, updatedAt: credential.updatedAt })
            .where(eq(adminCredential.id, ADMIN_CREDENTIAL_ID))

        const token = await createSessionToken(credentialVersion(credential.updatedAt))
        if (!token) return { ok: false, error: GENERIC_FAILURE }

        const store = await cookies()
        store.set(ADMIN_SESSION_COOKIE, token, {
            // httpOnly: script on the page cannot read it, so an XSS bug cannot exfiltrate the session.
            httpOnly: true,
            // lax: the cookie rides top-level navigations but not cross-site POSTs, which is the
            // CSRF property that matters for the destructive actions behind this panel.
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
        })

        return { ok: true }
    } catch (error) {
        console.error("Admin login failed:", error)
        return { ok: false, error: GENERIC_FAILURE }
    }
}

export async function adminLogout(): Promise<{ ok: true }> {
    const store = await cookies()
    store.delete(ADMIN_SESSION_COOKIE)
    return { ok: true }
}

/** Lets the client chrome (e.g. the sidebar) reflect session state without trusting the client. */
export async function checkAdminSession(): Promise<{ authenticated: boolean }> {
    return { authenticated: await isAdminAuthenticated() }
}
