import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

/**
 * Post — one card in the "News & achievements" section
 * (image + short text + "Read more" link). Shown 5 at a time on the site.
 */
export const post = defineType({
  name: 'post',
  title: 'News Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title (for your reference)',
      type: 'string',
      description: 'A short name so you can find this post in the list. Not shown on the site.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Text shown on the card',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Card image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({ name: 'alt', title: 'Alt text (for accessibility)', type: 'string' }),
      ],
    }),
    defineField({
      name: 'href',
      title: '"Read more" link',
      type: 'string',
      description: 'Where "Read more" goes (a URL, or leave as # for now).',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first (1, 2, 3 …). Only the first 5 show on the site.',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'excerpt', media: 'image' },
  },
})
