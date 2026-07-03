import { defineType, defineField } from 'sanity'
import { SearchIcon } from '@sanity/icons'

/**
 * News Archive block — the searchable/filterable list of every News post. It
 * pulls from your News Posts list automatically (categories drive the filters),
 * so there's nothing to manage here beyond a couple of labels.
 */
export const newsArchiveBlock = defineType({
  name: 'newsArchiveBlock',
  title: 'News Archive (search + filters)',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({ name: 'eyebrow', title: 'Small label', type: 'string', description: 'e.g. "[ All posts ]".' }),
    defineField({
      name: 'searchPlaceholder',
      title: 'Search box placeholder',
      type: 'string',
      initialValue: 'Search posts…',
    }),
    defineField({
      name: 'note',
      title: 'About this section',
      type: 'string',
      readOnly: true,
      initialValue: 'Shows every News post with search + category filters. Manage posts under "News Posts".',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'News Archive', subtitle: 'Search + filters over your News Posts' }),
  },
})
