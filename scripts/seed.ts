/**
 * Seeds the Sanity CMS:
 *   • builds the "Home" page in the page builder (same sections, same order as
 *     the original site) so nothing changes visually, but everything is editable
 *   • fills the 3 content lists (Services, Work/Projects, News)
 *   • uploads the images from /public as CMS assets
 *
 * Run once with:
 *   npx sanity exec scripts/seed.ts --with-user-token
 *
 * Safe to re-run: it clears the old content each time and rewrites it.
 */
import { getCliClient } from 'sanity/cli'
import { createReadStream } from 'fs'
import { join } from 'path'

const client = getCliClient({ apiVersion: '2026-07-02' })

let keyCounter = 0
const key = () => `k${(keyCounter++).toString(36)}${Date.now().toString(36)}`

// Upload each /public image only once, caching by filename.
const imageCache = new Map<string, { _type: string; asset: { _type: string; _ref: string }; alt: string }>()

async function image(file: string, alt: string) {
  if (!imageCache.has(file)) {
    const filePath = join(process.cwd(), 'public', file)
    console.log(`  ↑ uploading ${file}`)
    const asset = await client.assets.upload('image', createReadStream(filePath), {
      filename: file,
    })
    imageCache.set(file, {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt,
    })
  }
  return { ...imageCache.get(file)!, alt }
}

