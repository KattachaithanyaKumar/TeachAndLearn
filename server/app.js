import express from 'express'
import multer from 'multer'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { loginHandler, logoutHandler, meHandler } from './authRoutes.js'
import { getSanityClient } from './sanity.js'
import {
  aboutSectionQuery,
  contactUsQuery,
  footerSettingsQuery,
  franchiseQuery,
  homeQuery,
} from './queries.js'
import { requireAdmin } from './middleware.js'
import {
  getRecipientForContactSubmission,
  getRecipientForFranchiseInquiry,
  sendEmail,
} from './email.js'
import { formatIstLong } from './emailTemplates.js'

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } })

/**
 * Netlify proxies `/api/*` to `/.netlify/functions/api`; Express may see that path — normalize to `/api/...`.
 */
function normalizeNetlifyFunctionPath(req, _res, next) {
  const u = req.url || ''
  if (u.startsWith('/.netlify/functions/api')) {
    const rest = u.slice('/.netlify/functions/api'.length) || '/'
    req.url = '/api' + (rest.startsWith('/') ? rest : `/${rest}`)
    req.originalUrl = req.url
  }
  next()
}

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

function clientOrError(res) {
  try {
    return getSanityClient()
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'Sanity misconfigured' })
    return null
  }
}

function isEmail(v) {
  return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
}

function digitsOnlyMax10(v) {
  return String(v ?? '')
    .replace(/\D+/g, '')
    .slice(0, 10)
}

function str(v) {
  return typeof v === 'string' ? v.trim() : ''
}

