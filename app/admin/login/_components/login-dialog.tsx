"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, Loader2, ArrowRight, ShieldAlert } from "lucide-react"
import { adminLogin } from "@/actions/admin-auth.action"
import { EASE } from "@/components/landing/animations"

/**
 * The admin password prompt.
 *
 * It is a real route rather than a modal rendered over the dashboard, and that is a security
 * decision rather than a styling one: a dialog layered on top of /admin would mean the admin markup
 * and its data were already in the page, one devtools node-delete away from being readable. Here
 * there is nothing behind it to reveal - the panel is only ever rendered after the cookie is set.
 */
export function LoginDialog({ redirectTo }: { redirectTo: string }) {
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [pending, setPending] = useState(false)
    const [shake, setShake] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (pending || !password) return

        setPending(true)
        setError(null)

        const result = await adminLogin(password)

        if (result.ok) {
            setPassword("")
            // `refresh()` before `replace()` so the layout re-runs its own server-side check with
            // the new cookie rather than serving the cached signed-out render.
            router.refresh()
            router.replace(redirectTo)
            return
        }

        setPending(false)
        setPassword("")
        setError(result.error)
        setShake((n) => n + 1)
        inputRef.current?.focus()
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-so-bg px-5">
            {/* Backdrop: a slow radial wash plus the paper dot-grid the rest of the site uses, so the
                gate reads as part of the product rather than a bare form. */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="so-dot-bg absolute inset-0 opacity-[0.55]" />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(90% 55% at 50% 0%, rgba(201,169,97,0.10) 0%, transparent 60%)",
                    }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="relative w-full max-w-[420px]"
            >
                {/* key={shake} remounts the wrapper on each failure, which replays the nudge. */}
                <motion.div
                    key={shake}
                    animate={shake ? { x: [0, -9, 8, -5, 0] } : undefined}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="rounded-2xl border border-so-line bg-so-surface shadow-[0_28px_70px_-24px_rgba(26,26,24,0.34)]"
                >
                    <div className="flex flex-col items-center px-8 pt-9 text-center">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-so-line bg-so-surface-2">
                            <Lock className="h-5 w-5 text-so-ink" strokeWidth={1.75} />
                        </div>
                        <p className="so-eyebrow">Restricted</p>
                        <h1 className="mt-3 text-[26px] font-semibold tracking-[-0.02em] text-so-ink">
                            Admin access
                        </h1>
                        <p className="mt-2 text-[14px] leading-[1.6] text-so-ink-3">
                            Enter the panel password to continue.
                        </p>
                    </div>

                    <form onSubmit={onSubmit} className="px-8 pb-8 pt-7">
                        <label htmlFor="admin-password" className="sr-only">
                            Admin password
                        </label>
                        <input
                            ref={inputRef}
                            id="admin-password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={pending}
                            placeholder="Password"
                            aria-invalid={!!error}
                            aria-describedby={error ? "admin-password-error" : undefined}
                            className="h-12 w-full rounded-xl border border-so-line bg-so-bg px-4 text-[15px] text-so-ink outline-none transition-colors placeholder:text-so-ink-4 focus:border-so-ink-4 disabled:opacity-60"
                        />

                        {/* aria-live so a screen reader announces the failure; the field keeps focus. */}
                        <div aria-live="polite" className="min-h-[22px]">
                            {error && (
                                <motion.p
                                    id="admin-password-error"
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-2.5 flex items-start gap-1.5 text-[13px] leading-snug text-so-warn"
                                >
                                    <ShieldAlert className="mt-[1px] h-3.5 w-3.5 shrink-0" />
                                    {error}
                                </motion.p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={pending || !password}
                            className="group mt-3 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-so-ink text-[14.5px] font-semibold text-so-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
                        >
                            {
                                pending ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Checking
                                    </>
                                ) : (
                                    <>
                                        Unlock panel
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                    </>
                                )
                            }
                        </button>
                    </form>
                </motion.div>

                <p className="mt-5 text-center text-[12.5px] text-so-ink-4">
                    Sessions expire after 8 hours.
                </p>
            </motion.div>
        </div>
    )
}
