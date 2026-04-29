import type { SanityImage } from './servicePageBlocks'

export type ServicePageBlockImage = {
  _type?: string
  _key?: string
  image?: SanityImage | null
  alt?: string
  caption?: string
}

export type ServicePageContentBlock = {
  _type?: string
  _key?: string
  tags?: string[] | null
  title?: string
  body?: string
  images?: ServicePageBlockImage[] | null
}

export type ServicePageDoc = {
  _id: string
  _type: string
  slug?: { _type?: string; current?: string }
  sortOrder?: number
  title?: string
  subtitle?: string
  body?: string
  headerColor?: string
  showCta?: boolean
  isFeaturedInNav?: boolean
  contentHtml?: string
  cardHighlights?: string[]
  contentBlocks?: ServicePageContentBlock[]
}
