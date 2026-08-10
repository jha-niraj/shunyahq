import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto"
import { promisify } from "node:util"

/**
 * Password hashing for the admin credential.
 *
 * scrypt from node's own crypto - no dependency, and memory-hard, which is the property that makes
 * a GPU brute force expensive rather than merely slow. Node runtime only: this module must never be
 * imported from middleware, which runs on the edge and has no node:crypto.
 *
 * Stored format: `scrypt$<N>$<r>$<p>$<saltHex>$<hashHex>`. The parameters travel with the hash so
 * raising the cost later does not invalidate rows written before the change.
 */

const scrypt = promisify(scryptCb) as (
    password: string | Buffer,
    salt: string | Buffer,
    keylen: number,
    options: { N: number; r: number; p: number; maxmem: number },
) => Promise<Buffer>

const N = 16384
const R = 8
const P = 1
const KEYLEN = 64
// Node's default maxmem (32MB) is below what N=16384, r=8 needs, so it must be raised explicitly
// or scrypt throws rather than running.
const MAXMEM = 64 * 1024 * 1024

export async function hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16)
    const hash = await scrypt(password, salt, KEYLEN, { N, r: R, p: P, maxmem: MAXMEM })
    return `scrypt$${N}$${R}$${P}$${salt.toString("hex")}$${hash.toString("hex")}`
}

/**
 * Constant-time verification.
 *
 * Every failure path returns `false` rather than throwing, and a malformed stored hash is treated
 * as a non-match - so a corrupted row locks the panel rather than opening it.
 */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
    try {
        const parts = stored.split("$")
        if (parts.length !== 6 || parts[0] !== "scrypt") return false

        const [, nStr, rStr, pStr, saltHex, hashHex] = parts
        const n = Number(nStr)
        const r = Number(rStr)
        const p = Number(pStr)
        if (!Number.isInteger(n) || !Number.isInteger(r) || !Number.isInteger(p)) return false

        const expected = Buffer.from(hashHex, "hex")
        if (expected.length === 0) return false

        const actual = await scrypt(password, Buffer.from(saltHex, "hex"), expected.length, {
            N: n,
            r,
            p,
            maxmem: MAXMEM,
        })

        // timingSafeEqual throws on a length mismatch, so the lengths are checked first - and the
        // check itself is not a leak, since the hash length is public information.
        if (actual.length !== expected.length) return false
        return timingSafeEqual(actual, expected)
    } catch {
        return false
    }
}
