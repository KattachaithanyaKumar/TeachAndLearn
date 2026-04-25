import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { adminPath } from '../utils/adminPath'
import ImageUploadField from '../components/ImageUploadField'
import ServiceBlockTypePreview from '../components/ServiceBlockTypePreview'
import MarkdownEditor from '../components/MarkdownEditor'
import { apiGet, apiPatch } from '../api/client'
import {
  BLOCK_TYPE_OPTIONS,
  newEmptyBlock,
  type IconItem,
  type ServicePageBlock,
} from '../types/servicePageBlocks'

type ServiceDoc = {
  _id: string
  _type: string
  audience?: string
  sortOrder?: number
  title?: string
  pathSegment?: string
  description?: string
  items?: string[] | null
  iconKey?: string
  headerColor?: string
  pageTitlePrefix?: string
  pageTitleAccent?: string
  heroTagline?: string
  showCta?: boolean
  pageBlocks?: ServicePageBlock[]
}

function ensureKeys<T extends { _key?: string }>(rows: T[] | undefined): T[] {
  return (rows ?? []).map((r) => ({
    ...r,
    _key: r._key || crypto.randomUUID(),
  }))
}

function blockTypeLabel(type: ServicePageBlock['_type']): string {
  return BLOCK_TYPE_OPTIONS.find((o) => o.value === type)?.label ?? type
}

