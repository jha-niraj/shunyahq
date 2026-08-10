"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

/**
 * Routes that render their own full-screen experience and must not sit inside the site chrome.
 *
 * `/contactus` is a Typeform-style flow that owns the whole viewport and carries its own branding
 * and exit, so a navbar over it would be a second, competing set of navigation.
 */
const BARE_ROUTES = ["/contactus"]

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
