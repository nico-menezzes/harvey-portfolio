import { defineType, defineField } from 'sanity'
import { BulbOutlineIcon } from '@sanity/icons'

/**
 * Statement Hero block — a dark, high-contrast hero: a giant outlined "ghost"
 * word behind a centered statement (type "&" for the fancy italic symbol), a
 * short intro and an outlined button. Great for inner pages.
 */
export const statementHeroBlock = defineType({
  name: 'statementHeroBlock',
  title: 'Statement Hero (dark)',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Small label',
      type: 'string',
      description: 'e.g. "[ Let\'s make something ]".',
    }),
    defineField({
      name: 'ghostWord',
      title: 'Background word (outlined)',
      type: 'string',
      description: 'The giant outlined word drawn behind the text (one word works best).',
    }),
    defineField({
      name: 'title',
      title: 'Statement',
      type: 'text',
      rows: 2,
      description: 'The big centered line. Type "&" and it becomes the fancy italic symbol.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro paragraph',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button label',
      type: 'string',
      description: 'Leave empty to hide the button.',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Button link',
      type: 'string',
      description: 'Where the button goes — e.g. #contact or mailto:you@email.com.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'ghostWord' },
    prepare: ({ title, subtitle }) => ({
      title: title || 'Statement Hero',
      subtitle: subtitle ? `Dark hero — “${subtitle}”` : 'Dark hero',
    }),
  },
})
