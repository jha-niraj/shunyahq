# Shunya Tech - Project Guide

Shunya (Shunya Tech) is a software engineering studio. Marketing/agency site. Future domain: **shunyahq.com**.

## Writing style (IMPORTANT)
- **Never use em-dashes (—) or en-dashes (–).** Use a regular hyphen `-` instead, with spaces around it when separating clauses (e.g. "fast - and reliable"). This applies to ALL copy: components, page content, `content/*.ts`, MDX blog posts, metadata, comments.
- Keep copy in Shunya's voice: confident, specific, engineering-led. No fluff.

## Stack
- Next.js 15 (App Router), React 19, TypeScript, Tailwind v4 (tokens in `app/globals.css`).
- Drizzle ORM on Neon Postgres (`lib/db/`). No auth on this platform.
- MDX blog via `@next/mdx` (`mdx-components.tsx`, posts in `content/posts/`).
- `pnpm dev` runs on **port 7005**; `pnpm start` runs on **port 3002**.

## Design system
- Tokens live in `app/globals.css` (`--so-*` cream/ink editorial palette). Use the utility classes, not raw colors: `.so-container`, `.so-section`, `.so-eyebrow`, `.so-serif`, `.so-lede`, `.so-card`, `.so-num`, `.so-link`, `.so-btn` / `.so-btn-primary` / `.so-btn-ghost`, and Tailwind `text-so-ink/-2/-3`, `bg-so-bg/-surface/-surface-2`, `border-so-line`.
- **Gold is the one accent.** `--so-gold` / `--so-gold-bright` / `--so-gold-line` / `--so-gold-soft` (Tailwind: `text-so-gold`, `border-so-gold-line`). Eyebrows, active states, hover rules, focus rings and section numerals all use it. Elevation is `--so-e1/-e2/-e3` (warm shadows - a pure-black shadow on cream reads as dirt).
- Shared page chrome: `PageHero` + `PageBackground` (`components/landing/`). `PageHero` widens its headline to 10 columns when given no `right` slot or `meta` rail, so a hero never renders with an empty half. It marks itself `data-hero-dark`, which `SiteNav` uses to flip the nav pill to dark glass (`header[data-over-dark]` rules in globals.css).
- Homepage sections live in `components/landing/home/` (`hero.tsx`, `sections.tsx`) and are server components.

## Motion (IMPORTANT)
- Reveals are **CSS transitions driven by one IntersectionObserver**, not framer-motion. Use the primitives in `components/landing/animations.tsx` (`Reveal`, `FadeIn`, `SlideUp`, `StaggerContainer`, `StaggerItem`, `Entrance`) or put `data-rv` on an element directly, tuning it with `--rv-y`, `--rv-delay`, `--rv-duration`; `data-rv-group` cascades over children via `--rv-step`.
- **Content must fail open.** The hidden state lives behind `html.rv`, set by an inline script in `app/layout.tsx` only when JS runs, and `RevealProvider` strips it after 2.5s as a failsafe. Never ship `initial={{ opacity: 0 }}` on anything carrying copy - the previous framer setup left `<h1>`s permanently invisible when RAF was starved. framer-motion is fine for interaction-driven motion (accordions, step transitions, SVG line drawing).
- **No scroll hijacking and no WebGL.** `useSlideSnap` (a global capture-phase `wheel` listener) and the `@paper-design/shaders-react` hero canvases were both removed. Hero backdrops are the `.so-mesh` CSS gradient, palette passed as `--m1..--m4`. Lenis smooth-scroll is gone too - the page uses native scroll.
- FAQs use the reusable `PageFAQ` (`components/landing/page-faq.tsx`) so every page matches the landing FAQ. Page `<main>` wrappers use `overflow-x-clip` (NOT `overflow-hidden`) so `position: sticky` keeps working inside them.

## Credibility rule (IMPORTANT)
- **Never invent proof.** The site previously shipped 18 fabricated testimonials ("Sarah J., CTO, FinStream") and a marquee of 8 companies that do not exist. Both were removed. Social proof, logos, client names and metrics must come from `content/projects.ts` - real, shipped work with live URLs - or not appear at all.

## Content sources (single source of truth)
- Services: `content/services.ts` (+ `app/services/[slug]`). **One service by design.** Six were consolidated into one on 2026-08-09 so they stopped competing for the same queries; `/services` and the five retired slugs 301 to `/services/web-engineering` (see `next.config.ts`). The six disciplines the studio actually covers live in that service's `disciplines[]` and render as the `#disciplines` section - do NOT recreate them as separate pages without also removing those redirects.
- Solutions: `content/use-cases.ts` (+ `app/solutions/[audience]`)
- Tools: `app/tools/tools-meta.ts`
- Projects: `content/projects.ts`
- Blog: `content/blog.ts` + `content/authors.ts` + `content/posts/*.mdx` (every `BLOG_POSTS` key MUST have a matching `.mdx` file)
- Pricing: `content/pricing.ts` (imported by `/pricing` and shown on service/solution pages)
- Site/SEO constants: `lib/site.ts`; OG image helper: `lib/og.tsx`

## Conventions
- Pages using `generateStaticParams`/`generateMetadata` must be server components; put interactive bits in `_components/*` with `"use client"`.
- Verify changes with `npx tsc --noEmit` and `pnpm build` before considering done.
