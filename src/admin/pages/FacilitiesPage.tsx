import { useEffect, useState } from 'react'
import DocumentForm from '../components/DocumentForm'
import { apiGet } from '../api/client'

type Facility = {
  _id: string
  title?: string
  description?: string
  bg?: string
  image?: unknown
}

export default function FacilitiesPage() {
  const [rows, setRows] = useState<Facility[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiGet<Facility[]>('/api/facilities')
      .then(setRows)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'))
  }, [])

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
        Text fields below; <code>image</code> is still easiest to manage in Sanity Studio until an
        upload control is added here.
      </p>
      {rows.map((f) => (
        <DocumentForm
          key={f._id}
          docId={f._id}
          title={`Facility — ${f.title ?? f._id}`}
          fields={{
            title: f.title ?? '',
            description: String(f.description ?? ''),
            bg: f.bg ?? '',
          }}
        />
      ))}
    </div>
  )
}
