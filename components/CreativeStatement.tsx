"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type StatementData = {
  eyebrow?: string;
  index?: string;
  lines?: string[];
  freelancerTag?: string;
};

const DEFAULT_LINES = [
  "A creative director   /",
  "Photographer",
  "Born & raised",
  "on the south side",
  "of chicago.",
];

// Per-line indentation on desktop — keeps the staggered, asymmetric rhythm.
const INDENTS = ["", "lg:pl-[15.5%]", "lg:pl-[44%]", "", "lg:pl-[44%]"];

/** Turn any "&" the editor types into the decorative italic serif ampersand. */
function renderAmpersands(text: string) {
  const parts = text.split("&");
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <span className="font-serif italic normal-case">&amp;</span>
      )}
    </Fragment>
  ));
}

/**
 * Editorial statement section — large uppercase display copy laid out in a
 * staggered, asymmetric column on desktop and centered on mobile. Lines reveal
 * with a slow, smooth staggered fade-up (GSAP + ScrollTrigger) the first time
 * the section scrolls into view.
 */
export function CreativeStatement({ data }: { data?: StatementData } = {}) {
  const ref = useRef<HTMLElement>(null);

  const eyebrow = data?.eyebrow || "[ 8+ years in industry ]";
  const index = data?.index || "001";
  const lines = data?.lines && data.lines.length > 0 ? data.lines : DEFAULT_LINES;
  const freelancerTag = data?.freelancerTag || "[ creative freelancer ]";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      const rule = el.querySelector<HTMLElement>("[data-rule]");

      // Respect users who prefer reduced motion — just show everything.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([...targets, rule].filter(Boolean), {
          opacity: 1,
          y: 0,
          scaleX: 1,
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          // Fire once the section has risen into the lower 45% of the screen.
          start: "top 55%",
          once: true,
        },
      });

      if (rule) {
        tl.from(rule, {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.9,
          ease: "power3.out",
        });
      }

      tl.from(
        targets,
        {
          opacity: 0,
          y: 28,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
        },
        rule ? "-=0.7" : 0,
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const label =
    "font-mono text-[length:var(--text-label)] uppercase leading-[1.1] tracking-normal normal-case text-muted";

  return (
    <section ref={ref} className="px-[var(--gutter)] py-12 lg:py-[120px]">
      <div className="flex w-full flex-col gap-6">
        {/* Eyebrow + rule */}
        <div className="flex w-full flex-col items-end gap-3">
          <p data-reveal className={`w-full text-right ${label}`}>
            {eyebrow}
          </p>
          <hr
            aria-hidden
            data-rule
            className="w-full origin-right border-0 border-t border-foreground/25"
          />
        </div>

        {/* Statement */}
        <div className="flex w-full flex-col gap-2 text-center text-[length:var(--text-statement)] font-light uppercase leading-[0.84] tracking-[var(--tracking-statement)] text-foreground lg:text-left">
          {/* index — centered above the first line on mobile only */}
          <span data-reveal className={`mx-auto ${label} lg:hidden`}>
            {index}
          </span>

          {lines.map((line, i) => {
            const isFirst = i === 0;
            const isLast = i === lines.length - 1;
            const indent = INDENTS[i] ?? "";

            // First line carries the inline index label on desktop.
            if (isFirst) {
              return (
                <div
                  key={i}
                  data-reveal
                  className="flex w-full items-center justify-center gap-3 lg:items-start lg:justify-start"
                >
                  <span className="whitespace-pre-wrap">
                    {renderAmpersands(line)}
                  </span>
                  <span className={`hidden self-start lg:inline-block ${label}`}>
                    {index}
                  </span>
                </div>
              );
            }

            return (
              <div key={i} data-reveal className={`relative w-full ${indent}`}>
                {renderAmpersands(line)}
                {isLast && freelancerTag && (
                  <span
                    className={`mt-3 block ${label} lg:absolute lg:left-[78%] lg:top-[1.6rem] lg:mt-0`}
                  >
                    {freelancerTag}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
