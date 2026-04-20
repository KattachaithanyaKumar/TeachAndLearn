import bcrypt from 'bcryptjs'
import { matchesAdminApiKey } from './adminKey.js'
import { trimEnv } from './envUtil.js'
import { getSanityAuthClient } from './sanity.js'
import {
  SESSION_COOKIE,
  cookieOptions,
  createSessionToken,
  getUsernameFromRequest,
} from './session.js'

/** Registered on app as app.post('/api/auth/login', …) so requests never fall through to /api + requireAdmin. */
export async function loginHandler(req, res) {
  const { username, password } = req.body || {}
  if (!username || typeof username !== 'string' || !password || typeof password !== 'string') {
    return res.status(400).json({ error: 'username and password required' })
  }
  if (!trimEnv(process.env.SESSION_SECRET)) {
    return res.status(500).json({ error: 'Server auth is not configured (SESSION_SECRET)' })
  }
  try {
    const client = getSanityAuthClient()
    const doc = await client.fetch(
      `*[_type == "admin_user" && lower(username) == lower($u)][0]{ username, passwordHash }`,
      { u: username.trim() },
    )
    if (!doc?.passwordHash) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    const hash = String(doc.passwordHash).trim()
    const ok = await bcrypt.compare(password, hash)
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    const token = createSessionToken(doc.username)
    res.cookie(SESSION_COOKIE, token, cookieOptions())
    res.json({ user: { username: doc.username } })
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'login failed' })
  }
}

export function logoutHandler(_req, res) {
  res.clearCookie(SESSION_COOKIE, cookieOptions())
  res.json({ ok: true })
}

export function meHandler(req, res) {
  const u = getUsernameFromRequest(req)
  if (u) {
    return res.json({ user: { username: u } })
  }
  if (matchesAdminApiKey(req)) {
    return res.json({ user: { username: 'api-key' } })
  }
  return res.status(401).json({ error: 'Unauthorized' })
}
