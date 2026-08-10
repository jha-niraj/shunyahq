import { NextResponse, type NextRequest } from "next/server"
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session"

/**
 * First of three gates on /admin. See lib/admin/auth.ts for the other two.
 *
 * This one runs at the edge, before any admin page is rendered, so an unauthenticated request never
 * causes admin data to be fetched at all. It verifies the cookie's HMAC and expiry; it cannot check
 * the database from here, so the "has the password been rotated since?" question is answered by the
 * layout and by `requireAdmin()` inside each action.
 *
 * Middleware is treated as a fast reject, never as the security boundary on its own - a matcher is
 * a URL pattern, and anything it fails to match is simply unguarded.
 */
export async function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl

    // The login page must stay reachable while signed out, or the redirect below loops.
    if (pathname === "/admin/login") {
        const payload = await verifySessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)
        if (payload) {
            return NextResponse.redirect(new URL("/admin", request.url))
        }
        return NextResponse.next()
    }

    const payload = await verifySessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)
    if (payload) return NextResponse.next()

    const loginUrl = new URL("/admin/login", request.url)
    // Where to land after signing in. Only ever a path on this site - `from` is re-validated in the
    // login page before it is used, so it cannot be turned into an open redirect.
    if (pathname !== "/admin") loginUrl.searchParams.set("from", `${pathname}${search}`)

    const response = NextResponse.redirect(loginUrl)
    // A cookie that failed verification is expired, tampered with, or signed with a retired secret.
    // Clearing it stops the browser resending a dead token on every subsequent request.
    response.cookies.delete(ADMIN_SESSION_COOKIE)
    return response
}

export const config = {
    // Everything under /admin, including /admin itself. Server actions posted from these routes
    // carry the same pathname, so they are covered too - and guarded again inside each action.
    matcher: ["/admin", "/admin/:path*"],
}
