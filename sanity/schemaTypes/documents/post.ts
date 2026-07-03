import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

/** The categories used for the News filters. */
export const NEWS_CATEGORIES = ['Achievements', 'Photography', 'Branding', 'Studio', 'Press']

/**
 * Post — one News article: a card on the home News strip + a full internal page
 * at /news/its-slug (thumbnail + rich text). Shown 5 at a time on the homepage;
 * the /news archive shows them all with search + category filters.
 */
export const post = defineType({
  name: 'post',
  title: 'News Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The article title (shown on the archive and article page).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      description: 'The end of the article URL: /news/this.',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Used for the filter buttons on the News page.',
      options: { list: NEWS_CATEGORIES.map((c) => ({ title: c, value: c })) },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt (card text)',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on the cards.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [defineField({ name: 'alt', title: 'Alt text (for accessibility)', type: 'string' })],
    }),
    defineField({
      name: 'body',
      title: 'Article (rich text)',
      type: 'array',
      description: 'The full article shown on the internal page.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h2' },
            { title: 'Subheading', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order (homepage strip)',
      type: 'number',
      description: 'Lower numbers appear first on the homepage News strip (first 5 shown).',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    { title: 'Newest first', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
})
