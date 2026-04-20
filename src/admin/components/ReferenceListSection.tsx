import { useCallback, useState, type ReactNode } from 'react'
import { apiPatch, apiPost } from '../api/client'

export function referenceArrayFromIds(ids: string[]): { _type: 'reference'; _ref: string }[] {
  return ids.map((id) => ({ _type: 'reference', _ref: id }))
}

type Props<T extends { _id: string }> = {
  /** Shown as h2 when `nested` is false */
  sectionTitle: string
  /** e.g. `home._id` or a child doc id */
  parentDocumentId: string
  /** Sanity field name on the parent (e.g. `stats`, `items`) */
  field: string
  /** Sanity document _type for `POST /api/documents` */
  itemType: string
  items: T[]
  /** Initial field values for newly created items */
  defaultCreateFields: Record<string, unknown>
  renderItem: (item: T, index: number) => ReactNode
  onChanged: () => void
  /** First entry is what the public site uses for this slot */
  firstEntryNote?: string
  /** Smaller heading when nested under another block */
  nested?: boolean
  /** e.g. "Add stat" — shown on the add button */
  addButtonLabel: string
  /** When false, hide create-document + append (e.g. fixed single about block from Home) */
  allowAdd?: boolean
}

export default function ReferenceListSection<T extends { _id: string }>({
  sectionTitle,
  parentDocumentId,
  field,
  itemType,
  items,
  defaultCreateFields,
  renderItem,
  onChanged,
  firstEntryNote,
  nested = false,
  addButtonLabel,
  allowAdd = true,
}: Props<T>) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const patchRefs = useCallback(
    async (ids: string[]) => {
      await apiPatch(`/api/documents/${parentDocumentId}`, {
        fields: { [field]: referenceArrayFromIds(ids) },
      })
      setError(null)
      onChanged()
    },
    [parentDocumentId, field, onChanged],
  )

  const run = useCallback(async (fn: () => Promise<void>) => {
    setBusy(true)
    setError(null)
    try {
      await fn()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Request failed')
    } finally {
      setBusy(false)
    }
  }, [])

  const ids = items.map((x) => x._id)

  const add = () =>
    run(async () => {
      const created = await apiPost<{ _id: string }>('/api/documents', {
        _type: itemType,
        fields: defaultCreateFields,
      })
      await patchRefs([...ids, created._id])
    })

  const move = (from: number, to: number) =>
    run(async () => {
      if (to < 0 || to >= ids.length) return
      const next = [...ids]
      const [removed] = next.splice(from, 1)
      next.splice(to, 0, removed)
      await patchRefs(next)
    })

  const removeAt = (index: number) =>
    run(async () => {
      const next = ids.filter((_, i) => i !== index)
      await patchRefs(next)
    })

  const HeadingTag = nested ? 'h3' : 'h2'
  const headingClass = nested ? 'section-heading sub' : 'section-heading'

  return (
    <div className="reference-list-section">
      <HeadingTag className={headingClass}>{sectionTitle}</HeadingTag>
      {firstEntryNote ? <p className="muted small">{firstEntryNote}</p> : null}
      {error ? <p className="text-error">{error}</p> : null}

      <div className="reference-list-rows">
        {items.map((item, index) => (
          <div key={item._id} className="reference-list-row">
            <div className="row reference-list-toolbar">
              <button
                type="button"
                className="btn btn-sm"
                disabled={busy || index === 0}
                onClick={() => move(index, index - 1)}
                aria-label="Move up"
              >
                ↑
              </button>
              <button
                type="button"
                className="btn btn-sm"
                disabled={busy || index === items.length - 1}
                onClick={() => move(index, index + 1)}
                aria-label="Move down"
              >
                ↓
              </button>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                disabled={busy}
                onClick={() => removeAt(index)}
              >
                Remove from list
              </button>
            </div>
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {allowAdd ? (
        <div className="row" style={{ marginTop: '0.75rem' }}>
          <button type="button" className="btn" disabled={busy} onClick={add}>
            {addButtonLabel}
          </button>
        </div>
      ) : null}
    </div>
  )
}
