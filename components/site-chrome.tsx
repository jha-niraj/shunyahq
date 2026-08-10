"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

/**
 * Routes that render their own full-screen experience and must not sit inside the site chrome.
 *
 * `/contactus` is a Typeform-style flow that owns the whole viewport and carries its own branding
 * and exit, so a navbar over it would be a second, competing set of navigation.
 *
 * `/admin` is an application, not a page on the marketing site. It has its own sidebar, its own
 * sign-out, and a fixed-height shell - a marketing navbar on top and a footer with "Start a
 * project" underneath would be a second navigation for a different product, and the footer alone
 * would break the h-screen layout by adding content below the fold.
 */
const BARE_ROUTES = ["/contactus", "/admin"]

const isBare = (pathname: string) =>
    BARE_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`))

export function SiteHeader() {
    const pathname = usePathname()
    if (isBare(pathname)) return null
    return <Navbar />
}

export function SiteFooter() {
    const pathname = usePathname()
    if (isBare(pathname)) return null
    return <Footer />
}
