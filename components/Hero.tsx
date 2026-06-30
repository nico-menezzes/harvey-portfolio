import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { ProgressiveBlur } from "@/components/ProgressiveBlur";
import { HeroTitle } from "@/components/HeroTitle";
import { Button } from "@/components/ui/Button";
import heroImage from "../public/hero.png";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-paper px-[var(--gutter)]">
      {/* Background photo — first in DOM so the title's mix-blend can blend
          against it (no stacking context sits between them). */}
      <Image
        src={heroImage}
        alt="Billboard on a sunlit city street"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Progressive blur band fading in toward the bottom edge */}
      <ProgressiveBlur className="absolute inset-x-0 bottom-0 h-[var(--hero-blur-height)]" />

      {/* Top navigation (carries its own z-index) */}
      <Navbar />

      {/* Hero content */}
      <div className="relative flex flex-1 flex-col justify-end gap-[clamp(2rem,6vh,4rem)] pb-[clamp(2rem,6vh,4rem)]">
        {/* Eyebrow + display name */}
        <div className="flex flex-col">
          <p className="mb-2 px-[18px] text-center font-mono text-[length:var(--text-label)] uppercase leading-none text-white lg:text-left">
            [ Hello i&apos;m ]
          </p>
          <HeroTitle text="Harvey Specter" />
        </div>

        {/* Intro paragraph + CTA — bottom-right on desktop */}
        <div className="flex w-[293px] max-w-full flex-col items-start gap-[17px] lg:ml-auto">
          <p className="text-[length:var(--text-body)] font-bold uppercase italic leading-[1.1] tracking-[var(--tracking-tight)] text-white">
            <span>H.Studio is a </span>
            <span className="font-normal">full-service</span>
            <span>
              {" "}
              creative studio creating beautiful digital experiences and
              products. We are an{" "}
            </span>
            <span className="font-normal">award winning</span>
            <span>
              {" "}
              desing and art group specializing in branding, web design and
              engineering.
            </span>
          </p>
          <Button href="#contact">Let&apos;s talk</Button>
        </div>
      </div>
    </section>
  );
}
