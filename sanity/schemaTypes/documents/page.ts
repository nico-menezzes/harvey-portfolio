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
      name: 'menuTheme',
      title: 'Menu color',
      type: 'string',
      description:
        'Text color of the global menu on this page — white for dark/photo tops, black for light/paper tops.',
      options: {
        list: [
          { title: 'White (over a photo / dark section)', value: 'onDark' },
          { title: 'Black (over a light / paper section)', value: 'onLight' },
        ],
        layout: 'radio',
      },
      initialValue: 'onLight',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Sections',
      type: 'array',
      description: 'Add sections, then drag to reorder them. Click a section to edit its text. (The menu and footer are added automatically from Site Settings.)',
      of: [
        defineArrayMember({ type: 'heroBlock' }),
        defineArrayMember({ type: 'projectsHeroBlock' }),
        defineArrayMember({ type: 'statementHeroBlock' }),
        defineArrayMember({ type: 'creativeStatementBlock' }),
        defineArrayMember({ type: 'aboutBlock' }),
        defineArrayMember({ type: 'photoBannerBlock' }),
        defineArrayMember({ type: 'servicesBlock' }),
        defineArrayMember({ type: 'serviceFeatureBlock' }),
        defineArrayMember({ type: 'worksBlock' }),
        defineArrayMember({ type: 'testimonialsBlock' }),
        defineArrayMember({ type: 'newsBlock' }),
        defineArrayMember({ type: 'contactBlock' }),
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
