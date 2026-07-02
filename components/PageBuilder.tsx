import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CreativeStatement } from "@/components/CreativeStatement";
import { About } from "@/components/About";
import { PhotoBanner } from "@/components/PhotoBanner";
import { Services } from "@/components/Services";
import { Works } from "@/components/Works";
import { Testimonials } from "@/components/Testimonials";
import { News } from "@/components/News";
import { Footer } from "@/components/Footer";

/**
 * A single section coming out of the page builder. Shape varies by `_type`;
 * the fields mirror what `PAGE_QUERY` projects for each block.
 */
export type Block = {
  _key: string;
  _type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

/** Only-if-non-empty helper: lets a component fall back to its own defaults. */
function nonEmpty<T>(arr?: T[]): T[] | undefined {
  return arr && arr.length > 0 ? arr : undefined;
}

/** Render one section block by its type, mapping it onto a ready component. */
function renderBlock(block: Block) {
  switch (block._type) {
    case "navbarBlock":
      // The menu overlays the top of the page (usually over the Hero), matching
      // the original design where the nav sat on top of the hero photo.
      return (
        <div
          key={block._key}
          className="absolute inset-x-0 top-0 z-50 px-[var(--gutter)]"
        >
          <Navbar
            settings={{
              logo: block.logo,
              ctaLabel: block.ctaLabel,
              navLinks: block.navLinks,
            }}
          />
        </div>
      );

    case "heroBlock":
      return (
        <Hero
          key={block._key}
          data={{
            eyebrow: block.eyebrow,
            name: block.name,
            intro: block.intro,
            ctaLabel: block.ctaLabel,
            image: block.image,
            imageAlt: block.imageAlt,
          }}
        />
      );

    case "creativeStatementBlock":
      return (
        <CreativeStatement
          key={block._key}
          data={{
            eyebrow: block.eyebrow,
            index: block.index,
            lines: block.lines,
            freelancerTag: block.freelancerTag,
          }}
        />
      );

    case "aboutBlock":
      return (
        <About
          key={block._key}
          data={{
            label: block.label,
            index: block.index,
            paragraph: block.paragraph,
            portrait: block.portrait,
            portraitAlt: block.portraitAlt,
          }}
        />
      );

    case "photoBannerBlock":
      return (
        <PhotoBanner
          key={block._key}
          data={{ image: block.image, imageAlt: block.imageAlt }}
        />
      );

    case "servicesBlock":
      return <Services key={block._key} items={nonEmpty(block.items)} />;

    case "worksBlock":
      return <Works key={block._key} items={nonEmpty(block.items)} />;

    case "testimonialsBlock":
      return <Testimonials key={block._key} items={nonEmpty(block.items)} />;

    case "newsBlock":
      return <News key={block._key} items={nonEmpty(block.items)} />;

    case "footerBlock":
      return (
        <Footer
          key={block._key}
          data={{
            ctaText: block.ctaText,
            ctaButtonLabel: block.ctaButtonLabel,
            ctaButtonHref: block.ctaButtonHref,
            socials: block.socials,
            legal: block.legal,
            wordmark: block.wordmark,
            credit: block.credit,
          }}
        />
      );

    default:
      return null;
  }
}

/** Renders a whole page from its ordered list of section blocks. */
export function PageBuilder({ blocks }: { blocks?: Block[] }) {
  return <>{(blocks ?? []).map((block) => renderBlock(block))}</>;
}
