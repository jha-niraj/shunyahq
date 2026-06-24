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
