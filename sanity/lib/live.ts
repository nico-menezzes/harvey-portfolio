// Querying with "sanityFetch" keeps content automatically updated (live) and
// powers the Presentation preview. "<SanityLive />" must be rendered in the
// layout. See https://github.com/sanity-io/next-sanity#live-content-api
import { defineLive } from 'next-sanity/live'
import { client } from './client'
import { token } from '../env'

export const { sanityFetch, SanityLive } = defineLive({
  client,
  // Tokens power draft previews. They're optional — without them the published
  // site still renders, only the click-to-edit preview is unavailable.
  serverToken: token,
  browserToken: token,
})
