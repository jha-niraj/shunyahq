import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SITE_URL, SITE_NAME } from "@/lib/site"
import { PageHero } from "@/components/landing/page-hero"
import { PageBackground } from "@/components/landing/page-background"
import { USE_CASES, USE_CASE_SLUGS, type UseCaseSlug } from "@/content/use-cases"
import {
    SolutionPains,
    SolutionHelps,
    SolutionApproach,
    SolutionStats,
    SolutionServices,
    SolutionPricing,
    SolutionFaq,
    SolutionCta,
} from "./_components/solution-sections"

interface PageProps {
    params: Promise<{ audience: string }>
}

function isUseCaseSlug(value: string): value is UseCaseSlug {
    return (USE_CASE_SLUGS as string[]).includes(value)
}

export function generateStaticParams() {
    return USE_CASE_SLUGS.map((audience) => ({ audience }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { audience } = await params
    if (!isUseCaseSlug(audience)) {
        return { title: `Solutions - ${SITE_NAME}` }
    }
    const useCase = USE_CASES[audience]
    const url = `${SITE_URL}/solutions/${audience}`
    const title = `${useCase.label} - ${SITE_NAME}`
    const description = useCase.heroSubtitle

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title: `${useCase.heroTitle} ${useCase.heroEmphasis}`,
            description,
            url,
            type: "website",
            siteName: SITE_NAME,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    }
}

export default async function SolutionPage({ params }: PageProps) {
    const { audience } = await params
    if (!isUseCaseSlug(audience)) notFound()

    const useCase = USE_CASES[audience]
    const url = `${SITE_URL}/solutions/${audience}`

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: useCase.faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE_URL}/solutions` },
            { "@type": "ListItem", position: 3, name: useCase.label, item: url },
        ],
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <main className="relative overflow-x-clip isolate">
                <PageBackground className="z-0" />
                <PageHero
                    palette="crimson"
                    eyebrow={useCase.eyebrow}
                    title={
                        <>
                            {useCase.heroTitle}{" "}
                            <span className="so-serif italic">{useCase.heroEmphasis}</span>
                        </>
                    }
                    description={useCase.heroSubtitle}
                />

                <div className="relative z-[1] bg-so-bg">
                    <SolutionPains useCase={useCase} />
                    <SolutionHelps useCase={useCase} />
                    <SolutionApproach useCase={useCase} />
                    <SolutionStats useCase={useCase} />
                    <SolutionServices useCase={useCase} />
                    <SolutionPricing useCase={useCase} />
                    <SolutionFaq useCase={useCase} />
                    <SolutionCta useCase={useCase} />
                </div>
            </main>
        </>
    )
}
