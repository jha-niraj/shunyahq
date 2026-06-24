"use client"

import dynamic from "next/dynamic"

export const WhoItsFor = dynamic(
    () => import("./who-its-for").then(m => ({ default: m.WhoItsFor })),
    { ssr: false }
)

export const FeatureStack = dynamic(
    () => import("./feature-stack").then(m => ({ default: m.FeatureStack })),
    { ssr: false }
)

export const HowItWorks = dynamic(
    () => import("./how-it-works").then(m => ({ default: m.HowItWorks })),
    { ssr: false }
)

export const BeforeAfter = dynamic(
    () => import("./before-after"),
    { ssr: false }
)

export const IntegrationsSection = dynamic(
    () => import("./integrations-section"),
    { ssr: false }
)

export const TestimonialsSection = dynamic(
    () => import("./testimonials-section"),
    { ssr: false }
)

export const FAQSection = dynamic(
    () => import("./faq-section"),
    { ssr: false }
)

export const CTASection = dynamic(
    () => import("./cta-section"),
    { ssr: false }
)

export const StatsTicker = dynamic(
    () => import("./stats-ticker").then(m => ({ default: m.StatsTicker })),
    { ssr: false }
)

export const TrustedBy = dynamic(
    () => import("./trusted-by"),
    { ssr: false }
)

export const CapabilitiesGrid = dynamic(
    () => import("./capabilities-grid").then(m => ({ default: m.CapabilitiesGrid })),
    { ssr: false }
)

export const ProductBento = dynamic(
    () => import("./product-bento"),
    { ssr: false }
)