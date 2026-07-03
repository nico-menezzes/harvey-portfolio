/**
 * One-time migration: make the Menu + Footer GLOBAL.
 *   1. Creates the single `siteSettings` document (menu + footer).
 *   2. Strips the old navbarBlock/footerBlock from every page and sets each
 *      page's `menuTheme` (from the old navbar block, or derived from its first
 *      section). Page content is otherwise untouched.
 *
 * Run once with:
 *   npx sanity exec scripts/migrate-global-chrome.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-07-02' })

let n = 0
const key = () => `k${(n++).toString(36)}${Date.now().toString(36)}`

type Block = { _type: string; theme?: string } & Record<string, unknown>

async function run() {
  const pages: { _id: string; pageBuilder?: Block[] }[] = await client.fetch(
    '*[_type == "page"]{ _id, pageBuilder }',
  )

  const home = pages.find((p) => p._id === 'page-home') ?? pages[0]
  const oldFooter = home?.pageBuilder?.find((b) => b._type === 'footerBlock') as
    | Record<string, unknown>
    | undefined

  // ── Global Site Settings ──────────────────────────────────
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    logo: 'H.Studio',
    ctaLabel: "Let's talk",
    // Cross-page-safe links (work from any page).
    navLinks: [
      { _key: key(), label: 'About', href: '/#about' },
      { _key: key(), label: 'Services', href: '/#services' },
      { _key: key(), label: 'Projects', href: '/projects' },
      { _key: key(), label: 'News', href: '/#news' },
      { _key: key(), label: 'Contact', href: '/contact' },
    ],
    ctaText: (oldFooter?.ctaText as string) || 'Have a project in mind?',
    ctaButtonLabel: (oldFooter?.ctaButtonLabel as string) || "Let's talk",
    ctaButtonHref: (oldFooter?.ctaButtonHref as string) || 'mailto:hello@h.studio',
    socials: (oldFooter?.socials as unknown[]) || [
      { _key: key(), label: 'Facebook', href: 'https://facebook.com/h.studio' },
      { _key: key(), label: 'Instagram', href: 'https://instagram.com/h.studio' },
      { _key: key(), label: 'x.com', href: 'https://x.com/h_studio' },
      { _key: key(), label: 'Linkedin', href: 'https://linkedin.com/company/h-studio' },
    ],
    legal: (oldFooter?.legal as unknown[]) || [
      { _key: key(), label: 'Licences', href: '#' },
      { _key: key(), label: 'Privacy policy', href: '#' },
    ],
    wordmark: (oldFooter?.wordmark as string) || 'H.Studio',
    credit: (oldFooter?.credit as string) || '[ Coded By Claude ]',
  })
  console.log('✓ siteSettings created')

  // ── Strip chrome blocks + set per-page menu color ─────────
  for (const p of pages) {
    const navBlock = p.pageBuilder?.find((b) => b._type === 'navbarBlock')
    const filtered = (p.pageBuilder || []).filter(
      (b) => b._type !== 'navbarBlock' && b._type !== 'footerBlock',
    )
    const first = filtered[0]?._type
    const theme = navBlock?.theme || (first === 'heroBlock' ? 'onDark' : 'onLight')

    await client.patch(p._id).set({ pageBuilder: filtered, menuTheme: theme }).commit()
    console.log(`✓ ${p._id} → ${filtered.length} sections, menu ${theme}`)
  }

  console.log('\n✅ Migration done. Menu + Footer are now global.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
