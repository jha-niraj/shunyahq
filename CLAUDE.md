# Shunya Tech - Project Guide

Shunya (Shunya Tech) is a software engineering studio. Marketing/agency site. Future domain: **shunyahq.com**.

## Writing style (IMPORTANT)
- **Never use em-dashes (—) or en-dashes (–).** Use a regular hyphen `-` instead, with spaces around it when separating clauses (e.g. "fast - and reliable"). This applies to ALL copy: components, page content, `content/*.ts`, MDX blog posts, metadata, comments.
- Keep copy in Shunya's voice: confident, specific, engineering-led. No fluff.

## Stack
- Next.js 15 (App Router), React 19, TypeScript, Tailwind v4 (tokens in `app/globals.css`).
- Drizzle ORM on Neon Postgres (`lib/db/`). No auth on this platform.
- MDX blog via `@next/mdx` (`mdx-components.tsx`, posts in `content/posts/`).
- Dev/start run on **port 3002** (`pnpm dev`, `pnpm start`).

## Design system
- Tokens live in `app/globals.css` (`--so-*` cream/sage editorial palette). Use the utility classes, not raw colors: `.so-container`, `.so-section`, `.so-eyebrow`, `.so-serif`, `.so-lede`, `.so-card`, `.so-btn` / `.so-btn-primary` / `.so-btn-ghost`, and Tailwind `text-so-ink/-2/-3`, `bg-so-bg/-surface/-surface-2`, `border-so-line`.
- Shared page chrome: `PageHero` + `PageBackground` (`components/landing/`), animations via `components/landing/animations.tsx` (`FadeIn`, `StaggerContainer`, `StaggerItem`).
- FAQs use the reusable `PageFAQ` (`components/landing/page-faq.tsx`) so every page matches the landing FAQ. Page `<main>` wrappers use `overflow-x-clip` (NOT `overflow-hidden`) so `position: sticky` keeps working inside them.

## Content sources (single source of truth)
- Services: `content/services.ts` (+ `app/services/[slug]`)
- Solutions: `content/use-cases.ts` (+ `app/solutions/[audience]`)
- Tools: `app/tools/tools-meta.ts`
- Projects: `content/projects.ts`
- Blog: `content/blog.ts` + `content/authors.ts` + `content/posts/*.mdx` (every `BLOG_POSTS` key MUST have a matching `.mdx` file)
- Pricing: `content/pricing.ts` (imported by `/pricing` and shown on service/solution pages)
- Site/SEO constants: `lib/site.ts`; OG image helper: `lib/og.tsx`

## Conventions
- Pages using `generateStaticParams`/`generateMetadata` must be server components; put interactive bits in `_components/*` with `"use client"`.
- Verify changes with `npx tsc --noEmit` and `pnpm build` before considering done.
