import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

/**
 * Photo Banner block — the full-width photograph band with the scroll parallax.
 */
export const photoBannerBlock = defineType({
  name: 'photoBannerBlock',
  title: 'Photo Banner',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Banner photo',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({ name: 'alt', title: 'Alt text (for accessibility)', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { media: 'image' },
    prepare: ({ media }) => ({ title: 'Photo Banner', subtitle: 'Full-width photo', media }),
  },
})
