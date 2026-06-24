// Single source of truth for pricing. Imported by the /pricing page and by the
// service/solution pages so the numbers never drift apart.

export const CURRENCIES = {
    USD: { symbol: "$", rate: 1, label: "USD" },
    EUR: { symbol: "€", rate: 0.85, label: "EUR" },
    AUD: { symbol: "A$", rate: 1.52, label: "AUD" },
    INR: { symbol: "₹", rate: 90.21, label: "INR" },
} as const

export type CurrencyKey = keyof typeof CURRENCIES

export type PricingTier = {
    name: string
    basePrice: number
    suffix: string
    description: string
    /** icon key, mapped to a lucide component on the client */
    icon: "zap" | "shield" | "crown"
    popular?: boolean
    features: string[]
    missing: string[]
}

export type PricingDomain = {
    key: string
    title: string
    description: string
    icon: "globe" | "smartphone" | "clapperboard" | "server"
    tiers: PricingTier[]
}

export const PRICING: Record<string, PricingDomain> = {
    web: {
        key: "web",
        title: "Web Engineering",
        description: "High-performance web applications built on Next.js 15 and React Server Components.",
        icon: "globe",
        tiers: [
            {
                name: "MVP / Startup", basePrice: 1599, suffix: "starts at", icon: "zap",
                description: "Rapid prototyping and launch for early-stage products.",
                features: ["Next.js 15 Architecture", "Responsive UI/UX (Tailwind)", "Basic CMS Integration", "Authentication (Auth.js)", "Standard SEO Setup", "Contact Form Integration", "2 Weeks Support"],
                missing: ["Database Optimization", "Payment Gateway", "Multi-tenant Architecture", "Custom SLA"],
            },
            {
                name: "Scale / Business", basePrice: 3499, suffix: "starts at", icon: "shield", popular: true,
                description: "Production-grade systems for growing businesses.",
                features: ["Everything in MVP", "PostgreSQL/Prisma DB", "Payment Gateway (Stripe)", "Admin Dashboard Panel", "Advanced Animations (Framer)", "90+ Performance Score", "30 Days Support"],
                missing: ["Microservices", "Dedicated DevOps"],
            },
            {
                name: "Enterprise", basePrice: 8500, suffix: "project scope", icon: "crown",
                description: "Complex distributed systems for large organizations.",
                features: ["Microservices Architecture", "Custom AI/LLM Integration", "Real-time Systems (WebSockets)", "Global CDN Strategy", "RBAC & Audit Logs", "Dedicated Project Manager", "90 Days Priority Support"],
                missing: [],
            },
        ],
    },
    mobile: {
        key: "mobile",
        title: "Mobile Ecology",
        description: "Native-feel cross-platform applications using React Native and Expo.",
        icon: "smartphone",
        tiers: [
            {
                name: "MVP Mobile", basePrice: 2599, suffix: "starts at", icon: "zap",
                description: "Get your app on iOS and Android stores quickly.",
                features: ["React Native / Expo", "iOS & Android Build", "Basic Auth & Profile", "Push Notifications", "App Store Submission", "Standard UI Components"],
                missing: ["Offline Mode", "Biometrics", "Custom Native Modules"],
            },
            {
                name: "Pro Ecosystem", basePrice: 5500, suffix: "starts at", icon: "shield", popular: true,
                description: "Feature-rich applications with native capabilities.",
                features: ["Everything in MVP", "Offline-First Architecture", "Biometric Security (FaceID)", "In-App Purchases", "Real-time Chat/Data", "Advanced Analytics", "Deep Linking"],
                missing: ["Bluetooth/Hardware Integration"],
            },
            {
                name: "Enterprise Native", basePrice: 12000, suffix: "starts at", icon: "crown",
                description: "Complex hardware integration and high-security needs.",
                features: ["Custom Native Modules (Swift/Kotlin)", "IoT / Bluetooth Integration", "Enterprise MDM Support", "End-to-End Encryption", "Automated CI/CD for Mobile", "Dedicated QA Team", "SLA Guarantee"],
                missing: [],
            },
        ],
    },
    video: {
        key: "video",
        title: "Visual Narrative",
        description: "Cinematic storytelling and motion graphics for modern brands.",
        icon: "clapperboard",
        tiers: [
            {
                name: "Social Shorts", basePrice: 599, suffix: "per package", icon: "zap",
                description: "High-retention editing for Reels, TikTok, and Shorts.",
                features: ["5 Short-Form Videos", "Dynamic Captions", "Stock Footage/Music", "Color Correction", "2 Revisions per Video", "Vertical Format (9:16)"],
                missing: ["Motion Graphics", "Scriptwriting", "3D Elements"],
            },
            {
                name: "Brand Story", basePrice: 1599, suffix: "starts at", icon: "shield", popular: true,
                description: "Long-form content and promotional trailers.",
                features: ["1 Long-Form Video (up to 10m)", "Advanced Sound Design (SFX)", "Custom Motion Graphics", "Narrative Structuring", "Thumbnail Design", "4K Export", "Project File Access"],
                missing: ["On-Location Shoot"],
            },
            {
                name: "Full Production", basePrice: 4500, suffix: "starts at", icon: "crown",
                description: "End-to-end production for commercials and launches.",
                features: ["Creative Direction & Scripting", "3D Product Rendering", "Advanced VFX / Compositing", "Multi-Platform Resizing", "Voiceover Artist", "Unlimited Revisions", "Dedicated Creative Director"],
                missing: [],
            },
        ],
    },
    cloud: {
        key: "cloud",
        title: "Cloud Infra",
        description: "Scalable backend architecture and DevOps solutions.",
        icon: "server",
        tiers: [
            {
                name: "Setup", basePrice: 1200, suffix: "one-time", icon: "zap",
                description: "Initial server setup and security hardening.",
                features: ["AWS/DigitalOcean Setup", "SSL Installation", "Basic Firewall", "Docker Config"],
                missing: ["Auto-scaling", "Load Balancing"],
            },
            {
                name: "Scale", basePrice: 2800, suffix: "one-time", icon: "shield", popular: true,
                description: "Kubernetes orchestration and high availability.",
                features: ["K8s Cluster Setup", "Load Balancer Config", "CI/CD Pipeline", "Database Clustering", "Auto-scaling Rules"],
                missing: [],
            },
            {
                name: "Retainer", basePrice: 1500, suffix: "per month", icon: "crown",
                description: "Ongoing management and 24/7 monitoring.",
                features: ["24/7 Uptime Monitor", "Security Patching", "Log Analysis", "Incident Response", "Cost Optimization"],
                missing: [],
            },
        ],
    },
}

export function formatPrice(basePrice: number, currency: CurrencyKey): string {
    const value = Math.round(basePrice * CURRENCIES[currency].rate)
    return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
        style: "currency",
        currency: currency === "INR" ? "INR" : currency,
        maximumFractionDigits: 0,
    }).format(value)
}

/** Lowest base price (USD) for a domain - handy for "starting at" badges. */
export function startingPrice(domainKey: string): number {
    const d = PRICING[domainKey]
    if (!d) return 0
    return Math.min(...d.tiers.map((t) => t.basePrice))
}
