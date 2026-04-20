import { useEffect, useState } from 'react'
import DocumentForm from '../components/DocumentForm'
import { apiGet } from '../api/client'

type Item = {
  _id: string
  title?: string
  description?: string
}

type AboutSection = {
  _id: string
  title?: string
  description?: string
  items?: Item[] | null
}

export default function AboutPage() {
  const [section, setSection] = useState<AboutSection | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiGet<AboutSection | null>('/api/about-section')
      .then((d) => {
        setSection(d)
        setLoaded(true)
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'Failed to load')
        setLoaded(true)
      })
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
      <DocumentForm
        docId={section._id}
        title="About section"
        fields={{
          title: section.title ?? '',
          description: section.description ?? '',
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
