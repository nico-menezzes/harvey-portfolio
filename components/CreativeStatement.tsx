"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Editorial statement section — large uppercase display copy laid out in a
 * staggered, asymmetric column on desktop and centered on mobile. Lines reveal
 * with a staggered fade-up the first time the section scrolls into view.
 */
export function CreativeStatement() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Staggered fade-up: merges the reveal classes/delay with line-specific ones.
  const reveal = (i: number, extra = "") => ({
    className: `transition-[transform,opacity] duration-700 ease-out ${
      visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
    } ${extra}`,
    style: { transitionDelay: visible ? `${i * 90}ms` : "0ms" },
  });

  const label =
    "font-mono text-[length:var(--text-label)] uppercase leading-[1.1] tracking-normal normal-case text-muted";

  return (
    <section ref={ref} className="px-[var(--gutter)] py-12 lg:py-[120px]">
      <div className="flex w-full flex-col gap-6">
        {/* Eyebrow + rule */}
        <div className="flex w-full flex-col items-end gap-3">
          <p {...reveal(0, `w-full text-right ${label}`)}>[ 8+ years in industry ]</p>
          <hr
            aria-hidden
            className={`w-full origin-right border-0 border-t border-foreground/25 transition-transform duration-1000 ease-out ${
              visible ? "scale-x-100" : "scale-x-0"
            }`}
            style={{ transitionDelay: visible ? "120ms" : "0ms" }}
          />
        </div>

        {/* Statement */}
        <div className="flex w-full flex-col gap-2 text-center text-[length:var(--text-statement)] font-light uppercase leading-[0.84] tracking-[var(--tracking-statement)] text-foreground lg:text-left">
          {/* 001 — centered above the first line on mobile only */}
          <span {...reveal(1, `mx-auto ${label} lg:hidden`)}>001</span>

          {/* Line 1 */}
          <div
            {...reveal(
              1,
              "flex w-full items-center justify-center gap-3 lg:items-start lg:justify-start",
            )}
          >
            <span className="whitespace-pre">{"A creative director   /"}</span>
            <span className={`hidden self-start lg:inline-block ${label}`}>001</span>
          </div>

          {/* Line 2 */}
          <div {...reveal(2, "w-full lg:pl-[15.5%]")}>Photographer</div>

          {/* Line 3 */}
          <div {...reveal(3, "w-full lg:pl-[44%]")}>
            Born <span className="font-serif italic normal-case">&amp;</span> raised
          </div>

          {/* Line 4 */}
          <div {...reveal(4, "w-full")}>on the south side</div>

          {/* Line 5 + freelancer tag */}
          <div {...reveal(5, "relative w-full lg:pl-[44%]")}>
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
