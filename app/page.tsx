import type { Metadata } from "next"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site"
import { Hero } from "@/components/landing/hero"
import {
    WhoItsFor, FeatureStack, HowItWorks, BeforeAfter, StatsTicker,
    IntegrationsSection, TestimonialsSection, FAQSection, CTASection,
    CapabilitiesGrid, ProductBento,
} from "@/components/landing/landing-sections"
import { LANDING_FAQS } from "@/components/landing/faq-data"

export const metadata: Metadata = {
    title: `${SITE_NAME} - Software Engineering Studio`,
    description: SITE_DESCRIPTION,
    alternates: { canonical: SITE_URL },
}

const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    areaServed: "Worldwide",
    serviceType: [
        "Web application development",
        "Mobile application development",
        "AI integration",
        "Cloud architecture",
        "UI/UX design systems",
        "DevOps and security",
    ],
    knowsAbout: [
        "Next.js",
        "React Server Components",
        "React Native",
        "AI / LLM integration",
        "AWS, Azure and Kubernetes",
        "tRPC and Prisma",
    ],
}

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: LANDING_FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
}

export default function HomePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <main>
                <Hero />
                <CapabilitiesGrid />
                <FeatureStack />
                <ProductBento />
                <WhoItsFor />
                <HowItWorks />
                <BeforeAfter />
                <StatsTicker />
                <IntegrationsSection />
                <TestimonialsSection />
                <FAQSection />
                <CTASection />
            </main>
        </>
    )
}
