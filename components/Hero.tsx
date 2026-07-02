import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { ProgressiveBlur } from "@/components/ProgressiveBlur";
import { HeroTitle } from "@/components/HeroTitle";
import { Button } from "@/components/ui/Button";

type HeroData = {
  eyebrow?: string;
  name?: string;
  intro?: string;
  ctaLabel?: string;
  image?: string;
  imageAlt?: string;
};

type NavSettings = {
  logo?: string;
  ctaLabel?: string;
  navLinks?: { label: string; href: string }[];
};

export function Hero({
  data,
  settings,
}: {
  data?: HeroData;
  settings?: NavSettings;
} = {}) {
  const eyebrow = data?.eyebrow || "[ Hello i'm ]";
  const name = data?.name || "Harvey Specter";
  const intro =
    data?.intro ||
    "H.Studio is a full-service creative studio creating beautiful digital experiences and products. We are an award winning design and art group specializing in branding, web design and engineering.";
  const ctaLabel = data?.ctaLabel || "Let's talk";
  const image = data?.image || "/hero.png";
  const imageAlt = data?.imageAlt || "Billboard on a sunlit city street";

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-paper px-[var(--gutter)]">
      {/* Background photo — first in DOM so the title's mix-blend can blend
          against it (no stacking context sits between them). */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Bottom fade-out: a dark gradient so the hero dissolves into its base
          (and the white copy/CTA stay readable) regardless of blur support. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[var(--hero-blur-height)] bg-gradient-to-t from-black/60 via-black/25 to-transparent"
      />

      {/* Progressive blur band fading in toward the bottom edge */}
      <ProgressiveBlur className="absolute inset-x-0 bottom-0 h-[var(--hero-blur-height)]" />

      {/* Top navigation (carries its own z-index) */}
      <Navbar settings={settings} />

      {/* Hero content */}
      <div className="relative flex flex-1 flex-col justify-end gap-[clamp(2rem,6vh,4rem)] pb-[clamp(2rem,6vh,4rem)]">
        {/* Eyebrow + display name */}
        <div className="flex flex-col">
          <p className="mb-2 px-[18px] text-center font-mono text-[length:var(--text-label)] uppercase leading-none text-white lg:text-left">
            {eyebrow}
          </p>
          <HeroTitle text={name} />
        </div>

        {/* Intro paragraph + CTA — bottom-right on desktop */}
        <div className="flex w-[293px] max-w-full flex-col items-start gap-[17px] lg:ml-auto">
          <p className="text-[length:var(--text-body)] font-bold uppercase italic leading-[1.1] tracking-[var(--tracking-tight)] text-white">
            {intro}
          </p>
          <Button href="#contact">{ctaLabel}</Button>
        </div>
      </div>
    </section>
  );
}
