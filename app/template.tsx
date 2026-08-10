import type { ReactNode } from "react"

/**
 * Route transition.
 *
 * `template.tsx` (unlike `layout.tsx`) is remounted on every navigation, so the CSS animation on
 * this wrapper replays each time you move between pages - the blog index into a post, a service
 * into pricing - instead of the new page snapping in.
 *
 * Deliberately opacity-only, and deliberately CSS rather than framer-motion:
 *
 *  - A `transform` here would make this div the containing block for every `position: fixed`
 *    descendant while the animation runs, which breaks full-viewport routes like /contactus.
 *    Opacity creates a stacking context but never a containing block, so it is safe everywhere.
 *  - CSS runs without waiting for hydration, so pages are never left invisible if JS is slow or
 *    fails - which is exactly the risk of wrapping every route in a JS-driven `initial={{opacity:0}}`.
 *
 * The sense of movement comes from the page itself: `PageHero` and the section reveals rise as this
 * fade resolves, so a navigation reads as one continuous entrance.
 */
export default function Template({ children }: { children: ReactNode }) {
    return <div className="route-enter">{children}</div>
}
