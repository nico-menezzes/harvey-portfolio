/**
 * Adds a "Services" page (slug: services): the (reused) Projects Hero followed
 * by one Service Feature section per service — pulled from your existing
 * Services list (title, description, image), alternating light/dark + image side.
 *
 * Non-destructive — only creates/replaces the single `page-services` document.
 * A starting point; refine it in the builder.
 *
 * Run with:
 *   npx sanity exec scripts/add-services-page.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-07-02' })

let n = 0
const key = () => `k${(n++).toString(36)}${Date.now().toString(36)}`

// Tailored copy for the known services (falls back to generics otherwise).
const LEADS: Record<string, string> = {
  'Brand Discovery': 'Find the thing that makes you you — then make it impossible to ignore.',
  'Web design & Dev': 'Designed and built in one place — no messy handoff, no watered-down result.',
  Marketing: 'Content and campaigns that sound like you, not a template.',
  Photography: 'Real images of your team, your product and your world — no stock, no filler.',
}
const INCLUDES: Record<string, string[]> = {
  'Brand Discovery': ['Discovery workshop', 'Logo & identity system', 'Type & color system', 'Brand guidelines'],
  'Web design & Dev': ['UX & wireframes', 'Custom design', 'Responsive build', 'CMS & handoff'],
  Marketing: ['Content strategy', 'Social templates', 'Launch assets', 'Campaign support'],
  Photography: ['Art direction', 'On-location shoot', 'Retouching', 'Usage-ready exports'],
}

async function run() {
  const services: { title: string; description?: string; image?: unknown }[] = await client.fetch(
    '*[_type == "service"] | order(order asc, _createdAt asc){ title, description, image }',
  )

  const features = services.map((s, i) => ({
    _key: key(),
    _type: 'serviceFeatureBlock',
    theme: i % 2 === 0 ? 'light' : 'dark',
    imageSide: i % 2 === 0 ? 'left' : 'right',
    index: String(i + 1).padStart(2, '0'),
    kicker: '[ Service ]',
    title: s.title,
    lead: LEADS[s.title] || '',
    description: s.description,
    features: INCLUDES[s.title] || ['Discovery', 'Design', 'Delivery'],
    image: s.image,
    ctaLabel: 'Start a project',
    ctaHref: '/contact',
  }))

  await client.createOrReplace({
    _id: 'page-services',
    _type: 'page',
    title: 'Services',
    slug: { _type: 'slug', current: 'services' },
    menuTheme: 'onLight',
    pageBuilder: [
      // Reused Projects Hero, dressed for services.
      {
        _key: key(),
        _type: 'projectsHeroBlock',
        eyebrow: '[ Services ]',
        meta: 'What I do',
        titleTop: 'Full-service',
        titleBottom: 'Studio',
        intro:
          'Brand, web, marketing and photography — the whole stack, handled by one studio that sweats the details.',
        years: '[ Since 2020 ]',
        categories: ['Branding', 'Web Design', 'Marketing', 'Photography'],
      },
      ...features,
    ],
  })

  console.log(`✅ Created the Services page at /services (${features.length} service sections)`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
