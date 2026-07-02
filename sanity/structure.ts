import type { ComponentType } from 'react'
import type { StructureResolver } from 'sanity/structure'
import {
  CogIcon,
  HomeIcon,
  BlockquoteIcon,
  UserIcon,
  ImageIcon,
  StackCompactIcon,
  WrenchIcon,
  CaseIcon,
  DocumentTextIcon,
  CommentIcon,
} from '@sanity/icons'

// These types are singletons: exactly one of each, opened directly (no list).
const SINGLETONS = [
  'siteSettings',
  'heroSection',
  'creativeStatement',
  'aboutSection',
  'photoBanner',
  'footer',
]

// Helper: a menu item that opens the one-and-only document of a type.
function singleton(
  S: Parameters<StructureResolver>[0],
  type: string,
  title: string,
  icon: ComponentType,
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(type).title(title))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website Content')
    .items([
      // ── One-of-a-kind sections ──────────────────────────────
      singleton(S, 'siteSettings', 'Site Settings (menu)', CogIcon),
      S.divider(),
      singleton(S, 'heroSection', 'Hero (Opening)', HomeIcon),
      singleton(S, 'creativeStatement', 'Creative Statement', BlockquoteIcon),
      singleton(S, 'aboutSection', 'About', UserIcon),
      singleton(S, 'photoBanner', 'Photo Banner', ImageIcon),
      singleton(S, 'footer', 'Footer', StackCompactIcon),

      S.divider(),

      // ── Repeatable content ──────────────────────────────────
      S.documentTypeListItem('service').title('Services').icon(WrenchIcon),
      S.documentTypeListItem('project').title('Projects (Selected Work)').icon(CaseIcon),
      S.documentTypeListItem('post').title('News Posts').icon(DocumentTextIcon),
      S.documentTypeListItem('testimonial').title('Testimonials').icon(CommentIcon),

      // Anything else (safety net), minus the singletons handled above.
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()
        return (
          id &&
          !SINGLETONS.includes(id) &&
          !['service', 'project', 'post', 'testimonial'].includes(id)
        )
      }),
    ])
