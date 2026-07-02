import { defineType, defineField } from 'sanity'
import { CaseIcon } from '@sanity/icons'

/**
 * Work block — a placement marker for the "Selected Work" portfolio section.
 * It automatically shows every item from your Work list, so there is nothing
 * to edit here: manage the content under "Work (Projects)" in the sidebar.
 */
export const worksBlock = defineType({
  name: 'worksBlock',
  title: 'Work section',
  type: 'object',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'note',
      title: 'About this section',
      type: 'string',
      readOnly: true,
      initialValue:
        'This section automatically shows your Work list. To edit it, open "Work (Projects)" in the sidebar.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Work section', subtitle: 'Shows your Work list' }),
  },
})
