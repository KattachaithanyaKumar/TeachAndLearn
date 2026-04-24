import { useCallback, useEffect, useState, type ChangeEvent } from 'react'
import DocumentForm from '../components/DocumentForm'
import FileChooseButton from '../components/FileChooseButton'
import { apiGet, apiPatch, apiUpload } from '../api/client'

type Step = {
  _id: string
  index?: number
  title?: string
  description?: string
  icon?: string
}

type FContact = {
  _id: string
  title?: string
  content?: string
  icon?: string
}

type FranchiseReq = {
  _id: string
  title?: string
  requirements?: string[]
}

type SupportCardImage = {
  _type?: string
  asset?: { _type?: string; _ref?: string }
  assetUrl?: string | null
} | null

type Franchise = {
  _id: string
  title?: string
  description?: string
  supportCardImage?: SupportCardImage
  requirements?: FranchiseReq | null
  steps?: Step[] | null
  contact?: FContact[] | null
}

function FranchiseSupportCardImageEditor({
  franchiseId,
  image,
  onUpdated,
}: {
  franchiseId: string
  image?: SupportCardImage
  onUpdated: () => void
}) {
  const [uploading, setUploading] = useState(false)
  const [clearing, setClearing] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  const assetRef = image?.asset?._ref
  const previewUrl = image?.assetUrl

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setMsg(null)
    try {
      const res = await apiUpload(file)
      await apiPatch(`/api/documents/${franchiseId}`, {
        fields: {
          supportCardImage: {
            _type: 'image',
            asset: res.asset,
          },
        },
      })
      setMsg('Image updated.')
      onUpdated()
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const clearImage = async () => {
    if (!assetRef) return
    setClearing(true)
    setMsg(null)
    try {
      await apiPatch(`/api/documents/${franchiseId}`, { fields: { supportCardImage: null } })
      setMsg('Image removed — public page will use the default photo.')
      onUpdated()
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Clear failed')
    } finally {
      setClearing(false)
    }
  }

  return (
    <section className="card hero-image-card">
      <h3 className="card-title">Franchises page — contact card image</h3>
      <p className="muted small">
        Bottom of the orange card (contact details and requirements) on the public{' '}
        <code>/franchises</code> page.
      </p>
      {previewUrl ? (
        <div className="hero-preview">
          <img src={previewUrl} alt="" className="hero-preview-img" />
        </div>
      ) : (
        <p className="muted">No image in Sanity yet — the site uses the built-in fallback.</p>
      )}
      <div className="field">
        <span className="field-label">Replace image</span>
        <FileChooseButton disabled={uploading || clearing} onChange={onFile}>
          Choose image
        </FileChooseButton>
      </div>
      <div className="row">
        {assetRef ? (
          <button
            type="button"
            className="btn btn-secondary"
            disabled={uploading || clearing}
            onClick={() => void clearImage()}
          >
            {clearing ? 'Removing…' : 'Remove image'}
          </button>
        ) : null}
        {uploading ? <span className="muted">Uploading…</span> : null}
        {msg ? <span className="text-muted">{msg}</span> : null}
      </div>
    </section>
  )
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

      <FranchiseSupportCardImageEditor
        franchiseId={data._id}
        image={data.supportCardImage ?? undefined}
        onUpdated={load}
      />

      <DocumentForm
        docId={data._id}
        title="Franchise — main"
        fields={{
          title: data.title ?? '',
          description: data.description ?? '',
        }}
      />

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

      <h2 className="section-heading">Franchise contact blocks</h2>
      {(data.contact ?? []).map((c) => (
        <DocumentForm
          key={c._id}
          docId={c._id}
          title={`Contact — ${c.title ?? c._id}`}
          fields={{
            title: c.title ?? '',
            content: c.content ?? '',
            icon: c.icon ?? '',
          }}
        />
      ))}
    </div>
  )
}
