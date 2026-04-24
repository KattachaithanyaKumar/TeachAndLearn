import { useCallback, useEffect, useState } from 'react'
import DocumentForm from '../components/DocumentForm'
import { apiGet, apiPost } from '../api/client'

type FooterSettings = {
  _id: string
  brandTitle?: string
  brandSubtitle?: string
  brandDescription?: string
  phone?: string
  email?: string
  locationLabel?: string
  locationLink?: string
  hoursText?: string
}

const DEFAULT_CREATE_FIELDS = {
  brandTitle: 'Teach & Learn',
  brandSubtitle: 'Therapy Center',
  brandDescription:
    'Empowering children and adults to reach their full potential through comprehensive therapy services.',
  phone: '+91 9876543210',
  email: 'info@teachandlearn.com',
  locationLabel: 'Hyderabad, India',
  locationLink: '/contact-us',
  hoursText: `Mon - Fri: 9:00 AM - 6:00 PM
Sat: 9:00 AM - 2:00 PM
Sun: Closed`,
}

export default function FooterSettingsPage() {
  const [data, setData] = useState<FooterSettings | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [creating, setCreating] = useState(false)

  const load = useCallback(() => {
    setError(null)
    setReady(false)
    apiGet<FooterSettings | null>('/api/footer-settings')
      .then((d) => {
        setData(d && d._id ? d : null)
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

  const createDocument = async () => {
    setCreating(true)
    setError(null)
    try {
      const created = await apiPost<FooterSettings>('/api/documents', {
        _type: 'footer_settings',
        fields: DEFAULT_CREATE_FIELDS,
      })
      setData(created)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Create failed')
    } finally {
      setCreating(false)
    }
  }

  if (!ready) {
    return (
      <div className="page">
        <h1 className="page-title">Footer config</h1>
        <p>Loading…</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="page-title">Footer config</h1>
      <p className="muted">
        Single Sanity document (<code>footer_settings</code>) used for the public site footer: brand
        column, contact line, and hours.
      </p>
      {error ? <p className="text-error">{error}</p> : null}
      {!data ? (
        <section className="card">
          <h3 className="card-title">No footer settings yet</h3>
          <p className="muted">
            Create the document once with defaults matching the previous static footer. You can edit
            every field afterward.
          </p>
          <button type="button" className="btn" disabled={creating} onClick={() => void createDocument()}>
            {creating ? 'Creating…' : 'Create footer settings'}
          </button>
        </section>
      ) : (
        <>
          <p className="muted">
            Document <code>{data._id}</code> — <code>footer_settings</code>
          </p>
          <DocumentForm
            docId={data._id}
            title="Footer settings"
            fields={{
              brandTitle: data.brandTitle ?? '',
              brandSubtitle: data.brandSubtitle ?? '',
              brandDescription: data.brandDescription ?? '',
              phone: data.phone ?? '',
              email: data.email ?? '',
              locationLabel: data.locationLabel ?? '',
              locationLink: data.locationLink ?? '',
              hoursText: data.hoursText ?? '',
            }}
          />
        </>
      )}
    </div>
  )
}
