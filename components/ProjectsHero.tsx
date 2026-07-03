"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Grain } from "@/components/ui/Grain";

type ProjectsHeroData = {
  eyebrow?: string;
  meta?: string;
  titleTop?: string;
  titleBottom?: string;
  intro?: string;
  /** Live number of projects in the CMS — the count label grows automatically. */
  projectCount?: number;
  years?: string;
  categories?: string[];
};

const DEFAULTS = {
  eyebrow: "[ Portfolio ]",
  meta: "004 — Selected Work",
  titleTop: "Selected",
  titleBottom: "Work",
  intro:
    "A running index of the branding, sites and images I've shipped for founders and small teams who sweat the details. Real projects, real outcomes — pick one and dig in.",
  years: "[ 2020 — 2026 ]",
  categories: ["Branding", "Web Design", "Photography", "Art Direction", "Social Media"],
};

/**
 * ProjectsHero — the editorial "cover" that opens the projects page. Light
 * paper background, a giant two-word display title (the second word outlined),
 * a short index paragraph with category chips, and a full-bleed marquee ticker
 * of the disciplines. Reveals on load with a masked line reveal (GSAP), and
 * respects "reduce motion".
 */
export function ProjectsHero({ data }: { data?: ProjectsHeroData } = {}) {
  const ref = useRef<HTMLElement>(null);

  const eyebrow = data?.eyebrow || DEFAULTS.eyebrow;
  const meta = data?.meta || DEFAULTS.meta;
  const titleTop = data?.titleTop || DEFAULTS.titleTop;
  const titleBottom = data?.titleBottom || DEFAULTS.titleBottom;
  const intro = data?.intro || DEFAULTS.intro;
  const years = data?.years || DEFAULTS.years;
  // Count grows automatically with the CMS. Falls back to the category count
  // only when rendered standalone (no CMS data).
  const n = typeof data?.projectCount === "number" ? data.projectCount : undefined;
  const countLabel =
    n !== undefined ? `[ ${n} project${n === 1 ? "" : "s"} ]` : "[ Selected projects ]";
  const categories =
    data?.categories && data.categories.length > 0 ? data.categories : DEFAULTS.categories;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-line]", { yPercent: 115, duration: 1.05, stagger: 0.1 }, 0)
        .from("[data-reveal]", { y: 24, opacity: 0, duration: 0.8, stagger: 0.12 }, 0.35);
    }, el);

    return () => ctx.revert();
  }, []);

  const label =
    "font-mono text-[length:var(--text-label)] uppercase tracking-[var(--tracking-tight)] text-muted";

  // One pass of the ticker; rendered twice for a seamless -50% loop.
  const ticker = (
    <ul className="flex shrink-0 items-center" aria-hidden>
      {categories.map((c, i) => (
        <li
          key={i}
          className="flex items-center gap-6 pr-6 text-[clamp(1.5rem,4.2vw,3.25rem)] font-medium capitalize leading-none tracking-[var(--tracking-statement)] lg:gap-10 lg:pr-10"
        >
          <span>{c}</span>
          <span className="text-[0.42em] text-muted">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      ref={ref}
      id="projects-hero"
      className="relative isolate flex min-h-[92svh] flex-col overflow-hidden bg-paper px-[var(--gutter)] pb-0 pt-28 text-foreground lg:pt-32"
    >
      <Grain opacity={0.06} blend="multiply" />

      {/* Top metadata row */}
      <div className="relative z-10 flex items-start justify-between">
        <span data-reveal className={label}>
          {eyebrow}
        </span>
        <span data-reveal className={`${label} text-right`}>
          {meta}
        </span>
      </div>

      {/* Display title — two stacked words, the second outlined */}
      <div className="relative z-10 flex flex-1 flex-col justify-center py-10">
        <h1 className="font-medium capitalize leading-[0.8] tracking-[var(--tracking-hero)] text-[clamp(4rem,17vw,15rem)]">
          <span className="block overflow-hidden">
            <span data-line className="block">
              {titleTop}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-line className="block">
              {titleBottom}
            </span>
          </span>
        </h1>
      </div>

      {/* Intro + chips (left) and index metadata (right) */}
      <div className="relative z-10 flex flex-col gap-8 pb-10 lg:flex-row lg:items-end lg:justify-between">
        <div data-reveal className="flex max-w-[440px] flex-col gap-5">
          <p className="text-[length:var(--text-body)] leading-[1.45] tracking-[var(--tracking-tight)] text-muted">
            {intro}
          </p>
          {/* Same glass tag as the Work project cards */}
          <div className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <span
                key={c}
                className="rounded-3xl bg-white/30 px-2 py-1 text-[length:var(--text-body)] font-medium tracking-[var(--tracking-tight)] text-[#111] backdrop-blur-[10px]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div data-reveal className="flex flex-col gap-1 lg:items-end lg:text-right">
          <span className={label}>{countLabel}</span>
          <span className={label}>{years}</span>
        </div>
      </div>

      {/* Full-bleed marquee ticker */}
      <div
        data-reveal
        className="relative z-10 -mx-[var(--gutter)] overflow-hidden border-t border-foreground/15 py-5"
      >
        <div className="flex w-max animate-hero-marquee">
          {ticker}
          {ticker}
        </div>
      </div>
    </section>
  );
}
