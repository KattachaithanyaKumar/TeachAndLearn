/** Mirrors TeachAndLearn sanity/service_page_blocks.ts — used by the admin editor. */

export type SanityImage = {
  _type: 'image'
  asset: { _type: 'reference'; _ref: string }
} | null

export type IconItem = {
  _key?: string
  iconKey?: string
  title?: string
  description?: string
}

export type IconTextItem = {
  _key?: string
  iconKey?: string
  text?: string
}

export type ServicePageBlock =
  | {
      _type: 'service_page_block_intro_split'
      _key?: string
      image?: SanityImage | undefined
      imageAlt?: string
      heading?: string
      body?: string
      maskStyle?: string
      reverseOrder?: boolean
    }
  | {
      _type: 'service_page_block_alternating_media'
      _key?: string
      heading?: string
      body?: string
      image?: SanityImage | undefined
      imageAlt?: string
      reverseLayout?: boolean
      sectionBg?: string
      useBlobMask?: boolean
      headingStyle?: string
      blobMask?: string
    }
  | {
      _type: 'service_page_block_icon_card_grid'
      _key?: string
      sectionTitle?: string
      sectionSubtitle?: string
      sectionBg?: string
      gridCols?: number
      cardBg?: string
      items?: IconItem[]
    }
  | {
      _type: 'service_page_block_icon_card_stack'
      _key?: string
      sideImage?: SanityImage | undefined
      sideImageAlt?: string
      imageLeft?: boolean
      columnTitle?: string
      items?: IconItem[]
    }
  | {
      _type: 'service_page_block_split_disorders'
      _key?: string
      introTitle?: string
      introBody?: string
      disorders?: string[]
      centerImage?: SanityImage | undefined
      centerImageAlt?: string
    }
  | {
      _type: 'service_page_block_media_side_icon_list'
      _key?: string
      sectionTitle?: string
      sectionSubtitle?: string
      image?: SanityImage | undefined
      imageAlt?: string
      imageLeft?: boolean
      items?: IconItem[]
    }
  | {
      _type: 'service_page_block_goals_split'
      _key?: string
      sectionTitle?: string
      sectionSubtitle?: string
      sectionBg?: string
      goals?: IconTextItem[]
      image?: SanityImage | undefined
      imageAlt?: string
      reverseLayout?: boolean
    }
  | {
      _type: 'service_page_block_two_column_plain'
      _key?: string
      image?: SanityImage | undefined
      imageAlt?: string
      heading?: string
      body?: string
      reverseOrder?: boolean
      sectionBg?: string
      mobileImageBelow?: boolean
      leadWithText?: boolean
    }

export const BLOCK_TYPE_OPTIONS: { value: ServicePageBlock['_type']; label: string }[] = [
  { value: 'service_page_block_intro_split', label: 'Intro (image + heading + text)' },
  { value: 'service_page_block_alternating_media', label: 'Alternating image + text' },
  { value: 'service_page_block_icon_card_grid', label: 'Icon card grid' },
  { value: 'service_page_block_icon_card_stack', label: 'Image + stacked icon cards' },
  { value: 'service_page_block_split_disorders', label: 'Split lists + center image' },
  { value: 'service_page_block_media_side_icon_list', label: 'Image beside icon list' },
  { value: 'service_page_block_goals_split', label: 'Goals + image' },
  { value: 'service_page_block_two_column_plain', label: 'Two columns (plain image + text)' },
]

export function newEmptyBlock(type: ServicePageBlock['_type']): ServicePageBlock {
  const _key = crypto.randomUUID()
  switch (type) {
    case 'service_page_block_intro_split':
      return {
        _type: type,
        _key,
        maskStyle: 'blobCover',
        reverseOrder: false,
      }
    case 'service_page_block_alternating_media':
      return {
        _type: type,
        _key,
        reverseLayout: false,
        sectionBg: 'white',
        useBlobMask: true,
        headingStyle: 'orange',
        blobMask: 'blob2',
      }
    case 'service_page_block_icon_card_grid':
      return {
        _type: type,
        _key,
        sectionBg: 'gray',
        gridCols: 3,
        cardBg: 'white',
        items: [],
      }
    case 'service_page_block_icon_card_stack':
      return { _type: type, _key, imageLeft: true, items: [] }
    case 'service_page_block_split_disorders':
      return { _type: type, _key, disorders: [] }
    case 'service_page_block_media_side_icon_list':
      return { _type: type, _key, imageLeft: true, items: [] }
    case 'service_page_block_goals_split':
      return {
        _type: type,
        _key,
        sectionBg: 'gray',
        reverseLayout: false,
        goals: [],
      }
    case 'service_page_block_two_column_plain':
      return {
        _type: type,
        _key,
        reverseOrder: false,
        sectionBg: 'white',
        mobileImageBelow: false,
        leadWithText: false,
      }
    default:
      return { _type: 'service_page_block_intro_split', _key, maskStyle: 'blobCover' }
  }
}
