import { defineType, defineField, defineArrayMember } from 'sanity'
import { WrenchIcon } from '@sanity/icons'

/**
 * Service Feature block — one big, self-contained section for a single service.
 * Add one per service and alternate the theme + image side to build rhythm.
 */
export const serviceFeatureBlock = defineType({
  name: 'serviceFeatureBlock',
  title: 'Service (feature section)',
  type: 'object',
  icon: WrenchIcon,
  fields: [
    defineField({
      name: 'theme',
      title: 'Color theme',
      type: 'string',
      options: {
        list: [
          { title: 'Light (paper)', value: 'light' },
          { title: 'Dark (black)', value: 'dark' },
        ],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
    defineField({
      name: 'imageSide',
      title: 'Image side (desktop)',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({ name: 'index', title: 'Number', type: 'string', description: 'e.g. "01".' }),
    defineField({ name: 'kicker', title: 'Small label', type: 'string', description: 'e.g. "[ Service ]".' }),
    defineField({
      name: 'title',
      title: 'Service name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'lead', title: 'Lead line', type: 'text', rows: 2, description: 'A punchy one-liner.' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({
      name: 'features',
      title: 'What\'s included',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'The numbered list of deliverables.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({ name: 'ctaLabel', title: 'Button label', type: 'string', description: 'Leave empty to hide.' }),
    defineField({ name: 'ctaHref', title: 'Button link', type: 'string', description: 'e.g. /contact.' }),
  ],
  preview: {
    select: { title: 'title', index: 'index', theme: 'theme', media: 'image' },
    prepare: ({ title, index, theme, media }) => ({
      title: [index, title].filter(Boolean).join(' · ') || 'Service',
      subtitle: `Service section (${theme || 'light'})`,
      media,
    }),
  },
})
