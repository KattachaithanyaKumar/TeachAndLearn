import { useState } from 'react'
import { apiDelete, apiPatch } from '../api/client'

export type ServiceListingItemRow = {
  _id: string
  audience?: string
  sortOrder?: number
  title?: string
  pathSegment?: string
  description?: string
  items?: string[] | null
  iconKey?: string
}

type Props = {
  item: ServiceListingItemRow
  onSaved: () => void
  onDeleted?: () => void
}

export default function ServiceListingItemForm({ item, onSaved, onDeleted }: Props) {
  const [title, setTitle] = useState(item.title ?? '')
  const [pathSegment, setPathSegment] = useState(item.pathSegment ?? '')
  const [description, setDescription] = useState(item.description ?? '')
  const [sortOrder, setSortOrder] = useState(
    typeof item.sortOrder === 'number' ? item.sortOrder : 0,
  )
  const [iconKey, setIconKey] = useState(item.iconKey ?? '')
  const [itemsText, setItemsText] = useState((item.items ?? []).join('\n'))
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle')
  const [deleting, setDeleting] = useState(false)
  const [msg, setMsg] = useState('')

  const save = async () => {
    setStatus('saving')
    setMsg('')
    try {
      const fields: Record<string, unknown> = {
        title: title.trim(),
        pathSegment: pathSegment.trim(),
        description: description.trim(),
        sortOrder: Number(sortOrder) || 0,
        items: itemsText
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean),
      }
      if (isAdult) {
        fields.iconKey = iconKey.trim() || undefined
      }
      await apiPatch(`/api/documents/${item._id}`, { fields })
      setStatus('idle')
      setMsg('Saved')
      onSaved()
    } catch (e) {
      setStatus('error')
      setMsg(e instanceof Error ? e.message : 'Save failed')
    }
  }

  const isAdult = item.audience === 'adult'

  const remove = async () => {
    if (!onDeleted) return
    const label = title.trim() || item.pathSegment?.trim() || item._id
    if (
      !window.confirm(
        `Delete service listing “${label}”? This removes the card and its full page from Sanity and cannot be undone.`,
      )
    ) {
      return
    }
    setDeleting(true)
    setMsg('')
    try {
      await apiDelete<{ ok?: boolean }>(`/api/documents/${item._id}`)
      onDeleted()
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <section className="card">
      <h3 className="card-title">{title || item._id}</h3>
      <p className="muted small">
        Path: <code>/{pathSegment || '…'}</code>
      </p>
      <div className="field-grid">
        <label className="field">
          <span className="field-label">title</span>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="field">
          <span className="field-label">pathSegment</span>
          <input
            className="input"
            value={pathSegment}
            onChange={(e) => setPathSegment(e.target.value)}
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
        <label className="field">
          <span className="field-label">description</span>
          <textarea
            className="textarea"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="field">
          <span className="field-label">Bullet points (one per line)</span>
          <textarea
            className="textarea"
            rows={8}
            value={itemsText}
            onChange={(e) => setItemsText(e.target.value)}
          />
        </label>
      </div>
      <div className="row" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
        <button type="button" className="btn" onClick={save} disabled={status === 'saving' || deleting}>
          {status === 'saving' ? 'Saving…' : 'Save'}
        </button>
        {onDeleted ? (
          <button
            type="button"
            className="btn btn-secondary"
            style={{ color: 'var(--danger)' }}
            onClick={remove}
            disabled={deleting || status === 'saving'}
          >
            {deleting ? 'Deleting…' : 'Delete listing'}
          </button>
        ) : null}
        {msg ? <span className={status === 'error' ? 'text-error' : 'text-muted'}>{msg}</span> : null}
      </div>
    </section>
  )
}
