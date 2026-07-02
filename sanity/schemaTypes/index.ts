import { type SchemaTypeDefinition } from 'sanity'

// Shared objects
import { linkItem } from './objects/linkItem'

// Singletons (one-of-a-kind sections)
import { siteSettings } from './singletons/siteSettings'
import { heroSection } from './singletons/heroSection'
import { creativeStatement } from './singletons/creativeStatement'
import { aboutSection } from './singletons/aboutSection'
import { photoBanner } from './singletons/photoBanner'
import { footer } from './singletons/footer'

// Collections (repeatable content)
import { service } from './documents/service'
import { project } from './documents/project'
import { post } from './documents/post'
import { testimonial } from './documents/testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // objects
    linkItem,
    // singletons
    siteSettings,
    heroSection,
    creativeStatement,
    aboutSection,
    photoBanner,
    footer,
    // collections
    service,
    project,
    post,
    testimonial,
  ],
}
