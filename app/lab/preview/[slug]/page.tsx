import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { SHOWCASE } from "@/lib/showcase";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectsHero } from "@/components/ProjectsHero";
import { CreativeStatement } from "@/components/CreativeStatement";
import { About } from "@/components/About";
import { PhotoBanner } from "@/components/PhotoBanner";
import { Services } from "@/components/Services";
import { Works } from "@/components/Works";
import { Testimonials } from "@/components/Testimonials";
import { News } from "@/components/News";
import { StatementHero } from "@/components/StatementHero";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { HeroTitle } from "@/components/HeroTitle";
import { ProgressiveBlur } from "@/components/ProgressiveBlur";
import { Grain } from "@/components/ui/Grain";

// Never index the previews.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return SHOWCASE.map(({ slug }) => ({ slug }));
}

const demoLabel =
  "pointer-events-none absolute left-3 top-3 z-10 font-mono text-[10px] uppercase tracking-[var(--tracking-tight)] text-muted";

/** Each component rendered in isolation with representative sample props. */
const RENDERERS: Record<string, () => ReactNode> = {
  navbar: () => (
    <div>
      <div className="relative bg-black px-[var(--gutter)] pb-10 pt-1">
        <Navbar theme="onDark" />
      </div>
      <div className="relative bg-paper px-[var(--gutter)] pb-10 pt-1">
        <Navbar theme="onLight" />
      </div>
    </div>
  ),
  hero: () => <Hero />,
  "projects-hero": () => <ProjectsHero data={{ projectCount: 4 }} />,
  "creative-statement": () => <CreativeStatement />,
  about: () => <About />,
  "photo-banner": () => <PhotoBanner />,
  services: () => <Services />,
  works: () => <Works />,
  testimonials: () => <Testimonials />,
  news: () => <News />,
  "statement-hero": () => <StatementHero />,
  contact: () => <Contact />,
  footer: () => <Footer />,

  button: () => (
    <div className="flex flex-wrap items-center gap-4 bg-paper p-12">
      <Button href="#">Let&apos;s talk</Button>
      <Button href="#" className="opacity-80">
        Start a project
      </Button>
    </div>
  ),
  "hero-title": () => (
    <div className="relative overflow-hidden bg-black">
      <Image src="/hero.png" alt="" fill className="object-cover object-top" />
      <div className="relative px-[var(--gutter)] py-20">
        <HeroTitle text="Harvey Specter" />
      </div>
    </div>
  ),
  "progressive-blur": () => (
    <div className="relative h-[420px] overflow-hidden bg-black">
      <Image src="/photographer.png" alt="" fill className="object-cover" />
      <ProgressiveBlur className="absolute inset-x-0 bottom-0 h-1/2" />
      <span className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-[var(--tracking-tight)] text-white">
        Blur ramps up toward the bottom ↓
      </span>
    </div>
  ),
  grain: () => (
    <div className="grid grid-cols-2">
      <div className="relative h-[320px] bg-[#cfccc6]">
        <Grain opacity={0.55} blend="multiply" />
        <span className={demoLabel}>with grain</span>
      </div>
      <div className="relative h-[320px] bg-[#cfccc6]">
        <span className={demoLabel}>no grain</span>
      </div>
    </div>
  ),
};

export default async function ComponentPreview({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const render = RENDERERS[slug];
  if (!render) notFound();

  return <main className="relative min-h-[100svh]">{render()}</main>;
}
