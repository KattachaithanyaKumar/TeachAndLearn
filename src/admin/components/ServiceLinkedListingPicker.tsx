import { useEffect, useState, type ChangeEvent } from 'react'
import { apiGet, apiPatch } from '../api/client'

type ListingRow = { _id: string; title?: string; pathSegment?: string }

type Props = {
  serviceDocId: string
  linked: { _id: string; title?: string; pathSegment?: string } | null | undefined
  onUpdated: () => void
}

export default function ServiceLinkedListingPicker({
  serviceDocId,
  linked,
  onUpdated,
}: Props) {
  const [child, setChild] = useState<ListingRow[]>([])
  const [adult, setAdult] = useState<ListingRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    Promise.all([
      apiGet<{ items: ListingRow[] }>('/api/service-listing/child'),
      apiGet<{ items: ListingRow[] }>('/api/service-listing/adult'),
    ])
      .then(([c, a]) => {
        if (!cancelled) {
          setChild(c.items ?? [])
          setAdult(a.items ?? [])
        }
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load service listings')
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
        ? { linkedListingItem: { _type: 'reference' as const, _ref: v } }
        : { linkedListingItem: null }

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
        Choose an existing child or adult service listing. This sets where “Read More” on the public home
        page goes.
      </p>
      {error ? <p className="text-error">{error}</p> : null}
      <label className="field">
        <span className="field-label">Listing</span>
        <select className="input" value={value} onChange={onChange} disabled={loading || saving}>
          <option value="">No link (hide Read More)</option>
          {!loading ? (
            <>
              <optgroup label="Child services">
                {child.map((row) => (
                  <option key={row._id} value={row._id}>
                    {row.title ?? row._id} · /child-services/{row.pathSegment ?? '…'}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Adult services">
                {adult.map((row) => (
                  <option key={row._id} value={row._id}>
                    {row.title ?? row._id} · /adult-services/{row.pathSegment ?? '…'}
                  </option>
                ))}
              </optgroup>
            </>
          ) : null}
        </select>
      </label>
      {saving ? <span className="text-muted">Saving…</span> : null}
    </section>
  )
}
