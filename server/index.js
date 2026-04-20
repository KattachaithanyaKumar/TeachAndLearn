import 'dotenv/config'
import { existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import multer from 'multer'
import { loginHandler, logoutHandler, meHandler } from './authRoutes.js'
import { getSanityClient } from './sanity.js'
import {
  aboutSectionQuery,
  contactUsQuery,
  franchiseQuery,
  homeQuery,
} from './queries.js'
import { requireAdmin } from './middleware.js'

const app = express()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } })

const PORT = Number(process.env.PORT) || 3001

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
  }),
)
app.use(express.json({ limit: '2mb' }))
app.use(cookieParser())

/**
 * Handle auth before `app.use('/api', api)` so /api/auth/* never hits requireAdmin.
 * (Also covers cases where app.post('/api/auth/login') ordering differs by Express version.)
 */
function authPath(req) {
  const u = (req.originalUrl || req.url || '').split('?')[0]
  return u.replace(/\/+$/, '') || '/'
}

function authGate(req, res, next) {
  const p = authPath(req)
  if (req.method === 'POST' && p === '/api/auth/login') {
    return loginHandler(req, res, next)
  }
  if (req.method === 'POST' && p === '/api/auth/logout') {
    return logoutHandler(req, res, next)
  }
  if (req.method === 'GET' && p === '/api/auth/me') {
    return meHandler(req, res, next)
  }
  next()
}
app.use(authGate)

function clientOrError(res) {
  try {
    return getSanityClient()
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'Sanity misconfigured' })
    return null
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

/** All protected JSON API routes — use a Router so `requireAdmin` runs before POST/PATCH handlers reliably. */
const api = express.Router()
api.use(requireAdmin)

api.get('/contact', async (_req, res) => {
  const client = clientOrError(res)
  if (!client) return
  try {
    const doc = await client.fetch(contactUsQuery)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'fetch failed' })
  }
})

/** Visitor submissions from Contact page / Home quick appointment (`contact_submission` docs). */
api.get('/contact-submissions', async (_req, res) => {
  const client = clientOrError(res)
  if (!client) return
  try {
    const rows = await client.fetch(
      `*[_type == "contact_submission"] | order(submittedAt desc) {
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
      }`,
    )
    res.json(rows)
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'fetch failed' })
  }
})

api.get('/franchise', async (_req, res) => {
  const client = clientOrError(res)
  if (!client) return
  try {
    const doc = await client.fetch(franchiseQuery)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'fetch failed' })
  }
})

api.get('/home', async (_req, res) => {
  const client = clientOrError(res)
  if (!client) return
  try {
    const doc = await client.fetch(homeQuery)
    res.json(doc)
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'fetch failed' })
  }
})

api.get('/about-section', async (_req, res) => {
  const client = clientOrError(res)
  if (!client) return
  try {
    const doc = await client.fetch(aboutSectionQuery)
    const section = doc?.aboutUs?.[0] ?? null
    res.json(section)
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'fetch failed' })
  }
})

/** Child / adult service listing landing + cards (see TeachAndLearn Sanity schemas). */
api.get('/service-listing/:audience', async (req, res) => {
  const audience = req.params.audience
  if (audience !== 'child' && audience !== 'adult') {
    return res.status(400).json({ error: 'Invalid audience' })
  }
  const client = clientOrError(res)
  if (!client) return
  try {
    const landing = await client.fetch(
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
    const items = await client.fetch(
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
    res.json({ landing, items })
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'fetch failed' })
  }
})

api.get('/facilities', async (_req, res) => {
  const client = clientOrError(res)
  if (!client) return
  try {
    const rows = await client.fetch('*[_type == "facility"]')
    res.json(rows)
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'fetch failed' })
  }
})

api.get('/services', async (_req, res) => {
  const client = clientOrError(res)
  if (!client) return
  try {
    const rows = await client.fetch('*[_type == "service"]')
    res.json(rows)
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'fetch failed' })
  }
})

api.get('/stats', async (_req, res) => {
  const client = clientOrError(res)
  if (!client) return
  try {
    const rows = await client.fetch('*[_type == "stats"]')
    res.json(rows)
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'fetch failed' })
  }
})

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
])

/**
 * Create a document. Body: { "_type": "stats", "fields": { ... } } — fields merged into the new doc (optional).
 */
