import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

/**
 * Hero block — the full-screen opening: the big name over a background photo,
 * a short intro paragraph and the "Let's talk" button.
 */
export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero (opening)',
  type: 'object',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Small label above the name',
      type: 'string',
      description: 'The little tag above the name, e.g. "[ Hello i\'m ]".',
    }),
    defineField({
      name: 'name',
      title: 'Big name',
      type: 'string',
      description: 'The huge display name across the bottom of the hero.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro paragraph',
      type: 'text',
      rows: 4,
      description: 'The short paragraph on the bottom-right.',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button label',
      type: 'string',
      initialValue: "Let's talk",
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text (for accessibility)', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name', media: 'backgroundImage' },
    prepare: ({ title, media }) => ({ title: title || 'Hero', subtitle: 'Opening section', media }),
  },
})
