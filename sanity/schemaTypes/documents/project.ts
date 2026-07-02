import { defineType, defineField, defineArrayMember } from 'sanity'
import { CaseIcon } from '@sanity/icons'

/**
 * Project — one card in the "Selected Work" portfolio grid
 * (image + tags + title + link).
 */
export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      description: 'Small labels shown on the image, e.g. "Photography".',
    }),
    defineField({
      name: 'image',
      title: 'Project image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({ name: 'alt', title: 'Alt text (for accessibility)', type: 'string' }),
      ],
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'Where the card links to (a URL, or leave as # for now).',
    }),
    defineField({
      name: 'ratio',
      title: 'Image shape',
      type: 'string',
      description: 'How tall vs wide the image is. Choose one.',
      options: {
        list: [
          { title: 'Landscape (4 : 3)', value: '4 / 3' },
          { title: 'Slightly wide (5 : 4)', value: '5 / 4' },
          { title: 'Square (1 : 1)', value: '1 / 1' },
          { title: 'Portrait (4 : 5)', value: '4 / 5' },
        ],
      },
      initialValue: '4 / 3',
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
    select: { title: 'title', tags: 'tags', media: 'image' },
    prepare: ({ title, tags, media }) => ({
      title,
      subtitle: Array.isArray(tags) ? tags.join(', ') : '',
      media,
    }),
  },
})
