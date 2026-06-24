import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// MDX component maps hold arbitrary component types - prop types are enforced at call sites
type MDXComponents = Record<string, unknown>

type ChildrenProps = { children: ReactNode }
type AnchorProps = { href?: string; children: ReactNode }

export function HeaderImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full my-8 rounded-2xl overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-auto"
        loading="eager"
        fetchPriority="high"
        width={1344}
        height={756}
      />
    </div>
  )
}

export function InlineImage({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
}) {
  return (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full rounded-xl"
        loading="lazy"
        width={1344}
        height={756}
      />
      {caption && (
        <figcaption className="text-[13px] text-so-ink-3 mt-2 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export function Callout({
  type = 'info',
  children,
}: {
  type?: 'info' | 'warning' | 'tip'
  children: React.ReactNode
}) {
  const styles: Record<string, string> = {
    info: "bg-so-surface-2 border border-so-line text-so-ink-2",
    warning: "bg-[rgba(201,169,97,0.07)] border border-[rgba(201,169,97,0.25)] text-so-ink",
    tip: "bg-[rgba(143,179,113,0.07)] border border-[rgba(143,179,113,0.25)] text-so-ink",
  }

  return (
    <div
      className={cn(
        styles[type],
        "rounded-xl px-[18px] py-[14px] my-5 text-[14px] leading-[1.7]",
      )}
    >
      {children}
    </div>
  )
}

export function RateTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
}) {
  return (
    <div className="my-7 overflow-x-auto rounded-xl border border-so-line">
      <table className="w-full text-[13px] border-collapse">
        <thead>
          <tr className="bg-so-surface-2 border-b border-so-line">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 text-left font-semibold text-so-ink text-[12px] tracking-[0.04em] uppercase whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(i % 2 === 0 ? "bg-so-surface" : "bg-so-bg")}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    "px-4 py-2.5",
                    j === 0 ? "text-so-ink font-medium" : "text-so-ink-2 font-normal",
                    i < rows.length - 1 && "border-b border-so-line",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }: ChildrenProps) => (
      <h1 className="text-[clamp(26px,4vw,36px)] font-[650] mt-10 mb-[18px] text-so-ink tracking-[-0.025em] leading-[1.1]">
        {children}
      </h1>
    ),
    h2: ({ children }: ChildrenProps) => (
      <h2 className="text-[clamp(20px,2.8vw,26px)] font-semibold mt-9 mb-[14px] text-so-ink tracking-[-0.015em] leading-[1.2]">
        {children}
      </h2>
    ),
    h3: ({ children }: ChildrenProps) => (
      <h3 className="text-[17px] font-semibold mt-7 mb-2.5 text-so-ink leading-[1.3]">
        {children}
      </h3>
    ),
    p: ({ children }: ChildrenProps) => (
      <p className="text-[15px] leading-[1.8] mb-[18px] text-so-ink-2">{children}</p>
    ),
    ul: ({ children }: ChildrenProps) => (
      <ul className="my-4 pl-5 text-so-ink-2">
        {children}
      </ul>
    ),
    ol: ({ children }: ChildrenProps) => (
      <ol className="my-4 pl-5 text-so-ink-2">
        {children}
      </ol>
    ),
    li: ({ children }: ChildrenProps) => (
      <li className="text-[15px] leading-[1.8] mb-1.5">{children}</li>
    ),
    blockquote: ({ children }: ChildrenProps) => (
      <blockquote className="border-l-[3px] border-so-accent pl-5 my-6 italic text-so-ink-2 text-[15px] leading-[1.8]">
        {children}
      </blockquote>
    ),
    strong: ({ children }: ChildrenProps) => (
      <strong className="font-[650] text-so-ink">{children}</strong>
    ),
    a: ({ href, children }: AnchorProps) => (
      <a
        href={href}
        className="text-so-accent underline underline-offset-[3px]"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    hr: () => <hr className="my-9 border-0 border-t border-so-line" />,
    code: ({ children }: ChildrenProps) => (
      <code className="font-mono text-[0.85em] bg-so-surface-2 text-so-ink px-1.5 py-0.5 rounded-[5px] border border-so-line">
        {children}
      </code>
    ),
    table: ({ children }: ChildrenProps) => (
      <div className="my-7 overflow-x-auto rounded-xl border border-so-line">
        <table className="w-full text-[13px] border-collapse">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: ChildrenProps) => (
      <thead className="bg-so-surface-2 border-b border-so-line">
        {children}
      </thead>
    ),
    tbody: ({ children }: ChildrenProps) => <tbody>{children}</tbody>,
    tr: ({ children }: ChildrenProps) => (
      <tr className="border-b border-so-line">{children}</tr>
    ),
    th: ({ children }: ChildrenProps) => (
      <th className="px-4 py-2.5 text-left font-semibold text-so-ink text-[12px] tracking-[0.04em] uppercase whitespace-nowrap">
        {children}
      </th>
    ),
    td: ({ children }: ChildrenProps) => (
      <td className="px-4 py-2.5 text-so-ink-2">{children}</td>
    ),
    HeaderImage,
    InlineImage,
    Callout,
    RateTable,
    ...components,
  }
}
