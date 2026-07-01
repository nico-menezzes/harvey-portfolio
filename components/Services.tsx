"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PLACEHOLDER_SERVICES, type ServiceItem } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const label = "font-mono text-[length:var(--text-label)] uppercase leading-[1.1]";

/**
 * Services / Deliverables — a dark, editorial counterpoint to the paper
 * sections. A big "[4] Deliverables" header sits above a numbered list: each
 * row pairs an italic title with a short description and a square thumbnail
 * (side-by-side on desktop, stacked on mobile). Rows fade up on scroll (GSAP).
 */
export function Services({ items = PLACEHOLDER_SERVICES }: { items?: ServiceItem[] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={ref}
      className="flex flex-col gap-8 bg-black px-[var(--gutter)] py-12 text-white lg:gap-12 lg:py-20"
    >
      <p data-reveal className={label}>[ services ]</p>

      {/* Header — reuses the fluid statement type scale (32 → 96px) */}
      <div
        data-reveal
        className="flex w-full items-center justify-between text-[length:var(--text-statement)] font-light uppercase leading-none tracking-[var(--tracking-statement)]"
      >
        <span>[{items.length}]</span>
        <span>Deliverables</span>
      </div>

      {/* Numbered list */}
      <div className="flex flex-col gap-8 lg:gap-12">
        {items.map((service, i) => (
          <article
            key={service.title}
            data-reveal
            className="flex flex-col gap-3 lg:gap-[9px]"
          >
            {/* Index + rule */}
            <div className="flex flex-col gap-[9px]">
              <p className={`w-full ${label}`}>[ {i + 1} ]</p>
              <hr className="w-full border-0 border-t border-white/30" />
            </div>

            {/* Title + (description + thumbnail) */}
            <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-start lg:justify-between lg:gap-6">
              <h3 className="whitespace-nowrap text-[36px] font-bold italic uppercase leading-[1.1] tracking-[var(--tracking-tight)]">
                {service.title}
              </h3>
              <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-start lg:gap-6">
                <p className="text-[length:var(--text-body)] leading-[1.3] tracking-[var(--tracking-tight)] lg:w-[393px]">
                  {service.description}
                </p>
                <div className="relative size-[151px] shrink-0 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} — sample work`}
                    fill
                    sizes="151px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
