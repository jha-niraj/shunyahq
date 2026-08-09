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
    icon: "globe"
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
