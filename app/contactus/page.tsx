import { Suspense } from "react"
import { ContactFlow } from "./_components/contact-flow"

/**
 * The contact route is a full-screen flow with no site chrome - the navbar and footer are hidden
 * for it in `components/site-chrome.tsx`. The left rail carries the branding and the way back.
 */
export default function ContactPage() {
    return (
        <>
            {/* The flow's own headings are all h2 - the step question, and the side panel title,
                which is display:none below lg. That left the route with no h1 at all. This one is
                in the DOM and the accessibility tree at every width, so the page has exactly one. */}
            <h1 className="sr-only">Contact ShunyaHQ - start a web engineering project</h1>

            {/* ContactFlow reads the /pricing deep link with useSearchParams, which opts the route
                into client-side rendering unless it sits under a Suspense boundary. The fallback
                matches the flow's own background so there is no flash of a different colour. */}
            <Suspense fallback={<div className="fixed inset-0 z-[60] bg-so-bg" />}>
                <ContactFlow />
            </Suspense>
        </>
    )
}
