import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/sanity/lib/image";

/**
 * Renders Sanity Portable Text (the article body) with the site's typography —
 * generous measure, editorial headings, and the brand's tracking/leading.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[length:var(--text-body)] leading-[1.7] tracking-[var(--tracking-tight)] text-muted">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-6 text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium capitalize leading-[1.05] tracking-[var(--tracking-statement)] text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-4 text-[clamp(1.25rem,2.5vw,1.6rem)] font-semibold leading-[1.15] tracking-[var(--tracking-tight)] text-foreground">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-foreground/30 pl-5 text-[clamp(1.25rem,2.5vw,1.75rem)] font-light italic leading-[1.35] tracking-[var(--tracking-tight)] text-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer"
        className="text-foreground underline decoration-1 underline-offset-2 transition-opacity hover:opacity-60"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={urlFor(value).width(1400).fit("max").auto("format").url()}
          alt={value?.alt || ""}
          className="h-auto w-full"
          loading="lazy"
        />
        {value?.alt && (
          <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[var(--tracking-tight)] text-muted/70">
            {value.alt}
          </figcaption>
        )}
      </figure>
    ),
  },
};

export function PortableTextBody({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return (
    <div className="flex flex-col gap-6">
      <PortableText value={value} components={components} />
    </div>
  );
}
