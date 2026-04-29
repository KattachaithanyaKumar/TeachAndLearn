import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminPath } from '../utils/adminPath'
import { apiDelete, apiGet } from '../api/client'
import AddServicePagePanel from '../components/AddServicePagePanel'

type Row = {
  _id: string
  title?: string
  slug?: string | null
  sortOrder?: number
}

function ServicePageRow({
  item,
  onDeleted,
}: {
  item: Row
  onDeleted: () => void
}) {
  const [busy, setBusy] = useState(false)
  const slug = String(item.slug ?? '').trim()

  const remove = async () => {
    if (!window.confirm(`Delete service page “${item.title ?? item._id}”? This cannot be undone.`)) {
      return
    }
    setBusy(true)
    try {
      await apiDelete(`/api/documents/${item._id}`)
      onDeleted()
    } catch (e) {
      window.alert(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <li className="service-listing-stack" style={{ listStyle: 'none' }}>
      <div
        className="service-listing-toolbar"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}
      >
        <div className="service-listing-toolbar-text">
          <strong>{item.title ?? 'Untitled'}</strong>
          <span className="muted small">
            {slug ? (
              <>
                {' '}
                · <code>/service/{slug}</code>
              </>
            ) : (
              ' · (no slug)'
            )}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link
            to={adminPath(`service-pages/${item._id}/edit`)}
            className="btn btn-secondary btn-sm service-listing-toolbar-action"
          >
            Edit content
          </Link>
          <button type="button" className="btn btn-sm" disabled={busy} onClick={() => void remove()}>
            {busy ? '…' : 'Delete'}
          </button>
        </div>
      </div>
    </li>
  )
}

export default function ServicePagesPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState<Row[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    setLoading(true)
    setError(null)
    apiGet<{ items: Row[] }>('/api/service-pages')
      .then((r) => setItems(Array.isArray(r.items) ? r.items : []))
      .catch((e) => setError(e instanceof Error ? e.message : 'Load failed'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="page">
      <header className="page-header">
        <h1>Service pages</h1>
        <p className="muted">
          Manage full pages at <code>/service/…</code>. Home cards link here via “Link to full service page” on the
          Home editor.
        </p>
      </header>

      {loading ? <p className="muted">Loading…</p> : null}
      {error ? <p className="text-error">{error}</p> : null}

      {!loading && !error && items.length === 0 ? (
        <p className="muted">No service pages yet. Create one below.</p>
      ) : null}

      <ul style={{ padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item) => (
          <ServicePageRow key={item._id} item={item} onDeleted={load} />
        ))}
      </ul>

      <AddServicePagePanel
        onCreated={(id) => {
          load()
          navigate(adminPath(`service-pages/${id}/edit`))
        }}
      />
    </div>
  )
}
