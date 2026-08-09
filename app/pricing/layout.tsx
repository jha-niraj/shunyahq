import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo"
import { PRICING } from "@/content/pricing"
import { SITE_URL } from "@/lib/site"

// The page itself is a client component (currency switcher, tier tabs) and therefore cannot
// export `metadata`. A route layout is the standard way to attach it without splitting the page.
export const metadata: Metadata = pageMeta({
    title: "Web Development Pricing - Transparent Rate Card",
    description:
        "What a custom web application actually costs. Fixed-scope tiers starting at $1,599, no sales call required, with exactly what is included at each level.",
    path: "/pricing",
    keywords: [
        "web development pricing",
        "custom web application cost",
        "web app development cost",
        "Next.js development pricing",
        "software development rate card",
    ],
})

/**
 * Service + AggregateOffer, not SoftwareApplication.
 *
 * Google treats SoftwareApplication as a rich-result candidate and requires `aggregateRating` or
 * `review` alongside `offers`. We have neither, and inventing them is a spam-policy violation. A
 * `Service` node describes the same thing accurately, carries the pricing for answer engines, and
 * is not validated as a rich result - so nothing errors.
 */
const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#web-engineering-service`,
    name: "Custom Web Application Development",
    serviceType: "Web application development",
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/pricing`,
    areaServed: "Worldwide",
    description:
        "Custom web application development by ShunyaHQ - SaaS platforms, dashboards and marketing sites built on Next.js and React Server Components.",
    offers: PRICING.web?.tiers.map((t) => ({
        "@type": "Offer",
        name: t.name,
        description: t.description,
        price: t.basePrice,
        priceCurrency: "USD",
        priceSpecification: {
            "@type": "PriceSpecification",
            price: t.basePrice,
            priceCurrency: "USD",
            valueAddedTaxIncluded: false,
        },
        availability: "https://schema.org/InStock",
        seller: { "@id": `${SITE_URL}/#organization` },
    })) ?? [],
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
            />
            {children}
        </>
    )
}
