import { type SchemaTypeDefinition } from 'sanity'

// Shared objects
import { linkItem } from './objects/linkItem'

// Global settings (menu + footer, configured once)
import { siteSettings } from './singletons/siteSettings'

// Page builder — section blocks
import { heroBlock } from './blocks/heroBlock'
import { projectsHeroBlock } from './blocks/projectsHeroBlock'
import { statementHeroBlock } from './blocks/statementHeroBlock'
import { creativeStatementBlock } from './blocks/creativeStatementBlock'
import { aboutBlock } from './blocks/aboutBlock'
import { photoBannerBlock } from './blocks/photoBannerBlock'
import { servicesBlock } from './blocks/servicesBlock'
import { serviceFeatureBlock } from './blocks/serviceFeatureBlock'
import { worksBlock } from './blocks/worksBlock'
import { testimonialsBlock } from './blocks/testimonialsBlock'
import { newsBlock } from './blocks/newsBlock'
import { newsHeroBlock } from './blocks/newsHeroBlock'
import { newsArchiveBlock } from './blocks/newsArchiveBlock'
import { contactBlock } from './blocks/contactBlock'

// Documents
import { page } from './documents/page'
import { service } from './documents/service'
import { project } from './documents/project'
import { post } from './documents/post'
import { contactMessage } from './documents/contactMessage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // shared objects
    linkItem,
    // global settings
    siteSettings,
    // page-builder blocks
    heroBlock,
    projectsHeroBlock,
    statementHeroBlock,
    creativeStatementBlock,
    aboutBlock,
    photoBannerBlock,
    servicesBlock,
    serviceFeatureBlock,
    worksBlock,
    testimonialsBlock,
    newsBlock,
    newsHeroBlock,
    newsArchiveBlock,
    contactBlock,
    // documents
    page,
    // collections (the 3 sections that stay as lists in the CMS)
    service,
    project,
    post,
    // form submissions inbox
    contactMessage,
  ],
}