async function run() {
  console.log('Clearing old content…')
  await client.delete({
    query:
      '*[_type in ["page", "service", "project", "post", "testimonial", "siteSettings", "heroSection", "creativeStatement", "aboutSection", "photoBanner", "footer"]]',
  })

  console.log('Uploading images + building the Home page…')

  // ── Images used across the page ───────────────────────────
  const heroImg = await image('hero.png', 'Billboard on a sunlit city street')
  const aboutImg = await image(
    'about-portrait.png',
    'Black and white portrait of Harvey, half his face lit against a dark background',
  )
  const bannerImg = await image(
    'photographer.png',
    'Harvey shooting on location with a Nikon camera at golden hour',
  )
  const logoMarko = await image('logo-marko.svg', 'Marko Stojković brand logo')
  const logoLukas = await image('logo-lukas.svg', 'Lukas Weber brand logo')
  const logoSarah = await image('logo-sarah.svg', 'Sarah Jenkins brand logo')
  const logoSofia = await image('logo-sofia.svg', 'Sofia Martínez brand logo')

  // ── The Home page (page builder) ──────────────────────────
  await client.createOrReplace({
    _id: 'page-home',
    _type: 'page',
    title: 'Home',
    slug: { _type: 'slug', current: 'home' },
    pageBuilder: [
      // Menu (top bar)
      {
        _key: key(),
        _type: 'navbarBlock',
        logo: 'H.Studio',
        ctaLabel: "Let's talk",
        navLinks: [
          { _key: key(), label: 'About', href: '#about' },
          { _key: key(), label: 'Services', href: '#services' },
          { _key: key(), label: 'Projects', href: '#projects' },
          { _key: key(), label: 'News', href: '#news' },
          { _key: key(), label: 'Contact', href: '#contact' },
        ],
      },
      // Hero
      {
        _key: key(),
        _type: 'heroBlock',
        eyebrow: "[ Hello i'm ]",
        name: 'Harvey Specter',
        intro:
          "H.Studio is a full-service creative studio building beautiful digital experiences and products. We're an award-winning design and art group specializing in branding, web design and engineering.",
        ctaLabel: "Let's talk",
        backgroundImage: heroImg,
      },
      // Creative Statement
      {
        _key: key(),
        _type: 'creativeStatementBlock',
        eyebrow: '[ 8+ years in industry ]',
        index: '001',
        lines: [
          'A creative director   /',
          'Photographer',
          'Born & raised',
          'on the south side',
          'of chicago.',
        ],
        freelancerTag: '[ creative freelancer ]',
      },
      // About
      {
        _key: key(),
        _type: 'aboutBlock',
        label: '[ About ]',
        index: '002',
        paragraph:
          "I'm Harvey — a creative director and photographer who has spent the last eight years turning brands into things people actually remember. I work closely with founders and small teams who care about the details, from the first rough sketch to the final pixel. When I'm not behind a screen, I'm behind a camera, chasing light across Chicago.",
        portrait: aboutImg,
      },
      // Photo Banner
      {
        _key: key(),
        _type: 'photoBannerBlock',
        image: bannerImg,
      },
      // Services (pulls from the Services list)
      { _key: key(), _type: 'servicesBlock' },
      // Work (pulls from the Work list)
      { _key: key(), _type: 'worksBlock' },
      // Testimonials (edited inline, right here)
      {
        _key: key(),
        _type: 'testimonialsBlock',
        items: [
          {
            _key: key(),
            _type: 'testimonialItem',
            quote:
              'A brilliant creative partner who turned our vision into a distinctive, high-impact brand identity. From custom mascots to a polished logo system, everything just clicked.',
            author: 'Marko Stojković',
            logo: logoMarko,
          },
          {
            _key: key(),
            _type: 'testimonialItem',
            quote:
              'Professional, precise, and incredibly fast at handling complex product visualizations and templates. Delivery was ahead of schedule every single time.',
            author: 'Lukas Weber',
            logo: logoLukas,
          },
          {
            _key: key(),
            _type: 'testimonialItem',
            quote:
              "A strategic partner who balances striking aesthetics with high-performance UX. He doesn't just make things look good — he solves real business problems through visual clarity.",
            author: 'Sarah Jenkins',
            logo: logoSarah,
          },
          {
            _key: key(),
            _type: 'testimonialItem',
            quote:
              'An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats. A rare mix of taste and reliability.',
            author: 'Sofia Martínez',
            logo: logoSofia,
          },
        ],
      },
      // News (pulls from the News list)
      { _key: key(), _type: 'newsBlock' },
      // Footer
      {
        _key: key(),
        _type: 'footerBlock',
        ctaText: 'Have a project in mind?',
        ctaButtonLabel: "Let's talk",
        ctaButtonHref: 'mailto:hello@h.studio',
        socials: [
          { _key: key(), label: 'Facebook', href: 'https://facebook.com/h.studio' },
          { _key: key(), label: 'Instagram', href: 'https://instagram.com/h.studio' },
          { _key: key(), label: 'x.com', href: 'https://x.com/h_studio' },
          { _key: key(), label: 'Linkedin', href: 'https://linkedin.com/company/h-studio' },
        ],
        legal: [
          { _key: key(), label: 'Licences', href: '#' },
          { _key: key(), label: 'Privacy policy', href: '#' },
        ],
        wordmark: 'H.Studio',
        credit: '[ Coded By Claude ]',
      },
    ],
  })

  // ── Services (collection) ─────────────────────────────────
  const services = [
    {
      title: 'Brand Discovery',
      description:
        "We dig into what makes your brand tick — your story, your audience, the people you're up against — then turn it into a clear identity you can actually use: logo, type, color, and the rules that keep it all consistent.",
      file: 'service-1.png',
    },
    {
      title: 'Web design & Dev',
      description:
        'Design and build in one place. I craft the look, then code it into a fast, responsive site that works as well as it reads — no messy handoff, no watered-down result.',
      file: 'service-2.png',
    },
    {
      title: 'Marketing',
      description:
        'Content and campaigns that sound like you, not a template. From social to launch assets, I help you show up consistently and say something worth remembering.',
      file: 'service-3.png',
    },
    {
      title: 'Photography',
      description:
        'Editorial and product photography shot on location or in-studio. Real images of your team, your product and your world — no stock, no filler.',
      file: 'service-4.png',
    },
  ]
  for (let i = 0; i < services.length; i++) {
    const s = services[i]
    await client.create({
      _type: 'service',
      title: s.title,
      description: s.description,
      image: await image(s.file, `${s.title} — sample work`),
      order: i + 1,
    })
  }

  // ── Work / Projects (collection) ──────────────────────────
  const projects = [
    { title: 'Surfers Paradise', tags: ['Photography', 'Social Media'], ratio: '5 / 4', file: 'work-1.png' },
    { title: 'Cyberpunk Caffe', tags: ['Art Direction', 'Photography'], ratio: '4 / 3', file: 'work-2.png' },
    { title: 'Agency 976', tags: ['Branding', 'Web Design'], ratio: '4 / 3', file: 'work-3.png' },
    { title: 'Minimal Playground', tags: ['Photography', 'Social Media'], ratio: '5 / 4', file: 'work-4.png' },
  ]
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i]
    await client.create({
      _type: 'project',
      title: p.title,
      tags: p.tags,
      ratio: p.ratio,
      href: '#',
      image: await image(p.file, p.title),
      order: i + 1,
    })
  }

  // ── News posts (collection, first 5 shown) ────────────────
  const posts = [
    {
      title: '30 Under 30 feature',
      excerpt:
        "Featured in Chicago's ‘30 Under 30’ creative list for 2026 — a huge honor alongside people I’ve looked up to for years.",
      file: 'news-1.png',
    },
    {
      title: 'Coffee brand photo series',
      excerpt:
        'Wrapped a three-week photo series for a boutique coffee brand, shot on location across four cities and two very early mornings.',
      file: 'news-2.png',
    },
    {
      title: 'Agency 976 rebrand',
      excerpt:
        'Launched a full rebrand for Agency 976 — new identity, new website, new voice. Months of work, live now and looking sharp.',
      file: 'news-3.png',
    },
    {
      title: 'Speaking at DesignWeek',
      excerpt:
        "Speaking at DesignWeek Chicago this fall about building brands that don’t look like everyone else’s. Come say hi.",
      file: 'news-1.png',
    },
    {
      title: 'New studio space',
      excerpt:
        'The new studio space is officially open — bigger walls, better light, and plenty of room to shoot. Drop by for a coffee.',
      file: 'news-2.png',
    },
  ]
  for (let i = 0; i < posts.length; i++) {
    const p = posts[i]
    await client.create({
      _type: 'post',
      title: p.title,
      excerpt: p.excerpt,
      href: '#',
      image: await image(p.file, p.title),
      order: i + 1,
    })
  }

  console.log('\n✅ Done. Built the Home page and seeded Services, Work and News.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
