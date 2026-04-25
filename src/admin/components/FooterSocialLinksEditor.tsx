import { useCallback, useEffect, useState } from 'react'
import {
  FOOTER_SOCIAL_PLATFORMS,
  type FooterSocialPlatform,
} from '../../constants/footerSocialPlatforms'
import { apiPatch } from '../api/client'

export type FooterSocialLinkRow = {
  _key: string
  platform: FooterSocialPlatform | string
  url: string
}

type Props = {
  docId: string
  initialLinks: FooterSocialLinkRow[] | null | undefined
  onSaved: () => void
}

function newKey() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `k_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

function normalizeRows(raw: FooterSocialLinkRow[] | null | undefined): FooterSocialLinkRow[] {
  if (!raw?.length) return []
  return raw.map((row) => ({
    _key: typeof row._key === 'string' && row._key ? row._key : newKey(),
    platform: row.platform ?? 'facebook',
    url: typeof row.url === 'string' ? row.url : '',
  }))
}

function toPayload(rows: FooterSocialLinkRow[]) {
  return rows
    .map((r) => ({
      _key: r._key,
      platform: String(r.platform || 'other').trim() || 'other',
      url: String(r.url || '').trim(),
    }))
    .filter((r) => r.url.length > 0)
}

export default function FooterSocialLinksEditor({ docId, initialLinks, onSaved }: Props) {
  const [rows, setRows] = useState<FooterSocialLinkRow[]>(() => normalizeRows(initialLinks))
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    setRows(normalizeRows(initialLinks))
  }, [docId, initialLinks])

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { _key: newKey(), platform: 'facebook' as FooterSocialPlatform, url: '' },
    ])
  }

  const removeAt = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index))
  }

  const move = (from: number, to: number) => {
    setRows((prev) => {
      if (to < 0 || to >= prev.length) return prev
      const next = [...prev]
      const [item] = next.splice(from, 1)
      next.splice(to, 0, item)
      return next
    })
  }

  const save = useCallback(async () => {
    setStatus('saving')
    setMessage('')
    const payload = toPayload(rows)
    try {
      await apiPatch(`/api/documents/${docId}`, { fields: { socialLinks: payload } })
      setStatus('saved')
      setMessage('Social links saved')
      onSaved()
      setTimeout(() => setStatus('idle'), 2000)
    } catch (e) {
      setStatus('error')
      setMessage(e instanceof Error ? e.message : 'Save failed')
    }
  }, [docId, rows, onSaved])

  return (
    <section className="card" style={{ marginTop: '1rem' }}>
      <h3 className="card-title">Social media links</h3>
      <p className="muted">
        Icon-only links in the public footer. Empty URL rows are omitted when you save.
      </p>
      <div className="field-grid" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {rows.length === 0 ? (
          <p className="muted">No links yet. Add one below.</p>
        ) : (
          rows.map((row, index) => (
            <div
              key={row._key}
              className="row"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                alignItems: 'flex-end',
              }}
            >
              <label className="field" style={{ minWidth: '140px', flex: '0 1 auto' }}>
                <span className="field-label">Platform</span>
                <select
                  className="input select"
                  value={row.platform}
                  onChange={(e) => {
                    const v = e.target.value
                    setRows((prev) =>
                      prev.map((r, i) => (i === index ? { ...r, platform: v } : r)),
                    )
                  }}
                >
                  {FOOTER_SOCIAL_PLATFORMS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field" style={{ flex: '1 1 200px', minWidth: '200px' }}>
                <span className="field-label">URL</span>
                <input
                  type="text"
                  className="input"
                  placeholder="https://…"
                  value={row.url}
                  onChange={(e) => {
                    const v = e.target.value
                    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, url: v } : r)))
                  }}
                />
              </label>
              <div className="row" style={{ display: 'flex', gap: '0.35rem' }}>
                <button
                  type="button"
                  className="btn"
                  disabled={index === 0}
                  onClick={() => move(index, index - 1)}
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="btn"
                  disabled={index === rows.length - 1}
                  onClick={() => move(index, index + 1)}
                  title="Move down"
                >
                  ↓
                </button>
                <button type="button" className="btn" onClick={() => removeAt(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="row" style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
        <button type="button" className="btn" onClick={addRow}>
          Add link
        </button>
        <button type="button" className="btn" onClick={() => void save()} disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : 'Save social links'}
        </button>
        {message ? (
          <span className={status === 'error' ? 'text-error' : 'text-muted'}>{message}</span>
        ) : null}
      </div>
    </section>
  )
}
