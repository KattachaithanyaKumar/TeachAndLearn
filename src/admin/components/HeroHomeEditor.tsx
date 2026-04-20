import { useEffect, useState } from 'react'
import DocumentForm from './DocumentForm'
import { apiPatch, apiUpload } from '../api/client'

export type HeroFields = {
  heroEyebrow?: string
  heroTitleLine1?: string
  heroTitleHighlight?: string
  heroDescription?: string
  heroPrimaryCtaLabel?: string
  heroSecondaryCtaLabel?: string
  heroImage?: {
    asset?: { _ref?: string }
    assetUrl?: string
    alt?: string
  } | null
}

type Props = {
  homeId: string
  hero: HeroFields
  onUpdated: () => void
}

export default function HeroHomeEditor({ homeId, hero, onUpdated }: Props) {
  const [alt, setAlt] = useState(hero.heroImage?.alt ?? '')
  const [uploading, setUploading] = useState(false)
  const [imgMsg, setImgMsg] = useState<string | null>(null)

  useEffect(() => {
    setAlt(hero.heroImage?.alt ?? '')
  }, [hero.heroImage?.alt])

  const assetRef = hero.heroImage?.asset?._ref

  const saveAlt = async () => {
    if (!assetRef) {
      setImgMsg('Upload an image first.')
      return
    }
    setImgMsg(null)
    try {
      await apiPatch(`/api/documents/${homeId}`, {
        fields: {
          heroImage: {
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

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setImgMsg(null)
    try {
      const res = await apiUpload(file)
      await apiPatch(`/api/documents/${homeId}`, {
        fields: {
          heroImage: {
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

  const previewUrl = hero.heroImage?.assetUrl

  return (
    <div className="hero-editor">
      <DocumentForm
        docId={homeId}
        title="Hero — copy"
        fields={{
          heroEyebrow: hero.heroEyebrow ?? '',
          heroTitleLine1: hero.heroTitleLine1 ?? '',
          heroTitleHighlight: hero.heroTitleHighlight ?? '',
          heroDescription: hero.heroDescription ?? '',
          heroPrimaryCtaLabel: hero.heroPrimaryCtaLabel ?? '',
          heroSecondaryCtaLabel: hero.heroSecondaryCtaLabel ?? '',
        }}
      />

      <section className="card hero-image-card">
        <h3 className="card-title">Hero — main image</h3>
        <p className="muted small">
          Replaces the default stock image on the public home page. Decorative shapes stay in the
          layout.
        </p>
        {previewUrl ? (
          <div className="hero-preview">
            <img src={previewUrl} alt={alt || 'Hero preview'} className="hero-preview-img" />
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
    </div>
  )
}
