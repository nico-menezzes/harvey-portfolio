import { defineType, defineField, defineArrayMember } from 'sanity'
import { CogIcon } from '@sanity/icons'

/**
 * Site Settings — the navigation bar at the top of the page: the logo text,
 * the menu links and the "Let's talk" button label.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo text',
      type: 'string',
      description: 'The wordmark shown top-left in the menu (e.g. "H.Studio").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'navLinks',
      title: 'Menu links',
      type: 'array',
      of: [defineArrayMember({ type: 'linkItem' })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button label',
      type: 'string',
      description: 'The button on the right of the menu (e.g. "Let\'s talk").',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
