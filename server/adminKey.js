import { trimEnv } from './envUtil.js'

/**
 * Shared logic for optional ADMIN_API_KEY header / Bearer (automation & VITE_ADMIN_API_KEY).
 * @param {import('express').Request} req
 * @returns {string | undefined}
 */
export function getProvidedAdminKey(req) {
  const header = req.headers['x-admin-key']
  const auth = req.headers.authorization
  const bearer = auth?.startsWith('Bearer ') ? auth.slice(7) : null
  if (typeof header === 'string' && header.length > 0) return trimEnv(header)
  if (typeof bearer === 'string' && bearer.length > 0) return trimEnv(bearer)
  return undefined
}

/**
 * @param {import('express').Request} req
 * @returns {boolean}
 */
export function matchesAdminApiKey(req) {
  const expected = trimEnv(process.env.ADMIN_API_KEY)
  if (!expected) return false
  const sent = getProvidedAdminKey(req)
  return sent === expected
}
