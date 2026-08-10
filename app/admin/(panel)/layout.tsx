import { redirect } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin/auth"
import { AdminSidebar } from "../_components/admin-sidebar"

// The gate reads cookies, so this segment can never be statically rendered or cached. Without it
// Next is free to prerender the layout at build time - and a prerendered layout has no cookies to
// check, which would mean the guard silently never runs.
export const dynamic = "force-dynamic"

/**
 * Second of the three gates on /admin (middleware is first, `requireAdmin()` inside each action is
 * third).
 *
 * Middleware verifies the cookie's signature at the edge but cannot reach Postgres from there, so
 * it cannot know the password has been rotated since the token was issued. This layout can:
 * `isAdminAuthenticated()` re-checks the signature AND compares the token's credential version
 * against the live row, so rotating the password kills every outstanding session.
 *
 * It also means the panel stays shut if middleware is ever misconfigured or its matcher stops
 * covering a newly added route - every page in this group is wrapped by construction.
 */
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
    if (!(await isAdminAuthenticated())) redirect("/admin/login")

    return (
        // The shell is exactly one viewport tall and never scrolls itself: `h-screen` +
        // `overflow-hidden`. Everything that scrolls does so inside a pane, which is what keeps the
        // sidebar pinned and lets the inquiry table own the full height beside it. `min-h-screen`
        // would let a tall page push the whole row down and take the rail with it.
        <div data-internal className="flex h-screen overflow-hidden bg-so-bg text-so-ink">
            <AdminSidebar />
            {/* min-w-0 stops a wide table from forcing the flex row wider than the viewport;
                min-h-0 is what actually allows a flex child to be SHORTER than its content, which
                is the precondition for the child's own overflow to engage at all.
                pt on mobile clears the fixed top bar. */}
            <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden pt-[60px] lg:pt-0">
                {children}
            </main>
        </div>
    )
}
