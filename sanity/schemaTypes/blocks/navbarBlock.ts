import { defineType, defineField, defineArrayMember } from 'sanity'
import { MenuIcon } from '@sanity/icons'

/**
 * Menu block — the top navigation bar: the logo text, the menu links and the
 * "Let's talk" button label. Drop it at the very top of a page.
 */
export const navbarBlock = defineType({
  name: 'navbarBlock',
  title: 'Menu (top bar)',
  type: 'object',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo text',
      type: 'string',
      description: 'The wordmark shown top-left (e.g. "H.Studio").',
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
    defineField({
      name: 'theme',
      title: 'Text color',
      type: 'string',
      description: 'Pick based on what sits behind the menu.',
      options: {
        list: [
          { title: 'White (over a photo / dark section)', value: 'onDark' },
          { title: 'Black (over a light / paper section)', value: 'onLight' },
        ],
        layout: 'radio',
      },
      initialValue: 'onDark',
    }),
  ],
  preview: {
    select: { title: 'logo' },
    prepare: ({ title }) => ({ title: title || 'Menu', subtitle: 'Top navigation bar' }),
  },
})
