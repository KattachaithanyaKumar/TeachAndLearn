import { useCallback, useEffect, useState, type ChangeEvent } from 'react'
import DocumentForm from '../components/DocumentForm'
import { apiGet, apiPatch, apiUpload } from '../api/client'

type Item = {
  _id: string
  title?: string
  description?: string
}

type AboutHeroImage = {
  asset?: { _ref?: string }
  assetUrl?: string
  alt?: string
} | null

type AboutSection = {
  _id: string
  title?: string
  description?: string
  items?: Item[] | null
  aboutPageHeaderPrefix?: string
  aboutPageHeaderHighlight?: string
  aboutPageEyebrow?: string
  aboutPageHeroImage?: AboutHeroImage
  promiseEyebrow?: string
  promiseHeading?: string
  promiseBody?: string
  visionTitle?: string
  visionBody?: string
  missionTitle?: string
  missionBody?: string
}

function AboutPageHeroImageEditor({
  sectionId,
  image,
  onUpdated,
}: {
  sectionId: string
  image?: AboutHeroImage
  onUpdated: () => void
}) {
  const [alt, setAlt] = useState(image?.alt ?? '')
  const [uploading, setUploading] = useState(false)
  const [imgMsg, setImgMsg] = useState<string | null>(null)

  useEffect(() => {
    setAlt(image?.alt ?? '')
  }, [image?.alt])

  const assetRef = image?.asset?._ref
  const previewUrl = image?.assetUrl

  const saveAlt = async () => {
    if (!assetRef) {
      setImgMsg('Upload an image first.')
      return
    }
    setImgMsg(null)
    try {
      await apiPatch(`/api/documents/${sectionId}`, {
        fields: {
          aboutPageHeroImage: {
            _type: 'image',
            asset: { _type: 'reference', _ref: assetRef },
            alt: alt.trim(),
          },
        },
      })
      setImgMsg('Alt text saved.')
      onUpdated()
    } catch (e) {
      setImgMsg(e instanceof Error ? e.message : 'Save failed')
    }
  }

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setImgMsg(null)
    try {
      const res = await apiUpload(file)
      await apiPatch(`/api/documents/${sectionId}`, {
        fields: {
          aboutPageHeroImage: {
            _type: 'image',
            asset: res.asset,
            alt: alt.trim(),
          },
        },
      })
      setImgMsg('Image updated.')
      onUpdated()
    } catch (err) {
      setImgMsg(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <section className="card hero-image-card">
      <h3 className="card-title">About page — hero image</h3>
      <p className="muted small">
        Shown beside the intro on the public <code>/about-us</code> page. Decorative mask stays in the
        layout.
      </p>
      {previewUrl ? (
        <div className="hero-preview">
          <img src={previewUrl} alt={alt || 'Preview'} className="hero-preview-img" />
        </div>
      ) : (
        <p className="muted">No image in Sanity yet — the site uses the built-in fallback.</p>
      )}
      <label className="field">
        <span className="field-label">Replace image</span>
        <input type="file" accept="image/*" disabled={uploading} onChange={onFile} />
      </label>
      <label className="field">
        <span className="field-label">Alt text</span>
        <input
          className="input"
          type="text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          placeholder="Describe the image for accessibility"
        />
      </label>
      <div className="row">
        <button type="button" className="btn btn-secondary" onClick={saveAlt} disabled={!assetRef}>
          Save alt text
        </button>
        {uploading ? <span className="muted">Uploading…</span> : null}
        {imgMsg ? <span className="text-muted">{imgMsg}</span> : null}
      </div>
    </section>
  )
}

export default function AboutPage() {
  const [section, setSection] = useState<AboutSection | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reloadSection = useCallback(() => {
    apiGet<AboutSection | null>('/api/about-section')
      .then((d) => setSection(d))
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'))
  }, [])

  useEffect(() => {
    let cancelled = false
    apiGet<AboutSection | null>('/api/about-section')
      .then((d) => {
        if (!cancelled) setSection(d)
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load')
      })
      .finally(() => {
        if (!cancelled) setLoaded(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (error) {
    return (
      <div className="page">
        <h1 className="page-title">About</h1>
        <p className="text-error">{error}</p>
      </div>
    )
  }

  if (!loaded) {
    return (
      <div className="page">
        <h1 className="page-title">About</h1>
        <p>Loading…</p>
      </div>
    )
  }

  if (!section) {
    return (
      <div className="page">
        <h1 className="page-title">About</h1>
        <p>No about section is linked on the Home document yet.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="page-title">About (first block from Home)</h1>
      <p className="muted small" style={{ marginBottom: '1rem' }}>
        Copy below applies to the public About page (<code>/about-us</code>), except the checklist
        cards which also appear on the home page when this block is used there.
      </p>
      <DocumentForm
        docId={section._id}
        title="About section — intro (shared with Home when linked)"
        fields={{
          title: section.title ?? '',
          description: section.description ?? '',
        }}
      />

      <DocumentForm
        docId={section._id}
        title="About page — header & first section"
        fields={{
          aboutPageHeaderPrefix: section.aboutPageHeaderPrefix ?? '',
          aboutPageHeaderHighlight: section.aboutPageHeaderHighlight ?? '',
          aboutPageEyebrow: section.aboutPageEyebrow ?? '',
        }}
      />

      <AboutPageHeroImageEditor
        sectionId={section._id}
        image={section.aboutPageHeroImage}
        onUpdated={reloadSection}
      />

      <DocumentForm
        docId={section._id}
        title="About page — Our Promise, Vision & Mission"
        fields={{
          promiseEyebrow: section.promiseEyebrow ?? '',
          promiseHeading: section.promiseHeading ?? '',
          promiseBody: section.promiseBody ?? '',
          visionTitle: section.visionTitle ?? '',
          visionBody: section.visionBody ?? '',
          missionTitle: section.missionTitle ?? '',
          missionBody: section.missionBody ?? '',
        }}
      />

      <h2 className="section-heading">About items</h2>
      {(section.items ?? []).map((it) => (
        <DocumentForm
          key={it._id}
          docId={it._id}
          title={`Item — ${it.title ?? it._id}`}
          fields={{
            title: it.title ?? '',
            description: it.description ?? '',
          }}
        />
      ))}
    </div>
  )
}
