/**
 * News migration + page:
 *   1. Upgrades existing News posts with a slug, category, date and a rich-text
 *      body (so each gets an internal page at /news/its-slug).
 *   2. Creates the "News" page (News Hero + News Archive with search + filters).
 *
 * Non-destructive (patches posts, creates one page). Run with:
 *   npx sanity exec scripts/add-news.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-07-02' })

let n = 0
const key = () => `k${(n++).toString(36)}${Date.now().toString(36)}`

const para = (text: string) => ({
  _type: 'block',
  _key: key(),
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
})
const heading = (text: string) => ({
  _type: 'block',
  _key: key(),
  style: 'h2',
  markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
})

// Match existing posts by title → slug, category, date, extra body paragraphs.
const META: Record<
  string,
  { slug: string; category: string; date: string; body: (string | { h: string })[] }
> = {
  '30 Under 30 feature': {
    slug: '30-under-30-feature',
    category: 'Achievements',
    date: '2026-06-20T09:00:00Z',
    body: [
      { h: 'A humbling shortlist' },
      "Being named on Chicago's '30 Under 30' creative list is one of those things you don't quite believe until you see it in print. Sharing the page with people I've admired for years made it land even harder.",
      "It's a nod to the last eight years — the late nights, the reshoots, the clients who trusted a rough sketch. Onward to the next one.",
    ],
  },
  'Coffee brand photo series': {
    slug: 'coffee-brand-photo-series',
    category: 'Photography',
    date: '2026-05-15T09:00:00Z',
    body: [
      { h: 'Four cities, two very early mornings' },
      'A three-week series for a boutique coffee brand — shot on location to catch real light, real steam and real people. No stock, no filler.',
      'The goal was warmth without cliché: hands, grain, and the small rituals that make a morning. The final set spans web, packaging and social.',
    ],
  },
  'Agency 976 rebrand': {
    slug: 'agency-976-rebrand',
    category: 'Branding',
    date: '2026-04-10T09:00:00Z',
    body: [
      { h: 'New identity, new voice' },
      'Months of work, live now and looking sharp. A full rebrand for Agency 976 — identity system, website and tone of voice, built to scale with them.',
      'We kept it confident and quiet: a tight type system, a restrained palette, and rules that make it hard to get wrong.',
    ],
  },
  'Speaking at DesignWeek': {
    slug: 'speaking-at-designweek',
    category: 'Press',
    date: '2026-03-05T09:00:00Z',
    body: [
      { h: "Brands that don't look like everyone else's" },
      "I'll be speaking at DesignWeek Chicago this fall about building distinctive brands in a sea of sameness. Come say hi if you're around.",
      'Expect strong opinions, a few case studies, and a plea to stop reaching for the default.',
    ],
  },
  'New studio space': {
    slug: 'new-studio-space',
    category: 'Studio',
    date: '2026-02-01T09:00:00Z',
    body: [
      { h: 'Bigger walls, better light' },
      'The new studio is officially open — more room to shoot, more wall to pin things to, and a proper corner for coffee.',
      'Drop by if you\'re in the neighborhood. The door is usually open and the kettle is usually on.',
    ],
  },
}

async function run() {
  const posts: { _id: string; title: string; excerpt?: string }[] = await client.fetch(
    '*[_type == "post"]{ _id, title, excerpt }',
  )

  for (const p of posts) {
    const m = META[p.title]
    if (!m) {
      console.log(`  – skipped (no match): ${p.title}`)
      continue
    }
    const body = [
      para(p.excerpt || ''),
      ...m.body.map((b) => (typeof b === 'string' ? para(b) : heading(b.h))),
    ]
    await client
      .patch(p._id)
      .set({
        slug: { _type: 'slug', current: m.slug },
        category: m.category,
        publishedAt: m.date,
        body,
      })
      .commit()
    console.log(`  ✓ ${p.title} → /news/${m.slug} (${m.category})`)
  }

  // ── The News page ─────────────────────────────────────────
  await client.createOrReplace({
    _id: 'page-news',
    _type: 'page',
    title: 'News',
    slug: { _type: 'slug', current: 'news' },
    menuTheme: 'onLight',
    pageBuilder: [
      {
        _key: key(),
        _type: 'newsHeroBlock',
        eyebrow: '[ Journal ]',
        meta: 'Notes & achievements',
        title: 'News & Notes.',
        intro:
          'Field notes from the studio — new work, small wins, and the occasional strong opinion. Search or filter below.',
      },
      {
        _key: key(),
        _type: 'newsArchiveBlock',
        eyebrow: '[ All posts ]',
        searchPlaceholder: 'Search posts…',
      },
    ],
  })

  console.log('\n✅ Done. Posts upgraded and the News page is live at /news.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
