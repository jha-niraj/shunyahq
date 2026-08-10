import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Admin Panel - Shunya Tech",
    description: "Admin panel for managing the Shunya Tech website",
    // Never index the panel, and never follow out of it.
    robots: { index: false, follow: false },
}

/**
 * Metadata only. The gate and the chrome live in `(panel)/layout.tsx`.
 *
 * They are split because /admin/login has to render while signed out. If the check lived here it
 * would run for the login page too and redirect it to itself forever - and the alternative,
 * sniffing the request path inside the layout, means relying on a header something else has to
 * remember to set. The route group draws the line structurally instead: everything inside (panel)
 * is guarded, /admin/login sits outside it, and neither can drift.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return children
}
