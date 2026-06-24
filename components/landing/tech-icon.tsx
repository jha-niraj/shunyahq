// Inline brand glyphs for technology tags shown on the projects pages.
// No external dependency - every icon is a hand-inlined SVG that inherits
// currentColor, so hover color reveals work through Tailwind text utilities.

import type { ComponentType, SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

// Normalize a tech label so "Next.js", "next js", "NEXTJS" all map to one key.
function normalize(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]/g, "")
}

/* ---------------------------------------------------------------------------
   Brand glyphs. Each is a compact, recognizable mark using currentColor so it
   can fade from a muted tone to full ink on hover.
--------------------------------------------------------------------------- */

const NextIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c2.36 0 4.56-.68 6.42-1.86L8.7 9.42v6.96H7.02V7.02h1.68l9.78 12.6A11.95 11.95 0 0 0 24 12c0-6.627-5.373-12-12-12Zm4.98 7.02h1.68v8.34l-1.68-2.16V7.02Z" />
    </svg>
)

const ReactIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden {...p}>
        <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
)

const NodeIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden {...p}>
        <path d="M12 2 3.5 7v10L12 22l8.5-5V7L12 2Z" />
        <path d="M9 15c0 1 .8 1.6 2.1 1.6 1.5 0 2.4-.6 2.4-1.8 0-1-.6-1.5-2.2-1.7-1.6-.2-2.2-.5-2.2-1.5 0-1 .9-1.6 2.2-1.6 1.2 0 2 .5 2.1 1.5" strokeLinecap="round" />
    </svg>
)

const TypeScriptIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
        <rect x="1.5" y="1.5" width="21" height="21" rx="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M6 10.2h6v1.6H9.9V18H8.1v-6.2H6v-1.6Z" />
        <path d="M18.6 11c-.5-.4-1.1-.6-1.8-.6-1.4 0-2.4.8-2.4 2 0 1 .6 1.5 1.9 2 .9.3 1.1.5 1.1.9 0 .4-.4.6-.9.6-.7 0-1.3-.3-1.8-.8v1.7c.5.3 1.2.5 1.9.5 1.5 0 2.5-.8 2.5-2.1 0-1-.5-1.5-1.8-2-.9-.3-1.2-.5-1.2-.9 0-.3.3-.5.8-.5.6 0 1.1.2 1.7.6V11Z" />
    </svg>
)

const PostgresIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
        <path d="M16.5 3.2c-2.6-.6-5 0-6.4.8C8.7 3.6 6.8 3.3 5.2 4.2 2.9 5.5 2.3 9 3.3 13.6c.5 2.4 1.4 4.6 2.4 5.7.5.6 1.3 1 2 .7.5-.2.8-.7 1-1.4" />
        <path d="M11.5 18.6c.1.6.4 1.1 1 1.3.9.3 1.9-.2 2.5-1.1.9-1.4 1.6-3.9 1.9-6.7" />
        <path d="M9 8.5c2-.5 4.5-.5 6.5 0" />
        <circle cx="9.3" cy="10.4" r=".6" fill="currentColor" stroke="none" />
        <path d="M18.5 5c1.4.7 2.2 2.4 2 4.3-.1 1.3-.6 2-1.3 2" />
    </svg>
)

const PrismaIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden {...p}>
        <path d="M5 16.5 12.2 2.8c.3-.5 1-.4 1.2.1l5.4 14.4c.2.5-.2 1-.7 1.1l-9.4 2.3c-.6.1-1.1-.4-.9-1l1.9-7.2" />
    </svg>
)

const TrpcIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden {...p}>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        <path d="M8 9h8M12 9v7" strokeLinecap="round" />
    </svg>
)

const AwsIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
        <path d="M4 10.5 6 16l1.6-4 1.6 4 2-5.5" />
        <path d="M13 10.5 15 16l1.6-4 1.6 4 2-5.5" />
        <path d="M3 19c4 2.2 14 2.2 18 0" />
        <path d="M19.5 18.2c.6-.3 1.2-.7 1.5-1.2" />
    </svg>
)

const AzureIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
        <path d="M9.8 3 4 19.2h4l1.5-4.4 4.4 4.1L6.5 21h13.7L9.8 3Zm.9 5.2 3.4 9.6-6.1-1.1 2.7-3.2-1.3-.1 1.3-5.2Z" />
    </svg>
)

const GcpIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
        <path d="M14.5 8 16 5.5a6 6 0 0 0-9.3 3.1A4.5 4.5 0 0 0 7 17.5h10a3.5 3.5 0 0 0 .6-7 5 5 0 0 0-3.1-2.5Z" />
    </svg>
)

const DockerIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
        <path d="M3 11h2.4v2.2H3V11Zm2.9 0h2.4v2.2H5.9V11Zm2.9 0h2.4v2.2H8.8V11Zm2.9 0H14v2.2h-2.3V11Zm0-2.7H14v2.2h-2.3V8.3ZM8.8 8.3h2.4v2.2H8.8V8.3Zm0-2.7h2.4v2.2H8.8V5.6ZM5.9 8.3h2.4v2.2H5.9V8.3Z" stroke="none" />
        <path d="M22 11.6c-.3-.2-1-.4-1.7-.3-.1-.7-.5-1.3-1.1-1.8l-.4-.3-.3.4c-.4.6-.5 1.5-.2 2.2-.4.2-1 .3-1.6.3H1.5c-.2 1.7.2 3.9 1.8 5.4 1.3 1.2 3.2 1.8 5.6 1.8 5.3 0 9.2-2.4 11-6.9.7 0 2.2 0 3-1.5l.2-.3-.3-.2c-.2-.1-.4-.2-.6-.3Z" stroke="none" />
    </svg>
)

const KubernetesIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" aria-hidden {...p}>
        <path d="M12 2.5 20.5 6.6 22 16l-6 5.5H8L2 16 3.5 6.6 12 2.5Z" />
        <circle cx="12" cy="12" r="2.6" />
        <path d="M12 9.4V5M14.6 12.7l3.8 1.6M9.4 12.7l-3.8 1.6M13.6 14.2l1.6 3.7M10.4 14.2l-1.6 3.7" strokeLinecap="round" />
    </svg>
)

const TerraformIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
        <path d="M9 3.5 14 6.4v5.7L9 9.2V3.5Zm5.6 3.3 5 2.9v5.7l-5-2.9V6.8ZM9 10.1l5 2.9v5.7l-5-2.9v-5.7Z" stroke="none" />
    </svg>
)

const OpenAIIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" aria-hidden {...p}>
        <path d="M12 4.2c1.4-1 3.4-.8 4.6.5 1 1.1 1.2 2.6.7 3.9 1.3.5 2.2 1.8 2.2 3.3 0 1.6-1 2.9-2.4 3.4.3 1.4-.2 2.8-1.4 3.6-1.3.9-3 .7-4.1-.3-1 1-2.6 1.3-3.9.7-1.4-.6-2.2-2-2.1-3.5-1.4-.5-2.3-1.8-2.3-3.3 0-1.6 1-2.9 2.4-3.4-.3-1.4.2-2.8 1.4-3.6 1.3-.9 3-.7 4.1.3" />
        <path d="m8.5 9.5 3.5 2 3.5-2M12 11.5v4" />
    </svg>
)

const AnthropicIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
        <path d="M14.3 4h-3l4.8 16h3l-4.8-16ZM7.3 4 2.5 20h3l1-3.4h5.3l-1-3.1H7.4l1.4-4.7L9.9 4H7.3Z" stroke="none" />
    </svg>
)

const GraphQLIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" aria-hidden {...p}>
        <path d="M12 3 20 7.5v9L12 21 4 16.5v-9L12 3Z" />
        <path d="M4.5 7 12 21M19.5 7 12 21M4 8h16M5 16h14" strokeLinecap="round" />
        <circle cx="12" cy="3" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="20" cy="7.5" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="20" cy="16.5" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="12" cy="21" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="4" cy="16.5" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="4" cy="7.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
)

const TailwindIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
        <path d="M7 9.5c.7-2.8 2.4-4.2 5-4.2 3.9 0 4.4 2.9 6.4 3.4 1.3.3 2.4-.2 3.4-1.5-.7 2.8-2.4 4.2-5 4.2-3.9 0-4.4-2.9-6.4-3.4-1.3-.3-2.4.2-3.4 1.5Zm-5 6c.7-2.8 2.4-4.2 5-4.2 3.9 0 4.4 2.9 6.4 3.4 1.3.3 2.4-.2 3.4-1.5-.7 2.8-2.4 4.2-5 4.2-3.9 0-4.4-2.9-6.4-3.4-1.3-.3-2.4.2-3.4 1.5Z" stroke="none" />
    </svg>
)

const VercelIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
        <path d="M12 3 22 20H2L12 3Z" stroke="none" />
    </svg>
)

const FlutterIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
        <path d="M14.3 2 5 11.3l2.9 2.9L20.1 2h-5.8Zm0 9.6-4.6 4.6 4.6 4.6h5.8l-4.6-4.6 4.6-4.6h-5.8Z" stroke="none" />
    </svg>
)

const PythonIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
        <path d="M11.9 2c-2 0-3.5.3-4.4 1-.8.6-1.1 1.4-1.1 2.2v2h5.6v.8H5.2c-1.5 0-2.7.9-3.2 2.6-.4 1.5-.4 2.6 0 4.2.4 1.5 1.4 2.6 2.9 2.6h1.6v-2.4c0-1.6 1.4-3 3-3h4.4c1.3 0 2.4-1.1 2.4-2.4V5.2c0-1.3-1-2.3-2.4-2.7-.9-.3-1.8-.5-2-.5ZM9 4c.5 0 1 .4 1 1s-.5 1-1 1-1-.4-1-1 .5-1 1-1Z" stroke="none" />
        <path d="M12.1 22c2 0 3.5-.3 4.4-1 .8-.6 1.1-1.4 1.1-2.2v-2h-5.6v-.8h6.8c1.5 0 2.7-.9 3.2-2.6.4-1.5.4-2.6 0-4.2-.4-1.5-1.4-2.6-2.9-2.6h-1.6v2.4c0 1.6-1.4 3-3 3H10c-1.3 0-2.4 1.1-2.4 2.4v3.4c0 1.3 1 2.3 2.4 2.7.9.3 1.8.5 2.1.5ZM15 20c-.5 0-1-.4-1-1s.5-1 1-1 1 .4 1 1-.5 1-1 1Z" stroke="none" />
    </svg>
)

const MongoIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
        <path d="M12 2c1.4 3 5 6 5 10.5 0 3.5-2.2 6-4.3 7l-.4 2.5h-.6L11.3 19.5C9.2 18.5 7 16 7 12.5 7 8 10.6 5 12 2Zm.3 4.5v11c1.2-.9 2.4-2.7 2.4-5.2 0-2.3-1.3-4.4-2.4-5.8Z" stroke="none" />
    </svg>
)

const RedisIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" aria-hidden {...p}>
        <path d="M2.5 7 12 4l9.5 3-9.5 3-9.5-3Z" />
        <path d="M2.5 12 12 15l9.5-3M2.5 16.5 12 19.5l9.5-3" strokeLinecap="round" />
    </svg>
)

const StripeIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
        <path d="M11.4 9.3c0-.7.6-1 1.5-1 1.3 0 3 .4 4.3 1.1V5.6c-1.4-.6-2.9-.8-4.3-.8-3.5 0-5.9 1.8-5.9 4.9 0 4.8 6.6 4 6.6 6.1 0 .8-.7 1.1-1.7 1.1-1.5 0-3.4-.6-4.9-1.4v3.9c1.7.7 3.4 1 4.9 1 3.6 0 6.1-1.8 6.1-4.9 0-5.2-6.7-4.2-6.7-6.2Z" stroke="none" />
    </svg>
)

const WebSocketIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
        <path d="M3 8h11l4 4-4 4M21 16H10l-4-4 4-4" />
    </svg>
)

const OcrIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
        <path d="M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3" />
        <path d="M8 12h8" />
    </svg>
)

const PaymentIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden {...p}>
        <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
        <path d="M2.5 9.5h19" strokeLinecap="round" />
        <path d="M6 14.5h3" strokeLinecap="round" />
    </svg>
)

// Generic fallback - a small cpu/chip glyph so unmapped tags still look intentional.
const GenericIcon = (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden {...p}>
        <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
        <path d="M9.5 3v2.5M14.5 3v2.5M9.5 18.5V21M14.5 18.5V21M3 9.5h2.5M3 14.5h2.5M18.5 9.5H21M18.5 14.5H21" strokeLinecap="round" />
        <rect x="10" y="10" width="4" height="4" rx="1" fill="currentColor" stroke="none" />
    </svg>
)

const ICONS: Record<string, ComponentType<IconProps>> = {
    nextjs: NextIcon,
    react: ReactIcon,
    reactnative: ReactIcon,
    nodejs: NodeIcon,
    node: NodeIcon,
    typescript: TypeScriptIcon,
    ts: TypeScriptIcon,
    postgresql: PostgresIcon,
    postgres: PostgresIcon,
    prisma: PrismaIcon,
    trpc: TrpcIcon,
    aws: AwsIcon,
    azure: AzureIcon,
    googlecloud: GcpIcon,
    gcp: GcpIcon,
    docker: DockerIcon,
    kubernetes: KubernetesIcon,
    k8s: KubernetesIcon,
    terraform: TerraformIcon,
    openai: OpenAIIcon,
    anthropic: AnthropicIcon,
    graphql: GraphQLIcon,
    tailwind: TailwindIcon,
    tailwindcss: TailwindIcon,
    vercel: VercelIcon,
    flutter: FlutterIcon,
    python: PythonIcon,
    mongodb: MongoIcon,
    mongo: MongoIcon,
    redis: RedisIcon,
    websockets: WebSocketIcon,
    websocket: WebSocketIcon,
    stripe: StripeIcon,
    razorpay: PaymentIcon,
    khalti: PaymentIcon,
    esewa: PaymentIcon,
    ocr: OcrIcon,
}

/**
 * Inline brand glyph for a technology name. Case- and spacing-insensitive.
 * Falls back to a generic chip icon for unmapped names so nothing breaks.
 */
export function TechIcon({ name, className }: { name: string; className?: string }) {
    const Icon = ICONS[normalize(name)] ?? GenericIcon
    return <Icon className={className} />
}

/**
 * A chip rendering the brand glyph plus the label, with a hover state that
 * lifts the background, darkens the border, and reveals the icon/label color.
 */
export function TechBadge({ name, className }: { name: string; className?: string }) {
    return (
        <span
            className={`group/badge inline-flex items-center gap-2 rounded-lg border border-so-line bg-so-surface px-3 py-1.5 text-[12px] text-so-ink-2 transition-all duration-200 hover:-translate-y-px hover:scale-[1.02] hover:border-so-ink-4 hover:bg-so-surface-2 hover:text-so-ink ${className ?? ""}`}
        >
            <TechIcon
                name={name}
                className="h-[15px] w-[15px] shrink-0 text-so-ink-3 transition-colors duration-200 group-hover/badge:text-so-ink"
            />
            <span className="font-medium leading-none">{name}</span>
        </span>
    )
}
