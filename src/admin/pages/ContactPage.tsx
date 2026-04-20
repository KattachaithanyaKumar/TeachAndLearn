import { useCallback, useEffect, useState } from 'react'
import DocumentForm from '../components/DocumentForm'
import { apiGet } from '../api/client'

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

export default function ContactPage() {
  const [data, setData] = useState<ContactUs | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

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
