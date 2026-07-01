"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { PLACEHOLDER_WORKS, type WorkItem } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const label = "font-mono text-[length:var(--text-label)] uppercase leading-[1.1] text-muted";

/** Diagonal ↗ arrow, nudges on card hover. */
function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="size-8 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
    >
      <path d="M7 17 17 7M17 7H8m9 0v9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** One project card: image with glass tags, then title + arrow. */
function WorkCard({ item }: { item: WorkItem }) {
  return (
    <a
      href={item.href ?? "#"}
      data-reveal
      className="group flex w-full flex-col gap-[10px]"
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: item.ratio ?? "4 / 3" }}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute bottom-4 left-4 flex gap-3">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-3xl bg-white/30 px-2 py-1 text-[length:var(--text-body)] font-medium tracking-[var(--tracking-tight)] text-[#111] backdrop-blur-[10px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-foreground">
        <h3 className="whitespace-nowrap text-[24px] font-black uppercase leading-[1.1] tracking-[var(--tracking-tight)] lg:text-[36px]">
          {item.title}
        </h3>
        <ArrowUpRight />
      </div>
    </a>
  );
}

/** Corner-framed call-to-action block that closes out the list. */
function CtaCard() {
  const corner = "pointer-events-none absolute h-4 w-4 border-muted";
  return (
    <div data-reveal className="relative mt-6 w-full lg:mt-12 lg:w-[465px]">
      <span aria-hidden className={`${corner} left-0 top-0 border-l border-t`} />
      <span aria-hidden className={`${corner} right-0 top-0 border-r border-t`} />
      <span aria-hidden className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden className={`${corner} bottom-0 right-0 border-b border-r`} />
      <div className="flex flex-col items-start gap-[10px] px-6 py-3">
        <p className="text-[length:var(--text-body)] italic leading-[1.3] tracking-[var(--tracking-tight)] text-muted">
          Discover how my creativity transforms ideas into impactful digital
          experiences — schedule a call with me to get started.
        </p>
        <Button href="#contact">Let&apos;s talk</Button>
      </div>
    </div>
  );
}

/**
 * Selected Work (004) — a staggered two-column masonry of project cards on
 * desktop, a single column on mobile, closed out by a framed CTA. Content is
 * CMS-ready: pass `items` (title, tags, image, link, aspect ratio); it falls
 * back to placeholder projects. Cards reveal on scroll and lift on hover.
 */
export function Works({ items = PLACEHOLDER_WORKS }: { items?: WorkItem[] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Split into two columns for the desktop masonry (left gets the extra item).
  const mid = Math.ceil(items.length / 2);
  const leftColumn = items.slice(0, mid);
  const rightColumn = items.slice(mid);

  return (
    <section
      id="projects"
      ref={ref}
      className="bg-paper px-6 pb-16 pt-20 sm:px-8 lg:px-12 lg:pb-24 lg:pt-32"
    >
      {/* Header */}
      <header className="mb-8 flex flex-col gap-4 lg:mb-[61px] lg:gap-0">
        <p className={`lg:hidden ${label}`}>[ portfolio ]</p>
        <div className="flex w-full items-start justify-between lg:items-center">
          <div className="flex items-start gap-[10px]">
            <h2 className="text-[length:var(--text-statement)] font-light uppercase leading-[0.86] tracking-[var(--tracking-statement)] text-foreground">
              <span className="block">Selected</span>
              <span className="block">Work</span>
            </h2>
            <span className={label}>004</span>
          </div>
          <div className="hidden h-[110px] w-[15px] items-center justify-center lg:flex">
            <p className={`-rotate-90 whitespace-nowrap ${label}`}>[ portfolio ]</p>
          </div>
        </div>
      </header>

      {/* Mobile: single column */}
      <div className="flex flex-col gap-10 lg:hidden">
        {items.map((item) => (
          <WorkCard key={item.title} item={item} />
        ))}
        <CtaCard />
      </div>

      {/* Desktop: staggered two-column masonry (right column offset down) */}
      <div className="hidden items-end gap-8 lg:flex xl:gap-12">
        <div className="flex flex-1 flex-col gap-16">
          {leftColumn.map((item) => (
            <WorkCard key={item.title} item={item} />
          ))}
          <CtaCard />
        </div>
        <div className="flex flex-1 flex-col gap-16 pt-[clamp(96px,12vw,200px)]">
          {rightColumn.map((item) => (
            <WorkCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
