"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AboutData = {
  label?: string;
  index?: string;
  paragraph?: string;
  portrait?: string;
  portraitAlt?: string;
};

const DEFAULT_PARAGRAPH =
  "I'm Harvey — a creative director and photographer who has spent the last eight years turning brands into things people actually remember. I work closely with founders and small teams who care about the details, from the first rough sketch to the final pixel. When I'm not behind a screen, I'm behind a camera, chasing light across Chicago.";

const label =
  "font-mono text-[length:var(--text-label)] uppercase leading-[1.1] text-muted";

/** Four L-shaped tick marks that frame the paragraph, one per corner. */
function Corners() {
  const base = "pointer-events-none absolute h-4 w-4 border-muted";
  return (
    <>
      <span data-corner aria-hidden className={`${base} left-0 top-0 border-l border-t`} />
      <span data-corner aria-hidden className={`${base} right-0 top-0 border-r border-t`} />
      <span data-corner aria-hidden className={`${base} bottom-0 left-0 border-b border-l`} />
      <span data-corner aria-hidden className={`${base} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

/** The framed body paragraph, reused across mobile + desktop layouts. */
function FramedParagraph({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Corners />
      <p
        data-reveal
        className="px-6 py-3 text-[length:var(--text-body)] leading-[1.3] tracking-[var(--tracking-tight)] text-muted"
      >
        {text}
      </p>
    </div>
  );
}

/** The tall black & white portrait, reused across layouts. */
function Portrait({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      data-img
      className={`relative overflow-hidden [clip-path:inset(0)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 436px, 100vw"
        className="object-cover object-center"
      />
    </div>
  );
}

/**
 * About section — an editorial split: a corner-framed intro paragraph paired
 * with a tall B&W portrait. Stacks on mobile, sits side-by-side on desktop.
 * Reveals on scroll (GSAP + ScrollTrigger): labels and copy fade up, the corner
 * ticks pop in, and the portrait wipes open top-to-bottom with a slow zoom.
 */
export function About({ data }: { data?: AboutData } = {}) {
  const ref = useRef<HTMLElement>(null);

  const labelText = data?.label || "[ About ]";
  const index = data?.index || "002";
  const paragraph = data?.paragraph || DEFAULT_PARAGRAPH;
  const portrait = data?.portrait || "/about-portrait.png";
  const portraitAlt =
    data?.portraitAlt ||
    "Black and white portrait, half of the face lit against a dark background";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-reveal], [data-corner]", { opacity: 1, y: 0, scale: 1 });
        gsap.set("[data-img]", { clipPath: "inset(0)" });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 62%", once: true },
      });

      tl.from("[data-reveal]", {
        opacity: 0,
        y: 26,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.09,
      })
        .from(
          "[data-corner]",
          { opacity: 0, scale: 0.4, duration: 0.5, ease: "power3.out", stagger: 0.05 },
          "-=0.45",
        )
        .from(
          "[data-img]",
          { clipPath: "inset(0 0 100% 0)", duration: 0.85, ease: "power3.inOut" },
          "-=0.55",
        )
        .from(
          "[data-img] img",
          { scale: 1.14, duration: 1, ease: "power3.out" },
          "<",
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="px-[var(--gutter)] py-16 lg:py-24"
    >
      {/* Mobile: stacked */}
      <div className="flex flex-col gap-5 lg:hidden">
        <p data-reveal className={label}>{index}</p>
        <p data-reveal className={label}>{labelText}</p>
        <FramedParagraph text={paragraph} />
        <Portrait src={portrait} alt={portraitAlt} className="aspect-[422/594] w-full" />
      </div>

      {/* Desktop: label top-left, paragraph bottom-aligned with the portrait,
          index pinned to the portrait's top. */}
      <div className="hidden items-start justify-between gap-8 lg:flex">
        <p data-reveal className={`shrink-0 ${label}`}>{labelText}</p>

        <div className="flex w-[68%] max-w-[983px] items-end gap-8">
          <FramedParagraph text={paragraph} className="flex-1" />
          <div className="flex shrink-0 items-start gap-6">
            <p data-reveal className={label}>{index}</p>
            <Portrait
              src={portrait}
              alt={portraitAlt}
              className="aspect-[436/614] w-[clamp(300px,30vw,436px)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
