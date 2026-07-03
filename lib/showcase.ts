/**
 * Registry for the internal component library (`/lab`). Metadata only — it does
 * NOT import the components, so the library page stays light. The isolated
 * preview route (`app/lab/preview/[slug]`) holds the actual renderers.
 */

export type PropSpec = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

export type ShowcaseEntry = {
  slug: string;
  name: string;
  path: string;
  category: "Section" | "UI";
  description: string;
  props: PropSpec[];
  /** Stage background behind the live preview. */
  frame: "light" | "dark";
  /** Desktop iframe height in px. */
  height: number;
};

export const SHOWCASE: ShowcaseEntry[] = [
  // ── Sections ──────────────────────────────────────────────
  {
    slug: "navbar",
    name: "Navbar",
    path: "components/Navbar.tsx",
    category: "Section",
    description:
      "Top navigation — now GLOBAL (configured once in Site Settings, overlaid on every page). Desktop links + CTA; mobile hamburger opens a full-screen overlay. Text color is set per page.",
    frame: "dark",
    height: 300,
    props: [
      { name: "settings.logo", type: "string", default: '"H.Studio"', description: "Wordmark, top-left." },
      { name: "settings.navLinks", type: "{ label, href }[]", default: "5 default links", description: "Menu links." },
      { name: "settings.ctaLabel", type: "string", default: '"Let\'s talk"', description: "Right-hand button." },
      { name: "theme", type: '"onDark" | "onLight"', default: '"onDark"', description: "White text (dark bg) or black text (light bg)." },
    ],
  },
  {
    slug: "hero",
    name: "Hero",
    path: "components/Hero.tsx",
    category: "Section",
    description:
      "Full-screen opening: the big display name over a background photo, an intro paragraph and a CTA, with a progressive blur fading in at the bottom.",
    frame: "dark",
    height: 720,
    props: [
      { name: "data.eyebrow", type: "string", default: '"[ Hello i\'m ]"', description: "Small mono label above the name." },
      { name: "data.name", type: "string", default: '"Harvey Specter"', description: "Huge display name (fit-to-width on desktop)." },
      { name: "data.intro", type: "string", default: "…", description: "Short paragraph, bottom-right." },
      { name: "data.ctaLabel", type: "string", default: '"Let\'s talk"', description: "Button label." },
      { name: "data.image / imageAlt", type: "string", default: "/hero.png", description: "Background photo + alt text." },
    ],
  },
  {
    slug: "projects-hero",
    name: "ProjectsHero",
    path: "components/ProjectsHero.tsx",
    category: "Section",
    description:
      "Editorial cover for the projects page: a giant two-word title, an index paragraph with glass tags, a live project count, and a full-bleed marquee ticker.",
    frame: "light",
    height: 760,
    props: [
      { name: "data.eyebrow / meta", type: "string", description: "Top-left and top-right mono labels." },
      { name: "data.titleTop / titleBottom", type: "string", default: '"Selected" / "Work"', description: "The two stacked title words." },
      { name: "data.intro", type: "string", description: "Index paragraph." },
      { name: "data.projectCount", type: "number", default: "count() from CMS", description: "Grows automatically with the Work list." },
      { name: "data.years", type: "string", default: '"[ 2020 — 2026 ]"', description: "Years label." },
      { name: "data.categories", type: "string[]", description: "Chips + marquee items." },
    ],
  },
  {
    slug: "creative-statement",
    name: "CreativeStatement",
    path: "components/CreativeStatement.tsx",
    category: "Section",
    description:
      "Big editorial statement lines with a staggered indent on desktop. Any \"&\" becomes the decorative Playfair italic ampersand. Fades up on scroll.",
    frame: "light",
    height: 620,
    props: [
      { name: "data.eyebrow", type: "string", description: "Top-right mono label." },
      { name: "data.index", type: "string", default: '"001"', description: "Section number." },
      { name: "data.lines", type: "string[]", default: "5 lines", description: "Each entry is one big line." },
      { name: "data.freelancerTag", type: "string", description: "Small label near the last line." },
    ],
  },
  {
    slug: "about",
    name: "About",
    path: "components/About.tsx",
    category: "Section",
    description:
      "Corner-framed intro paragraph paired with a tall B&W portrait. Text fades up, corner ticks pop in, and the portrait wipes open on scroll.",
    frame: "light",
    height: 720,
    props: [
      { name: "data.label", type: "string", default: '"[ About ]"', description: "Small label." },
      { name: "data.index", type: "string", default: '"002"', description: "Section number." },
      { name: "data.paragraph", type: "string", description: "The framed body paragraph." },
      { name: "data.portrait / portraitAlt", type: "string", default: "/about-portrait.png", description: "Portrait photo + alt." },
    ],
  },
  {
    slug: "photo-banner",
    name: "PhotoBanner",
    path: "components/PhotoBanner.tsx",
    category: "Section",
    description:
      "Full-bleed photograph band with a GSAP scroll parallax — the oversized image drifts vertically as the section moves through the viewport.",
    frame: "light",
    height: 520,
    props: [
      { name: "data.image / imageAlt", type: "string", default: "/photographer.png", description: "Banner photo + alt text." },
    ],
  },
  {
    slug: "services",
    name: "Services",
    path: "components/Services.tsx",
    category: "Section",
    description:
      "Dark \"[N] Deliverables\" list — the count derives from the items. Each row pairs an italic title with a description and a square thumbnail; rows fade up on scroll.",
    frame: "dark",
    height: 760,
    props: [
      { name: "items", type: "ServiceItem[]", default: "PLACEHOLDER_SERVICES", description: "{ title, description, image } — pulled from the CMS Services list." },
    ],
  },
  {
    slug: "service-feature",
    name: "ServiceFeature",
    path: "components/ServiceFeature.tsx",
    category: "Section",
    description:
      "One big, self-contained section for a single service: an editorial image + content split with an \"includes\" list and a CTA. Light or dark theme, image on either side — add one per service and alternate them to build rhythm. Reveals on scroll.",
    frame: "light",
    height: 720,
    props: [
      { name: "data.theme", type: '"light" | "dark"', default: '"light"', description: "Section color theme." },
      { name: "data.imageSide", type: '"left" | "right"', default: '"left"', description: "Which side the image sits on (desktop)." },
      { name: "data.index / kicker", type: "string", description: "Number and small label." },
      { name: "data.title", type: "string", description: "Service name (big italic)." },
      { name: "data.lead / description", type: "string", description: "One-liner + paragraph." },
      { name: "data.features", type: "string[]", description: 'The numbered "what\'s included" list.' },
      { name: "data.image / imageAlt", type: "string", description: "Service image + alt." },
      { name: "data.ctaLabel / ctaHref", type: "string", description: "Button (hidden if label empty)." },
    ],
  },
  {
    slug: "works",
    name: "Works",
    path: "components/Works.tsx",
    category: "Section",
    description:
      "\"Selected Work\" — a staggered two-column masonry on desktop, single column on mobile, closed by a framed CTA. Cards lift/zoom on hover and reveal on scroll.",
    frame: "light",
    height: 820,
    props: [
      { name: "items", type: "WorkItem[]", default: "PLACEHOLDER_WORKS", description: "{ title, tags, image, href, ratio } — from the CMS Work list." },
    ],
  },
  {
    slug: "testimonials",
    name: "Testimonials",
    path: "components/Testimonials.tsx",
    category: "Section",
    description:
      "Giant \"Testimonials\" wordmark with review cards scattered around it. Desktop cards are draggable (GSAP + inertia); mobile becomes a Swiper slider.",
    frame: "light",
    height: 800,
    props: [
      { name: "items", type: "TestimonialItem[]", default: "PLACEHOLDER_TESTIMONIALS", description: "{ quote, author, logo } — order sets the desktop scatter." },
    ],
  },
  {
    slug: "news",
    name: "News",
    path: "components/News.tsx",
    category: "Section",
    description:
      "\"News & achievements\". Desktop pins the viewport and scrolls the cards horizontally with the page scroll; mobile is a Swiper carousel. Capped at 5.",
    frame: "light",
    height: 720,
    props: [
      { name: "items", type: "NewsItem[]", default: "PLACEHOLDER_NEWS", description: "{ image, excerpt, href } — from the CMS News list (first 5)." },
    ],
  },
  {
    slug: "statement-hero",
    name: "StatementHero",
    path: "components/StatementHero.tsx",
    category: "Section",
    description:
      "Dark, high-contrast hero: a giant outlined \"ghost\" word drifts behind a centered statement (with the italic \"&\"), an intro and an outlined CTA. Great opener or closing CTA.",
    frame: "dark",
    height: 720,
    props: [
      { name: "data.eyebrow", type: "string", description: "Small mono label." },
      { name: "data.ghostWord", type: "string", default: '"Studio"', description: "Giant outlined word behind the text." },
      { name: "data.title", type: "string", description: 'Statement — type "&" for the italic symbol.' },
      { name: "data.intro", type: "string", description: "Short paragraph." },
      { name: "data.ctaLabel / ctaHref", type: "string", description: "Outlined button (hidden if label empty)." },
    ],
  },
  {
    slug: "contact",
    name: "Contact",
    path: "components/Contact.tsx",
    category: "Section",
    description:
      "Editorial split: a big statement + direct details (email, location, socials) on the left, and a working form on the right — underline fields, project-type chips, inline validation, and idle → submitting → success states. Posts to /api/contact (saved in the Studio inbox).",
    frame: "light",
    height: 860,
    props: [
      { name: "data.eyebrow / index", type: "string", description: "Top-left label and section number." },
      { name: "data.heading", type: "string", description: 'Big statement — "&" renders the italic symbol.' },
      { name: "data.intro", type: "string", description: "Short paragraph under the heading." },
      { name: "data.email / location / availability", type: "string", description: "Direct contact details (left column)." },
      { name: "data.socials", type: "{ label, href }[]", description: "Social links." },
      { name: "data.projectTypes", type: "string[]", default: "4 defaults", description: "The selectable form chips." },
      { name: "data.successMessage", type: "string", description: "Shown after a successful submit." },
    ],
  },
  {
    slug: "footer",
    name: "Footer",
    path: "components/Footer.tsx",
    category: "Section",
    description:
      "Black closing block: a \"Have a project in mind?\" CTA, social + legal links, and a giant wordmark that bleeds off the bottom. Now GLOBAL (from Site Settings, added to every page automatically). Doubles as the #contact anchor.",
    frame: "dark",
    height: 680,
    props: [
      { name: "data.ctaText / ctaButtonLabel / ctaButtonHref", type: "string", description: "The call-to-action." },
      { name: "data.socials / legal", type: "{ label, href }[]", description: "Link columns." },
      { name: "data.wordmark", type: "string", default: '"H.Studio"', description: "Giant bleeding wordmark." },
      { name: "data.credit", type: "string", default: '"[ Coded By Claude ]"', description: "Small credit line." },
    ],
  },

  // ── UI / primitives ───────────────────────────────────────
  {
    slug: "button",
    name: "Button",
    path: "components/ui/Button.tsx",
    category: "UI",
    description: "Pill-shaped primary action used across the site (e.g. \"Let's talk\").",
    frame: "light",
    height: 220,
    props: [
      { name: "href", type: "string", description: "Destination (required)." },
      { name: "children", type: "ReactNode", description: "Label." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },
  {
    slug: "hero-title",
    name: "HeroTitle",
    path: "components/HeroTitle.tsx",
    category: "UI",
    description:
      "The display name that measures itself and scales to span the container width exactly on desktop (single line); wraps to a fluid size below lg.",
    frame: "dark",
    height: 360,
    props: [{ name: "text", type: "string", description: "The word(s) to fit." }],
  },
  {
    slug: "progressive-blur",
    name: "ProgressiveBlur",
    path: "components/ProgressiveBlur.tsx",
    category: "UI",
    description:
      "Pure-CSS blur that ramps up toward the bottom edge (stacked backdrop-filter layers with shifted gradient masks). Anchor it with position utilities.",
    frame: "dark",
    height: 420,
    props: [{ name: "className", type: "string", description: "Position/size utilities (e.g. absolute bottom-0 h-40)." }],
  },
  {
    slug: "grain",
    name: "Grain",
    path: "components/ui/Grain.tsx",
    category: "UI",
    description: "Reusable film-grain overlay (inline SVG noise) for atmosphere and depth.",
    frame: "light",
    height: 320,
    props: [
      { name: "opacity", type: "number", default: "0.05", description: "Grain strength." },
      { name: "blend", type: '"multiply" | "screen" | "overlay"', default: '"multiply"', description: "multiply on light, screen on dark." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },
];
