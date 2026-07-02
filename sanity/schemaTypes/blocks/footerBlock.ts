import { defineType, defineField, defineArrayMember } from 'sanity'
import { StackCompactIcon } from '@sanity/icons'

/**
 * Footer block — the black closing block: the "Have a project in mind?"
 * call-to-action, social + legal links, and the giant wordmark.
 */
export const footerBlock = defineType({
  name: 'footerBlock',
  title: 'Footer',
  type: 'object',
  icon: StackCompactIcon,
  fields: [
    defineField({
      name: 'ctaText',
      title: 'Call-to-action text',
      type: 'string',
      initialValue: 'Have a project in mind?',
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'Button label',
      type: 'string',
      initialValue: "Let's talk",
    }),
    defineField({
      name: 'ctaButtonHref',
      title: 'Button link',
      type: 'string',
      description: 'Where the button goes — e.g. mailto:you@email.com or #contact.',
    }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      of: [defineArrayMember({ type: 'linkItem' })],
    }),
    defineField({
      name: 'legal',
      title: 'Legal links',
      type: 'array',
      of: [defineArrayMember({ type: 'linkItem' })],
    }),
    defineField({
      name: 'wordmark',
      title: 'Giant wordmark',
      type: 'string',
      description: 'The huge word that bleeds off the bottom (e.g. "H.Studio").',
      initialValue: 'H.Studio',
    }),
    defineField({
      name: 'credit',
      title: 'Small credit line',
      type: 'string',
      initialValue: '[ Coded By Claude ]',
    }),
  ],
  preview: {
    select: { title: 'wordmark' },
    prepare: ({ title }) => ({ title: 'Footer', subtitle: title }),
  },
})
