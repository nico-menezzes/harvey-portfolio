import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

/**
 * News Hero block — the editorial masthead that opens the News page.
 */
export const newsHeroBlock = defineType({
  name: 'newsHeroBlock',
  title: 'News Hero (masthead)',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: 'eyebrow', title: 'Small label (top-left)', type: 'string', description: 'e.g. "[ Journal ]".' }),
    defineField({ name: 'meta', title: 'Small label (top-right)', type: 'string', description: 'e.g. "Notes & achievements".' }),
    defineField({
      name: 'title',
      title: 'Big title',
      type: 'string',
      description: 'Type "&" for the fancy italic symbol.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'intro', title: 'Intro paragraph', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({ title: title || 'News Hero', subtitle: 'News masthead' }),
  },
})
