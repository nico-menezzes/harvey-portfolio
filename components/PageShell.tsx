import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

type NavSettings = {
  logo?: string;
  ctaLabel?: string;
  navLinks?: { label: string; href: string }[];
};

type FooterData = {
  ctaText?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
  socials?: { label: string; href: string }[];
  legal?: { label: string; href: string }[];
  wordmark?: string;
  credit?: string;
};

export type SiteSettings = { nav?: NavSettings; footer?: FooterData } | null;

/**
 * The shared page chrome: the global Menu overlaid on top (its color set per
 * page via `menuTheme`) and the global Footer at the bottom — both fed from the
 * one Site Settings document, so every page gets them automatically.
 */
export function PageShell({
  settings,
  menuTheme,
  children,
}: {
  settings?: SiteSettings;
  menuTheme?: string;
  children: ReactNode;
}) {
  return (
    <main className="relative">
      <div className="absolute inset-x-0 top-0 z-50 px-[var(--gutter)]">
        <Navbar theme={menuTheme === "onDark" ? "onDark" : "onLight"} settings={settings?.nav} />
      </div>
      {children}
      <Footer data={settings?.footer ?? undefined} />
    </main>
  );
}
