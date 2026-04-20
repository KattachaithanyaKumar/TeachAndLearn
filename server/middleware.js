import { matchesAdminApiKey } from './adminKey.js'
import { getUsernameFromRequest } from './session.js'

/**
 * Requires a valid session JWT (cookie or Bearer) or, when ADMIN_API_KEY is set,
 * matching x-admin-key / Bearer ADMIN_API_KEY for automation.
 */
export function requireAdmin(req, res, next) {
  const username = getUsernameFromRequest(req)
  if (username) {
    req.adminUser = username
    return next()
  }

  if (matchesAdminApiKey(req)) {
    req.adminUser = 'api-key'
    return next()
  }

  return res.status(401).json({ error: 'Unauthorized' })
}
