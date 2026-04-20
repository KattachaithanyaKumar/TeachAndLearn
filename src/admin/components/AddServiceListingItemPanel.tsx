import { useState } from 'react'
import { apiPost } from '../api/client'

type Audience = 'child' | 'adult'

type Props = {
  audience: Audience
  onCreated: () => void
}

export default function AddServiceListingItemPanel({ audience, onCreated }: Props) {
  const [title, setTitle] = useState('')
  const [pathSegment, setPathSegment] = useState('')
  const [sortOrder, setSortOrder] = useState(0)
  const [iconKey, setIconKey] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = async () => {
    const t = title.trim()
    const p = pathSegment.trim().toLowerCase().replace(/^\/+|\/+$/g, '')
    if (!t || !p) {
      setError('Title and URL path segment are required.')
      return
    }
    setBusy(true)
    setError(null)
    try {
      const fields: Record<string, unknown> = {
        audience,
        title: t,
        pathSegment: p,
        sortOrder: Number(sortOrder) || 0,
        description: '',
        items: [],
      }
      if (audience === 'adult' && iconKey.trim()) {
        fields.iconKey = iconKey.trim()
      }
      await apiPost('/api/documents', {
        _type: 'service_listing_item',
        fields,
      })
      setTitle('')
      setPathSegment('')
      setSortOrder(0)
      setIconKey('')
      onCreated()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Create failed')
    } finally {
      setBusy(false)
    }
  }

  const isAdult = audience === 'adult'

  return (
    <section className="card">
      <h3 className="card-title">Add {isAdult ? 'adult' : 'child'} service</h3>
      <p className="muted small">
        Creates a <code>service_listing_item</code> in Sanity. Title and path segment are required by
        the schema.
      </p>
      <div className="field-grid">
        <label className="field">
          <span className="field-label">title</span>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Speech therapy"
          />
        </label>
        <label className="field">
          <span className="field-label">pathSegment</span>
          <input
            className="input"
            value={pathSegment}
            onChange={(e) => setPathSegment(e.target.value)}
            placeholder="e.g. speech-therapy"
          />
        </label>
        <label className="field">
          <span className="field-label">sortOrder</span>
          <input
            type="number"
            className="input"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
          />
        </label>
        {isAdult ? (
          <label className="field">
            <span className="field-label">iconKey (optional)</span>
            <input
              className="input"
              value={iconKey}
              onChange={(e) => setIconKey(e.target.value)}
              placeholder="e.g. PiTrainSimple"
            />
          </label>
        ) : null}
      </div>
      <div className="row">
        <button type="button" className="btn" onClick={create} disabled={busy}>
          {busy ? 'Creating…' : 'Create service'}
        </button>
        {error ? <span className="text-error">{error}</span> : null}
      </div>
    </section>
  )
}
