import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "SyncHQ - the operating system for agencies"

/**
 * Its own card rather than inheriting the root one. `/synchq` is a product page we expect to be
 * shared on its own, and a generic studio card under a product headline reads as a mismatch.
 */
export default function Image() {
    return ogImage({
        eyebrow: "Our own product",
        title: "SyncHQ - the calm operating system for agencies",
    })
}
