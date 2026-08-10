import "server-only"

/**
 * The one way an enquiry leaves this site.
 *
 * This site no longer stores enquiries. SyncHQ is the CRM, so a contact submission is posted
 * straight to its public leads endpoint and becomes a lead there - which is also where the AI
 * intake session is sent from. Keeping a second copy in a local table would mean two inboxes to
 * check and two records to keep in step, and the local one would always be the stale one.
 *
 * Posted server-side, never from the browser: the secret would otherwise sit in the page source,
 * and the endpoint would need this origin allow-listed for CORS. As a server call it needs neither.
 */

/** Everything SyncHQ accepts. Only `name` or `email` is actually required by the endpoint. */
export type SyncHQLead = {
    name?: string
    email?: string
    company?: string
    message?: string
    /** Did they ask for a SyncHQ intake session? Drives the follow-up that gets sent. */
    wantsIntake?: boolean
    /** Anything else worth keeping. Field matching is alias-aware, so plain keys are fine. */
    data?: Record<string, unknown>
}

export type SyncHQResult =
    /** 201 created, or 200 for a duplicate inside SyncHQ's 24h window - both mean "they have it". */
    | { ok: true; duplicate: boolean }
    /** Anything else. `reason` is for our logs; the caller writes the visitor-facing copy. */
    | { ok: false; reason: string; status?: number }

/**
 * How long one attempt waits before giving up.
 *
 * Generous on purpose. A warm endpoint answers in a second or two, but the first request after a
 * deploy - or after a dev server starts - pays a cold start that can run well past ten seconds. A
 * tight timeout turns that one slow request into a lost lead, which is the exact failure this
 * integration cannot afford.
 */
const TIMEOUT_MS = 15_000

/**
 * Two attempts, because there is no local copy to fall back on.
 *
 * Retrying a POST is normally a way to create duplicates, but SyncHQ collapses repeats of the same
 * lead inside a 24h window and answers 200 for them - so the worst a retry can do here is get back
 * "already have it", which we treat as success anyway.
 */
const MAX_ATTEMPTS = 2
const RETRY_DELAY_MS = 400

type Config = { url: string; secret: string }

/**
 * Read the two env vars, or explain precisely what is wrong with them.
 *
 * Read at call time rather than at module scope. At module scope the values are captured during the
 * build, where they are absent, and the route would then be permanently misconfigured at runtime
 * even though the deployment has them set.
 */
function readConfig(): Config | { error: string } {
    const url = process.env.SYNCHQ_LEAD_URL?.trim()
    const secret = process.env.SYNCHQ_LEAD_SECRET?.trim()

    const missing = [!url && "SYNCHQ_LEAD_URL", !secret && "SYNCHQ_LEAD_SECRET"].filter(Boolean)
    if (missing.length) return { error: `missing env: ${missing.join(", ")}` }

    // The endpoint is handed over as a template with the origin left as `<your-app-origin>`.
    // Checked explicitly because an unsubstituted placeholder is otherwise a valid-looking URL that
    // fails at DNS - a confusing error a long way from its cause.
    if (/[<>]/.test(url!)) {
        return { error: `SYNCHQ_LEAD_URL still contains a placeholder: ${url}` }
    }

    let parsed: URL
    try {
        parsed = new URL(url!)
    } catch {
        return { error: `SYNCHQ_LEAD_URL is not a valid URL: ${url}` }
    }
    // The secret travels in a header, so the transport has to be one that encrypts headers.
    // localhost is exempt because there is no network to eavesdrop on.
    if (parsed.protocol !== "https:" && !["localhost", "127.0.0.1"].includes(parsed.hostname)) {
        return { error: `SYNCHQ_LEAD_URL must be https (got ${parsed.protocol}//)` }
    }

    return { url: parsed.toString(), secret: secret! }
}

/** Strip undefined and empty strings so we do not post keys that say nothing. */
function clean(lead: SyncHQLead): Record<string, unknown> {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(lead)) {
        if (v === undefined || v === null) continue
        if (typeof v === "string" && v.trim() === "") continue
        if (k === "data" && typeof v === "object" && !Object.keys(v).length) continue
        out[k] = v
    }
    return out
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function sendLeadToSyncHQ(lead: SyncHQLead): Promise<SyncHQResult> {
    const config = readConfig()
    if ("error" in config) {
        console.error("[synchq] not configured:", config.error)
        return { ok: false, reason: config.error }
    }

    const payload = JSON.stringify(clean(lead))
    let last: SyncHQResult = { ok: false, reason: "no attempt made" }
    let made = 0

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        made = attempt
        const outcome = await attemptSend(config, payload)
        if (outcome.ok) return outcome
        last = outcome

        // Only transient faults are worth repeating. A rejected key will be rejected again, a 422
        // will be unusable again, and retrying a 429 is how a rate limit turns into a longer one.
        if (!outcome.retryable || attempt === MAX_ATTEMPTS) break
        console.warn(`[synchq] attempt ${attempt} failed (${outcome.reason}), retrying`)
        await sleep(RETRY_DELAY_MS)
    }

    // Out of attempts. This is where a lead would be lost, so the payload goes to the log with it -
    // it is the only copy left anywhere, and it is recoverable by hand from here. The count is the
    // number actually made, not the ceiling: a non-retryable rejection stops at one, and a log that
    // claimed two would send whoever reads it looking for a second request that never happened.
    console.error(`[synchq] giving up after ${made} attempt(s): ${last.ok ? "" : last.reason}`, payload)
    return last
}

type Attempt = SyncHQResult & { retryable?: boolean }

async function attemptSend(config: Config, payload: string): Promise<Attempt> {
    let response: Response
    try {
        response = await fetch(config.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${config.secret}`,
            },
            body: payload,
            // Nothing about a POST is cacheable, and Next will happily cache a fetch it thinks is
            // idempotent. Stated explicitly so a framework default cannot swallow a submission.
            cache: "no-store",
            signal: AbortSignal.timeout(TIMEOUT_MS),
        })
    } catch (error) {
        const timedOut = error instanceof Error && error.name === "TimeoutError"
        return {
            ok: false,
            reason: timedOut ? `timed out after ${TIMEOUT_MS}ms` : error instanceof Error ? error.message : "network error",
            retryable: true,
        }
    }

    if (response.status === 201) return { ok: true, duplicate: false }
    if (response.status === 200) return { ok: true, duplicate: true }

    // 401 is deliberately ambiguous between a bad key and a bad secret, so there is nothing more
    // specific to say than "the credentials are wrong". 422 means SyncHQ kept the record but could
    // not use it - the visitor is not the person who can fix that, so it is not a success for them.
    const reason =
        response.status === 401 ? "rejected: bad public key or secret"
            : response.status === 422 ? "recorded but unusable (422)"
                : response.status === 429 ? "rate limited (429)"
                    : `unexpected status ${response.status}`

    const body = await response.text().catch(() => "")
    console.error(`[synchq] ${reason}`, body.slice(0, 500))
    // A 5xx is SyncHQ having a moment; everything else is a decision it has made and will repeat.
    return { ok: false, reason, status: response.status, retryable: response.status >= 500 }
}
