'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { useLenis } from '@/lib/lenis'

export function useSlideSnap(
    containerRef: RefObject<HTMLElement | null>,
    slides: number,
    opts: { duration?: number; cooldownMs?: number } = {},
) {
    const lenis = useLenis()
    const lockRef = useRef(false)
    const lenisRef = useRef(lenis)
    lenisRef.current = lenis

    useEffect(() => {
        if (slides < 2) return
        const duration = opts.duration ?? 0.8
        const cooldownMs = opts.cooldownMs ?? Math.round(duration * 1000) + 60

        const metrics = () => {
            const el = containerRef.current
            if (!el) return null
            const vh = window.innerHeight
            const rect = el.getBoundingClientRect()
            const scrollable = el.offsetHeight - vh
            if (scrollable <= 0) return null
            const docTop = window.scrollY + rect.top
            const rel = window.scrollY - docTop
            const engaged = rect.top <= 1 && rect.bottom >= vh - 1 && rel >= -1 && rel <= scrollable + 1
            const step = scrollable / (slides - 1)
            const current = Math.round(rel / step)
            return { docTop, step, current, engaged }
        }

        const goTo = (index: number, docTop: number, step: number) => {
            lockRef.current = true
            const target = docTop + index * step
            const l = lenisRef.current
            if (l) {
                l.scrollTo(target, { duration, lock: true, force: true, easing: (t: number) => 1 - Math.pow(1 - t, 3) })
            } else {
                window.scrollTo({ top: target, behavior: 'smooth' })
            }
            window.setTimeout(() => { lockRef.current = false }, cooldownMs)
        }

        const step = (dir: number, e: Event) => {
            const m = metrics()
            if (!m || !m.engaged) return
            const next = m.current + dir
            if (next < 0 || next > slides - 1) return
            e.preventDefault()
            e.stopImmediatePropagation()
            if (lockRef.current) return
            goTo(next, m.docTop, m.step)
        }

        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) < 1) return
            step(e.deltaY > 0 ? 1 : -1, e)
        }

        const onKey = (e: KeyboardEvent) => {
            if (['ArrowDown', 'PageDown', 'ArrowUp', 'PageUp'].includes(e.key)) {
                step(e.key === 'ArrowDown' || e.key === 'PageDown' ? 1 : -1, e)
            }
        }

        let touchStartY = 0
        let touchActive = false
        const onTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0]?.clientY ?? 0
            const m = metrics()
            touchActive = !!m?.engaged
        }
        const onTouchMove = (e: TouchEvent) => {
            if (!touchActive) return
            const m = metrics()
            if (!m || !m.engaged) return
            const dy = touchStartY - (e.touches[0]?.clientY ?? 0)
            const dir = dy > 0 ? 1 : -1
            const next = m.current + dir
            if (next < 0 || next > slides - 1) return
            e.preventDefault()
            e.stopImmediatePropagation()
            if (lockRef.current || Math.abs(dy) < 36) return
            touchActive = false
            goTo(next, m.docTop, m.step)
        }

        window.addEventListener('wheel', onWheel, { passive: false, capture: true })
        window.addEventListener('keydown', onKey, { capture: true })
        window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true })
        window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true })
        return () => {
            window.removeEventListener('wheel', onWheel, { capture: true } as EventListenerOptions)
            window.removeEventListener('keydown', onKey, { capture: true } as EventListenerOptions)
            window.removeEventListener('touchstart', onTouchStart, { capture: true } as EventListenerOptions)
            window.removeEventListener('touchmove', onTouchMove, { capture: true } as EventListenerOptions)
        }
    }, [containerRef, slides, opts.duration, opts.cooldownMs])
}
