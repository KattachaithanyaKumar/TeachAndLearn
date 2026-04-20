/** No trailing slash. When empty, `/api/...` uses the page origin (vite dev proxy or same server as SPA). */
const raw = import.meta.env.VITE_API_URL as string | undefined
const base = typeof raw === 'string' && raw.trim() ? raw.trim().replace(/\/$/, '') : ''

const fetchOptions: RequestInit = { credentials: 'include' }

function adminKeyHeader(): string | undefined {
  const key = import.meta.env.VITE_ADMIN_API_KEY
  if (typeof key !== 'string') return undefined
  const t = key.trim()
  return t.length > 0 ? t : undefined
}

function headers(init?: HeadersInit, json = false): Headers {
  const h = new Headers(init)
  const key = adminKeyHeader()
  if (key) {
    h.set('x-admin-key', key)
  }
  if (json) {
    h.set('Content-Type', 'application/json')
  }
  return h
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${base}${path}`, { ...fetchOptions, headers: headers(undefined, false) })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(t || res.statusText)
  }
  return res.json() as Promise<T>
}

export async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    ...fetchOptions,
    method: 'PATCH',
    headers: headers(undefined, true),
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(t || res.statusText)
  }
  return res.json() as Promise<T>
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    ...fetchOptions,
    method: 'POST',
    headers: headers(undefined, true),
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(t || res.statusText)
  }
  return res.json() as Promise<T>
}

export async function apiDelete<T>(path: string): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    ...fetchOptions,
    method: 'DELETE',
    headers: headers(undefined, false),
  })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(t || res.statusText)
  }
  return res.json() as Promise<T>
}

export async function apiUpload(file: File): Promise<{
  asset: { _type: 'reference'; _ref: string }
  document: unknown
}> {
  const fd = new FormData()
  fd.append('file', file)
  const h = new Headers()
  const key = adminKeyHeader()
  if (key) {
    h.set('x-admin-key', key)
  }
  const res = await fetch(`${base}/api/upload`, { ...fetchOptions, method: 'POST', headers: h, body: fd })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(t || res.statusText)
  }
  return res.json()
}
