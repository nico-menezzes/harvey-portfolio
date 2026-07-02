import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

/**
 * A simple label + link, reused for navigation, social and legal links.
 * `href` is a plain string so it accepts on-page anchors (#about), full URLs
 * (https://…) and mailto: links.
 */
export const linkItem = defineType({
  name: 'linkItem',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description:
        'Where it goes. Use #section for the same page (e.g. #contact), a full https:// address, or mailto:you@email.com.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
})
