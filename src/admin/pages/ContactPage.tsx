import { useCallback, useEffect, useMemo, useState, type ChangeEvent } from 'react'
import DocumentForm from '../components/DocumentForm'
import FileChooseButton from '../components/FileChooseButton'
import { apiGet, apiPatch, apiPost, apiUpload } from '../api/client'

type Detail = {
  _id: string
  label?: string
  icon?: string
  value?: string
  isAction?: boolean
  actionType?: string
}

type SanityImage = {
  _type?: string
  asset?: { _type?: string; _ref?: string }
} | null

type Address = {
  _id: string
  title?: string
  address?: string
  latitude?: number | null
  longitude?: number | null
  mapScreenshot?: SanityImage
  mapScreenshotUrl?: string | null
}

type ContactUs = {
  _id: string
  contactDetails?: Detail[] | null
  contactAddress?: Address[] | null
}

type SanityRef = { _type: 'reference'; _ref: string }

type AddressCardProps = {
  address: Address
  idx: number
  total: number
  busy: boolean
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
  onSaved: () => void
}

function coordFieldToString(v: number | null | undefined) {
  if (v == null || !Number.isFinite(v)) return ''
  return String(v)
}

function parseCoordInput(raw: string): number | null {
  const t = raw.trim()
  if (!t) return null
  const n = Number(t)
  return Number.isFinite(n) ? n : null
}

function AddressMapScreenshotEditor({
  addressId,
  mapScreenshot,
  mapScreenshotUrl,
  busy,
  onUpdated,
}: {
  addressId: string
  mapScreenshot?: SanityImage
  mapScreenshotUrl?: string | null
  busy: boolean
  onUpdated: () => void
}) {
  const assetRef = mapScreenshot?.asset?._ref
  const [uploading, setUploading] = useState(false)
  const [clearing, setClearing] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setMsg(null)
    try {
      const res = await apiUpload(file)
      await apiPatch(`/api/documents/${addressId}`, {
        fields: {
          mapScreenshot: {
            _type: 'image',
            asset: res.asset,
          },
        },
      })
      setMsg('Map image updated.')
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
      await apiPatch(`/api/documents/${addressId}`, { fields: { mapScreenshot: null } })
      setMsg('Map image removed.')
      onUpdated()
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Clear failed')
    } finally {
      setClearing(false)
    }
  }

  return (
    <div className="field" style={{ marginTop: 16 }}>
      <span className="field-label">Map screenshot (public Contact page)</span>
      <p className="muted small" style={{ marginBottom: 8 }}>
        Optional image shown above “Directions” on the marketing site (e.g. a map capture).
      </p>
      {mapScreenshotUrl ? (
        <div className="hero-preview" style={{ marginBottom: 8 }}>
          <img src={mapScreenshotUrl} alt="" className="hero-preview-img" />
        </div>
      ) : (
        <p className="muted small" style={{ marginBottom: 8 }}>
          No map image yet.
        </p>
      )}
      <FileChooseButton disabled={busy || uploading || clearing} onChange={(e) => void onFile(e)}>
        Choose map image
      </FileChooseButton>
      <div className="row" style={{ gap: 8, marginTop: 8 }}>
        {assetRef ? (
          <button
            type="button"
            className="btn btn-secondary"
            disabled={busy || uploading || clearing}
            onClick={() => void clearImage()}
          >
            {clearing ? 'Removing…' : 'Remove map image'}
          </button>
        ) : null}
        {uploading ? <span className="muted">Uploading…</span> : null}
        {msg ? <span className="text-muted">{msg}</span> : null}
      </div>
    </div>
  )
}

