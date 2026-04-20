import { useState } from 'react'
import { apiUpload } from '../api/client'
import type { SanityImage } from '../types/servicePageBlocks'

type Props = {
  label?: string
  value: SanityImage | undefined
  onChange: (next: SanityImage | null) => void
}

export default function ImageUploadField({ label = 'Image', value, onChange }: Props) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const onPick = async (files: FileList | null) => {
    const file = files?.[0]
    if (!file) return
    setBusy(true)
    setErr(null)
    try {
      const r = await apiUpload(file)
      onChange({
        _type: 'image',
        asset: { _type: 'reference', _ref: r.asset._ref },
      })
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="field">
      {label ? <span className="field-label">{label}</span> : null}
      <input
        type="file"
        accept="image/*"
        className="input"
        disabled={busy}
        onChange={(e) => onPick(e.target.files)}
      />
      {value?.asset?._ref ? (
        <p className="muted small">
          Asset: <code>{value.asset._ref}</code>
        </p>
      ) : (
        <p className="muted small">No image</p>
      )}
      {value?.asset?._ref ? (
        <button type="button" className="btn btn-sm" onClick={() => onChange(null)}>
          Clear image
        </button>
      ) : null}
      {err ? <span className="text-error">{err}</span> : null}
    </div>
  )
}
