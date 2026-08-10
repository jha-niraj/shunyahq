import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin/auth"
import { LoginDialog } from "./_components/login-dialog"

export const metadata: Metadata = {
    title: "Admin access",
    // The gate to a private surface has no business in an index.
    robots: { index: false, follow: false },
}

// Reads cookies, so it must never be prerendered or cached.
export const dynamic = "force-dynamic"

/**
 * Only ever one path back into the panel.
 *
 * `from` comes off the query string, so it is attacker-controlled and cannot be trusted as a
 * redirect target. Anything that is not a plain in-app /admin path is discarded rather than
 * sanitised - `//evil.com` and `https://evil.com` are both valid-looking strings, and an open
 * redirect out of a login page is a phishing primitive.
 */
function safeRedirect(from: string | undefined): string {
    if (!from) return "/admin"
    if (!from.startsWith("/admin")) return "/admin"
    if (from.startsWith("//") || from.includes("\\")) return "/admin"
    return from
}

export default async function AdminLoginPage({
    searchParams,
}: {
    searchParams: Promise<{ from?: string }>
}) {
    // Middleware already bounces signed-in users, but this is checked again here so the page is
    // correct on its own - the same reason every other gate in this panel is doubled.
    if (await isAdminAuthenticated()) redirect("/admin")

    const { from } = await searchParams

    return <LoginDialog redirectTo={safeRedirect(from)} />
}
