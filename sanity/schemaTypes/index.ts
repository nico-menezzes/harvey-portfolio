import { type SchemaTypeDefinition } from 'sanity'

// Shared objects
import { linkItem } from './objects/linkItem'

// Page builder — section blocks
import { navbarBlock } from './blocks/navbarBlock'
import { heroBlock } from './blocks/heroBlock'
import { creativeStatementBlock } from './blocks/creativeStatementBlock'
import { aboutBlock } from './blocks/aboutBlock'
import { photoBannerBlock } from './blocks/photoBannerBlock'
import { servicesBlock } from './blocks/servicesBlock'
import { worksBlock } from './blocks/worksBlock'
import { testimonialsBlock } from './blocks/testimonialsBlock'
import { newsBlock } from './blocks/newsBlock'
import { footerBlock } from './blocks/footerBlock'

// Documents
import { page } from './documents/page'
import { service } from './documents/service'
import { project } from './documents/project'
import { post } from './documents/post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // shared objects
    linkItem,
    // page-builder blocks
    navbarBlock,
    heroBlock,
    creativeStatementBlock,
    aboutBlock,
    photoBannerBlock,
    servicesBlock,
    worksBlock,
    testimonialsBlock,
    newsBlock,
    footerBlock,
    // documents
    page,
    // collections (the 3 sections that stay as lists in the CMS)
    service,
    project,
    post,
  ],
}
