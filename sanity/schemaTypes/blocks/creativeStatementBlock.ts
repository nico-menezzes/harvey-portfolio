import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockquoteIcon } from '@sanity/icons'

/**
 * Creative Statement block — the big editorial lines
 * ("A creative director / Photographer / Born & raised …").
 */
export const creativeStatementBlock = defineType({
  name: 'creativeStatementBlock',
  title: 'Creative Statement',
  type: 'object',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Small label (top-right)',
      type: 'string',
      description: 'e.g. "[ 8+ years in industry ]".',
    }),
    defineField({
      name: 'index',
      title: 'Section number',
      type: 'string',
      initialValue: '001',
    }),
    defineField({
      name: 'lines',
      title: 'Statement lines',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description:
        'Each entry is one big line of the statement. Keep it to about 5 lines so the layout stays balanced. Type "&" anywhere and it becomes the fancy italic symbol automatically.',
    }),
    defineField({
      name: 'freelancerTag',
      title: 'Small label (end)',
      type: 'string',
      description: 'The little tag near the last line, e.g. "[ creative freelancer ]".',
    }),
  ],
  preview: {
    select: { lines: 'lines' },
    prepare: ({ lines }) => ({
      title: 'Creative Statement',
      subtitle: Array.isArray(lines) ? lines.join(' ') : '',
    }),
  },
})
