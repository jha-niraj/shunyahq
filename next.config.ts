import createMDX from "@next/mdx"
import type { NextConfig } from "next"

const withMDX = createMDX({
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
})

const nextConfig: NextConfig = {
    // MDX support - allow .mdx files as pages/routes
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

    env: {
        MAIN_APP_URL: process.env.MAIN_APP_URL,
    },

    images: {
        unoptimized: true,
        remotePatterns: [{ protocol: "https", hostname: "*" }],
    },

    eslint: { ignoreDuringBuilds: false, dirs: ["app", "components", "lib", "content"] },
    typescript: { ignoreBuildErrors: false },

    trailingSlash: false,

    async redirects() {
        return [
            // The studio now offers one service, so a /services index would be a near-duplicate of
            // the service page itself - two thin URLs competing for the same query instead of one
            // strong one. The five retired offerings redirect here too rather than 404.
            { source: "/services", destination: "/services/web-engineering", permanent: true },
            { source: "/services/mobile-ecology", destination: "/services/web-engineering", permanent: true },
            { source: "/services/ai-integration", destination: "/services/web-engineering", permanent: true },
            { source: "/services/cloud-architecture", destination: "/services/web-engineering", permanent: true },
            { source: "/services/ui-ux-systems", destination: "/services/web-engineering", permanent: true },
            { source: "/services/system-security", destination: "/services/web-engineering", permanent: true },

            // SyncOrbit was renamed SyncHQ before launch. Nothing was indexed under the old name,
            // but anything already shared - a link in an email, a bookmark - should land rather
            // than 404. The tool detail page is retired in favour of the full /synchq product page.
            { source: "/tools/syncorbit", destination: "/synchq", permanent: true },
            { source: "/tools/synchq", destination: "/synchq", permanent: true },
            { source: "/projects/syncorbit", destination: "/projects/synchq", permanent: true },
            { source: "/blogs/building-syncorbit-case-study", destination: "/blogs/building-synchq-case-study", permanent: true },
        ]
    },

    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    { key: "X-XSS-Protection", value: "1; mode=block" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
                ],
            },
        ]
    },
}

export default withMDX(nextConfig)
