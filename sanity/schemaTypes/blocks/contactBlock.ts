import { defineType, defineField, defineArrayMember } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

/**
 * Contact block — the editorial split with a big statement + direct details on
 * the left and a working form on the right. Submissions land in "Messages".
 */
export const contactBlock = defineType({
  name: 'contactBlock',
  title: 'Contact (form)',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: 'eyebrow', title: 'Small label', type: 'string', description: 'e.g. "[ Contact ]".' }),
    defineField({ name: 'index', title: 'Section number', type: 'string', initialValue: '005' }),
    defineField({
      name: 'heading',
      title: 'Big heading',
      type: 'string',
      description: 'Type "&" for the fancy italic symbol.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'intro', title: 'Intro paragraph', type: 'text', rows: 3 }),
    defineField({
      name: 'email',
      title: 'Contact email',
      type: 'string',
      description: 'Shown big and used for the "email me directly" link.',
    }),
    defineField({ name: 'location', title: 'Studio / location line', type: 'string' }),
    defineField({
      name: 'availability',
      title: 'Availability label',
      type: 'string',
      description: 'e.g. "[ Booking projects for Q3 2026 ]".',
    }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      of: [defineArrayMember({ type: 'linkItem' })],
    }),
    defineField({
      name: 'projectTypes',
      title: 'Project type options',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      description: 'The selectable chips in the form (e.g. Branding, Web Design).',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success message',
      type: 'text',
      rows: 2,
      description: 'Shown after the form is submitted.',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Contact', subtitle: 'Contact form section' }),
  },
})
