import { defineType, defineField } from 'sanity'
import { WrenchIcon } from '@sanity/icons'

/**
 * Services block — a placement marker for the dark "Deliverables" section.
 * It automatically shows every item from your Services list, so there is
 * nothing to edit here: manage the content under "Services" in the sidebar.
 */
export const servicesBlock = defineType({
  name: 'servicesBlock',
  title: 'Services section',
  type: 'object',
  icon: WrenchIcon,
  fields: [
    defineField({
      name: 'note',
      title: 'About this section',
      type: 'string',
      readOnly: true,
      initialValue:
        'This section automatically shows your Services list. To edit it, open "Services" in the sidebar.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Services section', subtitle: 'Shows your Services list' }),
  },
})
