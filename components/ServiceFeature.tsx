"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Grain } from "@/components/ui/Grain";

gsap.registerPlugin(ScrollTrigger);

type ServiceFeatureData = {
  theme?: "light" | "dark";
  imageSide?: "left" | "right";
  index?: string;
  kicker?: string;
  title?: string;
  lead?: string;
  description?: string;
  features?: string[];
  image?: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const DEFAULTS = {
  theme: "light" as const,
  imageSide: "left" as const,
  index: "01",
  kicker: "[ Service ]",
  title: "Brand Discovery",
  lead: "Find the thing that makes you you — then make it impossible to ignore.",
  description:
    "We dig into your story, your audience and the people you're up against, then turn it into a clear identity you can actually use: logo, type, color, and the rules that keep it consistent everywhere.",
  features: ["Discovery workshop", "Logo & identity system", "Type & color system", "Brand guidelines"],
  image: "/service-1.png",
  imageAlt: "Sample work",
  ctaLabel: "Start a project",
  ctaHref: "/contact",
};

/**
 * ServiceFeature — one big, self-contained section for a single service. An
 * editorial two-column split (image + content) with an "includes" list and a
 * CTA. Light or dark theme, image on either side — alternate them per service to
 * build rhythm down the page. Reveals on scroll (GSAP), motion-safe.
 */
export function ServiceFeature({ data }: { data?: ServiceFeatureData } = {}) {
  const ref = useRef<HTMLElement>(null);

  const dark = (data?.theme || DEFAULTS.theme) === "dark";
  const imageRight = (data?.imageSide || DEFAULTS.imageSide) === "right";
  const index = data?.index || DEFAULTS.index;
  const kicker = data?.kicker || DEFAULTS.kicker;
  const title = data?.title || DEFAULTS.title;
  const lead = data?.lead ?? DEFAULTS.lead;
  const description = data?.description || DEFAULTS.description;
  const features = data?.features?.length ? data.features : DEFAULTS.features;
  const image = data?.image || DEFAULTS.image;
  const imageAlt = data?.imageAlt || DEFAULTS.imageAlt;
  const ctaLabel = data?.ctaLabel ?? DEFAULTS.ctaLabel;
  const ctaHref = data?.ctaHref || DEFAULTS.ctaHref;

  const line = dark ? "border-white/15" : "border-foreground/15";
  const muted = dark ? "text-white/70" : "text-muted";
  const label = `font-mono text-[length:var(--text-label)] uppercase tracking-[var(--tracking-tight)] ${muted}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className={`relative isolate overflow-hidden px-[var(--gutter)] py-16 lg:py-24 ${
        dark ? "bg-black text-on-dark" : "bg-paper text-foreground"
      }`}
    >
      <Grain opacity={dark ? 0.07 : 0.05} blend={dark ? "screen" : "multiply"} />

      {/* Top rule: index + kicker */}
      <div data-reveal className={`relative z-10 flex items-center justify-between border-t ${line} pt-5`}>
        <span className={label}>[ {index} ]</span>
        <span className={label}>{kicker}</span>
      </div>

      <div className="relative z-10 mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-16">
        {/* Image — capped so it stays compact, not half the viewport */}
        <div data-reveal className={`relative ${imageRight ? "lg:order-2" : ""}`}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden lg:max-w-[360px]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 360px, 300px"
              className="object-cover"
            />
            {/* Glass category tag (same style as the Work cards) */}
            <span className="absolute bottom-4 left-4 rounded-3xl bg-white/30 px-2 py-1 text-[length:var(--text-body)] font-medium tracking-[var(--tracking-tight)] text-[#111] backdrop-blur-[10px]">
              {title}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={imageRight ? "lg:order-1" : ""}>
          <h3
            data-reveal
            className="text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase italic leading-[0.92] tracking-[var(--tracking-tight)]"
          >
            {title}
          </h3>

          {lead && (
            <p
              data-reveal
              className="mt-5 max-w-[42ch] text-[clamp(1.05rem,1.6vw,1.35rem)] font-medium leading-[1.35] tracking-[var(--tracking-tight)]"
            >
              {lead}
            </p>
          )}

          <p
            data-reveal
            className={`mt-4 max-w-[46ch] text-[length:var(--text-body)] leading-[1.55] tracking-[var(--tracking-tight)] ${muted}`}
          >
            {description}
          </p>

          {/* Includes list */}
          <ul data-reveal className={`mt-9 border-t ${line}`}>
            {features.map((f, i) => (
              <li
                key={i}
                className={`flex items-baseline gap-4 border-b ${line} py-3 text-[length:var(--text-body)] tracking-[var(--tracking-tight)]`}
              >
                <span className={`font-mono text-[11px] ${muted}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {ctaLabel && (
            <a
              data-reveal
              href={ctaHref}
              className={`group mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-[length:var(--text-body)] font-medium tracking-[var(--tracking-tight)] transition-colors duration-200 ${
                dark
                  ? "border border-white/60 hover:bg-white hover:text-black"
                  : "bg-accent text-on-dark hover:opacity-80"
              }`}
            >
              {ctaLabel}
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