api.post('/documents', async (req, res) => {
  const client = clientOrError(res)
  if (!client) return
  const _type = req.body?._type
  const fields = req.body?.fields
  if (!_type || typeof _type !== 'string') {
    return res.status(400).json({ error: 'Body must include _type (string)' })
  }
  if (!CREATABLE_DOCUMENT_TYPES.has(_type)) {
    return res.status(400).json({ error: `Invalid _type: ${_type}` })
  }
  if (fields !== undefined && (typeof fields !== 'object' || fields === null || Array.isArray(fields))) {
    return res.status(400).json({ error: 'fields must be a plain object when provided' })
  }
  const reserved = new Set(['_id', '_type', '_createdAt', '_rev', '_updatedAt'])
  const doc = { _type, ...(fields && typeof fields === 'object' ? fields : {}) }
  const clean = { _type: doc._type }
  for (const [k, v] of Object.entries(doc)) {
    if (k !== '_type' && !reserved.has(k)) {
      clean[k] = v
    }
  }
  try {
    const result = await client.create(clean)
    res.json(result)
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'create failed' })
  }
})

api.get('/documents/:id', async (req, res) => {
  const client = clientOrError(res)
  if (!client) return
  const { id } = req.params
  try {
    const doc = await client.fetch('*[_id == $id][0]', { id })
    if (!doc) {
      return res.status(404).json({ error: 'Not found' })
    }
    res.json(doc)
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'fetch failed' })
  }
})

api.get('/list/:type', async (req, res) => {
  const client = clientOrError(res)
  if (!client) return
  const type = req.params.type
  if (!/^[a-zA-Z0-9_]+$/.test(type)) {
    return res.status(400).json({ error: 'Invalid type' })
  }
  try {
    const rows = await client.fetch(`*[_type == $type]`, { type })
    res.json(rows)
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'fetch failed' })
  }
})

/**
 * Patch document fields. Body: { "fields": { "title": "..." } } — only top-level keys in `fields` are applied.
 */
api.patch('/documents/:id', async (req, res) => {
  const client = clientOrError(res)
  if (!client) return
  const { id } = req.params
  const fields = req.body?.fields
  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
    return res.status(400).json({ error: 'Body must include { fields: { ... } }' })
  }
  const reserved = new Set(['_id', '_type', '_createdAt', '_rev', '_updatedAt'])
  const patch = {}
  for (const [k, v] of Object.entries(fields)) {
    if (!reserved.has(k)) {
      patch[k] = v
    }
  }
  try {
    const result = await client.patch(id).set(patch).commit()
    res.json(result)
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'patch failed' })
  }
})

const DELETABLE_DOCUMENT_TYPES = new Set(['service_listing_item'])

/** Delete a document by id. Only allowed types (e.g. service cards) may be removed. */
api.delete('/documents/:id', async (req, res) => {
  const client = clientOrError(res)
  if (!client) return
  const { id } = req.params
  try {
    const doc = await client.fetch('*[_id == $id][0]{ _id, _type }', { id })
    if (!doc) {
      return res.status(404).json({ error: 'Not found' })
    }
    if (!DELETABLE_DOCUMENT_TYPES.has(doc._type)) {
      return res.status(400).json({ error: `Cannot delete document type: ${doc._type}` })
    }
    await client.delete(id)
    res.json({ ok: true, deleted: id })
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'delete failed' })
  }
})

api.post('/upload', upload.single('file'), async (req, res) => {
  const client = clientOrError(res)
  if (!client) return
  const file = req.file
  if (!file?.buffer) {
    return res.status(400).json({ error: 'Missing file field' })
  }
  try {
    const asset = await client.assets.upload('image', file.buffer, {
      filename: file.originalname || 'upload',
    })
    res.json({
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      document: asset,
    })
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'upload failed' })
  }
})

api.get('/why-us', async (_req, res) => {
  const client = clientOrError(res)
  if (!client) return
  try {
    const rows = await client.fetch('*[_type == "whyUs"]')
    res.json(rows)
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'fetch failed' })
  }
})

api.get('/our-philosophy', async (_req, res) => {
  const client = clientOrError(res)
  if (!client) return
  try {
    const rows = await client.fetch('*[_type == "our_philosophy"]')
    res.json(rows)
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'fetch failed' })
  }
})

api.get('/testimonials', async (_req, res) => {
  const client = clientOrError(res)
  if (!client) return
  try {
    const rows = await client.fetch('*[_type == "testimonials"]')
    res.json(rows)
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'fetch failed' })
  }
})

api.get('/approaches', async (_req, res) => {
  const client = clientOrError(res)
  if (!client) return
  try {
    const rows = await client.fetch('*[_type == "approach"]')
    res.json(rows)
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'fetch failed' })
  }
})

app.use('/api', api)

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '../dist')
if (existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(join(distDir, 'index.html'))
  })
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Admin API listening on http://localhost:${PORT}`)
})
