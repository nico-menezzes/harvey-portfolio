import { defineType, defineField } from 'sanity'
import { WrenchIcon } from '@sanity/icons'

/**
 * Service — one item in the dark "Services / Deliverables" list
 * (title + description + square thumbnail).
 */
export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: WrenchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text (for accessibility)', type: 'string' }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first (1, 2, 3 …).',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'description', media: 'image' },
  },
})
