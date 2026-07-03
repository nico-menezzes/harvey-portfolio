"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Grain } from "@/components/ui/Grain";

gsap.registerPlugin(ScrollTrigger);

type StatementHeroData = {
  eyebrow?: string;
  ghostWord?: string;
  title?: string;
  intro?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const DEFAULTS: Required<StatementHeroData> = {
  eyebrow: "[ Let's make something ]",
  ghostWord: "Studio",
  title: "Design & build, under one roof.",
  intro:
    "Brand, site and the code behind it — handled by one person who cares about the details, from the first sketch to the final pixel.",
  ctaLabel: "Start a project",
  ctaHref: "#contact",
};

/** Turn any "&" into the decorative italic serif ampersand (brand accent). */
function renderAmpersands(text: string) {
  return text.split("&").map((part, i, arr) => (
    <Fragment key={i}>
      {part}
      {i < arr.length - 1 && (
        <span className="font-serif italic normal-case">&amp;</span>
      )}
    </Fragment>
  ));
}

/**
 * StatementHero — a dark, high-contrast counterpart hero. A giant outlined
 * "ghost" word drifts behind a centered editorial statement (with the brand's
 * italic serif ampersand), a short intro and an outlined CTA. Meant for inner
 * pages (contact, services, about). Reveals on load; the ghost word parallaxes
 * on scroll (desktop, motion-safe).
 */
export function StatementHero({ data }: { data?: StatementHeroData } = {}) {
  const ref = useRef<HTMLElement>(null);
  const ghost = useRef<HTMLSpanElement>(null);

  const eyebrow = data?.eyebrow || DEFAULTS.eyebrow;
  const ghostWord = data?.ghostWord || DEFAULTS.ghostWord;
  const title = data?.title || DEFAULTS.title;
  const intro = data?.intro || DEFAULTS.intro;
  const ctaLabel = data?.ctaLabel ?? DEFAULTS.ctaLabel;
  const ctaHref = data?.ctaHref || DEFAULTS.ctaHref;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from("[data-reveal]", { y: 26, opacity: 0, duration: 0.9, stagger: 0.12 })
        .from(ghost.current, { opacity: 0, scale: 1.08, duration: 1.4 }, 0);

      // Subtle horizontal parallax on the ghost word (desktop only).
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to(ghost.current, {
          xPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1 },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[90svh] items-center overflow-hidden bg-black px-[var(--gutter)] py-28 text-on-dark"
    >
      <Grain opacity={0.08} blend="screen" />

      {/* Ghost word behind the content */}
      <span
        ref={ghost}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center font-medium capitalize leading-none tracking-[var(--tracking-hero)] text-transparent text-[clamp(7rem,28vw,26rem)] [-webkit-text-stroke:1px_rgba(255,255,255,0.13)]"
      >
        {ghostWord}
      </span>

      {/* Foreground statement */}
      <div className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center gap-7 text-center">
        <p
          data-reveal
          className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--tracking-tight)] text-white/55"
        >
          {eyebrow}
        </p>

        <h1
          data-reveal
          className="text-[clamp(2.75rem,8vw,7rem)] font-medium capitalize leading-[0.94] tracking-[var(--tracking-hero)]"
        >
          {renderAmpersands(title)}
        </h1>

        <p
          data-reveal
          className="max-w-[520px] text-[length:var(--text-body)] leading-[1.55] tracking-[var(--tracking-tight)] text-white/70"
        >
          {intro}
        </p>

        {ctaLabel && (
          <a
            data-reveal
            href={ctaHref}
            className="group mt-1 inline-flex items-center gap-2 rounded-full border border-white/60 px-5 py-3 text-[length:var(--text-body)] font-medium tracking-[var(--tracking-tight)] transition-colors duration-200 hover:bg-white hover:text-black"
          >
            {ctaLabel}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        )}
      </div>
    </section>
  );
}
