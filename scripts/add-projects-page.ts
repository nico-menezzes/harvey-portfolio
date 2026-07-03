/**
 * Adds a "Projects" page (slug: projects) built with the page builder:
 *   Menu → Projects Hero → Work section → Footer
 *
 * Non-destructive: it only creates/replaces the single `page-projects`
 * document — it does NOT touch other pages or content.
 *
 * Run with:
 *   npx sanity exec scripts/add-projects-page.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-07-02' })

let n = 0
const key = () => `k${(n++).toString(36)}${Date.now().toString(36)}`

async function run() {
  await client.createOrReplace({
    _id: 'page-projects',
    _type: 'page',
    title: 'Projects',
    slug: { _type: 'slug', current: 'projects' },
    pageBuilder: [
      // Menu — links point back to the home sections so they work from here.
      {
        _key: key(),
        _type: 'navbarBlock',
        logo: 'H.Studio',
        ctaLabel: "Let's talk",
        theme: 'onLight', // black text over the light Projects Hero
        navLinks: [
          { _key: key(), label: 'About', href: '/#about' },
          { _key: key(), label: 'Services', href: '/#services' },
          { _key: key(), label: 'Projects', href: '/projects' },
          { _key: key(), label: 'News', href: '/#news' },
          { _key: key(), label: 'Contact', href: '#contact' },
        ],
      },
      // Projects Hero (the new cover)
      {
        _key: key(),
        _type: 'projectsHeroBlock',
        eyebrow: '[ Portfolio ]',
        meta: '004 — Selected Work',
        titleTop: 'Selected',
        titleBottom: 'Work',
        intro:
          "A running index of the branding, sites and images I've shipped for founders and small teams who sweat the details. Real projects, real outcomes — pick one and dig in.",
        years: '[ 2020 — 2026 ]',
        categories: ['Branding', 'Web Design', 'Photography', 'Art Direction', 'Social Media'],
      },
      // Work section (pulls from the Work list — presents the projects)
      { _key: key(), _type: 'worksBlock' },
      // Statement Hero — a dark closing statement/CTA before the footer
      {
        _key: key(),
        _type: 'statementHeroBlock',
        eyebrow: '[ Like what you see? ]',
        ghostWord: 'Next',
        title: "Let's build the next & best one.",
        intro:
          "Have a project that deserves the same care? Tell me what you're making and where you want it to go.",
        ctaLabel: 'Start a project',
        ctaHref: '#contact',
      },
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

  console.log('✅ Created the Projects page at /projects')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
