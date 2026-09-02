import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Bricolage_Grotesque } from "next/font/google"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/themeprovider"
import { Providers } from "./providers"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_LOGO, SITE_ORG, SITE_SOCIALS } from "@/lib/site"
import { SiteHeader, SiteFooter } from "@/components/site-chrome"
import { RevealProvider } from "@/components/landing/animations"
import SmoothScroll from "@/components/smooth-scroll"

// Bricolage Grotesque is the ONLY typeface on the platform - sans, display, mono slots and all.
// It ships as a variable font, so the full 200-800 weight range comes from one file.
const bricolage = Bricolage_Grotesque({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-bricolage",
})

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: `${SITE_NAME} - Software Engineering Studio`,
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [
        "software agency",
        "product engineering studio",
        "Next.js development",
        "web app development",
        "mobile app development",
        "AI integration",
        "cloud architecture",
        "SaaS development",
        "MVP development",
        "Shunya Tech",
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: { canonical: SITE_URL },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: SITE_URL,
        siteName: SITE_NAME,
        title: `${SITE_NAME} - Engineering intelligence for the digital age`,
        description: SITE_DESCRIPTION,
    },
    twitter: {
        card: "summary_large_image",
        title: `${SITE_NAME} - Engineering intelligence for the digital age`,
        description: SITE_DESCRIPTION,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
}

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#F6F4EE" },
        { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    ],
}

const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: SITE_NAME,
            legalName: SITE_ORG.legalName,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}${SITE_LOGO}`,
                width: 512,
                height: 512,
            },
            foundingDate: SITE_ORG.foundingDate,
            email: SITE_ORG.email,
            address: {
                "@type": "PostalAddress",
                addressLocality: SITE_ORG.address.locality,
                addressRegion: SITE_ORG.address.region,
                addressCountry: SITE_ORG.address.country,
            },
            contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: SITE_ORG.email,
                areaServed: "Worldwide",
                availableLanguage: ["en"],
            },
            ...(SITE_SOCIALS.length > 0 ? { sameAs: SITE_SOCIALS } : {}),
        },
        {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            inLanguage: "en",
            publisher: { "@id": `${SITE_URL}/#organization` },
        },
    ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* No external font requests: Bricolage Grotesque is the only face and next/font
                    self-hosts it, so the Google Fonts preconnects and stylesheet are gone. */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                {/* Reveal opt-in.
                    Content is visible in the HTML by default; the hidden state lives behind
                    `html.rv` and is switched on here, before first paint, only when JS is actually
                    running. So a crawler, a JS error, Reader Mode or a slow connection all get the
                    complete page - the opposite of the previous setup, which server-rendered
                    opacity:0 inline and left headlines permanently invisible when the reveal never
                    completed. `RevealProvider` strips the class again after 2.5s as a failsafe. */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rv')}catch(e){}`,
                    }}
                />
            </head>
            <body
                className={`${bricolage.className} ${bricolage.variable} antialiased`}
            >
                <Providers>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem={false}
                        disableTransitionOnChange
                    >
                        <RevealProvider />
                        <SmoothScroll>
                            <SiteHeader />
                            {children}
                            <SiteFooter />
                        </SmoothScroll>
                        <SonnerToaster position="top-center" closeButton richColors />
                    </ThemeProvider>
                </Providers>
            </body>
        </html>
    )
}
