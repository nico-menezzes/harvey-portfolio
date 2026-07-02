import { defineType, defineField } from 'sanity'
import { CommentIcon } from '@sanity/icons'

/**
 * Testimonial — one review card scattered around the "Testimonials" wordmark
 * (quote + author + optional brand logo).
 */
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Brand logo (optional)',
      type: 'image',
      description: 'Small logo shown above the quote.',
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
    select: { title: 'author', subtitle: 'quote', media: 'logo' },
  },
})
