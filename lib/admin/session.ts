/**
 * Admin session tokens.
 *
 * Deliberately built on Web Crypto rather than `node:crypto`, because this module is imported by
 * `middleware.ts`, which runs on the edge runtime where `node:crypto` does not exist. Web Crypto is
 * available in both runtimes, so one implementation serves middleware and server components alike.
 *
 * The token is a stateless HMAC: `<payloadBase64Url>.<signatureBase64Url>`. There is no session
 * table because there is one user - a row per login would buy nothing that an expiry does not.
 * Everything about the token is public except the signature, so it carries no secret: forging one
 * requires the signing key, and tampering with the expiry invalidates the signature.
 */

export const ADMIN_SESSION_COOKIE = "shq_admin_session"

/** Eight hours. Long enough for a working day, short enough that a stolen cookie ages out. */
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8

type SessionPayload = {
    /** Issued at, epoch seconds. */
    iat: number
    /** Expires at, epoch seconds. */
    exp: number
    /**
     * Bound to the credential's `updatedAt`. Rotating the password moves this, which invalidates
     * every token minted against the old one - otherwise changing the password would leave already
     * issued sessions alive, which is precisely what you rotate a password to prevent.
     */
    cv: string
}

function base64UrlEncode(bytes: Uint8Array): string {
    let binary = ""
    for (const byte of bytes) binary += String.fromCharCode(byte)
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function base64UrlDecode(value: string): Uint8Array {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/")
    const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4))
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    return bytes
}

/**
 * The signing key.
 *
 * Returns null rather than falling back to a default when the secret is missing. A hardcoded
 * fallback would mean anyone who has read this repository can mint a valid admin session, so the
 * only safe behaviour is to fail closed: no secret, no sessions, nobody gets in.
 */
async function getKey(): Promise<CryptoKey | null> {
    const secret = process.env.ADMIN_SESSION_SECRET
    if (!secret || secret.length < 32) return null

    return crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign", "verify"],
    )
}

export function isSessionSecretConfigured(): boolean {
    const secret = process.env.ADMIN_SESSION_SECRET
    return !!secret && secret.length >= 32
}

export async function createSessionToken(credentialVersion: string): Promise<string | null> {
    const key = await getKey()
    if (!key) return null

    const now = Math.floor(Date.now() / 1000)
    const payload: SessionPayload = {
        iat: now,
        exp: now + ADMIN_SESSION_MAX_AGE_SECONDS,
        cv: credentialVersion,
    }

    const payloadBytes = new TextEncoder().encode(JSON.stringify(payload))
    const encodedPayload = base64UrlEncode(payloadBytes)
    const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(encodedPayload))

    return `${encodedPayload}.${base64UrlEncode(new Uint8Array(signature))}`
}

/**
 * Verify signature and expiry.
 *
 * `crypto.subtle.verify` is constant-time, so this does not leak how much of a forged signature was
 * correct. Returns the payload only when the token is genuinely valid; every failure returns null.
 */
export async function verifySessionToken(token: string | undefined | null): Promise<SessionPayload | null> {
    if (!token) return null

    const key = await getKey()
    if (!key) return null

    const dot = token.indexOf(".")
    if (dot <= 0) return null

    const encodedPayload = token.slice(0, dot)
    const encodedSignature = token.slice(dot + 1)
    if (!encodedSignature) return null

    try {
        const valid = await crypto.subtle.verify(
            "HMAC",
            key,
            base64UrlDecode(encodedSignature) as unknown as ArrayBuffer,
            new TextEncoder().encode(encodedPayload),
        )
        if (!valid) return null

        const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(encodedPayload))) as SessionPayload
        if (typeof payload?.exp !== "number" || typeof payload?.cv !== "string") return null
        if (payload.exp <= Math.floor(Date.now() / 1000)) return null

        return payload
    } catch {
        return null
    }
}
