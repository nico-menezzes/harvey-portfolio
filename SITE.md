# H.Studio — Harvey Specter

> A full-service creative studio: branding, web design and engineering.

## Brand Identity
- **Personality:** Bold, editorial, minimal. Big typography, black & white, lots of breathing room.
- **Colors** (defined as variables in `app/globals.css`):
  - Background: warm off-white `#f2f2f0` (`--c-paper`)
  - Text / buttons: black `#000000` (`--accent`)
  - Body copy: near-black `#1f1f1f` (`--muted`)
  - On imagery: white `#ffffff` (`--on-dark`)
- **Fonts:**
  - `Inter` — all headings and text
  - `Geist Mono` — the bracket labels like `[ Hello i'm ]`
  - `Playfair Display` (italic) — the decorative serif "&" in big statements

## Pages
- **Homepage** (`/`) — shows the **Hero**, then the **Creative Statement** section. More sections coming (About, Services, Projects, News, Contact).

## Components
- **Navbar** (`components/Navbar.tsx`) — top navigation. On desktop: logo, links (About, Services, Projects, News, Contact) and a "Let's talk" button. On mobile: logo + a hamburger that opens a menu. Built with proper HTML tags (`<header>`, `<nav>`, `<ul>`, `<a>`, `<button>`).
- **Hero** (`components/Hero.tsx`) — full-screen opening with the big "Harvey Specter" name over a background photo, an intro paragraph and a "Let's talk" button. Has a progressive blur fading in at the bottom.
- **Button** (`components/ui/Button.tsx`) — the reusable black pill button used for every "Let's talk".
- **ProgressiveBlur** (`components/ProgressiveBlur.tsx`) — reusable CSS-only blur that gets stronger toward the bottom edge.
- **CreativeStatement** (`components/CreativeStatement.tsx`) — the big editorial "A creative director / Photographer / Born & raised on the south side of chicago." statement. Staggered/indented on desktop, centered on mobile, with a fade-up reveal when scrolled into view.

## Design System (for future sections)
All styling uses Tailwind + variables in `app/globals.css`, so new pages stay consistent:
- Colors: `bg-paper`, `text-foreground`, `text-muted`, `text-on-dark`, `bg-accent`
- Side padding (page gutter): `px-[var(--gutter)]` (16px mobile → 32px desktop)
- Display title size: `text-[length:var(--text-hero)]`
- Labels: `font-mono text-[length:var(--text-label)]`

## Recent Changes
- 2026-06-30: Built the **Hero** section (desktop + mobile) from the Figma design, the **Navbar**, a reusable **Button**, and a CSS **progressive blur**. Set up the color/type/spacing variable system. Switched fonts to Inter + Geist Mono.
- 2026-06-30: Hero polish — anchored the progressive blur to the bottom edge; fixed the big "Harvey Specter" title so it blends with the photo (`mix-blend-overlay`) and runs full-width to the right using `vw` sizing; framed the photo from the top (`object-top`); turned the mobile menu into a full-screen overlay with a solid background and a slide-down animation.

## How to Customize
- **Change a color:** edit the variables at the top of `app/globals.css` (e.g. `--c-paper`, `--accent`).
- **Change the hero photo:** replace `public/hero-harvey.png`.
- **Edit nav links:** edit the `NAV_LINKS` list at the top of `components/Navbar.tsx`.
- **Edit hero text:** edit `components/Hero.tsx`.
