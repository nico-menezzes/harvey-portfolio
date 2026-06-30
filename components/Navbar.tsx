"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Header sits above the mobile overlay (z-50 > z-40) so the logo and
          toggle stay visible and clickable while the menu is open. */}
      <header
        className={`relative z-50 w-full transition-colors duration-300 ${
          menuOpen ? "text-foreground" : "text-on-dark"
        }`}
      >
        <nav aria-label="Primary" className="flex items-center justify-between py-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-[16px] font-semibold capitalize tracking-[var(--tracking-tight)]"
          >
            H.Studio
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-14 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[16px] font-semibold capitalize tracking-[var(--tracking-tight)] transition-opacity duration-200 hover:opacity-60"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button href="#contact">Let&apos;s talk</Button>
          </div>

          {/* Mobile toggle (hamburger ↔ X) */}
          <button
            type="button"
            className="flex h-6 w-6 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`h-[2px] w-6 bg-current transition-transform duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-6 bg-current transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-6 bg-current transition-transform duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay — full-screen, solid background. Slides down on
          open and back up on close with a symmetric easing; the links stagger
          in on open and reverse-stagger out on close. */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 bg-paper px-[var(--gutter)] pt-28 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] lg:hidden ${
          menuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <ul className="flex flex-col">
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.href}
              className={`border-b border-foreground/10 transition-[transform,opacity] duration-[400ms] ease-out ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: menuOpen
                  ? `${150 + i * 55}ms`
                  : `${(NAV_LINKS.length - 1 - i) * 45}ms`,
              }}
            >
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-5 text-4xl font-semibold capitalize tracking-[var(--tracking-tight)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="pt-10">
          <Button href="#contact" className="w-full" onClick={() => setMenuOpen(false)}>
            Let&apos;s talk
          </Button>
        </div>
      </div>
    </>
  );
}
