import { defineType, defineField } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

/**
 * Contact Message — one submission from the contact form. Created automatically
 * by the /api/contact route; read them in the Studio's "Messages" list. Not
 * meant to be created by hand.
 */
export const contactMessage = defineType({
  name: 'contactMessage',
  title: 'Message',
  type: 'document',
  icon: EnvelopeIcon,
  readOnly: true,
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'company', title: 'Company', type: 'string' }),
    defineField({ name: 'projectType', title: 'Project type', type: 'string' }),
    defineField({ name: 'message', title: 'Message', type: 'text', rows: 6 }),
    defineField({ name: 'submittedAt', title: 'Submitted at', type: 'datetime' }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'newest',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'email', date: 'submittedAt' },
    prepare: ({ title, subtitle, date }) => ({
      title: title || 'Message',
      subtitle: [subtitle, date ? new Date(date).toLocaleDateString() : null]
        .filter(Boolean)
        .join(' · '),
    }),
  },
})
