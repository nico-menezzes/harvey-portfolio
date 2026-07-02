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
- **Homepage** (`/`) — the full page, in order: **Hero → Creative Statement → About → Photo Banner → Services → Selected Work → Testimonials → News → Footer**. (Complete.)

## Content editing (Sanity CMS) — READ THIS FIRST
**Almost all text and every image on the site is now edited in Sanity, your content manager.** You don't need to touch code to change words or photos.

- **Where to edit:** open **`/studio`** in your site (e.g. `yoursite.com/studio`). Log in with your Sanity account. You'll see a sidebar called **Website Content**.
- **How it's organised in the sidebar:**
  - **Site Settings (menu)** — the top menu: logo text, menu links, and the "Let's talk" button label.
  - **Hero (Opening)** — the big name, small label, intro paragraph, button, and background photo.
  - **Creative Statement** — the big editorial lines ("A creative director / Photographer …"). Type `&` and it becomes the fancy italic symbol automatically. Keep it to about 5 lines.
  - **About** — the intro paragraph and the tall portrait photo.
  - **Photo Banner** — the full-width photo.
  - **Footer** — the "Have a project in mind?" text, the button + link, social links, legal links, and the giant wordmark.
  - **Services** — add/edit each service (title, description, thumbnail). Use the **Order** number to sort them.
  - **Projects (Selected Work)** — each portfolio card (title, tags, image, link, image shape). Sorted by **Order**.
  - **News Posts** — each news card (image, text, "Read more" link). Only the first **5** (by Order) show on the site.
  - **Testimonials** — each review (quote, author, brand logo). Sorted by **Order**.
- **After editing:** click **Publish**. The website updates within about 30 seconds.
- **What is NOT in the CMS (stays in code, by design):** the three section headings — **Services / Deliverables**, **Selected Work**, and the **News** heading — plus the "Testimonials" wordmark. Everything else is editable.
- **Under the hood:** section schemas live in `sanity/schemaTypes/` (singletons in `singletons/`, collections in `documents/`); the sidebar layout is `sanity/structure.ts`; the homepage fetches everything in one query (`sanity/lib/queries.ts`) inside `app/page.tsx` and passes it to each section. Images come from the Sanity CDN (`cdn.sanity.io`, allowed in `next.config.ts`). If the CMS is ever empty, sections fall back to the safe defaults in `lib/content.ts` and each component. The one-time content import is `scripts/seed.ts` (re-run with `npx sanity exec scripts/seed.ts --with-user-token`).

