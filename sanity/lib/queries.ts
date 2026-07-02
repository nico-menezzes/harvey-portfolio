import { groq } from 'next-sanity'

/**
 * Everything the homepage needs, in one request. Images are returned as ready-to-use
 * URLs (`asset->url`) so the components can drop them straight into <Image>.
 */
export const HOMEPAGE_QUERY = groq`{
  "settings": *[_id == "siteSettings"][0]{
    logo,
    ctaLabel,
    navLinks[]{ _key, label, href }
  },
  "hero": *[_id == "heroSection"][0]{
    eyebrow,
    name,
    intro,
    ctaLabel,
    "image": backgroundImage.asset->url,
    "imageAlt": backgroundImage.alt
  },
  "statement": *[_id == "creativeStatement"][0]{
    eyebrow,
    index,
    lines,
    freelancerTag
  },
  "about": *[_id == "aboutSection"][0]{
    label,
    index,
    paragraph,
    "portrait": portrait.asset->url,
    "portraitAlt": portrait.alt
  },
  "photoBanner": *[_id == "photoBanner"][0]{
    "image": image.asset->url,
    "imageAlt": image.alt
  },
  "services": *[_type == "service"] | order(order asc, _createdAt asc){
    _id,
    title,
    description,
    "image": image.asset->url
  },
  "works": *[_type == "project"] | order(order asc, _createdAt asc){
    _id,
    title,
    tags,
    href,
    ratio,
    "image": image.asset->url
  },
  "testimonials": *[_type == "testimonial"] | order(order asc, _createdAt asc){
    _id,
    quote,
    author,
    "logo": logo.asset->url
  },
  "news": *[_type == "post"] | order(order asc, _createdAt asc)[0...5]{
    _id,
    excerpt,
    href,
    "image": image.asset->url
  },
  "footer": *[_id == "footer"][0]{
    ctaText,
    ctaButtonLabel,
    ctaButtonHref,
    socials[]{ _key, label, href },
    legal[]{ _key, label, href },
    wordmark,
    credit
  }
}`
