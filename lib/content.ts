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
