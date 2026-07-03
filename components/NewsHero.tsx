"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Grain } from "@/components/ui/Grain";

type NewsHeroData = {
  eyebrow?: string;
  meta?: string;
  title?: string;
  intro?: string;
};

const DEFAULTS = {
  eyebrow: "[ Journal ]",
  meta: "Notes & achievements",
  title: "News & Notes.",
  intro:
    "Field notes from the studio — new work, small wins, and the occasional strong opinion. Search or filter below.",
};

/** "&" → decorative italic serif ampersand (brand accent). */
function amp(text: string) {
  return text.split("&").map((part, i, arr) => (
    <Fragment key={i}>
      {part}
      {i < arr.length - 1 && <span className="font-serif italic normal-case">&amp;</span>}
    </Fragment>
  ));
}

/**
 * NewsHero — the editorial masthead that opens the News page. Paper background,
 * mono labels, a big title with the italic ampersand, and a short intro.
 * Reveals on load (GSAP), motion-safe.
 */
export function NewsHero({ data }: { data?: NewsHeroData } = {}) {
  const ref = useRef<HTMLElement>(null);

  const eyebrow = data?.eyebrow || DEFAULTS.eyebrow;
  const meta = data?.meta || DEFAULTS.meta;
  const title = data?.title || DEFAULTS.title;
  const intro = data?.intro || DEFAULTS.intro;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", { y: 24, opacity: 0, duration: 0.85, ease: "power4.out", stagger: 0.12 });
    }, el);
    return () => ctx.revert();
  }, []);

  const label =
    "font-mono text-[length:var(--text-label)] uppercase tracking-[var(--tracking-tight)] text-muted";

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-paper px-[var(--gutter)] pb-10 pt-28 text-foreground lg:pt-32"
    >
      <Grain opacity={0.05} blend="multiply" />

      <div data-reveal className={`relative z-10 flex items-start justify-between ${label}`}>
        <span>{eyebrow}</span>
        <span className="text-right">{meta}</span>
      </div>

      <h1
        data-reveal
        className="relative z-10 mt-10 text-[clamp(3rem,11vw,9rem)] font-medium capitalize leading-[0.85] tracking-[var(--tracking-hero)]"
      >
        {amp(title)}
      </h1>

      <p
        data-reveal
        className="relative z-10 mt-8 max-w-[520px] text-[length:var(--text-body)] leading-[1.55] tracking-[var(--tracking-tight)] text-muted"
      >
        {intro}
      </p>
    </section>
  );
}