export default function ServiceDetailPageEditor() {
  const { id } = useParams<{ id: string }>()
  const [pendingBlockType, setPendingBlockType] = useState<ServicePageBlock['_type'] | ''>('')
  const [doc, setDoc] = useState<ServiceDoc | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'saving' | 'loading'>('loading')
  const [msg, setMsg] = useState('')

  const load = useCallback(() => {
    if (!id) return
    setStatus('loading')
    setError(null)
    apiGet<ServiceDoc>(`/api/documents/${id}`)
      .then((d) => {
        if (d._type !== 'service_listing_item') {
          setError('Not a service listing item')
          setDoc(null)
          return
        }
        setDoc({
          ...d,
          pageBlocks: (d.pageBlocks ?? []).map((b) => ({
            ...b,
            _key: (b as ServicePageBlock & { _key?: string })._key || crypto.randomUUID(),
          })),
        })
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Load failed'))
      .finally(() => setStatus('idle'))
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  const save = async () => {
    if (!doc?._id) return
    setStatus('saving')
    setMsg('')
    try {
      await apiPatch(`/api/documents/${doc._id}`, {
        fields: {
          headerColor: doc.headerColor,
          pageTitlePrefix: doc.pageTitlePrefix,
          pageTitleAccent: doc.pageTitleAccent,
          heroTagline: doc.heroTagline,
          showCta: doc.showCta,
          pageBlocks: doc.pageBlocks ?? [],
        },
      })
      setMsg('Saved')
      load()
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setStatus('idle')
    }
  }

  const updateBlock = (index: number, next: ServicePageBlock) => {
    setDoc((d) => {
      if (!d) return d
      const blocks = [...(d.pageBlocks ?? [])]
      blocks[index] = next
      return { ...d, pageBlocks: blocks }
    })
  }

  const moveBlock = (index: number, dir: -1 | 1) => {
    setDoc((d) => {
      if (!d?.pageBlocks) return d
      const j = index + dir
      if (j < 0 || j >= d.pageBlocks.length) return d
      const blocks = [...d.pageBlocks]
      ;[blocks[index], blocks[j]] = [blocks[j], blocks[index]]
      return { ...d, pageBlocks: blocks }
    })
  }

  const removeBlock = (index: number) => {
    setDoc((d) => {
      if (!d?.pageBlocks) return d
      return { ...d, pageBlocks: d.pageBlocks.filter((_, i) => i !== index) }
    })
  }

  const addBlock = (type: ServicePageBlock['_type']) => {
    setDoc((d) => {
      if (!d) return d
      const b = newEmptyBlock(type)
      return { ...d, pageBlocks: [...(d.pageBlocks ?? []), b] }
    })
  }

  if (status === 'loading' || (!doc && !error)) {
    return (
      <div className="page">
        <p>Loading…</p>
      </div>
    )
  }

  if (error || !doc) {
    return (
      <div className="page">
        <p className="text-error">{error || 'Not found'}</p>
        <Link to={adminPath('service-listings/child')} className="btn-link">
          Back to list
        </Link>
      </div>
    )
  }

  const serviceListingsPath =
    doc.audience === 'adult'
      ? adminPath('service-listings/adult')
      : adminPath('service-listings/child')
  const serviceListingsBackLabel =
    doc.audience === 'adult' ? '← Adult service listings' : '← Child service listings'

  return (
    <div className="page">
      <div className="row" style={{ marginBottom: '1rem' }}>
        <Link to={serviceListingsPath} className="btn btn-secondary">
          {serviceListingsBackLabel}
        </Link>
      </div>
      <h1 className="page-title">Edit service page</h1>
      <p className="muted">
        <code>{doc.pathSegment}</code> · {doc.audience} · {doc.title}
      </p>

      <section className="card">
        <h2 className="card-title">Hero / header</h2>
        <div className="field-grid">
          <label className="field">
            <span className="field-label">headerColor</span>
            <input
              className="input"
              value={doc.headerColor ?? ''}
              onChange={(e) => setDoc({ ...doc, headerColor: e.target.value })}
              placeholder="#E0F2FE"
            />
          </label>
          <label className="field">
            <span className="field-label">pageTitlePrefix</span>
            <input
              className="input"
              value={doc.pageTitlePrefix ?? ''}
              onChange={(e) => setDoc({ ...doc, pageTitlePrefix: e.target.value })}
            />
          </label>
          <label className="field">
            <span className="field-label">pageTitleAccent</span>
            <input
              className="input"
              value={doc.pageTitleAccent ?? ''}
              onChange={(e) => setDoc({ ...doc, pageTitleAccent: e.target.value })}
            />
          </label>
          <label className="field">
            <span className="field-label">heroTagline</span>
            <textarea
              className="textarea"
              rows={3}
              value={doc.heroTagline ?? ''}
              onChange={(e) => setDoc({ ...doc, heroTagline: e.target.value })}
            />
          </label>
          <label className="field row">
            <input
              type="checkbox"
              checked={doc.showCta !== false}
              onChange={(e) => setDoc({ ...doc, showCta: e.target.checked })}
            />
            <span className="field-label">Show CTA section</span>
          </label>
        </div>
      </section>

      <section className="card">
        <h2 className="card-title">Page blocks</h2>
        <div className="row" style={{ marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'flex-start', gap: '0.75rem' }}>
          <select
            className="input"
            style={{ maxWidth: 320 }}
            value={pendingBlockType}
            onChange={(e) => {
              const v = e.target.value as ServicePageBlock['_type'] | ''
              setPendingBlockType(v)
            }}
          >
            <option value="">Add block…</option>
            {BLOCK_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {pendingBlockType ? (
            <>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  addBlock(pendingBlockType)
                  setPendingBlockType('')
                }}
              >
                Add block
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setPendingBlockType('')}>
                Cancel
              </button>
            </>
          ) : null}
        </div>
        {pendingBlockType ? (
          <div style={{ marginBottom: '1.25rem' }}>
            <p className="muted" style={{ marginBottom: '0.5rem' }}>
              Preview: <strong>{blockTypeLabel(pendingBlockType)}</strong>
            </p>
            <ServiceBlockTypePreview type={pendingBlockType} />
          </div>
        ) : null}

        {(doc.pageBlocks ?? []).map((block, i) => (
          <div key={(block as { _key?: string })._key || i} className="card" style={{ marginBottom: '1rem' }}>
            <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
              <div className="row" style={{ gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <ServiceBlockTypePreview type={block._type} size="compact" />
                <strong>{block._type}</strong>
              </div>
              <button type="button" className="btn btn-sm" onClick={() => moveBlock(i, -1)} disabled={i === 0}>
                Up
              </button>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => moveBlock(i, 1)}
                disabled={i === (doc.pageBlocks?.length ?? 0) - 1}
              >
                Down
              </button>
              <button type="button" className="btn btn-sm" onClick={() => removeBlock(i)}>
                Remove
              </button>
            </div>
            <BlockFields block={block} onChange={(next) => updateBlock(i, next)} />
          </div>
        ))}
      </section>

      <div className="row">
        <button type="button" className="btn" onClick={save} disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : 'Save page'}
        </button>
        {msg ? <span className={msg.includes('fail') ? 'text-error' : 'text-muted'}>{msg}</span> : null}
      </div>
    </div>
  )
}

function BlockFields({
  block,
  onChange,
}: {
  block: ServicePageBlock
  onChange: (b: ServicePageBlock) => void
}) {
  switch (block._type) {
    case 'service_page_block_intro_split':
      return <IntroSplitFields block={block} onChange={onChange} />
    case 'service_page_block_alternating_media':
      return <AlternatingFields block={block} onChange={onChange} />
    case 'service_page_block_icon_card_grid':
      return <IconGridFields block={block} onChange={onChange} />
    case 'service_page_block_icon_card_stack':
      return <IconStackFields block={block} onChange={onChange} />
    case 'service_page_block_split_disorders':
      return <SplitDisordersFields block={block} onChange={onChange} />
    case 'service_page_block_media_side_icon_list':
      return <MediaSideListFields block={block} onChange={onChange} />
    case 'service_page_block_goals_split':
      return <GoalsSplitFields block={block} onChange={onChange} />
    case 'service_page_block_two_column_plain':
      return <TwoColFields block={block} onChange={onChange} />
    default:
      return <p className="muted">Unknown block type</p>
  }
}

function IntroSplitFields({
  block,
  onChange,
}: {
  block: Extract<ServicePageBlock, { _type: 'service_page_block_intro_split' }>
  onChange: (b: ServicePageBlock) => void
}) {
  return (
    <div className="field-grid">
      <ImageUploadField
        label="Image"
        value={block.image}
        onChange={(img) => onChange({ ...block, image: img ?? undefined })}
      />
      <label className="field">
        <span className="field-label">imageAlt</span>
        <input
          className="input"
          value={block.imageAlt ?? ''}
          onChange={(e) => onChange({ ...block, imageAlt: e.target.value })}
        />
      </label>
      <label className="field">
        <span className="field-label">heading</span>
        <input
          className="input"
          value={block.heading ?? ''}
          onChange={(e) => onChange({ ...block, heading: e.target.value })}
        />
      </label>
      <div className="field">
        <span className="field-label">body (markdown)</span>
        <MarkdownEditor value={block.body ?? ''} onChange={(v) => onChange({ ...block, body: v })} rows={6} />
      </div>
      <label className="field">
        <span className="field-label">maskStyle</span>
        <select
          className="input"
          value={block.maskStyle ?? 'blobCover'}
          onChange={(e) => onChange({ ...block, maskStyle: e.target.value })}
        >
          <option value="none">none</option>
          <option value="blobCover">blobCover</option>
          <option value="blobContain">blobContain</option>
        </select>
      </label>
      <label className="field row">
        <input
          type="checkbox"
          checked={!!block.reverseOrder}
          onChange={(e) => onChange({ ...block, reverseOrder: e.target.checked })}
        />
        <span className="field-label">Image on right</span>
      </label>
    </div>
  )
}

function AlternatingFields({
  block,
  onChange,
}: {
  block: Extract<ServicePageBlock, { _type: 'service_page_block_alternating_media' }>
  onChange: (b: ServicePageBlock) => void
}) {
  return (
    <div className="field-grid">
      <label className="field">
        <span className="field-label">heading</span>
        <input
          className="input"
          value={block.heading ?? ''}
          onChange={(e) => onChange({ ...block, heading: e.target.value })}
        />
      </label>
      <div className="field">
        <span className="field-label">body (markdown)</span>
        <MarkdownEditor value={block.body ?? ''} onChange={(v) => onChange({ ...block, body: v })} rows={8} />
      </div>
      <ImageUploadField
        label="Image"
        value={block.image}
        onChange={(img) => onChange({ ...block, image: img ?? undefined })}
      />
      <label className="field">
        <span className="field-label">imageAlt</span>
        <input
          className="input"
          value={block.imageAlt ?? ''}
          onChange={(e) => onChange({ ...block, imageAlt: e.target.value })}
        />
      </label>
      <label className="field row">
        <input
          type="checkbox"
          checked={!!block.reverseLayout}
          onChange={(e) => onChange({ ...block, reverseLayout: e.target.checked })}
        />
        <span className="field-label">Reverse layout</span>
      </label>
      <label className="field">
        <span className="field-label">sectionBg</span>
        <select
          className="input"
          value={block.sectionBg ?? 'white'}
          onChange={(e) => onChange({ ...block, sectionBg: e.target.value })}
        >
          <option value="white">white</option>
          <option value="gray">gray</option>
        </select>
      </label>
      <label className="field row">
        <input
          type="checkbox"
          checked={block.useBlobMask !== false}
          onChange={(e) => onChange({ ...block, useBlobMask: e.target.checked })}
        />
        <span className="field-label">Blob mask</span>
      </label>
      <label className="field">
        <span className="field-label">headingStyle</span>
        <select
          className="input"
          value={block.headingStyle ?? 'orange'}
          onChange={(e) => onChange({ ...block, headingStyle: e.target.value })}
        >
          <option value="orange">orange</option>
          <option value="dark">dark</option>
        </select>
      </label>
      <label className="field">
        <span className="field-label">blobMask</span>
        <select
          className="input"
          value={block.blobMask ?? 'blob2'}
          onChange={(e) => onChange({ ...block, blobMask: e.target.value })}
        >
          <option value="blob2">blob2</option>
          <option value="blob3">blob3</option>
        </select>
      </label>
    </div>
  )
}

function IconGridFields({
  block,
  onChange,
}: {
  block: Extract<ServicePageBlock, { _type: 'service_page_block_icon_card_grid' }>
  onChange: (b: ServicePageBlock) => void
}) {
  const items = ensureKeys(block.items)
  const setItems = (next: IconItem[]) => onChange({ ...block, items: next })

  return (
    <div className="field-grid">
      <label className="field">
        <span className="field-label">sectionTitle</span>
        <input
          className="input"
          value={block.sectionTitle ?? ''}
          onChange={(e) => onChange({ ...block, sectionTitle: e.target.value })}
        />
      </label>
      <label className="field">
        <span className="field-label">sectionSubtitle</span>
        <textarea
          className="textarea"
          rows={3}
          value={block.sectionSubtitle ?? ''}
          onChange={(e) => onChange({ ...block, sectionSubtitle: e.target.value })}
        />
      </label>
      <label className="field">
        <span className="field-label">sectionBg</span>
        <select
          className="input"
          value={block.sectionBg ?? 'gray'}
          onChange={(e) => onChange({ ...block, sectionBg: e.target.value })}
        >
          <option value="white">white</option>
          <option value="gray">gray</option>
        </select>
      </label>
      <label className="field">
        <span className="field-label">gridCols</span>
        <select
          className="input"
          value={block.gridCols ?? 3}
          onChange={(e) => onChange({ ...block, gridCols: Number(e.target.value) })}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </label>
      <label className="field">
        <span className="field-label">cardBg</span>
        <select
          className="input"
          value={block.cardBg ?? 'white'}
          onChange={(e) => onChange({ ...block, cardBg: e.target.value })}
        >
          <option value="white">white</option>
          <option value="gray">gray</option>
        </select>
      </label>
      <IconItemListEditor items={items} onChange={setItems} />
    </div>
  )
}

function IconStackFields({
  block,
  onChange,
}: {
  block: Extract<ServicePageBlock, { _type: 'service_page_block_icon_card_stack' }>
  onChange: (b: ServicePageBlock) => void
}) {
  const items = ensureKeys(block.items)
  return (
    <div className="field-grid">
      <ImageUploadField
        label="Side image"
        value={block.sideImage}
        onChange={(img) => onChange({ ...block, sideImage: img ?? undefined })}
      />
      <label className="field">
        <span className="field-label">sideImageAlt</span>
        <input
          className="input"
          value={block.sideImageAlt ?? ''}
          onChange={(e) => onChange({ ...block, sideImageAlt: e.target.value })}
        />
      </label>
      <label className="field row">
        <input
          type="checkbox"
          checked={block.imageLeft !== false}
          onChange={(e) => onChange({ ...block, imageLeft: e.target.checked })}
        />
        <span className="field-label">Image on left</span>
      </label>
      <label className="field">
        <span className="field-label">columnTitle</span>
        <input
          className="input"
          value={block.columnTitle ?? ''}
          onChange={(e) => onChange({ ...block, columnTitle: e.target.value })}
        />
      </label>
      <IconItemListEditor items={items} onChange={(next) => onChange({ ...block, items: next })} />
    </div>
  )
}

function SplitDisordersFields({
  block,
  onChange,
}: {
  block: Extract<ServicePageBlock, { _type: 'service_page_block_split_disorders' }>
  onChange: (b: ServicePageBlock) => void
}) {
  const text = (block.disorders ?? []).join('\n')
  return (
    <div className="field-grid">
      <label className="field">
        <span className="field-label">introTitle</span>
        <input
          className="input"
          value={block.introTitle ?? ''}
          onChange={(e) => onChange({ ...block, introTitle: e.target.value })}
        />
      </label>
      <label className="field">
        <span className="field-label">introBody</span>
        <textarea
          className="textarea"
          rows={4}
          value={block.introBody ?? ''}
          onChange={(e) => onChange({ ...block, introBody: e.target.value })}
        />
      </label>
      <label className="field">
        <span className="field-label">disorders (one per line)</span>
        <textarea
          className="textarea"
          rows={6}
          value={text}
          onChange={(e) =>
            onChange({
              ...block,
              disorders: e.target.value
                .split('\n')
                .map((l) => l.trim())
                .filter(Boolean),
            })
          }
        />
      </label>
      <ImageUploadField
        label="Center image"
        value={block.centerImage}
        onChange={(img) => onChange({ ...block, centerImage: img ?? undefined })}
      />
      <label className="field">
        <span className="field-label">centerImageAlt</span>
        <input
          className="input"
          value={block.centerImageAlt ?? ''}
          onChange={(e) => onChange({ ...block, centerImageAlt: e.target.value })}
        />
      </label>
    </div>
  )
}

function MediaSideListFields({
  block,
  onChange,
}: {
  block: Extract<ServicePageBlock, { _type: 'service_page_block_media_side_icon_list' }>
  onChange: (b: ServicePageBlock) => void
}) {
  const items = ensureKeys(block.items)
  return (
    <div className="field-grid">
      <label className="field">
        <span className="field-label">sectionTitle</span>
        <input
          className="input"
          value={block.sectionTitle ?? ''}
          onChange={(e) => onChange({ ...block, sectionTitle: e.target.value })}
        />
      </label>
      <label className="field">
        <span className="field-label">sectionSubtitle</span>
        <textarea
          className="textarea"
          rows={3}
          value={block.sectionSubtitle ?? ''}
          onChange={(e) => onChange({ ...block, sectionSubtitle: e.target.value })}
        />
      </label>
      <ImageUploadField
        label="Image"
        value={block.image}
        onChange={(img) => onChange({ ...block, image: img ?? undefined })}
      />
      <label className="field">
        <span className="field-label">imageAlt</span>
        <input
          className="input"
          value={block.imageAlt ?? ''}
          onChange={(e) => onChange({ ...block, imageAlt: e.target.value })}
        />
      </label>
      <label className="field row">
        <input
          type="checkbox"
          checked={block.imageLeft !== false}
          onChange={(e) => onChange({ ...block, imageLeft: e.target.checked })}
        />
        <span className="field-label">Image on left</span>
      </label>
      <IconItemListEditor items={items} onChange={(next) => onChange({ ...block, items: next })} />
    </div>
  )
}

function GoalsSplitFields({
  block,
  onChange,
}: {
  block: Extract<ServicePageBlock, { _type: 'service_page_block_goals_split' }>
  onChange: (b: ServicePageBlock) => void
}) {
  const goals = ensureKeys(block.goals)
  return (
    <div className="field-grid">
      <label className="field">
        <span className="field-label">sectionTitle</span>
        <input
          className="input"
          value={block.sectionTitle ?? ''}
          onChange={(e) => onChange({ ...block, sectionTitle: e.target.value })}
        />
      </label>
      <label className="field">
        <span className="field-label">sectionSubtitle</span>
        <textarea
          className="textarea"
          rows={3}
          value={block.sectionSubtitle ?? ''}
          onChange={(e) => onChange({ ...block, sectionSubtitle: e.target.value })}
        />
      </label>
      <label className="field">
        <span className="field-label">sectionBg</span>
        <select
          className="input"
          value={block.sectionBg ?? 'gray'}
          onChange={(e) => onChange({ ...block, sectionBg: e.target.value })}
        >
          <option value="white">white</option>
          <option value="gray">gray</option>
        </select>
      </label>
      <label className="field row">
        <input
          type="checkbox"
          checked={!!block.reverseLayout}
          onChange={(e) => onChange({ ...block, reverseLayout: e.target.checked })}
        />
        <span className="field-label">Reverse layout</span>
      </label>
      <ImageUploadField
        label="Side image"
        value={block.image}
        onChange={(img) => onChange({ ...block, image: img ?? undefined })}
      />
      <label className="field">
        <span className="field-label">imageAlt</span>
        <input
          className="input"
          value={block.imageAlt ?? ''}
          onChange={(e) => onChange({ ...block, imageAlt: e.target.value })}
        />
      </label>
      {goals.map((g, i) => (
        <div key={g._key} className="card" style={{ padding: '0.75rem' }}>
          <label className="field">
            <span className="field-label">iconKey</span>
            <input
              className="input"
              value={g.iconKey ?? ''}
              onChange={(e) => {
                const next = [...goals]
                next[i] = { ...g, iconKey: e.target.value }
                onChange({ ...block, goals: next })
              }}
            />
          </label>
          <label className="field">
            <span className="field-label">text</span>
            <textarea
              className="textarea"
              rows={2}
              value={g.text ?? ''}
              onChange={(e) => {
                const next = [...goals]
                next[i] = { ...g, text: e.target.value }
                onChange({ ...block, goals: next })
              }}
            />
          </label>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() =>
              onChange({
                ...block,
                goals: goals.filter((_, j) => j !== i),
              })
            }
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() =>
          onChange({
            ...block,
            goals: [...goals, { _key: crypto.randomUUID(), iconKey: '', text: '' }],
          })
        }
      >
        Add goal line
      </button>
    </div>
  )
}

function TwoColFields({
  block,
  onChange,
}: {
  block: Extract<ServicePageBlock, { _type: 'service_page_block_two_column_plain' }>
  onChange: (b: ServicePageBlock) => void
}) {
  return (
    <div className="field-grid">
      <ImageUploadField
        label="Image"
        value={block.image}
        onChange={(img) => onChange({ ...block, image: img ?? undefined })}
      />
      <label className="field">
        <span className="field-label">imageAlt</span>
        <input
          className="input"
          value={block.imageAlt ?? ''}
          onChange={(e) => onChange({ ...block, imageAlt: e.target.value })}
        />
      </label>
      <label className="field">
        <span className="field-label">heading</span>
        <input
          className="input"
          value={block.heading ?? ''}
          onChange={(e) => onChange({ ...block, heading: e.target.value })}
        />
      </label>
      <div className="field">
        <span className="field-label">body (markdown)</span>
        <MarkdownEditor value={block.body ?? ''} onChange={(v) => onChange({ ...block, body: v })} rows={8} />
      </div>
      <label className="field row">
        <input
          type="checkbox"
          checked={!!block.reverseOrder}
          onChange={(e) => onChange({ ...block, reverseOrder: e.target.checked })}
        />
        <span className="field-label">Image on right (desktop)</span>
      </label>
      <label className="field">
        <span className="field-label">sectionBg</span>
        <select
          className="input"
          value={block.sectionBg ?? 'white'}
          onChange={(e) => onChange({ ...block, sectionBg: e.target.value })}
        >
          <option value="white">white</option>
          <option value="gray">gray</option>
        </select>
      </label>
      <label className="field row">
        <input
          type="checkbox"
          checked={!!block.mobileImageBelow}
          onChange={(e) => onChange({ ...block, mobileImageBelow: e.target.checked })}
        />
        <span className="field-label">Mobile: image below text</span>
      </label>
      <label className="field row">
        <input
          type="checkbox"
          checked={!!block.leadWithText}
          onChange={(e) => onChange({ ...block, leadWithText: e.target.checked })}
        />
        <span className="field-label">Text column first (text left / image right)</span>
      </label>
    </div>
  )
}

function IconItemListEditor({
  items,
  onChange,
}: {
  items: IconItem[]
  onChange: (x: IconItem[]) => void
}) {
  return (
    <div className="field" style={{ gridColumn: '1 / -1' }}>
      <span className="field-label">Icon cards</span>
      {items.map((it, i) => (
        <div key={it._key} className="card" style={{ marginBottom: '0.5rem', padding: '0.75rem' }}>
          <label className="field">
            <span className="field-label">iconKey</span>
            <input
              className="input"
              value={it.iconKey ?? ''}
              onChange={(e) => {
                const next = [...items]
                next[i] = { ...it, iconKey: e.target.value }
                onChange(next)
              }}
            />
          </label>
          <label className="field">
            <span className="field-label">title</span>
            <input
              className="input"
              value={it.title ?? ''}
              onChange={(e) => {
                const next = [...items]
                next[i] = { ...it, title: e.target.value }
                onChange(next)
              }}
            />
          </label>
          <label className="field">
            <span className="field-label">description</span>
            <textarea
              className="textarea"
              rows={3}
              value={it.description ?? ''}
              onChange={(e) => {
                const next = [...items]
                next[i] = { ...it, description: e.target.value }
                onChange(next)
              }}
            />
          </label>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            Remove card
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() =>
          onChange([...items, { _key: crypto.randomUUID(), iconKey: '', title: '', description: '' }])
        }
      >
        Add card
      </button>
    </div>
  )
}
