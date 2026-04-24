import { getAdminSanityClient } from './sanityAdmin'
import {
  aboutSectionQuery,
  contactUsQuery,
  footerSettingsQuery,
  franchiseQuery,
  homeQuery,
} from './queries'

const CREATABLE_DOCUMENT_TYPES = new Set([
  'stats',
  'service',
  'testimonials',
  'whyUs',
  'our_philosophy',
  'about_us',
  'about_us_items',
  'approach',
  'service_listing_landing',
  'service_listing_item',
  'footer_settings',
])

const DELETABLE_DOCUMENT_TYPES = new Set(['service_listing_item'])

const CONTACT_SUBMISSIONS_QUERY = `*[_type == "contact_submission"] | order(submittedAt desc) {
  _id,
  _type,
  name,
  contact,
  email,
  message,
  source,
  service,
  submittedAt,
  responded,
  respondedAt
}`

function client() {
  return getAdminSanityClient()
}

export async function apiGet<T>(path: string): Promise<T> {
  const c = client()

  if (path === '/api/health') {
    await c.fetch('count(*[_type == "home"])')
    return { ok: true } as T
  }
  if (path === '/api/contact') {
    return c.fetch(contactUsQuery) as Promise<T>
  }
  if (path === '/api/footer-settings') {
    return c.fetch(footerSettingsQuery) as Promise<T>
  }
  if (path === '/api/franchise') {
    return c.fetch(franchiseQuery) as Promise<T>
  }
  if (path === '/api/home') {
    return c.fetch(homeQuery) as Promise<T>
  }
  if (path === '/api/facilities') {
    return c.fetch('*[_type == "facility"]') as Promise<T>
  }
  if (path === '/api/contact-submissions') {
    return c.fetch(CONTACT_SUBMISSIONS_QUERY) as Promise<T>
  }
  if (path === '/api/about-section') {
    const doc = await c.fetch(aboutSectionQuery)
    const section = (doc as { aboutUs?: unknown[] })?.aboutUs?.[0] ?? null
    return section as T
  }

  const serviceListing = path.match(/^\/api\/service-listing\/(child|adult)$/)
  if (serviceListing) {
    const audience = serviceListing[1]
    const landing = await c.fetch(
      `*[_type == "service_listing_landing" && audience == $audience][0]{
        _id,
        _type,
        audience,
        heroIntro,
        sectionTitle,
        sectionSubtitle
      }`,
      { audience },
    )
    const items = await c.fetch(
      `*[_type == "service_listing_item" && audience == $audience] | order(sortOrder asc, title asc) {
        _id,
        _type,
        audience,
        sortOrder,
        title,
        pathSegment,
        description,
        items,
        iconKey
      }`,
      { audience },
    )
    return { landing, items } as T
  }

  const docId = path.match(/^\/api\/documents\/([^/]+)$/)
  if (docId) {
    const id = docId[1]
    const doc = await c.fetch('*[_id == $id][0]', { id })
    if (!doc) throw new Error('Not found')
    return doc as T
  }

  throw new Error(`Unsupported GET: ${path}`)
}

export async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  const m = path.match(/^\/api\/documents\/([^/]+)$/)
  if (!m) throw new Error(`Unsupported PATCH: ${path}`)
  const id = m[1]
  const fields = (body as { fields?: Record<string, unknown> })?.fields
  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
    throw new Error('Body must include { fields: { ... } }')
  }
  const reserved = new Set(['_id', '_type', '_createdAt', '_rev', '_updatedAt'])
  const toSet: Record<string, unknown> = {}
  const toUnset: string[] = []
  for (const [k, v] of Object.entries(fields)) {
    if (reserved.has(k)) continue
    if (v === null) toUnset.push(k)
    else toSet[k] = v
  }
  const c = client()
  if (Object.keys(toSet).length === 0 && toUnset.length === 0) {
    const doc = await c.fetch('*[_id == $id][0]', { id })
    if (!doc) throw new Error('Not found')
    return doc as T
  }
  let patchBuilder = c.patch(id)
  if (Object.keys(toSet).length > 0) patchBuilder = patchBuilder.set(toSet)
  if (toUnset.length > 0) patchBuilder = patchBuilder.unset(toUnset)
  const result = await patchBuilder.commit()
  return result as T
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  if (path !== '/api/documents') throw new Error(`Unsupported POST: ${path}`)
  const _type = (body as { _type?: string })?._type
  const fields = (body as { fields?: Record<string, unknown> })?.fields
  if (!_type || typeof _type !== 'string') {
    throw new Error('Body must include _type (string)')
  }
  if (!CREATABLE_DOCUMENT_TYPES.has(_type)) {
    throw new Error(`Invalid _type: ${_type}`)
  }
  if (fields !== undefined && (typeof fields !== 'object' || fields === null || Array.isArray(fields))) {
    throw new Error('fields must be a plain object when provided')
  }
  const reserved = new Set(['_id', '_type', '_createdAt', '_rev', '_updatedAt'])
  const doc = { _type, ...(fields && typeof fields === 'object' ? fields : {}) }
  const clean: Record<string, unknown> = { _type: doc._type }
  for (const [k, v] of Object.entries(doc)) {
    if (k !== '_type' && !reserved.has(k)) {
      clean[k] = v
    }
  }
  const c = client()
  const result = await c.create(clean as { _type: string })
  return result as T
}

export async function apiDelete<T>(path: string): Promise<T> {
  const m = path.match(/^\/api\/documents\/([^/]+)$/)
  if (!m) throw new Error(`Unsupported DELETE: ${path}`)
  const id = m[1]
  const c = client()
  const doc = await c.fetch('*[_id == $id][0]{ _id, _type }', { id })
  if (!doc) throw new Error('Not found')
  if (!DELETABLE_DOCUMENT_TYPES.has((doc as { _type: string })._type)) {
    throw new Error(`Cannot delete document type: ${(doc as { _type: string })._type}`)
  }
  await c.delete(id)
  return { ok: true, deleted: id } as T
}

export async function apiUpload(file: File): Promise<{
  asset: { _type: 'reference'; _ref: string }
  document: unknown
}> {
  const c = client()
  const asset = await c.assets.upload('image', file, {
    filename: file.name || 'upload',
  })
  return {
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
    document: asset,
  }
}
