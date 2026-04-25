/** GROQ aligned with `server/queries.js` / marketing `api_service`. */

export const footerSettingsQuery = `*[_type == "footer_settings"][0]{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  brandTitle,
  brandSubtitle,
  brandDescription,
  phone,
  email,
  locationLabel,
  locationLink,
  hoursText,
  socialLinks[]{ _key, platform, url }
}`

export const contactUsQuery = `*[_type == "contact_us"][0]{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  mapLatitude,
  mapLongitude,
  mapZoom,
  contactDetails[]->{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    label,
    icon,
    value,
    isAction,
    actionType
  },
  contactAddress[]->{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    address,
    latitude,
    longitude,
    mapScreenshot,
    "mapScreenshotUrl": mapScreenshot.asset->url
  }
}`

export const franchiseQuery = `*[_type == "franchise"][0]{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  description,
  pageBody {
    heroTitle,
    heroLead,
    valueChecks,
    phoneDisplay,
    phoneTel,
    ctaApplyLabel,
    ctaTalkLabel,
    sectionWhyTitle,
    sectionWhyBody,
    sectionImpactTitle,
    sectionImpactBody,
    sectionTrustTitle,
    sectionTrustBody,
    sectionTrustPartner,
    sectionFacilityTitle,
    facilityLines,
    sectionJoinTitle,
    sectionJoinBody,
    sectionPartnersTitle,
    partnerCriteria
  },
  supportCardImage {
    asset,
    "assetUrl": asset->url,
    hotspot,
    crop
  },
  requirements->{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    requirements
  },
  steps[]->{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    index,
    title,
    description,
    icon
  },
  contact[]->{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    content,
    icon
  }
}`

export const homeQuery = `
  *[_type == "home"][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    heroEyebrow,
    heroTitleLine1,
    heroTitleHighlight,
    heroDescription,
    heroPrimaryCtaLabel,
    heroSecondaryCtaLabel,
    heroImage {
      asset,
      "assetUrl": asset->url,
      alt,
      hotspot,
      crop
    },
    aboutUs[]->{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      description,
      aboutPageHeaderPrefix,
      aboutPageHeaderHighlight,
      aboutPageEyebrow,
      aboutPageHeroImage {
        asset,
        "assetUrl": asset->url,
        alt,
        hotspot,
        crop
      },
      promiseEyebrow,
      promiseHeading,
      promiseBody,
      visionTitle,
      visionBody,
      missionTitle,
      missionBody,
      items[]->{
        _id,
        title,
        description
      }
    },
    service[]->{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      name,
      description,
      icon,
      linkedListingItem->{
        _id,
        title,
        audience,
        pathSegment
      },
      "audience": linkedListingItem->audience,
      "pathSegment": linkedListingItem->pathSegment
    },
    stats[]->{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      number,
      label,
      icon,
      bgColor,
      iconColor
    },
    whyUs[]->{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      heading,
      description,
      approaches[]->{
        _id,
        label,
        icon
      }
    },
    ourPhilosophy[]->{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      heading,
      description
    },
    testimonials[]->{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      author,
      review,
      rating
    }
  }
`

export const aboutSectionQuery = `
  *[_type == "home"][0]{
    aboutUs[]->{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      description,
      aboutPageHeaderPrefix,
      aboutPageHeaderHighlight,
      aboutPageEyebrow,
      aboutPageHeroImage {
        asset,
        "assetUrl": asset->url,
        alt,
        hotspot,
        crop
      },
      promiseEyebrow,
      promiseHeading,
      promiseBody,
      visionTitle,
      visionBody,
      missionTitle,
      missionBody,
      items[]->{
        _id,
        title,
        description
      }
    }
  }
`
