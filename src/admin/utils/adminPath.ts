/**
 * Normalized base, e.g. `/admin` or `''` if explicitly cleared.
 * Defaults to `/admin` so embedded admin routes match `/admin/*` even when `VITE_ADMIN_BASE` is missing from env.
 */
export function getAdminBase(): string {
  const raw = import.meta.env.VITE_ADMIN_BASE as string | undefined
  if (raw === '') return ''
  if (typeof raw === 'string' && raw.trim()) return raw.trim().replace(/\/+$/, '')
  return '/admin'
}

/**
 * Absolute path for admin routes and links.
 * @param path - segment(s) without base, e.g. "login", "service-listings/child", or "" for dashboard root
 */
export function adminPath(path: string = ''): string {
  const base = getAdminBase()
  let segment = path.trim()
  if (segment.startsWith('/')) segment = segment.slice(1)
  const suffix = segment ? `/${segment}` : ''
  if (!base) {
    return suffix || '/'
  }
  return `${base}${suffix}`
}