## Components
- **Footer** (`components/Footer.tsx`) — black footer with a "Have a project in mind?" CTA + outlined "Let's talk" button, social links (two aligned columns on desktop, stacked on mobile), a divider, legal links, and a giant "H.Studio" wordmark that bleeds off the bottom edge with a vertical "Coded By Claude" credit. Has `id="contact"`, so the navbar's Contact link scrolls here. Social/legal hrefs are placeholders (`#`) to fill in later.
- **SmoothScroll** (`components/SmoothScroll.tsx`) — wraps the whole page in GSAP **ScrollSmoother** so scrolling glides with a smooth, eased feel (desktop wheel/trackpad only; touch devices keep native scrolling; off for "reduce motion"). In-page anchor links (About, Services…) are intercepted so they scroll smoothly to their section.
- **Navbar** (`components/Navbar.tsx`) — top navigation. On desktop: logo, links (About, Services, Projects, News, Contact) and a "Let's talk" button. On mobile: logo + a hamburger that opens a menu. Built with proper HTML tags (`<header>`, `<nav>`, `<ul>`, `<a>`, `<button>`).
- **Hero** (`components/Hero.tsx`) — full-screen opening with the big "Harvey Specter" name over a background photo, an intro paragraph and a "Let's talk" button. Has a progressive blur fading in at the bottom.
- **Button** (`components/ui/Button.tsx`) — the reusable black pill button used for every "Let's talk".
- **ProgressiveBlur** (`components/ProgressiveBlur.tsx`) — reusable CSS-only blur that gets stronger toward the bottom edge.
- **CreativeStatement** (`components/CreativeStatement.tsx`) — the big editorial "A creative director / Photographer / Born & raised on the south side of chicago." statement. Staggered/indented on desktop, centered on mobile, with a fade-up reveal when scrolled into view.
- **News** (`components/News.tsx`) — the "Keep up with my latest news & achievements" blog section (grey `#f3f3f3`). Desktop: the section **pins** to the viewport and the whole row (the vertical rotated heading + cards) **scrolls horizontally as you scroll the page** (GSAP ScrollTrigger pin + scrub, set up with `gsap.matchMedia` so it's desktop-only); alternate cards are staggered down. Mobile: a plain **Swiper** carousel. CMS-ready via an `items` prop (`lib/content.ts`), meant to be capped at 5 posts.
- **Testimonials** (`components/Testimonials.tsx`) — a giant "Testimonials" wordmark with review cards scattered around it. On desktop the cards are **draggable** (GSAP Draggable + inertia) and one sits *behind* the word while the rest are in front (z-index matches the Figma); on mobile it becomes a **Swiper** slider. CMS-ready via an `items` prop (see `lib/content.ts`); desktop positions cycle through a `POSITIONS` preset table in the component. Uses `swiper` + GSAP `Draggable`/`InertiaPlugin`.
- **Works** (`components/Works.tsx`) — the "Selected Work" (004) portfolio section: a staggered two-column masonry on desktop, single column on mobile, closed by a corner-framed "Let's talk" CTA. Each card has an image with glass tags, a title and a ↗ arrow; cards lift/zoom on hover and reveal on scroll (GSAP). CMS-ready — takes an `items` prop (see `lib/content.ts`).
- **Services** (`components/Services.tsx`) — the dark "Services / [4] Deliverables" section. CMS-ready: takes an `items` prop (defaults to the placeholder list in `lib/content.ts`); the "[4]" count is derived from the number of items. Each row: an index `[ n ]` + divider line, then an italic title with a description and a 151px square thumbnail (side-by-side on desktop, stacked on mobile). Rows fade up on scroll (GSAP). Descriptions are placeholders in `DESCRIPTION`; thumbnails live at `public/service-1..4.png`.
- **PhotoBanner** (`components/PhotoBanner.tsx`) — a full-width (edge-to-edge) photograph of Harvey shooting with a camera. The image is oversized and clipped by the frame, and drifts vertically on scroll for a **GSAP parallax** effect (turns off for "reduce motion"). Photo lives at `public/photographer.png`.
- **About** (`components/About.tsx`) — the "002 / About" section: an intro paragraph framed by small corner ticks, paired with a tall black & white portrait. On desktop the label sits top-left, the framed paragraph is bottom-aligned with the portrait, and "002" pins to the portrait's top; on mobile everything stacks. Reveals on scroll with GSAP: text fades up, corner ticks pop in, and the portrait wipes open top-to-bottom with a slow zoom. Portrait lives at `public/about-portrait.png`.

## Design System (for future sections)
All styling uses Tailwind + variables in `app/globals.css`, so new pages stay consistent:
- Colors: `bg-paper`, `text-foreground`, `text-muted`, `text-on-dark`, `bg-accent`
- Side padding (page gutter): `px-[var(--gutter)]` (16px mobile → 32px desktop)
- Display title size: `text-[length:var(--text-hero)]`
- Labels: `font-mono text-[length:var(--text-label)]`

## Recent Changes
- 2026-07-02: **Connected the whole site to Sanity CMS.** All section text and images are now edited at `/studio` — created schemas for Site Settings, Hero, Creative Statement, About, Photo Banner, Footer (one-of-a-kind sections) plus Services, Projects, News Posts and Testimonials (add/remove collections, sorted by an Order number). Organised the Studio sidebar (`sanity/structure.ts`), wired the homepage to fetch everything from Sanity (`app/page.tsx` + `sanity/lib/queries.ts`), refactored each component to take its content as props, allowed Sanity CDN images in `next.config.ts`, and imported all real copy + uploaded the 18 existing images via `scripts/seed.ts`. Removed the old lorem/placeholder text. Only the Services/Selected Work/News headings and the "Testimonials" wordmark stay in code.
- 2026-07-01: Built the **Footer** from Figma (CTA, social/legal links, giant bleeding "H.Studio" wordmark, "Coded By Claude" credit) and wired it as the `#contact` anchor. Homepage is now complete end-to-end.
- 2026-07-01: Built the **News** section from Figma — desktop pins and scrolls the cards horizontally with the page scroll (GSAP ScrollTrigger pin + scrub), mobile is a Swiper carousel. CMS-ready via `items` / `PLACEHOLDER_NEWS` (cap 5).
- 2026-07-01: Testimonials desktop heading now uses the Hero's fit-to-width logic (measures the word and scales the font to span the full stage width, via ResizeObserver) instead of a capped size.
- 2026-07-01: Built the **Testimonials** section from Figma — draggable scattered cards on desktop (GSAP Draggable + inertia, with the correct behind/in-front z-index against the big wordmark) and a Swiper slider on mobile. CMS-ready via `items` / `PLACEHOLDER_TESTIMONIALS`. Added `swiper` dependency.
- 2026-07-01: Tuned **Selected Work** — shorter card images (aspect-ratio driven instead of fixed height, so it's responsive at every width), more top/side breathing room, a responsive column offset (`clamp`), and extra space before the CTA.
- 2026-07-01: Built the **Selected Work** (004) section from Figma — staggered two-column masonry on desktop, single column on mobile, framed CTA, hover lift/zoom + scroll reveal (GSAP). Made both **Works** and **Services** CMS-ready by moving their content into `lib/content.ts` (typed placeholder data) and having the components accept an `items` prop.
- 2026-07-01: Added site-wide **GSAP ScrollSmoother** smooth scrolling (`components/SmoothScroll.tsx`, wired in `app/layout.tsx`). Anchor links scroll smoothly; navbar stays in flow; touch + reduce-motion fall back to native scroll.
- 2026-07-01: Built the dark **Services** section (`[4] Deliverables`) from Figma — data-driven list of 4 services (title + description + thumbnail), side-by-side on desktop, stacked on mobile, with a GSAP fade-up per row. Reuses the design tokens (statement type scale, label/body sizes, tracking) to keep classes lean.
- 2026-07-01: Added the full-bleed **Photo Banner** section with a **GSAP scroll parallax** (the photo drifts vertically as you scroll past). Same photo is used for desktop and mobile, re-cropped per screen.
- 2026-07-01: Built the **About** section (`002`) from Figma — corner-framed intro paragraph + tall B&W portrait, side-by-side on desktop and stacked on mobile, with a GSAP scroll reveal (text fade-up, corner ticks, portrait wipe + zoom).
- 2026-07-01: Rebuilt the **Creative Statement** reveal with **GSAP + ScrollTrigger**. It starts once the section reaches the lower 45% of the screen (`start: "top 55%"`) and now plays much slower and smoother (~2s per line, `power3.out` easing, gentle stagger). Also respects "reduce motion" system settings. GSAP is now a project dependency.
- 2026-06-30: Built the **Hero** section (desktop + mobile) from the Figma design, the **Navbar**, a reusable **Button**, and a CSS **progressive blur**. Set up the color/type/spacing variable system. Switched fonts to Inter + Geist Mono.
- 2026-06-30: Hero polish — anchored the progressive blur to the bottom edge; fixed the big "Harvey Specter" title so it blends with the photo (`mix-blend-overlay`) and runs full-width to the right using `vw` sizing; framed the photo from the top (`object-top`); turned the mobile menu into a full-screen overlay with a solid background and a slide-down animation.

## How to Customize
- **Change any text or photo (the easy way):** go to **`/studio`**, edit the section, and click **Publish**. See "Content editing (Sanity CMS)" above.
- **Change a color:** edit the variables at the top of `app/globals.css` (e.g. `--c-paper`, `--accent`). (Colors are in code, not the CMS.)
- **Add a new service / project / news post / testimonial:** in `/studio`, open that list, click **Create**, fill it in, set the **Order** number, and Publish.
- **Reorder items:** change the **Order** number (lower = first) and Publish.
