import { useCallback, useEffect, useState } from 'react'
import DocumentForm from '../components/DocumentForm'
import HeroHomeEditor from '../components/HeroHomeEditor'
import ReferenceListSection from '../components/ReferenceListSection'
import ServicePagePicker from '../components/ServicePagePicker'
import { apiGet } from '../api/client'

type RefDoc = { _id: string; [k: string]: unknown }

type AboutItem = { _id: string; title?: string; description?: string }

type AboutBlock = {
  _id: string
  title?: string
  description?: string
  items?: AboutItem[] | null
}

type ApproachItem = { _id: string; label?: string; icon?: string }

type WhyUsBlock = {
  _id: string
  heading?: string
  description?: string
  approaches?: ApproachItem[] | null
}

type Home = {
  _id: string
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
  aboutUs?: AboutBlock[] | null
  stats?: RefDoc[] | null
  service?: RefDoc[] | null
  whyUs?: WhyUsBlock[] | null
  ourPhilosophy?: RefDoc[] | null
  testimonials?: RefDoc[] | null
}

export default function HomePage() {
  const [home, setHome] = useState<Home | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    setError(null)
    apiGet<Home>('/api/home')
      .then(setHome)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  if (error) {
    return (
      <div className="page">
        <h1 className="page-title">Home</h1>
        <p className="text-error">{error}</p>
      </div>
    )
  }

  if (!home) {
    return (
      <div className="page">
        <h1 className="page-title">Home</h1>
        <p>Loading…</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="page-title">Home page content</h1>
      <p className="muted">
        Document <code>{home._id}</code> — ordering below is stored on the Home document and linked
        documents in Sanity.
      </p>

      <h2 className="section-heading">Hero</h2>
      <HeroHomeEditor homeId={home._id} hero={home} onUpdated={load} />

      <ReferenceListSection
        sectionTitle="About us (linked from Home)"
        parentDocumentId={home._id}
        field="aboutUs"
        itemType="about_us"
        items={home.aboutUs ?? []}
        defaultCreateFields={{ title: '', description: '' }}
        onChanged={load}
        allowAdd={false}
        addButtonLabel=""
        firstEntryNote="The first block in this list is what the public About section shows."
        renderItem={(block) => (
          <>
            <DocumentForm
              docId={block._id}
              title={`About block — ${block.title ?? block._id}`}
              fields={{
                title: block.title ?? '',
                description: block.description ?? '',
              }}
            />
            <ReferenceListSection
              nested
              sectionTitle="Items in this block"
              parentDocumentId={block._id}
              field="items"
              itemType="about_us_items"
              items={block.items ?? []}
              defaultCreateFields={{ title: '', description: '' }}
              onChanged={load}
              addButtonLabel="Add about item"
              renderItem={(it) => (
                <DocumentForm
                  docId={it._id}
                  title={`About item — ${it.title ?? it._id}`}
                  fields={{
                    title: it.title ?? '',
                    description: it.description ?? '',
                  }}
                />
              )}
            />
          </>
        )}
      />

      <ReferenceListSection
        sectionTitle="Stats"
        parentDocumentId={home._id}
        field="stats"
        itemType="stats"
        items={home.stats ?? []}
        defaultCreateFields={{
          label: '',
          number: '',
          icon: '',
          bgColor: '',
          iconColor: '',
        }}
        onChanged={load}
        addButtonLabel="Add stat"
        firstEntryNote="Order matches the stat cards on the public home page."
        renderItem={(s) => (
          <DocumentForm
            docId={s._id}
            title={`Stat — ${String(s.label ?? s._id)}`}
            fields={{
              label: String(s.label ?? ''),
              number: String(s.number ?? ''),
              icon: String(s.icon ?? ''),
              bgColor: String(s.bgColor ?? ''),
              iconColor: String(s.iconColor ?? ''),
            }}
          />
        )}
      />

      <ReferenceListSection
        sectionTitle="Services"
        parentDocumentId={home._id}
        field="service"
        itemType="service"
        items={home.service ?? []}
        defaultCreateFields={{
          name: '',
          description: '',
          icon: '',
        }}
        onChanged={load}
        addButtonLabel="Add service"
        firstEntryNote="Order matches the service cards on the public home page. Use “Link to full service page” below to pick a service page for “Read More” (/service/…); leave unlinked to hide Read More."
        renderItem={(s) => {
          const linked = s.linkedServicePage as
            | { _id: string; title?: string; slug?: string | null }
            | undefined
          return (
            <>
              <DocumentForm
                docId={s._id}
                title={`Service — ${String(s.name ?? s._id)}`}
                fields={{
                  name: String(s.name ?? ''),
                  description: String(s.description ?? ''),
                  icon: String(s.icon ?? ''),
                }}
              />
              <ServicePagePicker serviceDocId={s._id} linked={linked} onUpdated={load} />
            </>
          )
        }}
      />

      <ReferenceListSection
        sectionTitle="Why us"
        parentDocumentId={home._id}
        field="whyUs"
        itemType="whyUs"
        items={home.whyUs ?? []}
        defaultCreateFields={{ heading: '', description: '' }}
        onChanged={load}
        addButtonLabel="Add Why us block"
        firstEntryNote="The first block is what the public Why Choose Us section uses for text and approaches."
        renderItem={(w) => (
          <>
            <DocumentForm
              docId={w._id}
              title={`Why us — ${String(w.heading ?? w._id)}`}
              fields={{
                heading: String(w.heading ?? ''),
                description: String(w.description ?? ''),
              }}
            />
            <ReferenceListSection
              nested
              sectionTitle="Approaches"
              parentDocumentId={w._id}
              field="approaches"
              itemType="approach"
              items={w.approaches ?? []}
              defaultCreateFields={{ label: '', icon: '' }}
              onChanged={load}
              addButtonLabel="Add approach"
              firstEntryNote="Order matches the approach tiles under this Why us block."
              renderItem={(a) => (
                <DocumentForm
                  docId={a._id}
                  title={`Approach — ${String(a.label ?? a._id)}`}
                  fields={{
                    label: String(a.label ?? ''),
                    icon: String(a.icon ?? ''),
                  }}
                />
              )}
            />
          </>
        )}
      />

      <ReferenceListSection
        sectionTitle="Our philosophy"
        parentDocumentId={home._id}
        field="ourPhilosophy"
        itemType="our_philosophy"
        items={home.ourPhilosophy ?? []}
        defaultCreateFields={{ heading: '', description: '' }}
        onChanged={load}
        addButtonLabel="Add philosophy block"
        firstEntryNote="The first block is what the public philosophy section shows."
        renderItem={(p) => (
          <DocumentForm
            docId={p._id}
            title={`Philosophy — ${String(p.heading ?? p._id)}`}
            fields={{
              heading: String(p.heading ?? ''),
              description: String(p.description ?? ''),
            }}
          />
        )}
      />

      <ReferenceListSection
        sectionTitle="Testimonials"
        parentDocumentId={home._id}
        field="testimonials"
        itemType="testimonials"
        items={home.testimonials ?? []}
        defaultCreateFields={{ author: '', review: '', rating: 0 }}
        onChanged={load}
        addButtonLabel="Add testimonial"
        firstEntryNote="Order matches testimonials on the public home page."
        renderItem={(t) => (
          <DocumentForm
            docId={t._id}
            title={`Testimonial — ${String(t.author ?? t._id)}`}
            fields={{
              author: String(t.author ?? ''),
              review: String(t.review ?? ''),
              rating: typeof t.rating === 'number' ? t.rating : Number(t.rating) || 0,
            }}
          />
        )}
      />
    </div>
  )
}
