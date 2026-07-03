import { defineType, defineField, defineArrayMember } from 'sanity'
import { CogIcon } from '@sanity/icons'

/**
 * Site Settings — the ONE place for the global Menu (top navigation) and Footer.
 * Configured once; every page renders them automatically, so you never have to
 * re-add or re-link the menu/footer when you create a new page.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'menu', title: 'Menu (top bar)', default: true },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    // ── Menu ──────────────────────────────────────────────
    defineField({
      name: 'logo',
      title: 'Logo text',
      type: 'string',
      group: 'menu',
      description: 'The wordmark shown top-left (e.g. "H.Studio").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'navLinks',
      title: 'Menu links',
      type: 'array',
      group: 'menu',
      of: [defineArrayMember({ type: 'linkItem' })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Menu button label',
      type: 'string',
      group: 'menu',
      description: 'The button on the right of the menu (e.g. "Let\'s talk").',
    }),

    // ── Footer ────────────────────────────────────────────
    defineField({ name: 'ctaText', title: 'Footer heading', type: 'string', group: 'footer', initialValue: 'Have a project in mind?' }),
    defineField({ name: 'ctaButtonLabel', title: 'Footer button label', type: 'string', group: 'footer', initialValue: "Let's talk" }),
    defineField({
      name: 'ctaButtonHref',
      title: 'Footer button link',
      type: 'string',
      group: 'footer',
      description: 'e.g. mailto:you@email.com or /contact.',
    }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      group: 'footer',
      of: [defineArrayMember({ type: 'linkItem' })],
    }),
    defineField({
      name: 'legal',
      title: 'Legal links',
      type: 'array',
      group: 'footer',
      of: [defineArrayMember({ type: 'linkItem' })],
    }),
    defineField({ name: 'wordmark', title: 'Giant wordmark', type: 'string', group: 'footer', initialValue: 'H.Studio' }),
    defineField({ name: 'credit', title: 'Small credit line', type: 'string', group: 'footer', initialValue: '[ Coded By Claude ]' }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings', subtitle: 'Global menu & footer' }),
  },
})
