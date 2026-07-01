/**
 * Content model for the CMS-backed sections (Services + Selected Work).
 *
 * These types describe the shape each section expects. Right now the sections
 * fall back to the PLACEHOLDER_* arrays below, but they already accept their
 * data via props — so wiring a CMS later is just: fetch → map to these types →
 * pass into <Services items={…} /> and <Works items={…} />. Nothing in the
 * components needs to change.
 *
 * `image` is a plain URL/path string (not a static import) precisely so a CMS
 * can supply remote image URLs. Local placeholders live in /public.
 */

export type ServiceItem = {
  title: string;
  description: string;
  image: string;
};

export type NewsItem = {
  image: string;
  excerpt: string;
  /** Link to the full article. */
  href?: string;
};

export type TestimonialItem = {
  quote: string;
  author: string;
  /** Company/brand logo (URL or path). */
  logo?: string;
};

export type WorkItem = {
  title: string;
  tags: string[];
  image: string;
  /** Link to the case study / project. */
  href?: string;
  /** CSS aspect-ratio for the card (e.g. "676 / 744"). Drives the masonry rhythm. */
  ratio?: string;
};

// Shared placeholder copy from the Figma design.
const SERVICE_DESCRIPTION =
  "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.";

export const PLACEHOLDER_SERVICES: ServiceItem[] = [
  { title: "Brand Discovery", description: SERVICE_DESCRIPTION, image: "/service-1.png" },
  { title: "Web design & Dev", description: SERVICE_DESCRIPTION, image: "/service-2.png" },
  { title: "Marketing", description: SERVICE_DESCRIPTION, image: "/service-3.png" },
  { title: "Photography", description: SERVICE_DESCRIPTION, image: "/service-4.png" },
];

// News / blog posts. Capped at 5 in the CMS later; the section renders however
// many it receives.
const NEWS_EXCERPT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export const PLACEHOLDER_NEWS: NewsItem[] = [
  { image: "/news-1.png", excerpt: NEWS_EXCERPT, href: "#" },
  { image: "/news-2.png", excerpt: NEWS_EXCERPT, href: "#" },
  { image: "/news-3.png", excerpt: NEWS_EXCERPT, href: "#" },
  { image: "/news-1.png", excerpt: NEWS_EXCERPT, href: "#" },
  { image: "/news-2.png", excerpt: NEWS_EXCERPT, href: "#" },
];

// Order matters: the Testimonials section maps each item to a preset scatter
// position on desktop (see the POSITIONS table in components/Testimonials.tsx).
export const PLACEHOLDER_TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    author: "Marko Stojković",
    logo: "/logo-marko.svg",
  },
  {
    quote:
      "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    author: "Lukas Weber",
    logo: "/logo-lukas.svg",
  },
  {
    quote:
      "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don’t just make things look good; they solve business problems through visual clarity.",
    author: "Sarah Jenkins",
    logo: "/logo-sarah.svg",
  },
  {
    quote:
      "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    author: "Sofia Martínez",
    logo: "/logo-sofia.svg",
  },
];

export const PLACEHOLDER_WORKS: WorkItem[] = [
  {
    title: "Surfers paradise",
    tags: ["Social Media", "Photography"],
    image: "/work-1.png",
    href: "#",
    ratio: "5 / 4",
  },
  {
    title: "Cyberpunk caffe",
    tags: ["Social Media", "Photography"],
    image: "/work-2.png",
    href: "#",
    ratio: "4 / 3",
  },
  {
    title: "Agency 976",
    tags: ["Social Media", "Photography"],
    image: "/work-3.png",
    href: "#",
    ratio: "4 / 3",
  },
  {
    title: "Minimal Playground",
    tags: ["Social Media", "Photography"],
    image: "/work-4.png",
    href: "#",
    ratio: "5 / 4",
  },
];
