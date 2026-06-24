"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

export function useCountUp(to: number, options?: { duration?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: "-60px" })
    const [count, setCount] = useState(0)
    const rafRef = useRef(0)

    useEffect(() => {
        if (!inView) return
        const start = performance.now()
        const dur = (options?.duration ?? 2) * 1000

        const tick = (now: number) => {
            const t = Math.min((now - start) / dur, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            setCount(t < 1 ? Math.floor(eased * to) : to)
            if (t < 1) rafRef.current = requestAnimationFrame(tick)
        }

        rafRef.current = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(rafRef.current)
    }, [inView, to, options?.duration])

    return { ref, count }
}
