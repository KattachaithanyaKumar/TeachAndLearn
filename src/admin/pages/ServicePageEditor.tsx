import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { adminPath } from '../utils/adminPath'
import QuillHtmlEditor from '../components/QuillHtmlEditor'
import { apiGet, apiPatch } from '../api/client'
import type { ServicePageDoc } from '../types/servicePage'

function highlightsToText(rows: string[] | null | undefined) {
  return (rows ?? []).filter((r) => typeof r === 'string' && r.trim()).join('\n')
}

function textToHighlights(input: string) {
  return input
    .split('\n')
    .map((row) => row.trim())
    .filter(Boolean)
}

export default function ServicePageEditor() {
  const { id } = useParams<{ id: string }>()
  const [doc, setDoc] = useState<ServicePageDoc | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'saving' | 'loading'>('loading')
  const [msg, setMsg] = useState('')
  const [slugEdit, setSlugEdit] = useState('')

  const load = useCallback(() => {
    if (!id) return
    setStatus('loading')
    setError(null)
    apiGet<ServicePageDoc>(`/api/documents/${id}`)
      .then((d) => {
        if (d._type !== 'service_page') {
          setError('Not a service page')
          setDoc(null)
          return
        }
        setDoc(d)
        setSlugEdit(String(d.slug?.current ?? ''))
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Load failed'))
      .finally(() => setStatus('idle'))
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  const save = async () => {
    if (!doc?._id) return
    const slugCurrent = slugEdit.trim()
    if (!slugCurrent) {
      setMsg('Slug is required')
      return
    }
    setStatus('saving')
    setMsg('')
    try {
      await apiPatch(`/api/documents/${doc._id}`, {
        fields: {
          slug: { _type: 'slug', current: slugCurrent },
          sortOrder: doc.sortOrder ?? 0,
          title: doc.title ?? '',
          subtitle: doc.subtitle ?? '',
          contentHtml: doc.contentHtml ?? '',
          cardHighlights: (doc.cardHighlights ?? []).filter((x) => typeof x === 'string' && x.trim()),
          headerColor: doc.headerColor ?? '',
          showCta: doc.showCta !== false,
          isFeaturedInNav: Boolean(doc.isFeaturedInNav),
        },
      })
      setMsg('Saved')
      load()
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setStatus('idle')
    }
  }

  if (status === 'loading' || (!doc && !error)) {
    return (
      <div className="page">
        <p>Loading…</p>
      </div>
    )
  }

  if (error || !doc) {
    return (
      <div className="page">
        <p className="text-error">{error || 'Not found'}</p>
        <Link to={adminPath('service-pages')} className="btn-link">
          Back to service pages
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="row" style={{ marginBottom: '1rem' }}>
        <Link to={adminPath('service-pages')} className="btn btn-secondary">
          ← Service pages
        </Link>
      </div>
      <h1 className="page-title">Edit service page</h1>
      <p className="muted">
        <code>{slugEdit || doc.slug?.current || '…'}</code> · {doc.title}
      </p>

      <section className="card">
        <h2 className="card-title">Basics</h2>
        <div className="field-grid">
          <label className="field">
            <span className="field-label">URL slug</span>
            <input
              className="input"
              value={slugEdit}
              onChange={(e) => setSlugEdit(e.target.value)}
              placeholder="speech-therapy"
            />
          </label>
          <label className="field">
            <span className="field-label">sortOrder</span>
            <input
              type="number"
              className="input"
              value={doc.sortOrder ?? 0}
              onChange={(e) => setDoc({ ...doc, sortOrder: Number(e.target.value) || 0 })}
            />
          </label>
          <label className="field">
            <span className="field-label">Title</span>
            <input
              className="input"
              value={doc.title ?? ''}
              onChange={(e) => setDoc({ ...doc, title: e.target.value })}
            />
          </label>
          <label className="field">
            <span className="field-label">Subtitle</span>
            <input
              className="input"
              value={doc.subtitle ?? ''}
              onChange={(e) => setDoc({ ...doc, subtitle: e.target.value })}
            />
          </label>
          <label className="field">
            <span className="field-label">headerColor</span>
            <input
              className="input"
              value={doc.headerColor ?? ''}
              onChange={(e) => setDoc({ ...doc, headerColor: e.target.value })}
              placeholder="#E0F2FE"
            />
          </label>
          <label className="field row">
            <input
              type="checkbox"
              checked={doc.showCta !== false}
              onChange={(e) => setDoc({ ...doc, showCta: e.target.checked })}
            />
            <span>Show CTA on public page</span>
          </label>
          <label className="field row">
            <input
              type="checkbox"
              checked={Boolean(doc.isFeaturedInNav)}
              onChange={(e) => setDoc({ ...doc, isFeaturedInNav: e.target.checked })}
            />
            <span>Featured in services nav strip</span>
          </label>
          <label className="field" style={{ gridColumn: '1 / -1' }}>
            <span className="field-label">Card bullet points (one per line)</span>
            <textarea
              className="textarea"
              rows={4}
              value={highlightsToText(doc.cardHighlights)}
              onChange={(e) => setDoc({ ...doc, cardHighlights: textToHighlights(e.target.value) })}
              placeholder={'Personalized plan\nExperienced therapists\nParent guidance support'}
            />
          </label>
        </div>
      </section>

      <section className="card" style={{ marginTop: 16 }}>
        <h2 className="card-title">Main content (WYSIWYG)</h2>
        <p className="muted small" style={{ marginBottom: 12 }}>
          Rich content for the public page. Existing legacy content blocks are ignored.
        </p>
        <QuillHtmlEditor
          value={doc.contentHtml ?? ''}
          onChange={(v) => setDoc({ ...doc, contentHtml: v })}
          placeholder="Write service page content..."
        />
      </section>

      <div className="row" style={{ marginTop: 24, gap: 12, alignItems: 'center' }}>
        <button type="button" className="btn btn-primary" disabled={status === 'saving'} onClick={() => void save()}>
          {status === 'saving' ? 'Saving…' : 'Save'}
        </button>
        {msg ? <span className={msg === 'Saved' ? 'text-muted' : 'text-error'}>{msg}</span> : null}
      </div>
    </div>
  )
}
