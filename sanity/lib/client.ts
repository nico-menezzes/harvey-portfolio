import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: {
    // Enables click-to-edit overlays in the Presentation tool. Encoding only
    // happens in preview/draft mode, so the live site is unaffected.
    studioUrl: '/studio',
  },
})
