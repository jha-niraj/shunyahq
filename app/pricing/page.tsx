"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Check, X, Zap, Shield, Crown, Globe, Smartphone, Clapperboard, Server,
    ArrowRight
} from "lucide-react"
import Link from "next/link"
import {
    Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs"
import { PageHero } from "@/components/landing/page-hero"
import { PageBackground } from "@/components/landing/page-background"
import { PageFAQ } from "@/components/landing/page-faq"
import { PRICING_FAQS } from "@/components/landing/faq-data"
import {
    CURRENCIES as currencies, PRICING as pricingData, formatPrice as fmt,
    type CurrencyKey,
} from "@/content/pricing"

const DOMAIN_ICONS = { globe: Globe, smartphone: Smartphone, clapperboard: Clapperboard, server: Server } as const
const TIER_ICONS = { zap: Zap, shield: Shield, crown: Crown } as const

export default function PricingPage() {
    const [currency, setCurrency] = useState<CurrencyKey>("USD")
    const [activeTab, setActiveTab] = useState("web")

    // Helper to format price (uses the shared pricing module)
    const formatPrice = (basePrice: number) => fmt(basePrice, currency)

    return (
        <main className="relative overflow-x-clip isolate">
            <PageBackground className="z-0" />
            <PageHero
                palette="goldNoir"
                eyebrow="Pricing"
                title={
                    <>
                        Transparent investment,{" "}
                        <span className="so-serif italic">engineered for ROI.</span>
                    </>
                }
                description="Select your service domain and currency to view our standardized rate card - no hidden fees, no surprises."
            />

            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    <Tabs
                        defaultValue="web"
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="space-y-10"
                    >
                        {/* Controls: service tabs + currency switcher */}
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div className="overflow-x-auto pb-1 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
                                <TabsList className="inline-flex h-auto w-fit gap-1 rounded-full border border-so-line bg-so-surface p-1">
                                    {
                                        Object.entries(pricingData).map(([key, data]) => (
                                            <TabsTrigger
                                                key={key}
                                                value={key}
                                                className="flex items-center gap-2 rounded-full border-0 px-4 py-2 text-[13px] font-medium text-so-ink-3 transition-all data-[state=active]:bg-so-ink data-[state=active]:text-so-bg data-[state=active]:shadow-sm cursor-pointer"
                                            >
                                                {(() => { const DIcon = DOMAIN_ICONS[data.icon]; return <DIcon className="h-3.5 w-3.5" /> })()}
                                                {data.title}
                                            </TabsTrigger>
                                        ))
                                    }
                                </TabsList>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="so-eyebrow hidden sm:inline">Currency</span>
                                <div className="inline-flex gap-1 rounded-full border border-so-line bg-so-surface p-1">
                                    {
                                        (Object.keys(currencies) as CurrencyKey[]).map((cur) => (
                                            <button
                                                key={cur}
                                                onClick={() => setCurrency(cur)}
                                                className={`so-mono cursor-pointer rounded-full px-3 py-1.5 text-[12px] font-medium transition-all ${currency === cur
                                                    ? "bg-so-ink text-so-bg shadow-sm"
                                                    : "text-so-ink-3 hover:text-so-ink"
                                                    }`}
                                            >
                                                {cur}
                                            </button>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Active domain description */}
                        <AnimatePresence mode="wait">
                            {
                                Object.entries(pricingData).map(([key, data]) => (
                                    <TabsContent key={key} value={key} className="mt-0 outline-none">
                                        <motion.div
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -16 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <p className="so-lede mb-10 max-w-[60ch] text-so-ink-2">
                                                {data.description}
                                            </p>

                                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                                {
                                                    data.tiers.map((tier, index) => {
                                                        const isPopular = tier.popular
                                                        return (
                                                            <motion.div
                                                                key={index}
                                                                initial={{ opacity: 0, y: 16 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: index * 0.08 }}
                                                                className={`so-card relative flex flex-col p-8 ${isPopular
                                                                    ? "ring-2 ring-[rgba(201,169,97,0.5)] shadow-md"
                                                                    : ""
                                                                    }`}
                                                            >
                                                                {
                                                                    isPopular && (
                                                                        <div className="absolute -top-3 left-8">
                                                                            <span className="so-mono inline-flex items-center rounded-full bg-so-ink px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-so-bg">
                                                                                Most Popular
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                }

                                                                <div className="mb-7">
                                                                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-so-surface-2 text-so-ink">
                                                                        {(() => { const TIcon = TIER_ICONS[tier.icon]; return <TIcon className="h-5 w-5" /> })()}
                                                                    </div>
                                                                    <h3 className="mb-2 text-[20px] font-semibold tracking-[-0.01em] text-so-ink">
                                                                        {tier.name}
                                                                    </h3>
                                                                    <p className="text-[14px] leading-[1.7] text-so-ink-2">
                                                                        {tier.description}
                                                                    </p>
                                                                </div>

                                                                <div className="mb-7 border-y border-so-line py-5">
                                                                    <div className="flex items-baseline gap-2">
                                                                        <span className="text-[36px] font-semibold tracking-[-0.03em] text-so-ink">
                                                                            {formatPrice(tier.basePrice)}
                                                                        </span>
                                                                    </div>
                                                                    <span className="so-mono text-[12px] uppercase tracking-[0.1em] text-so-ink-3">
                                                                        {tier.suffix}
                                                                    </span>
                                                                </div>

                                                                <div className="mb-8 flex-1 space-y-3.5">
                                                                    {
                                                                        tier.features.map((feature, i) => (
                                                                            <div key={i} className="flex items-start gap-3 text-[13.5px] leading-[1.5] text-so-ink-2">
                                                                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                                                                <span>{feature}</span>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                    {
                                                                        tier.missing.map((feature, i) => (
                                                                            <div key={i} className="flex items-start gap-3 text-[13.5px] leading-[1.5] text-so-ink-4">
                                                                                <X className="mt-0.5 h-4 w-4 shrink-0 text-so-ink-4" />
                                                                                <span className="line-through decoration-so-line">{feature}</span>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>

                                                                <Link
                                                                    href="/contactus"
                                                                    className={`so-btn mt-auto w-full justify-center ${isPopular ? "so-btn-primary" : "so-btn-ghost"}`}
                                                                >
                                                                    Select {tier.name}
                                                                    <ArrowRight size={13} />
                                                                </Link>
                                                            </motion.div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </motion.div>
                                    </TabsContent>
                                ))
                            }
                        </AnimatePresence>
                    </Tabs>
                </div>
            </section>

            <section className="relative z-[1] bg-so-surface border-t border-so-line">
                <PageFAQ
                    items={PRICING_FAQS}
                    eyebrow="Pricing FAQ"
                    title="Pricing,"
                    titleAccent="demystified"
                    description="Everything you need to know about how we price, bill, and scope work."
                />
            </section>

            <section className="relative z-[1] bg-so-bg so-section border-t border-so-line">
                <div className="so-container">
                    <div className="so-card flex flex-col items-center p-[clamp(32px,5vw,64px)] text-center">
                        <span className="so-eyebrow">Need a Custom Configuration?</span>
                        <h2 className="mt-5 mb-4 max-w-[22ch] text-[clamp(28px,4vw,46px)] tracking-[-0.03em] text-so-ink">
                            Built around your{" "}
                            <span className="so-serif italic">exact needs.</span>
                        </h2>
                        <p className="mb-8 max-w-[56ch] text-[15px] leading-[1.7] text-so-ink-2">
                            For enterprise requirements, legacy migrations, or specific SLA needs,
                            we offer a bespoke pricing model based on engineering hours and resource allocation.
                        </p>
                        <Link href="/contactus" className="so-btn so-btn-primary">
                            Schedule a Technical Discovery Call <ArrowRight size={13} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
