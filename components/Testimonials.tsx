"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { PLACEHOLDER_TESTIMONIALS, type TestimonialItem } from "@/lib/content";

gsap.registerPlugin(Draggable, InertiaPlugin);

/**
 * Desktop scatter — one preset per testimonial, as percentages of the stage so
 * the arrangement scales with the viewport. `back: true` places the card behind
 * the giant heading (lower z-index); the rest sit in front, matching the Figma.
 */
const POSITIONS = [
  { left: "7%", top: "16.5%", rotate: -6.85, back: false }, // Marko
  { left: "47%", top: "31.5%", rotate: 2.9, back: true }, //  Lukas — behind the word
  { left: "21%", top: "64%", rotate: 2.23, back: false }, //  Sarah
  { left: "68.5%", top: "63.5%", rotate: -4.15, back: false }, // Sofia
];

const headingClass =
  "font-medium capitalize leading-[1.1] tracking-[var(--tracking-hero)] text-foreground";

const BASE_PX = 200; // size used to measure the heading's natural width

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <figure className="flex w-full flex-col gap-4 rounded border border-[#ddd] bg-[#f1f1f1] p-6 select-none">
      {item.logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.logo}
          alt=""
          draggable={false}
          className="h-[22px] w-auto max-w-[160px] self-start object-contain object-left"
        />
      )}
      <blockquote className="text-[18px] leading-[1.3] tracking-[var(--tracking-tight)] text-muted">
        {item.quote}
      </blockquote>
      <figcaption className="text-[16px] font-black uppercase leading-[1.1] tracking-[var(--tracking-tight)] text-foreground">
        {item.author}
      </figcaption>
    </figure>
  );
}

/**
 * Testimonials — a giant "Testimonials" wordmark with testimonial cards
 * scattered around it on desktop (draggable via GSAP Draggable + inertia, some
 * tucked behind the word), and a Swiper slider on mobile. CMS-ready: pass
 * `items`; the desktop positions cycle through the POSITIONS presets.
 */
export function Testimonials({ items = PLACEHOLDER_TESTIMONIALS }: { items?: TestimonialItem[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [headingSize, setHeadingSize] = useState<number>();

  // Fit-to-width heading (same logic as the Hero H1): measure the word at a
  // fixed size, then scale the font so it spans the full stage width.
  useEffect(() => {
    const stageEl = stage.current;
    const measure = measureRef.current;
    if (!stageEl || !measure) return;

    const fit = () => {
      if (!window.matchMedia("(min-width: 1024px)").matches) {
        setHeadingSize(undefined);
        return;
      }
      const natural = measure.getBoundingClientRect().width;
      if (natural) setHeadingSize((stageEl.clientWidth / natural) * BASE_PX);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(stageEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const cards = gsap.utils.toArray<HTMLElement>(el.querySelectorAll(".ts-card"));
    cards.forEach((card, i) => {
      gsap.set(card, { rotation: POSITIONS[i % POSITIONS.length].rotate });
    });

    let topZ = 30;
    const drags = Draggable.create(cards, {
      type: "x,y",
      bounds: el,
      inertia: true,
      edgeResistance: 0.7,
      onPress() {
        this.target.style.zIndex = String(++topZ);
        gsap.to(this.target, { scale: 1.03, duration: 0.2, ease: "power2.out" });
      },
      onRelease() {
        gsap.to(this.target, { scale: 1, duration: 0.2, ease: "power2.out" });
      },
    });

    return () => drags.forEach((d) => d.kill());
  }, [items]);

  return (
    <section id="testimonials" className="overflow-hidden bg-paper px-4 py-20 lg:py-32">
      {/* Desktop: draggable scatter around the wordmark */}
      <div
        ref={stage}
        className="relative mx-auto hidden aspect-[1440/860] w-full max-w-[1440px] lg:block"
      >
        {/* Off-screen measurer: same font/tracking, fixed size, single line */}
        <span
          ref={measureRef}
          aria-hidden
          className={`pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap ${headingClass}`}
          style={{ fontSize: BASE_PX }}
        >
          Testimonials
        </span>
        <h2
          className={`pointer-events-none absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-[length:var(--text-hero)] ${headingClass}`}
          style={headingSize ? { fontSize: headingSize } : undefined}
        >
          Testimonials
        </h2>
        {items.map((item, i) => {
          const pos = POSITIONS[i % POSITIONS.length];
          return (
            <div
              key={item.author}
              className={`ts-card absolute w-[clamp(280px,24vw,353px)] cursor-grab active:cursor-grabbing ${
                pos.back ? "z-0" : "z-20"
              }`}
              style={{ left: pos.left, top: pos.top }}
            >
              <TestimonialCard item={item} />
            </div>
          );
        })}
      </div>

      {/* Mobile: heading + Swiper slider */}
      <div className="flex flex-col gap-8 lg:hidden">
        <h2 className={`text-[64px] leading-[0.8] ${headingClass}`}>Testimonials</h2>
        <Swiper slidesPerView="auto" spaceBetween={16} grabCursor className="w-full">
          {items.map((item, i) => (
            <SwiperSlide key={item.author} style={{ width: "260px" }}>
              <div style={{ rotate: `${i % 2 ? 2 : -3}deg` }} className="py-2">
                <TestimonialCard item={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
