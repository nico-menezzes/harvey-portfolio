import type { StructureResolver } from 'sanity/structure'
import {
  DocumentsIcon,
  WrenchIcon,
  CaseIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  CogIcon,
} from '@sanity/icons'

/**
 * Studio sidebar:
 *   • Pages    — the drag-and-drop builder (build/edit every page here)
 *   • Services / Work / News — the three content lists the sections pull from
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website Content')
    .items([
      // ── Global menu + footer (configured once) ──────────────
      S.listItem()
        .title('Site Settings (menu & footer)')
        .icon(CogIcon)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings'),
        ),

      S.divider(),

      // ── The page builder ────────────────────────────────────
      S.documentTypeListItem('page').title('Pages').icon(DocumentsIcon),

      S.divider(),

      // ── The 3 content lists ─────────────────────────────────
      S.documentTypeListItem('service').title('Services').icon(WrenchIcon),
      S.documentTypeListItem('project').title('Work (Projects)').icon(CaseIcon),
      S.documentTypeListItem('post').title('News Posts').icon(DocumentTextIcon),

      S.divider(),

      // ── Contact form inbox ──────────────────────────────────
      S.listItem()
        .title('Messages')
        .icon(EnvelopeIcon)
        .child(
          S.documentTypeList('contactMessage')
            .title('Messages')
            .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }]),
        ),

      // Safety net for any other type, minus the ones handled above.
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()
        return (
          id &&
          !['siteSettings', 'page', 'service', 'project', 'post', 'contactMessage'].includes(id)
        )
      }),
    ])
