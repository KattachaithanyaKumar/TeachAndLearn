import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddServiceListingItemPanel from '../components/AddServiceListingItemPanel'
import DocumentForm from '../components/DocumentForm'
import ServiceListingItemForm, {
  type ServiceListingItemRow,
} from '../components/ServiceListingItemForm'
import { apiGet, apiPost } from '../api/client'
import { adminPath } from '../utils/adminPath'

type Landing = {
  _id: string
  audience?: string
  heroIntro?: string
  sectionTitle?: string
  sectionSubtitle?: string
} | null

type ListingPayload = {
  landing: Landing
  items: ServiceListingItemRow[]
}

type Audience = 'child' | 'adult'

function ServiceListingStack({
  item,
  onSaved,
}: {
  item: ServiceListingItemRow
  onSaved: () => void
}) {
  const labelTitle = item.title?.trim() || item._id
  return (
    <div className="service-listing-stack">
      <header className="service-listing-toolbar">
        <div className="service-listing-toolbar-text">
          <span className="service-listing-toolbar-kicker">Full-page content</span>
          <p className="service-listing-toolbar-desc">
            Sections, blocks, and media are edited in the full page; the card below is for listing
            summaries only.
          </p>
        </div>
        <Link
          to={adminPath(`service-listings/${item._id}/edit`)}
          className="btn btn-secondary btn-sm service-listing-toolbar-action"
          aria-label={`Open full-page editor for ${labelTitle}`}
        >
          Open full editor
        </Link>
      </header>
      <ServiceListingItemForm item={item} onSaved={onSaved} onDeleted={onSaved} />
    </div>
  )
}

function CreateLandingBlock({
  audience,
  onCreated,
}: {
  audience: Audience
  onCreated: () => void
}) {
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  const create = async () => {
    setBusy(true)
    setMsg(null)
    try {
      await apiPost('/api/documents', {
        _type: 'service_listing_landing',
        fields: { audience },
      })
      onCreated()
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Create failed')
    } finally {
      setBusy(false)
    }
  }

  const label = audience === 'child' ? 'Child' : 'Adult'

  return (
    <div className="card">
      <p className="muted">
        No <code>service_listing_landing</code> for audience <code>{audience}</code> yet. Create one
        here (or in Sanity Studio).
      </p>
      <div className="row">
        <button type="button" className="btn" onClick={create} disabled={busy}>
          {busy ? 'Creating…' : `Create ${label} landing`}
        </button>
        {msg ? <span className="text-error">{msg}</span> : null}
      </div>
    </div>
  )
}

type Props = {
  audience: Audience
}

const pageHeading: Record<Audience, string> = {
  child: 'Child service listings',
  adult: 'Adult service listings',
}

const landingFormTitle: Record<Audience, string> = {
  child: 'Child — landing copy',
  adult: 'Adult — landing copy',
}

const emptyItemsMessage: Record<Audience, string> = {
  child: 'No child service listing items in Sanity yet.',
  adult: 'No adult service listing items in Sanity yet.',
}

export default function ServiceListingsPage({ audience }: Props) {
  const [data, setData] = useState<ListingPayload | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    setError(null)
    apiGet<ListingPayload>(`/api/service-listing/${audience}`)
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'))
  }, [audience])

  useEffect(() => {
    load()
  }, [load])

  const title = pageHeading[audience]

  if (error) {
    return (
      <div className="page">
        <h1 className="page-title">{title}</h1>
        <p className="text-error">{error}</p>
        <button type="button" className="btn" onClick={load}>
          Retry
        </button>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="page">
        <h1 className="page-title">{title}</h1>
        <p>Loading…</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="page-title">{title}</h1>
      <p className="muted">
        Landing copy and cards come from Sanity types <code>service_listing_landing</code> and{' '}
        <code>service_listing_item</code>. If no documents exist, the public site uses built-in
        fallbacks. You can create the landing document and service cards below without opening
        Studio.
      </p>

      <h2 className="section-heading">Landing &amp; cards</h2>
      {data.landing?._id ? (
        <DocumentForm
          docId={data.landing._id}
          title={landingFormTitle[audience]}
          fields={{
            heroIntro: data.landing.heroIntro ?? '',
            sectionTitle: data.landing.sectionTitle ?? '',
            sectionSubtitle: data.landing.sectionSubtitle ?? '',
          }}
        />
      ) : (
        <CreateLandingBlock audience={audience} onCreated={load} />
      )}
      <h3 className="section-heading sub">Service cards</h3>
      <AddServiceListingItemPanel audience={audience} onCreated={load} />
      {data.items.length === 0 ? (
        <p className="muted">{emptyItemsMessage[audience]}</p>
      ) : (
        data.items.map((item) => (
          <ServiceListingStack key={item._id} item={item} onSaved={load} />
        ))
      )}
    </div>
  )
}
