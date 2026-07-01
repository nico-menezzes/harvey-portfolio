"use client";

import { Fragment, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { PLACEHOLDER_NEWS, type NewsItem } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const HEADING_LINE_1 = "Keep up with my latest";
const HEADING_LINE_2 = "news & achievements";

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-[18px] shrink-0">
      <path d="M7 17 17 7M17 7H8m9 0v9" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function NewsCard({
  item,
  cardW,
  imgH,
}: {
  item: NewsItem;
  cardW: string;
  imgH: string;
}) {
  return (
    <article className={`flex shrink-0 flex-col gap-4 ${cardW}`}>
      <div className={`relative w-full overflow-hidden ${imgH}`}>
        <Image
          src={item.image}
          alt=""
          fill
          sizes="353px"
          className="object-cover"
          draggable={false}
        />
      </div>
      <p className="text-[length:var(--text-body)] leading-[1.3] tracking-[var(--tracking-tight)] text-muted">
        {item.excerpt}
      </p>
      <a
        href={item.href ?? "#"}
        className="inline-flex w-fit items-center gap-2.5 self-start border-b border-black py-1 text-[length:var(--text-body)] font-medium tracking-[var(--tracking-tight)] text-black transition-opacity duration-200 hover:opacity-60"
      >
        Read more
        <ArrowUpRight />
      </a>
    </article>
  );
}

/**
 * News / Blog — CMS-ready (pass `items`, capped at 5 in the CMS later).
 * Desktop: the section pins to the viewport and the row of cards scrolls
 * horizontally, driven by vertical scroll (GSAP ScrollTrigger pin + scrub).
 * Mobile: a plain Swiper carousel. Falls back to native behaviour / no pin
 * below `lg` and respects reduced-motion (the pin still works, just no smoothing
 * concerns — the horizontal move is tied 1:1 to scroll).
 */
export function News({ items = PLACEHOLDER_NEWS }: { items?: NewsItem[] }) {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const trackEl = track.current;
      const pinEl = pin.current;
      if (!trackEl || !pinEl) return;

      // How far the track must travel so its right edge meets the viewport.
      const distance = () => Math.max(0, trackEl.scrollWidth - pinEl.offsetWidth);

      gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });

    return () => mm.revert();
  }, [items]);

  return (
    <section id="news" className="bg-[#f3f3f3]">
      {/* Desktop: pinned horizontal scroll. The heading stays anchored on the
          left (z-0) while the cards slide over it (z-10). */}
      <div ref={pin} className="relative hidden h-screen overflow-hidden lg:block">
        {/* Vertical heading — fixed in place, behind the cards */}
        <div className="absolute left-[var(--gutter)] top-1/2 z-0 flex h-[706px] w-[110px] -translate-y-1/2 items-center justify-center">
          <h2 className="-rotate-90 whitespace-nowrap text-[64px] font-light uppercase leading-[0.86] tracking-[var(--tracking-statement)] text-black">
            {HEADING_LINE_1}
            <br />
            {HEADING_LINE_2}
          </h2>
        </div>

        {/* Cards track — slides horizontally, passing over the heading */}
        <div
          ref={track}
          className="absolute inset-y-0 left-0 z-10 flex items-center gap-8 pl-[300px] pr-[var(--gutter)] will-change-transform"
        >
          {items.map((item, i) => (
            <Fragment key={i}>
              {i > 0 && (
                <div aria-hidden className="h-[500px] w-px shrink-0 bg-black/15" />
              )}
              <NewsCard
                item={item}
                cardW={`w-[353px] ${i % 2 === 1 ? "translate-y-[80px]" : ""}`}
                imgH="h-[469px]"
              />
            </Fragment>
          ))}
        </div>
      </div>

      {/* Mobile: Swiper carousel */}
      <div className="flex flex-col gap-8 px-[var(--gutter)] py-16 lg:hidden">
        <h2 className="text-[32px] font-light uppercase leading-[0.86] tracking-[var(--tracking-statement)] text-black">
          {HEADING_LINE_1} {HEADING_LINE_2}
        </h2>
        <Swiper slidesPerView="auto" spaceBetween={16} grabCursor className="w-full">
          {items.map((item, i) => (
            <SwiperSlide key={i} style={{ width: "300px" }}>
              <NewsCard item={item} cardW="w-[300px]" imgH="h-[398px]" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
