"use client";

import { useEffect, useRef, useState } from "react";

const BASE_PX = 200; // size used to measure the text's natural width

/**
 * Hero display name. On desktop it measures the text and sets a font-size that
 * makes the single line span the full container width exactly (no distortion).
 * Below `lg` it falls back to a fluid size and wraps onto two lines.
 */
export function HeroTitle({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState<number>();

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const fit = () => {
      // Only fit-to-width on desktop, where the title is a single line.
      if (!window.matchMedia("(min-width: 1024px)").matches) {
        setFontSize(undefined);
        return;
      }
      const natural = measure.getBoundingClientRect().width; // measured at BASE_PX
      if (!natural) return;
      setFontSize((container.clientWidth / natural) * BASE_PX);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    return () => observer.disconnect();
  }, [text]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Off-screen measurer: same font/tracking, fixed size, single line */}
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap font-medium capitalize tracking-[var(--tracking-hero)]"
        style={{ fontSize: BASE_PX }}
      >
        {text}
      </span>

      <h1
        className="text-center text-[18vw] font-medium capitalize leading-[0.85] tracking-[var(--tracking-hero)] text-white mix-blend-overlay lg:whitespace-nowrap lg:text-left lg:text-[calc((100vw_-_2*var(--gutter))/6.5)] lg:leading-[0.85]"
        style={fontSize ? { fontSize } : undefined}
      >
        {text}
      </h1>
    </div>
  );
}
