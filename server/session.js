import jwt from 'jsonwebtoken'
import { trimEnv } from './envUtil.js'

export const SESSION_COOKIE = 'tl_admin_session'

function sessionSecret() {
  return trimEnv(process.env.SESSION_SECRET)
}

/**
 * @param {import('express').Request} req
 * @returns {string | null}
 */
export function getUsernameFromRequest(req) {
  const secret = sessionSecret()
  if (!secret) return null
  const fromCookie = req.cookies?.[SESSION_COOKIE]
  const auth = req.headers.authorization
  const fromBearer =
    typeof auth === 'string' && auth.startsWith('Bearer ') ? auth.slice(7) : null
  const token = fromCookie || fromBearer
  if (!token) return null
  try {
    const payload = jwt.verify(token, secret)
    if (typeof payload?.username === 'string') return payload.username
  } catch {
    return null
  }
  return null
}

/**
 * @param {string} username
 * @returns {string}
 */
export function createSessionToken(username) {
  const secret = sessionSecret()
  if (!secret) {
    throw new Error('SESSION_SECRET is not set')
  }
  return jwt.sign({ username }, secret, { expiresIn: '7d' })
}

export function cookieOptions() {
  // Use COOKIE_SECURE=false if you serve production over HTTP (otherwise the browser may drop the cookie).
  const secure =
    process.env.COOKIE_SECURE === 'true'
      ? true
      : process.env.COOKIE_SECURE === 'false'
        ? false
        : process.env.NODE_ENV === 'production'
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure,
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }
}
