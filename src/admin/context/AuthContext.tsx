import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const raw = import.meta.env.VITE_API_URL as string | undefined
const base = typeof raw === 'string' && raw.trim() ? raw.trim().replace(/\/$/, '') : ''

type AuthUser = { username: string }

type AuthContextValue = {
  user: AuthUser | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function optionalAdminHeaders(): HeadersInit {
  const h = new Headers()
  const raw = import.meta.env.VITE_ADMIN_API_KEY
  const key = typeof raw === 'string' ? raw.trim() : ''
  if (key.length > 0) {
    h.set('x-admin-key', key)
  }
  return h
}

async function fetchMe(): Promise<AuthUser | null> {
  const res = await fetch(`${base}/api/auth/me`, {
    credentials: 'include',
    headers: optionalAdminHeaders(),
  })
  if (res.status === 401) return null
  if (!res.ok) {
    const t = await res.text()
    throw new Error(t || res.statusText)
  }
  const data = (await res.json()) as { user?: { username?: string } }
  const u = data.user?.username
  if (typeof u !== 'string') return null
  return { username: u }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const u = await fetchMe()
      setUser(u)
    } catch {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        const u = await fetchMe()
        if (!cancelled) setUser(u)
      } catch {
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    const res = await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (!res.ok) {
      const t = await res.text()
      let msg = t || res.statusText
      try {
        const j = JSON.parse(t) as { error?: string }
        if (j.error) msg = j.error
      } catch {
        /* use raw */
      }
      throw new Error(msg)
    }
    const data = (await res.json()) as { user?: { username?: string } }
    const u = data.user?.username
    if (typeof u !== 'string') throw new Error('Invalid response')
    setUser({ username: u })
  }, [])

  const logout = useCallback(async () => {
    await fetch(`${base}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: optionalAdminHeaders(),
    })
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, loading, login, logout, refresh }),
    [user, loading, login, logout, refresh],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
