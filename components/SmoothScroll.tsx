"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/**
 * Wraps the whole page in GSAP's ScrollSmoother so scrolling has a smooth,
 * eased feel and every ScrollTrigger animation reads from the smoothed
 * position. Smoothing is applied on desktop (wheel/trackpad) only — touch
 * devices keep native scrolling — and it's skipped entirely for users who
 * prefer reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // The component library (/lab) and its isolated previews use native scroll,
    // so each component's own ScrollTrigger animations behave predictably.
    if (pathname?.startsWith("/lab")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!wrapper.current || !content.current) return;

    const smoother = ScrollSmoother.create({
      wrapper: wrapper.current,
      content: content.current,
      smooth: 1, // seconds it takes to "catch up" to the real scroll position
      effects: true, // enables data-speed / data-lag parallax attributes
      smoothTouch: false, // native scrolling on touch devices
    });

    // Keep in-page anchor links (#about, #services…) working — smoothly scroll
    // to the target instead of the browser's instant (and, under ScrollSmoother,
    // inaccurate) native jump.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      smoother.scrollTo(target, true, "top top");
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      smoother.kill();
    };
  }, [pathname]);

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content" ref={content}>
        {children}
      </div>
    </div>
  );
}
