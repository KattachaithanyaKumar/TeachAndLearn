import { useCallback, useEffect, useMemo, useState } from 'react'
import DocumentForm from '../components/DocumentForm'
import { apiGet, apiPatch, apiPost } from '../api/client'

type Detail = {
  _id: string
  label?: string
  icon?: string
  value?: string
  isAction?: boolean
  actionType?: string
}

type Address = {
  _id: string
  title?: string
  address?: string
}

type ContactUs = {
  _id: string
  contactDetails?: Detail[] | null
  contactAddress?: Address[] | null
}

type SanityRef = { _type: 'reference'; _ref: string }

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
            <h3 className="card-title">Manage addresses</h3>
            <p className="muted">
              Add, remove, and reorder the addresses shown on the public Contact page. (This does not delete address
              documents.)
            </p>
            <div className="row" style={{ gap: 8 }}>
              <button type="button" className="btn" onClick={addNewAddress} disabled={addrStatus === 'saving'}>
                {addrStatus === 'saving' ? 'Working…' : 'Add address'}
              </button>
              {addrMessage ? (
                <span className={addrStatus === 'error' ? 'text-error' : 'text-muted'}>{addrMessage}</span>
              ) : null}
            </div>
            <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
              {(data.contactAddress ?? []).length === 0 ? (
                <p className="muted">No addresses are attached to this Contact page yet.</p>
              ) : (
                (data.contactAddress ?? []).map((a, idx) => (
                  <div
                    key={a._id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderRadius: 12,
                      padding: 12,
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {a.title || 'Untitled'}{' '}
                        <span className="muted" style={{ fontWeight: 400 }}>
                          ({a._id})
                        </span>
                      </div>
                      {a.address ? <div className="muted">{a.address}</div> : <div className="muted">No address yet</div>}
                    </div>
                    <div className="row" style={{ gap: 8, flexShrink: 0 }}>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => moveAddress(idx, idx - 1)}
                        disabled={addrStatus === 'saving' || idx === 0}
                        aria-label="Move up"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => moveAddress(idx, idx + 1)}
                        disabled={addrStatus === 'saving' || idx === (data.contactAddress ?? []).length - 1}
                        aria-label="Move down"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => removeAddress(a._id)}
                        disabled={addrStatus === 'saving'}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
          {(data.contactAddress ?? []).map((a) => (
            <DocumentForm
              key={a._id}
              docId={a._id}
              title={`Address — ${a.title ?? a._id}`}
              fields={{
                title: a.title ?? '',
                address: a.address ?? '',
              }}
            />
          ))}
        </>
      ) : (
        <p className="muted">Contact page CMS data could not be loaded.</p>
      )}
    </div>
  )
}