function AddressCard({ address, idx, total, busy, onMoveUp, onMoveDown, onRemove, onSaved }: AddressCardProps) {
  const [title, setTitle] = useState(address.title ?? '')
  const [addr, setAddr] = useState(address.address ?? '')
  const [latStr, setLatStr] = useState(() => coordFieldToString(address.latitude))
  const [lngStr, setLngStr] = useState(() => coordFieldToString(address.longitude))
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    setTitle(address.title ?? '')
    setAddr(address.address ?? '')
    setLatStr(coordFieldToString(address.latitude))
    setLngStr(coordFieldToString(address.longitude))
  }, [address._id, address.title, address.address, address.latitude, address.longitude])

  const save = async () => {
    setStatus('saving')
    setMessage('')
    try {
      await apiPatch(`/api/documents/${address._id}`, {
        fields: {
          title,
          address: addr,
          latitude: parseCoordInput(latStr),
          longitude: parseCoordInput(lngStr),
        },
      })
      setStatus('saved')
      setMessage('Saved')
      onSaved()
      setTimeout(() => setStatus('idle'), 2000)
    } catch (e) {
      setStatus('error')
      setMessage(e instanceof Error ? e.message : 'Save failed')
    }
  }

  const disableSave = busy || status === 'saving'
  const disableMoveUp = busy || idx === 0
  const disableMoveDown = busy || idx === total - 1
  const disableRemove = busy

  return (
    <section className="card">
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <h3 className="card-title" style={{ margin: 0 }}>
            Address
          </h3>
          <div className="muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {address._id}
          </div>
        </div>
        <div className="row" style={{ gap: 8, flexShrink: 0 }}>
          <button type="button" className="btn" onClick={onMoveUp} disabled={disableMoveUp} aria-label="Move up">
            ↑
          </button>
          <button type="button" className="btn" onClick={onMoveDown} disabled={disableMoveDown} aria-label="Move down">
            ↓
          </button>
          <button type="button" className="btn" onClick={onRemove} disabled={disableRemove}>
            Remove
          </button>
        </div>
      </div>

      <div className="field-grid">
        <label className="field">
          <span className="field-label">title</span>
          <textarea className="textarea" rows={2} value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label className="field">
          <span className="field-label">address</span>
          <textarea className="textarea" rows={4} value={addr} onChange={(e) => setAddr(e.target.value)} />
        </label>
        <label className="field">
          <span className="field-label">latitude (WGS84, optional)</span>
          <input
            className="input"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="e.g. 17.4862224"
            value={latStr}
            onChange={(e) => setLatStr(e.target.value)}
          />
        </label>
        <label className="field">
          <span className="field-label">longitude (WGS84, optional)</span>
          <input
            className="input"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="e.g. 78.357255"
            value={lngStr}
            onChange={(e) => setLngStr(e.target.value)}
          />
        </label>
      </div>

      <AddressMapScreenshotEditor
        addressId={address._id}
        mapScreenshot={address.mapScreenshot ?? null}
        mapScreenshotUrl={address.mapScreenshotUrl ?? null}
        busy={busy}
        onUpdated={onSaved}
      />

      <div className="row" style={{ gap: 8 }}>
        <button type="button" className="btn" onClick={save} disabled={disableSave}>
          {status === 'saving' ? 'Saving…' : 'Save'}
        </button>
        {message ? <span className={status === 'error' ? 'text-error' : 'text-muted'}>{message}</span> : null}
      </div>
    </section>
  )
}

