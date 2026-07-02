"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type PhotoBannerData = {
  image?: string;
  imageAlt?: string;
};

/**
 * Full-bleed photograph band with a GSAP scroll parallax. The inner image is
 * taller than the frame (which clips it) and drifts vertically as the section
 * moves through the viewport, so the photo feels set behind the page rather
 * than pinned to it. Respects "reduce motion".
 */
export function PhotoBanner({ data }: { data?: PhotoBannerData } = {}) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  const image = data?.image || "/photographer.png";
  const imageAlt =
    data?.imageAlt ||
    "A photographer in a hoodie shooting with a Nikon camera at golden hour";

  useEffect(() => {
    const frameEl = frame.current;
    const innerEl = inner.current;
    if (!frameEl || !innerEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Drift the oversized image between two extremes as the band scrolls past.
      gsap.fromTo(
        innerEl,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: frameEl,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, frameEl);

    return () => ctx.revert();
  }, []);

  return (
    <section aria-label="Harvey at work" className="w-full">
      <div
        ref={frame}
        className="relative h-[68svh] w-full overflow-hidden lg:h-[88svh]"
      >
        {/* Oversized inner layer — clipped by the frame, moved by the parallax */}
        <div
          ref={inner}
          className="absolute inset-x-0 top-[-16%] h-[132%] will-change-transform"
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
