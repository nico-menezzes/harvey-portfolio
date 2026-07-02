import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentsIcon } from '@sanity/icons'

/**
 * Page — the drag-and-drop builder. Each page has a web address (slug) and a
 * stack of section blocks you can add, reorder and edit. The page with the
 * slug "home" is the site's homepage; any other slug becomes /that-slug.
 */
export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page name',
      type: 'string',
      description: 'For your reference in this list (e.g. "Home", "About").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      description:
        'The end of the page URL. Use "home" for the main page; anything else opens at /that-address.',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Sections',
      type: 'array',
      description: 'Add sections, then drag to reorder them. Click a section to edit its text.',
      of: [
        defineArrayMember({ type: 'navbarBlock' }),
        defineArrayMember({ type: 'heroBlock' }),
        defineArrayMember({ type: 'creativeStatementBlock' }),
        defineArrayMember({ type: 'aboutBlock' }),
        defineArrayMember({ type: 'photoBannerBlock' }),
        defineArrayMember({ type: 'servicesBlock' }),
        defineArrayMember({ type: 'worksBlock' }),
        defineArrayMember({ type: 'testimonialsBlock' }),
        defineArrayMember({ type: 'newsBlock' }),
        defineArrayMember({ type: 'footerBlock' }),
      ],
      options: { insertMenu: { views: [{ name: 'grid' }, { name: 'list' }] } },
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare: ({ title, slug }) => ({
      title: title || 'Untitled page',
      subtitle: slug === 'home' ? 'Homepage (/)' : slug ? `/${slug}` : 'No address set',
    }),
  },
})
