"use client"

import React from "react"
import { ReactLenis } from "@/lib/lenis"

interface LenisProps {
    children: React.ReactNode
}

function SmoothScroll({ children }: LenisProps) {
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
