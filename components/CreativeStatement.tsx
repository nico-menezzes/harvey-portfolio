"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Editorial statement section — large uppercase display copy laid out in a
 * staggered, asymmetric column on desktop and centered on mobile. Lines reveal
 * with a slow, smooth staggered fade-up (GSAP + ScrollTrigger) the first time
 * the section scrolls into view.
 */
export function CreativeStatement() {
  const ref = useRef<HTMLElement>(null);

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
          duration: 1.8,
          ease: "power3.out",
        });
      }

      tl.from(
        targets,
        {
          opacity: 0,
          y: 28,
          duration: 2,
          ease: "power3.out",
          stagger: 0.22,
        },
        rule ? "-=1.4" : 0,
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
            [ 8+ years in industry ]
          </p>
          <hr
            aria-hidden
            data-rule
            className="w-full origin-right border-0 border-t border-foreground/25"
          />
        </div>

        {/* Statement */}
        <div className="flex w-full flex-col gap-2 text-center text-[length:var(--text-statement)] font-light uppercase leading-[0.84] tracking-[var(--tracking-statement)] text-foreground lg:text-left">
          {/* 001 — centered above the first line on mobile only */}
          <span data-reveal className={`mx-auto ${label} lg:hidden`}>
            001
          </span>

          {/* Line 1 */}
          <div
            data-reveal
            className="flex w-full items-center justify-center gap-3 lg:items-start lg:justify-start"
          >
            <span className="whitespace-pre">{"A creative director   /"}</span>
            <span className={`hidden self-start lg:inline-block ${label}`}>001</span>
          </div>

          {/* Line 2 */}
          <div data-reveal className="w-full lg:pl-[15.5%]">
            Photographer
          </div>

          {/* Line 3 */}
          <div data-reveal className="w-full lg:pl-[44%]">
            Born <span className="font-serif italic normal-case">&amp;</span> raised
          </div>

          {/* Line 4 */}
          <div data-reveal className="w-full">
            on the south side
          </div>

          {/* Line 5 + freelancer tag */}
          <div data-reveal className="relative w-full lg:pl-[44%]">
            of chicago.
            <span
              className={`mt-3 block ${label} lg:absolute lg:left-[78%] lg:top-[1.6rem] lg:mt-0`}
            >
              [ creative freelancer ]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
