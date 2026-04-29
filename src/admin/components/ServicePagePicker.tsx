import { useEffect, useState, type ChangeEvent } from 'react'
import { apiGet, apiPatch } from '../api/client'

type PageRow = { _id: string; title?: string; slug?: string | null }

type Props = {
  serviceDocId: string
  linked: { _id: string; title?: string; slug?: string | null } | null | undefined
  onUpdated: () => void
}

export default function ServicePagePicker({ serviceDocId, linked, onUpdated }: Props) {
  const [pages, setPages] = useState<PageRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    apiGet<{ items: PageRow[] }>('/api/service-pages')
      .then((r) => {
        if (!cancelled) setPages(Array.isArray(r.items) ? r.items : [])
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load service pages')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const value = linked?._id ?? ''

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value.trim()
    setSaving(true)
    setError(null)
    const payload =
      v.length > 0
        ? { linkedServicePage: { _type: 'reference' as const, _ref: v } }
        : { linkedServicePage: null }

    apiPatch(`/api/documents/${serviceDocId}`, { fields: payload })
      .then(() => onUpdated())
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Save failed')
      })
      .finally(() => setSaving(false))
  }

  return (
    <section className="card">
      <h3 className="card-title">Link to full service page</h3>
      <p className="muted small">
        Choose a service page for “Read More” on the home page. URL will be <code>/service/…</code>.
      </p>
      {error ? <p className="text-error">{error}</p> : null}
      <label className="field">
        <span className="field-label">Service page</span>
        <select className="input" value={value} onChange={onChange} disabled={loading || saving}>
          <option value="">No link (hide Read More)</option>
          {!loading
            ? pages.map((row) => (
                <option key={row._id} value={row._id}>
                  {row.title ?? row._id}
                  {row.slug ? ` · /service/${row.slug}` : ''}
                </option>
              ))
            : null}
        </select>
      </label>
      {saving ? <span className="text-muted">Saving…</span> : null}
    </section>
  )
}
