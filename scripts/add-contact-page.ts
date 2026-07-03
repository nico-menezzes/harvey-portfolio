/**
 * Adds a "Contact" page (slug: contact): Menu → Contact form → Footer.
 * Non-destructive — only creates/replaces the single `page-contact` document.
 *
 * Run with:
 *   npx sanity exec scripts/add-contact-page.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-07-02' })

let n = 0
const key = () => `k${(n++).toString(36)}${Date.now().toString(36)}`

async function run() {
  await client.createOrReplace({
    _id: 'page-contact',
    _type: 'page',
    title: 'Contact',
    slug: { _type: 'slug', current: 'contact' },
    pageBuilder: [
      {
        _key: key(),
        _type: 'navbarBlock',
        logo: 'H.Studio',
        ctaLabel: "Let's talk",
        theme: 'onLight',
        navLinks: [
          { _key: key(), label: 'About', href: '/#about' },
          { _key: key(), label: 'Services', href: '/#services' },
          { _key: key(), label: 'Projects', href: '/projects' },
          { _key: key(), label: 'News', href: '/#news' },
          { _key: key(), label: 'Contact', href: '/contact' },
        ],
      },
      {
        _key: key(),
        _type: 'contactBlock',
        eyebrow: '[ Contact ]',
        index: '005',
        heading: 'Say hello & tell me everything.',
        intro:
          "Got a project, a rough idea, or just want to compare notes? Fill this in and I'll get back to you within a day.",
        email: 'hello@h.studio',
        location: 'Chicago, IL — working worldwide',
        availability: '[ Booking projects for Q3 2026 ]',
        socials: [
          { _key: key(), label: 'Instagram', href: 'https://instagram.com/h.studio' },
          { _key: key(), label: 'Linkedin', href: 'https://linkedin.com/company/h-studio' },
          { _key: key(), label: 'x.com', href: 'https://x.com/h_studio' },
        ],
        projectTypes: ['Branding', 'Web Design', 'Photography', 'Other'],
        successMessage:
          "Your message just landed in my inbox. I'll reply from a real email, usually within 24 hours.",
      },
      {
        _key: key(),
        _type: 'footerBlock',
        ctaText: 'Prefer email?',
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

  console.log('✅ Created the Contact page at /contact')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
