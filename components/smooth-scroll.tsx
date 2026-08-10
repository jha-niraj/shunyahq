"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { ReactLenis } from "@/lib/lenis"

interface LenisProps {
    children: React.ReactNode
}

/**
 * Routes that scroll natively.
 *
 * Lenis runs in `root` mode, which means it intercepts wheel events on the document and drives the
 * scroll position itself. That is right for a long marketing page and wrong for an application
 * shell: /admin is a fixed-height layout whose panes scroll internally, and a root-level scroll
 * hijack fights every one of those panes - the wheel goes to a document that has nowhere to scroll
 * while the list under the cursor stays put.
 */
const NATIVE_SCROLL_ROUTES = ["/admin"]

function SmoothScroll({ children }: LenisProps) {
    const pathname = usePathname()

    if (NATIVE_SCROLL_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`))) {
        return <>{children}</>
    }

    return (
        <ReactLenis
            root
            options={{
                duration: 1.0,
                easing: (t: number) => 1 - Math.pow(1 - t, 3),
                wheelMultiplier: 1.3,
                syncTouch: false,
                touchMultiplier: 1.8,
                infinite: false,
                orientation: "vertical",
                gestureOrientation: "vertical",
                smoothWheel: true,
                autoResize: true,
            }}
        >
            {children}
        </ReactLenis>
    )
}

export default SmoothScroll
