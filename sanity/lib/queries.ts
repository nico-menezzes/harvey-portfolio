import { groq } from 'next-sanity'

/**
 * The projection for a page built with the page builder. Each section block is
 * expanded by its `_type`. The Services / Work / News blocks pull their items
 * straight from the three content collections. Images are returned as
 * ready-to-use URLs (`asset->url`) so components can drop them into <Image>.
 */
const PAGE_BUILDER = groq`
  pageBuilder[]{
    _key,
    _type,
    _type == "heroBlock" => {
      eyebrow,
      name,
      intro,
      ctaLabel,
      "image": backgroundImage.asset->url,
      "imageAlt": backgroundImage.alt
    },
    _type == "projectsHeroBlock" => {
      eyebrow,
      meta,
      titleTop,
      titleBottom,
      intro,
      years,
      categories,
      "projectCount": count(*[_type == "project"])
    },
    _type == "statementHeroBlock" => {
      eyebrow,
      ghostWord,
      title,
      intro,
      ctaLabel,
      ctaHref
    },
    _type == "creativeStatementBlock" => {
      eyebrow,
      index,
      lines,
      freelancerTag
    },
    _type == "aboutBlock" => {
      label,
      index,
      paragraph,
      "portrait": portrait.asset->url,
      "portraitAlt": portrait.alt
    },
    _type == "photoBannerBlock" => {
      "image": image.asset->url,
      "imageAlt": image.alt
    },
    _type == "servicesBlock" => {
      "items": *[_type == "service"] | order(order asc, _createdAt asc){
        _id, title, description, "image": image.asset->url
      }
    },
    _type == "serviceFeatureBlock" => {
      theme,
      imageSide,
      index,
      kicker,
      title,
      lead,
      description,
      features,
      "image": image.asset->url,
      "imageAlt": image.alt,
      ctaLabel,
      ctaHref
    },
    _type == "worksBlock" => {
      "items": *[_type == "project"] | order(order asc, _createdAt asc){
        _id, title, tags, href, ratio, "image": image.asset->url
      }
    },
    _type == "testimonialsBlock" => {
      "items": items[]{ _key, quote, author, "logo": logo.asset->url }
    },
    _type == "newsBlock" => {
      "items": *[_type == "post"] | order(order asc, _createdAt asc)[0...5]{
        _id, excerpt, href, "image": image.asset->url
      }
    },
    _type == "contactBlock" => {
      eyebrow,
      index,
      heading,
      intro,
      email,
      location,
      availability,
      socials[]{ _key, label, href },
      projectTypes,
      successMessage
    }
  }
`

/** Global menu + footer, configured once and shared by every page. */
export const SETTINGS_QUERY = groq`*[_id == "siteSettings"][0]{
  "nav": {
    logo,
    ctaLabel,
    navLinks[]{ _key, label, href }
  },
  "footer": {
    ctaText,
    ctaButtonLabel,
    ctaButtonHref,
    socials[]{ _key, label, href },
    legal[]{ _key, label, href },
    wordmark,
    credit
  }
}`

/** One page by its web address (slug). */
export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  menuTheme,
  ${PAGE_BUILDER}
}`

/** Every page slug — used to pre-build the dynamic routes. */
export const PAGE_SLUGS_QUERY = groq`*[_type == "page" && defined(slug.current) && slug.current != "home"]{
  "slug": slug.current
}`
