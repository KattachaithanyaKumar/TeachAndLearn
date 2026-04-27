import { useCallback, useEffect, useState } from 'react'
import DocumentForm from '../components/DocumentForm'
import FranchisePageBodyEditor from '../components/FranchisePageBodyEditor'
import { apiGet, apiPatch } from '../api/client'

type Step = {
  _id: string
  index?: number
  title?: string
  description?: string
  icon?: string
}

type FranchiseReq = {
  _id: string
  title?: string
  requirements?: string[]
}

type Franchise = {
  _id: string
  title?: string
  description?: string
  pageBodyBlocks?: unknown[] | null
  requirements?: FranchiseReq | null
  steps?: Step[] | null
}

function RequirementsEditor({ doc }: { doc: FranchiseReq }) {
  const [title, setTitle] = useState(doc.title ?? '')
  const [lines, setLines] = useState((doc.requirements ?? []).join('\n'))
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const save = async () => {
    setStatus('saving')
    setMsg('')
    const requirements = lines
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
    try {
      await apiPatch(`/api/documents/${doc._id}`, {
        fields: { title, requirements },
      })
      setStatus('idle')
      setMsg('Saved')
    } catch (e) {
      setStatus('error')
      setMsg(e instanceof Error ? e.message : 'Save failed')
    }
  }

  return (
    <section className="card">
      <h3 className="card-title">Franchise requirements</h3>
      <p className="muted small mb-3">
        Referenced document for franchise requirements. Facility bullets on the public page are edited in{' '}
        <strong>Franchises page body</strong> above; you can keep this document aligned for other uses.
      </p>
      <label className="field">
        <span className="field-label">title</span>
        <textarea className="textarea" rows={1} value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label className="field">
        <span className="field-label">requirements (one per line)</span>
        <textarea className="textarea" rows={8} value={lines} onChange={(e) => setLines(e.target.value)} />
      </label>
      <div className="row">
        <button type="button" className="btn" onClick={save} disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : 'Save'}
        </button>
        {msg ? <span className={status === 'error' ? 'text-error' : 'text-muted'}>{msg}</span> : null}
      </div>
    </section>
  )
}

export default function FranchisePage() {
  const [data, setData] = useState<Franchise | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    setError(null)
    apiGet<Franchise>('/api/franchise')
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  if (error) {
    return (
      <div className="page">
        <h1 className="page-title">Franchise</h1>
        <p className="text-error">{error}</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="page">
        <h1 className="page-title">Franchise</h1>
        <p>Loading…</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="page-title">Franchise</h1>
      <p className="muted">
        Document <code>{data._id}</code>
      </p>
      <p className="muted small mb-6">
        Legacy Sanity fields <code>supportCardImage</code> and <code>contact</code> are no longer shown on the public
        franchises page. They can remain in the dataset or be removed in Sanity Studio when convenient.
      </p>

      <FranchisePageBodyEditor franchiseId={data._id} pageBodyBlocks={data.pageBodyBlocks ?? null} onSaved={load} />

      {data.requirements ? <RequirementsEditor doc={data.requirements} /> : null}

      <h2 className="section-heading">Steps</h2>
      {(data.steps ?? []).map((s) => (
        <DocumentForm
          key={s._id}
          docId={s._id}
          title={`Step ${s.index ?? ''} — ${s.title ?? s._id}`}
          fields={{
            index: typeof s.index === 'number' ? s.index : Number(s.index) || 0,
            title: s.title ?? '',
            description: s.description ?? '',
            icon: s.icon ?? '',
          }}
        />
      ))}
    </div>
  )
}
