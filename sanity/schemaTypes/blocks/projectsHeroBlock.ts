import { defineType, defineField, defineArrayMember } from 'sanity'
import { ThLargeIcon } from '@sanity/icons'

/**
 * Projects Hero block — the editorial "cover" that opens a projects page:
 * a big two-word title (second word outlined), an index paragraph with
 * category chips, and a scrolling marquee of the disciplines.
 */
export const projectsHeroBlock = defineType({
  name: 'projectsHeroBlock',
  title: 'Projects Hero (cover)',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Small label (top-left)',
      type: 'string',
      description: 'e.g. "[ Portfolio ]".',
    }),
    defineField({
      name: 'meta',
      title: 'Small label (top-right)',
      type: 'string',
      description: 'e.g. "004 — Selected Work".',
    }),
    defineField({
      name: 'titleTop',
      title: 'Big title — line 1 (solid)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleBottom',
      title: 'Big title — line 2 (outlined)',
      type: 'string',
      description: 'This line is drawn as an outline for editorial contrast.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro paragraph',
      type: 'text',
      rows: 3,
    }),
    // Note: the project count is calculated automatically from your Work list —
    // it grows on its own as you add projects, so there's no field for it here.
    defineField({
      name: 'years',
      title: 'Small label — years',
      type: 'string',
      description: 'e.g. "[ 2020 — 2026 ]".',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      description: 'Shown as chips and in the scrolling marquee.',
    }),
  ],
  preview: {
    select: { top: 'titleTop', bottom: 'titleBottom' },
    prepare: ({ top, bottom }) => ({
      title: [top, bottom].filter(Boolean).join(' ') || 'Projects Hero',
      subtitle: 'Projects cover',
    }),
  },
})
