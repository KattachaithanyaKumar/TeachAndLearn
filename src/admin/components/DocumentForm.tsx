import { useState } from 'react'
import { apiPatch } from '../api/client'

type Props = {
  docId: string
  title: string
  /** Editable fields only (no _id / _type) */
  fields: Record<string, unknown>
}

export default function DocumentForm({ docId, title, fields: initial }: Props) {
  const [values, setValues] = useState<Record<string, unknown>>(() => ({ ...initial }))
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const setField = (key: string, v: unknown) => {
    setValues((prev) => ({ ...prev, [key]: v }))
  }

  const save = async () => {
    setStatus('saving')
    setMessage('')
    const payload: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(values)) {
      if (v === undefined) continue
      payload[k] = v
    }
    try {
      await apiPatch(`/api/documents/${docId}`, { fields: payload })
      setStatus('saved')
      setMessage('Saved')
      setTimeout(() => setStatus('idle'), 2000)
    } catch (e) {
      setStatus('error')
      setMessage(e instanceof Error ? e.message : 'Save failed')
    }
  }

  return (
    <section className="card">
      <h3 className="card-title">{title}</h3>
      <div className="field-grid">
        {Object.entries(values).map(([key, val]) => (
          <label key={key} className="field">
            <span className="field-label">{key}</span>
            {typeof val === 'boolean' ? (
              <input
                type="checkbox"
                checked={val}
                onChange={(e) => setField(key, e.target.checked)}
              />
            ) : typeof val === 'number' ? (
              <input
                type="number"
                className="input"
                value={Number.isFinite(val) ? val : 0}
                onChange={(e) => setField(key, e.target.value === '' ? 0 : Number(e.target.value))}
              />
            ) : (
              <textarea
                className="textarea"
                rows={typeof val === 'string' && val.length > 100 ? 4 : 2}
                value={val == null ? '' : String(val)}
                onChange={(e) => setField(key, e.target.value)}
              />
            )}
          </label>
        ))}
      </div>
      <div className="row">
        <button type="button" className="btn" onClick={save} disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : 'Save'}
        </button>
        {message ? (
          <span className={status === 'error' ? 'text-error' : 'text-muted'}>{message}</span>
        ) : null}
      </div>
    </section>
  )
}
