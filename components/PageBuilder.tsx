import { Hero } from "@/components/Hero";
import { ProjectsHero } from "@/components/ProjectsHero";
import { StatementHero } from "@/components/StatementHero";
import { CreativeStatement } from "@/components/CreativeStatement";
import { About } from "@/components/About";
import { PhotoBanner } from "@/components/PhotoBanner";
import { Services } from "@/components/Services";
import { ServiceFeature } from "@/components/ServiceFeature";
import { Works } from "@/components/Works";
import { Testimonials } from "@/components/Testimonials";
import { News } from "@/components/News";
import { NewsHero } from "@/components/NewsHero";
import { NewsArchive } from "@/components/NewsArchive";
import { Contact } from "@/components/Contact";

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

    case "projectsHeroBlock":
      return (
        <ProjectsHero
          key={block._key}
          data={{
            eyebrow: block.eyebrow,
            meta: block.meta,
            titleTop: block.titleTop,
            titleBottom: block.titleBottom,
            intro: block.intro,
            projectCount: block.projectCount,
            years: block.years,
            categories: block.categories,
          }}
        />
      );

    case "statementHeroBlock":
      return (
        <StatementHero
          key={block._key}
          data={{
            eyebrow: block.eyebrow,
            ghostWord: block.ghostWord,
            title: block.title,
            intro: block.intro,
            ctaLabel: block.ctaLabel,
            ctaHref: block.ctaHref,
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

    case "serviceFeatureBlock":
      return (
        <ServiceFeature
          key={block._key}
          data={{
            theme: block.theme,
            imageSide: block.imageSide,
            index: block.index,
            kicker: block.kicker,
            title: block.title,
            lead: block.lead,
            description: block.description,
            features: block.features,
            image: block.image,
            imageAlt: block.imageAlt,
            ctaLabel: block.ctaLabel,
            ctaHref: block.ctaHref,
          }}
        />
      );

    case "worksBlock":
      return <Works key={block._key} items={nonEmpty(block.items)} />;

    case "testimonialsBlock":
      return <Testimonials key={block._key} items={nonEmpty(block.items)} />;

    case "newsBlock":
      return <News key={block._key} items={nonEmpty(block.items)} />;

    case "newsHeroBlock":
      return (
        <NewsHero
          key={block._key}
          data={{
            eyebrow: block.eyebrow,
            meta: block.meta,
            title: block.title,
            intro: block.intro,
          }}
        />
      );

    case "newsArchiveBlock":
      return (
        <NewsArchive
          key={block._key}
          data={{
            eyebrow: block.eyebrow,
            searchPlaceholder: block.searchPlaceholder,
            items: block.items,
          }}
        />
      );

    case "contactBlock":
      return (
        <Contact
          key={block._key}
          data={{
            eyebrow: block.eyebrow,
            index: block.index,
            heading: block.heading,
            intro: block.intro,
            email: block.email,
            location: block.location,
            availability: block.availability,
            socials: block.socials,
            projectTypes: block.projectTypes,
            successMessage: block.successMessage,
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