/** Express app for local `node server/index.js` and Netlify Functions (`netlify/functions/api.mjs`). */
export function createApp() {
  const app = express()

  app.use(normalizeNetlifyFunctionPath)
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
  app.use(authGate)

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true })
  })

  // Public endpoints for website forms: save to Sanity (admin portal) + optionally email recipients.
  app.post('/api/public/contact-submission', async (req, res) => {
    const client = clientOrError(res)
    if (!client) return

    const name = str(req.body?.name)
    const contact = digitsOnlyMax10(req.body?.contact)
    const email = str(req.body?.email)
    const message = str(req.body?.message)
    const source = str(req.body?.source)
    const service = str(req.body?.service)
    const requestType = str(req.body?.requestType)
    const requestedServices = Array.isArray(req.body?.requestedServices)
      ? req.body.requestedServices.map((v) => str(v)).filter(Boolean)
      : []

    if (!name || !contact || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    if (contact.length !== 10) {
      return res.status(400).json({ error: 'Invalid contact number' })
    }
    if (!isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }
    if (source === 'home_book' && !service) {
      return res.status(400).json({ error: 'Missing service' })
    }
    if (source === 'home_book') {
      if (requestType !== 'assessment' && requestType !== 'service') {
        return res.status(400).json({ error: 'Missing request type' })
      }
      if (requestedServices.length === 0) {
        return res.status(400).json({ error: 'Missing requested services' })
      }
    }

    const doc = {
      _type: 'contact_submission',
      name,
      contact,
      email,
      message,
      source: source === 'home_book' || source === 'contact_page' ? source : undefined,
      service: service || undefined,
      requestType: requestType || undefined,
      requestedServices: requestedServices.length > 0 ? requestedServices : undefined,
      submittedAt: new Date().toISOString(),
      responded: false,
    }

    try {
      const created = await client.create(doc)

      const to = getRecipientForContactSubmission(doc.source)
      const subjectPrefix =
        doc.source === 'home_book'
          ? 'Quick appointment'
          : doc.source === 'contact_page'
            ? 'Contact us'
            : 'Contact submission'
      const emailResult = await sendEmail({
        to,
        replyTo: email,
        subject: `[Teach&Learn] ${subjectPrefix} — ${name}`,
        text: [
          `Teach & Learn — ${subjectPrefix}`,
          '',
          `Source: ${doc.source || 'unknown'}`,
          requestType ? `Request type: ${requestType}` : null,
          requestedServices.length > 0 ? `Selected services: ${requestedServices.join(', ')}` : null,
          service ? `Service: ${service}` : null,
          `Name: ${name}`,
          `Phone: ${contact}`,
          `Email: ${email}`,
          `Submitted at (IST): ${formatIstLong(doc.submittedAt)}`,
          '',
          'Message:',
          message,
          '',
          'If you reply to this email, it will go to the submitter.',
        ]
          .filter(Boolean)
          .join('\n'),
      })

      res.json({ ok: true, createdId: created?._id, emailed: Boolean(emailResult.emailed), emailResult })
    } catch (e) {
      res.status(500).json({ error: e instanceof Error ? e.message : 'submit failed' })
    }
  })

  app.post('/api/public/franchise-inquiry', async (req, res) => {
    const client = clientOrError(res)
    if (!client) return

    const name = str(req.body?.name)
    const email = str(req.body?.email)
    const mobile = digitsOnlyMax10(req.body?.mobile)
    const dob = str(req.body?.dob)
    const education = str(req.body?.education)
    const currentState = str(req.body?.currentState)
    const currentDistrict = str(req.body?.currentDistrict)
    const location = str(req.body?.location)
    const comments = str(req.body?.comments)

    if (
      !name ||
      !email ||
      !mobile ||
      !dob ||
      !education ||
      !currentState ||
      !currentDistrict ||
      !location ||
      !comments
    ) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    if (mobile.length !== 10) {
      return res.status(400).json({ error: 'Invalid mobile number' })
    }
    if (!isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    const doc = {
      _type: 'franchise_inquiry',
      name,
      email,
      mobile,
      dob,
      education,
      currentState,
      currentDistrict,
      location,
      comments,
      submittedAt: new Date().toISOString(),
      responded: false,
    }

    try {
      const created = await client.create(doc)

      const to = getRecipientForFranchiseInquiry()
      const emailResult = await sendEmail({
        to,
        replyTo: email,
        subject: `[Teach&Learn] Franchise inquiry — ${name}`,
        text: [
          'Teach & Learn — Franchise inquiry',
          '',
          `Name: ${name}`,
          `Email: ${email}`,
          `Mobile: ${mobile}`,
          `DOB: ${dob}`,
          `Education: ${education}`,
          `Current state: ${currentState}`,
          `Current district: ${currentDistrict}`,
          `Preferred location: ${location}`,
          `Submitted at (IST): ${formatIstLong(doc.submittedAt)}`,
          '',
          'Comments:',
          comments,
          '',
          'If you reply to this email, it will go to the submitter.',
        ].join('\n'),
      })

      res.json({ ok: true, createdId: created?._id, emailed: Boolean(emailResult.emailed), emailResult })
    } catch (e) {
      res.status(500).json({ error: e instanceof Error ? e.message : 'submit failed' })
    }
  })

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

  api.get('/footer-settings', async (_req, res) => {
    const client = clientOrError(res)
    if (!client) return
    try {
      const doc = await client.fetch(footerSettingsQuery)
      res.json(doc)
    } catch (e) {
      res.status(500).json({ error: e instanceof Error ? e.message : 'fetch failed' })
    }
  })

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
        requestType,
        requestedServices,
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

  api.get('/franchise-inquiries', async (_req, res) => {
    const client = clientOrError(res)
    if (!client) return
    try {
      const rows = await client.fetch(
        `*[_type == "franchise_inquiry"] | order(submittedAt desc) {
        _id,
        _type,
        name,
        email,
        mobile,
        dob,
        education,
        currentState,
        currentDistrict,
        location,
        comments,
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
    'footer_settings',
    'contact_address',
  ])

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

  api.patch('/documents/:id', async (req, res) => {
    const client = clientOrError(res)
    if (!client) return
    const { id } = req.params
    const fields = req.body?.fields
    if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
      return res.status(400).json({ error: 'Body must include { fields: { ... } }' })
    }
    const reserved = new Set(['_id', '_type', '_createdAt', '_rev', '_updatedAt'])
    const toSet = {}
    const toUnset = []
    for (const [k, v] of Object.entries(fields)) {
      if (reserved.has(k)) continue
      if (v === null) toUnset.push(k)
      else toSet[k] = v
    }
    try {
      if (Object.keys(toSet).length === 0 && toUnset.length === 0) {
        const doc = await client.fetch('*[_id == $id][0]', { id })
        if (!doc) {
          return res.status(404).json({ error: 'Not found' })
        }
        return res.json(doc)
      }
      let pb = client.patch(id)
      if (Object.keys(toSet).length > 0) pb = pb.set(toSet)
      if (toUnset.length > 0) pb = pb.unset(toUnset)
      const result = await pb.commit()
      res.json(result)
    } catch (e) {
      res.status(500).json({ error: e instanceof Error ? e.message : 'patch failed' })
    }
  })

  const DELETABLE_DOCUMENT_TYPES = new Set(['service_listing_item'])

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

  return app
}
