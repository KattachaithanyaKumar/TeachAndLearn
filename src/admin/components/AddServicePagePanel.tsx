import { useState } from 'react'
import { apiPost } from '../api/client'

type Props = {
  onCreated: (id: string) => void
}

function slugify(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function AddServicePagePanel({ onCreated }: Props) {
  const [title, setTitle] = useState('')
  const [slugInput, setSlugInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const create = async () => {
    const t = title.trim()
    if (!t) {
      setErr('Title is required')
      return
    }
    const raw = slugInput.trim() || slugify(t)
    if (!raw) {
      setErr('Could not derive a slug — enter a URL slug (letters, numbers, hyphens).')
      return
    }
    setBusy(true)
    setErr(null)
    try {
      const created = await apiPost<{ _id: string }>('/api/documents', {
        _type: 'service_page',
        fields: {
          title: t,
          slug: { _type: 'slug', current: raw },
          sortOrder: 0,
          subtitle: '',
          body: '',
          contentHtml: '',
          cardHighlights: [],
          headerColor: '#E0F2FE',
          showCta: true,
          isFeaturedInNav: false,
          contentBlocks: [],
        },
      })
      onCreated(created._id)
      setTitle('')
      setSlugInput('')
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Create failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="card" style={{ marginTop: 16 }}>
      <h3 className="card-title">New service page</h3>
      <p className="muted small" style={{ marginBottom: 12 }}>
        Creates a <code>service_page</code> in Sanity. Public URL: <code>/service/your-slug</code>.
      </p>
      <div className="field-grid">
        <label className="field">
          <span className="field-label">Title</span>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Speech therapy"
          />
        </label>
        <label className="field">
          <span className="field-label">Slug (optional)</span>
          <input
            className="input"
            value={slugInput}
            onChange={(e) => setSlugInput(e.target.value)}
            placeholder="auto from title if empty"
          />
        </label>
      </div>
      {err ? <p className="text-error small">{err}</p> : null}
      <button type="button" className="btn btn-primary" disabled={busy} onClick={() => void create()}>
        {busy ? 'Creating…' : 'Create service page'}
      </button>
    </div>
  )
}
