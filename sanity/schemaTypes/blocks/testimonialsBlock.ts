import { defineType, defineField, defineArrayMember } from 'sanity'
import { CommentIcon } from '@sanity/icons'

/**
 * Testimonials block — the giant "Testimonials" wordmark with review cards
 * scattered around it. The reviews are edited right here, inside the block.
 * Order matters: each review maps to a preset scatter position on desktop.
 */
export const testimonialsBlock = defineType({
  name: 'testimonialsBlock',
  title: 'Testimonials',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Reviews',
      type: 'array',
      description: 'Add up to 4 reviews. The order sets where each card sits on desktop.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonialItem',
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
          ],
          preview: {
            select: { title: 'author', subtitle: 'quote', media: 'logo' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { items: 'items' },
    prepare: ({ items }) => ({
      title: 'Testimonials',
      subtitle: `${Array.isArray(items) ? items.length : 0} review(s)`,
    }),
  },
})
