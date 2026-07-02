import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

/**
 * About block — the intro paragraph framed by corner ticks, paired with the
 * tall black & white portrait.
 */
export const aboutBlock = defineType({
  name: 'aboutBlock',
  title: 'About',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Small label',
      type: 'string',
      initialValue: '[ About ]',
    }),
    defineField({
      name: 'index',
      title: 'Section number',
      type: 'string',
      initialValue: '002',
    }),
    defineField({
      name: 'paragraph',
      title: 'About paragraph',
      type: 'text',
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text (for accessibility)', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { subtitle: 'paragraph', media: 'portrait' },
    prepare: ({ subtitle, media }) => ({ title: 'About', subtitle, media }),
  },
})
