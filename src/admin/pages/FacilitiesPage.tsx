import { useCallback, useEffect, useState, type ChangeEvent } from 'react'
import DocumentForm from '../components/DocumentForm'
import FileChooseButton from '../components/FileChooseButton'
import { apiGet, apiPatch, apiUpload } from '../api/client'

type SanityImage = {
  _type?: string
  asset?: { _type?: string; _ref?: string }
} | null

type Facility = {
  _id: string
  title?: string
  description?: string
  bg?: string
  image?: SanityImage
  imageUrl?: string | null
}

function FacilityImageEditor({
  facilityId,
  title,
  image,
  imageUrl,
  onUpdated,
}: {
  facilityId: string
  title?: string
  image?: SanityImage
  imageUrl?: string | null
  onUpdated: () => void
}) {
  const [uploading, setUploading] = useState(false)
  const [clearing, setClearing] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  const assetRef = image?.asset?._ref
  const previewUrl = imageUrl

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setMsg(null)
    try {
      const res = await apiUpload(file)
      await apiPatch(`/api/documents/${facilityId}`, {
        fields: {
          image: {
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
      await apiPatch(`/api/documents/${facilityId}`, { fields: { image: null } })
      setMsg('Image removed — public page will use its fallback photo.')
      onUpdated()
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Clear failed')
    } finally {
      setClearing(false)
    }
  }

  const label = title?.trim() || facilityId

  return (
    <section className="card hero-image-card">
      <h3 className="card-title">Photo — {label}</h3>
      <p className="muted small">
        Shown on the public <code>/facilities</code> page next to this block. If empty, the site uses
        the default stock image.
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

export default function FacilitiesPage() {
  const [rows, setRows] = useState<Facility[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    setError(null)
    apiGet<Facility[]>('/api/facilities')
      .then(setRows)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  if (error) {
    return (
      <div className="page">
        <h1 className="page-title">Facilities</h1>
        <p className="text-error">{error}</p>
      </div>
    )
  }

  if (!rows) {
    return (
      <div className="page">
        <h1 className="page-title">Facilities</h1>
        <p>Loading…</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="page-title">Facilities</h1>
      <p className="muted">
        Each facility has a photo (below) and text fields. Images appear on the public facilities
        page beside the title and description.
      </p>
      {rows.map((f) => (
        <div key={f._id}>
          <FacilityImageEditor
            facilityId={f._id}
            title={f.title}
            image={f.image ?? undefined}
            imageUrl={f.imageUrl}
            onUpdated={load}
          />
          <DocumentForm
            docId={f._id}
            title={`Facility — ${f.title ?? f._id}`}
            fields={{
              title: f.title ?? '',
              description: String(f.description ?? ''),
              bg: f.bg ?? '',
            }}
          />
        </div>
      ))}
    </div>
  )
}