export default function ContactPage() {
  const [data, setData] = useState<ContactUs | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [addrStatus, setAddrStatus] = useState<'idle' | 'saving' | 'error'>('idle')
  const [addrMessage, setAddrMessage] = useState<string | null>(null)

  const load = useCallback(() => {
    setError(null)
    setReady(false)
    apiGet<ContactUs>('/api/contact')
      .then((d) => {
        setData(d)
        setError(null)
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'Failed to load')
        setData(null)
      })
      .finally(() => setReady(true))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const addressIds = useMemo(() => {
    return (data?.contactAddress ?? []).map((a) => a._id).filter(Boolean)
  }, [data])

  const patchContactAddressRefs = useCallback(
    async (nextIds: string[]) => {
      if (!data?._id) return
      setAddrStatus('saving')
      setAddrMessage(null)
      const refs: SanityRef[] = nextIds.map((id) => ({ _type: 'reference', _ref: id }))
      try {
        await apiPatch(`/api/documents/${data._id}`, { fields: { contactAddress: refs } })
        setAddrStatus('idle')
        setAddrMessage('Addresses updated')
        load()
      } catch (e) {
        setAddrStatus('error')
        setAddrMessage(e instanceof Error ? e.message : 'Failed to update addresses')
      }
    },
    [data?._id, load],
  )

  const addNewAddress = useCallback(async () => {
    if (!data?._id) return
    setAddrStatus('saving')
    setAddrMessage(null)
    try {
      const created = await apiPost<{ _id: string }>(`/api/documents`, {
        _type: 'contact_address',
        fields: { title: 'New branch', address: '' },
      })
      const next = [...addressIds, created._id]
      await patchContactAddressRefs(next)
    } catch (e) {
      setAddrStatus('error')
      setAddrMessage(e instanceof Error ? e.message : 'Failed to add address')
    }
  }, [addressIds, data?._id, patchContactAddressRefs])

  const removeAddress = useCallback(
    async (id: string) => {
      const next = addressIds.filter((x) => x !== id)
      await patchContactAddressRefs(next)
    },
    [addressIds, patchContactAddressRefs],
  )

  const moveAddress = useCallback(
    async (from: number, to: number) => {
      const next = [...addressIds]
      const [item] = next.splice(from, 1)
      next.splice(to, 0, item)
      await patchContactAddressRefs(next)
    },
    [addressIds, patchContactAddressRefs],
  )

  if (!ready) {
    return (
      <div className="page">
        <h1 className="page-title">Contact</h1>
        <p>Loading…</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="page-title">Contact page content</h1>
      <p className="muted">
        Edit the <code>contact_us</code> document and related details. Visitor form entries are on
        the <strong>Submissions</strong> page.
      </p>
      {error ? (
        <p className="text-error">{error}</p>
      ) : data ? (
        <>
          <p className="muted">
            Document <code>{data._id}</code> — <code>contact_us</code>
          </p>

          <h2 className="section-heading">Contact details</h2>
          {(data.contactDetails ?? []).map((d) => (
            <DocumentForm
              key={d._id}
              docId={d._id}
              title={`Contact detail — ${d.label ?? d._id}`}
              fields={{
                label: d.label ?? '',
                icon: d.icon ?? '',
                value: d.value ?? '',
                isAction: Boolean(d.isAction),
                actionType: d.actionType ?? '',
              }}
            />
          ))}

          <h2 className="section-heading">Addresses</h2>
          <section className="card">
            <p className="muted">
              Add, remove, and reorder the addresses shown on the public Contact page. (This does not delete address
              documents.) Upload a <strong>map screenshot</strong> per branch for the public page; optional latitude and
              longitude refine Google Maps directions.
            </p>
            <div className="row" style={{ gap: 8 }}>
              <button type="button" className="btn" onClick={addNewAddress} disabled={addrStatus === 'saving'}>
                {addrStatus === 'saving' ? 'Working…' : 'Add address'}
              </button>
              {addrMessage ? (
                <span className={addrStatus === 'error' ? 'text-error' : 'text-muted'}>{addrMessage}</span>
              ) : null}
            </div>
          </section>

          <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
            {(data.contactAddress ?? []).length === 0 ? (
              <p className="muted">No addresses are attached to this Contact page yet.</p>
            ) : (
              (data.contactAddress ?? []).map((a, idx) => (
                <AddressCard
                  key={a._id}
                  address={a}
                  idx={idx}
                  total={(data.contactAddress ?? []).length}
                  busy={addrStatus === 'saving'}
                  onMoveUp={() => moveAddress(idx, idx - 1)}
                  onMoveDown={() => moveAddress(idx, idx + 1)}
                  onRemove={() => removeAddress(a._id)}
                  onSaved={load}
                />
              ))
            )}
          </div>
        </>
      ) : (
        <p className="muted">Contact page CMS data could not be loaded.</p>
      )}
    </div>
  )
}
