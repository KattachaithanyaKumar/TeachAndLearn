import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '../api/client'
import { adminPath } from '../utils/adminPath'

export default function DashboardPage() {
  const [health, setHealth] = useState<string>('checking…')

  useEffect(() => {
    apiGet<{ ok: boolean }>('/api/health')
      .then(() => setHealth('Sanity API reachable'))
      .catch((e) => setHealth(e instanceof Error ? e.message : 'unreachable'))
  }, [])

  return (
    <div className="page">
      <h1 className="page-title">Dashboard</h1>
      <p className="lead">
        Sign-in checks your username and password against the <code>admin_user</code> document in
        Sanity (bcrypt hash). The write token comes from <code>VITE_SANITY_WRITE_TOKEN</code> in the
        build environment; this tab only stores your username in session storage after a successful
        login.
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
