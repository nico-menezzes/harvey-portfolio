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
- **Homepage** (`/`) — shows the **Hero**, the **Creative Statement**, the **About** section, the full-bleed **Photo Banner**, then the dark **Services** section. More sections coming (Projects, News, Contact).

## Components
- **SmoothScroll** (`components/SmoothScroll.tsx`) — wraps the whole page in GSAP **ScrollSmoother** so scrolling glides with a smooth, eased feel (desktop wheel/trackpad only; touch devices keep native scrolling; off for "reduce motion"). In-page anchor links (About, Services…) are intercepted so they scroll smoothly to their section.
- **Navbar** (`components/Navbar.tsx`) — top navigation. On desktop: logo, links (About, Services, Projects, News, Contact) and a "Let's talk" button. On mobile: logo + a hamburger that opens a menu. Built with proper HTML tags (`<header>`, `<nav>`, `<ul>`, `<a>`, `<button>`).
- **Hero** (`components/Hero.tsx`) — full-screen opening with the big "Harvey Specter" name over a background photo, an intro paragraph and a "Let's talk" button. Has a progressive blur fading in at the bottom.
- **Button** (`components/ui/Button.tsx`) — the reusable black pill button used for every "Let's talk".
- **ProgressiveBlur** (`components/ProgressiveBlur.tsx`) — reusable CSS-only blur that gets stronger toward the bottom edge.
- **CreativeStatement** (`components/CreativeStatement.tsx`) — the big editorial "A creative director / Photographer / Born & raised on the south side of chicago." statement. Staggered/indented on desktop, centered on mobile, with a fade-up reveal when scrolled into view.
- **Services** (`components/Services.tsx`) — the dark "Services / [4] Deliverables" section. Driven by a `SERVICES` array (title + description + thumbnail), so adding/editing a service is just editing that list. Each row: an index `[ n ]` + divider line, then an italic title with a description and a 151px square thumbnail (side-by-side on desktop, stacked on mobile). Rows fade up on scroll (GSAP). Descriptions are placeholders in `DESCRIPTION`; thumbnails live at `public/service-1..4.png`.
- **PhotoBanner** (`components/PhotoBanner.tsx`) — a full-width (edge-to-edge) photograph of Harvey shooting with a camera. The image is oversized and clipped by the frame, and drifts vertically on scroll for a **GSAP parallax** effect (turns off for "reduce motion"). Photo lives at `public/photographer.png`.
- **About** (`components/About.tsx`) — the "002 / About" section: an intro paragraph framed by small corner ticks, paired with a tall black & white portrait. On desktop the label sits top-left, the framed paragraph is bottom-aligned with the portrait, and "002" pins to the portrait's top; on mobile everything stacks. Reveals on scroll with GSAP: text fades up, corner ticks pop in, and the portrait wipes open top-to-bottom with a slow zoom. Portrait lives at `public/about-portrait.png`.

## Design System (for future sections)
All styling uses Tailwind + variables in `app/globals.css`, so new pages stay consistent:
- Colors: `bg-paper`, `text-foreground`, `text-muted`, `text-on-dark`, `bg-accent`
- Side padding (page gutter): `px-[var(--gutter)]` (16px mobile → 32px desktop)
- Display title size: `text-[length:var(--text-hero)]`
- Labels: `font-mono text-[length:var(--text-label)]`

## Recent Changes
- 2026-07-01: Added site-wide **GSAP ScrollSmoother** smooth scrolling (`components/SmoothScroll.tsx`, wired in `app/layout.tsx`). Anchor links scroll smoothly; navbar stays in flow; touch + reduce-motion fall back to native scroll.
- 2026-07-01: Built the dark **Services** section (`[4] Deliverables`) from Figma — data-driven list of 4 services (title + description + thumbnail), side-by-side on desktop, stacked on mobile, with a GSAP fade-up per row. Reuses the design tokens (statement type scale, label/body sizes, tracking) to keep classes lean.
- 2026-07-01: Added the full-bleed **Photo Banner** section with a **GSAP scroll parallax** (the photo drifts vertically as you scroll past). Same photo is used for desktop and mobile, re-cropped per screen.
- 2026-07-01: Built the **About** section (`002`) from Figma — corner-framed intro paragraph + tall B&W portrait, side-by-side on desktop and stacked on mobile, with a GSAP scroll reveal (text fade-up, corner ticks, portrait wipe + zoom).
- 2026-07-01: Rebuilt the **Creative Statement** reveal with **GSAP + ScrollTrigger**. It starts once the section reaches the lower 45% of the screen (`start: "top 55%"`) and now plays much slower and smoother (~2s per line, `power3.out` easing, gentle stagger). Also respects "reduce motion" system settings. GSAP is now a project dependency.
- 2026-06-30: Built the **Hero** section (desktop + mobile) from the Figma design, the **Navbar**, a reusable **Button**, and a CSS **progressive blur**. Set up the color/type/spacing variable system. Switched fonts to Inter + Geist Mono.
- 2026-06-30: Hero polish — anchored the progressive blur to the bottom edge; fixed the big "Harvey Specter" title so it blends with the photo (`mix-blend-overlay`) and runs full-width to the right using `vw` sizing; framed the photo from the top (`object-top`); turned the mobile menu into a full-screen overlay with a solid background and a slide-down animation.

## How to Customize
- **Change a color:** edit the variables at the top of `app/globals.css` (e.g. `--c-paper`, `--accent`).
- **Change the hero photo:** replace `public/hero-harvey.png`.
- **Edit nav links:** edit the `NAV_LINKS` list at the top of `components/Navbar.tsx`.
- **Edit hero text:** edit `components/Hero.tsx`.
