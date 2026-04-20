import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '../api/client'
import { adminPath } from '../utils/adminPath'

export default function DashboardPage() {
  const [health, setHealth] = useState<string>('checking…')

  useEffect(() => {
    apiGet<{ ok: boolean }>('/api/health')
      .then(() => setHealth('API reachable'))
      .catch((e) => setHealth(e instanceof Error ? e.message : 'unreachable'))
  }, [])

  return (
    <div className="page">
      <h1 className="page-title">Dashboard</h1>
      <p className="lead">
        Sign in is backed by <code>admin_user</code> documents in Sanity (bcrypt hashes only) and a
        server session cookie. The Sanity write token stays on the server. Optional{' '}
        <code>ADMIN_API_KEY</code> / <code>VITE_ADMIN_API_KEY</code> still work for header-based
        API access.
      </p>
      <div className="card">
        <h2 className="card-title">Status</h2>
        <p>{health}</p>
        <p className="muted" style={{ marginTop: '0.75rem' }}>
          <Link to={adminPath('submissions')}>Form submissions</Link>
          {' · '}
          <Link to={adminPath('contact')}>Contact CMS</Link>
        </p>
      </div>
      <div className="card">
        <h2 className="card-title">Sanity Studio (optional)</h2>
        <p>
          The embedded Studio under <code>TeachAndLearn/sanity</code> can stay for advanced edits
          until this UI covers every workflow.
        </p>
      </div>
    </div>
  )
}
