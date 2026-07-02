import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

/**
 * Photo Banner — the full-width photograph band with the scroll parallax.
 */
export const photoBanner = defineType({
  name: 'photoBanner',
  title: 'Photo Banner',
  type: 'document',
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
    prepare: ({ media }) => ({ title: 'Photo Banner', media }),
  },
})
