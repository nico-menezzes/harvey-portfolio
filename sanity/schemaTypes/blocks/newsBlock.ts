import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

/**
 * News block — a placement marker for the "News & achievements" section.
 * It automatically shows the first 5 items from your News list, so there is
 * nothing to edit here: manage the content under "News Posts" in the sidebar.
 */
export const newsBlock = defineType({
  name: 'newsBlock',
  title: 'News section',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'note',
      title: 'About this section',
      type: 'string',
      readOnly: true,
      initialValue:
        'This section automatically shows the first 5 items from your News list. To edit it, open "News Posts" in the sidebar.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'News section', subtitle: 'Shows your News list (max 5)' }),
  },
})
