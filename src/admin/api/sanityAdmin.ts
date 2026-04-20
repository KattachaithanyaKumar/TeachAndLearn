import { createClient, type SanityClient } from '@sanity/client'
import bcrypt from 'bcryptjs'

const SESSION_KEY = 'tl_admin_session'
const LEGACY_TOKEN_KEY = 'tl_admin_sanity_token'

type SessionPayload = { username: string }

function envProject() {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
  const dataset = import.meta.env.VITE_SANITY_DATASET as string | undefined
  const apiVersion = (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) || '2024-01-01'
  if (!projectId || !dataset) {
    throw new Error('Missing VITE_SANITY_PROJECT_ID or VITE_SANITY_DATASET')
  }
  return { projectId, dataset, apiVersion }
}

/** Same as server: dataset that holds `admin_user` (optional override). */
function authDataset(): string {
  const a = import.meta.env.VITE_SANITY_AUTH_DATASET
  if (typeof a === 'string' && a.trim()) return a.trim()
  return (import.meta.env.VITE_SANITY_DATASET as string).trim()
}

/** Write token from `.env` / Netlify (Vite inlines it at build time). */
export function getEnvWriteToken(): string {
  const t = import.meta.env.VITE_SANITY_WRITE_TOKEN
  if (typeof t !== 'string' || !t.trim()) {
    throw new Error('VITE_SANITY_WRITE_TOKEN is not set')
  }
  return t.trim()
}

function clientForDataset(dataset: string): SanityClient {
  const { projectId, apiVersion } = envProject()
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: getEnvWriteToken(),
  })
}

/** Check username + password against `admin_user` bcrypt hash in Sanity. */
export async function verifyAdminPassword(username: string, password: string): Promise<void> {
  const client = clientForDataset(authDataset())
  const doc = await client.fetch<{ username?: string; passwordHash?: string } | null>(
    `*[_type == "admin_user" && lower(username) == lower($u)][0]{ username, passwordHash }`,
    { u: username.trim() },
  )
  if (!doc?.passwordHash) {
    throw new Error('Invalid credentials')
  }
  const ok = await bcrypt.compare(password, String(doc.passwordHash).trim())
  if (!ok) throw new Error('Invalid credentials')
}

/** CMS client: main dataset + env write token. */
export function getAdminSanityClient(): SanityClient {
  const { projectId, dataset, apiVersion } = envProject()
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: getEnvWriteToken(),
  })
}

export function getStoredSession(): SessionPayload | null {
  if (typeof sessionStorage === 'undefined') return null
  const raw = sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    const j = JSON.parse(raw) as SessionPayload
    if (typeof j?.username === 'string' && j.username.trim()) return j
  } catch {
    /* ignore */
  }
  return null
}

export function setStoredSession(payload: SessionPayload): void {
  if (typeof sessionStorage === 'undefined') return
  sessionStorage.removeItem(LEGACY_TOKEN_KEY)
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload))
}

export function clearStoredSession(): void {
  if (typeof sessionStorage === 'undefined') return
  sessionStorage.removeItem(SESSION_KEY)
  sessionStorage.removeItem(LEGACY_TOKEN_KEY)
}

/** Light check that Sanity + token still work (content dataset). */
export async function sanityPing(): Promise<void> {
  const c = getAdminSanityClient()
  await c.fetch('count(*[_type == "home"])')
}
