import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { apiPatch } from '../api/client'

function linesToText(lines: string[]) {
  return lines.join('\n')
}

function textToLines(text: string) {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

function newKey() {
  // Sanity expects `_key` on array items; any stable-ish unique string works.
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyCrypto: any = globalThis.crypto
    if (anyCrypto?.randomUUID) return anyCrypto.randomUUID()
  } catch {
    // ignore
  }
  return Math.random().toString(16).slice(2) + Date.now().toString(16)
}

type BlockHero = { _key: string; _type: 'franchise_page_block_hero'; title?: string; lead?: string }
type BlockValueChecks = { _key: string; _type: 'franchise_page_block_value_checks'; lines?: string[] }
type BlockCtas = {
  _key: string
  _type: 'franchise_page_block_ctas'
  applyLabel?: string
  applyHref?: string
  talkLabel?: string
  talkHref?: string
}
type BlockPhone = { _key: string; _type: 'franchise_page_block_phone'; display?: string; telHref?: string }
type BlockTextSection = {
  _key: string
  _type: 'franchise_page_block_text_section'
  heading?: string
  bodyMarkdown?: string
}
type BlockBulletsSection = { _key: string; _type: 'franchise_page_block_bullets_section'; heading?: string; bullets?: string[] }
type BlockCustomMarkdown = { _key: string; _type: 'franchise_page_block_custom_markdown'; markdown?: string }

type FranchisePageBlock =
  | BlockHero
  | BlockValueChecks
  | BlockCtas
  | BlockPhone
  | BlockTextSection
  | BlockBulletsSection
  | BlockCustomMarkdown

type Props = {
  franchiseId: string
  pageBodyBlocks: unknown[] | null
  onSaved: () => void
}

function toBlocks(value: unknown[] | null): FranchisePageBlock[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((b) => b && typeof b === 'object')
    .map((b) => {
      const anyB = b as Record<string, unknown>
      const _type = typeof anyB._type === 'string' ? anyB._type : ''
      const _key = typeof anyB._key === 'string' ? anyB._key : newKey()
      return { ...anyB, _type, _key } as FranchisePageBlock
    })
    .filter((b) => typeof b._type === 'string' && b._type.startsWith('franchise_page_block_'))
}

function makeBlock(type: FranchisePageBlock['_type']): FranchisePageBlock {
  const _key = newKey()
  switch (type) {
    case 'franchise_page_block_hero':
      return { _key, _type: type, title: '', lead: '' }
    case 'franchise_page_block_value_checks':
      return { _key, _type: type, lines: [''] }
    case 'franchise_page_block_ctas':
      return { _key, _type: type, applyLabel: '', applyHref: '#franchise-inquiry', talkLabel: '', talkHref: '/contact-us#contact-form' }
    case 'franchise_page_block_phone':
      return { _key, _type: type, display: '', telHref: '' }
    case 'franchise_page_block_text_section':
      return { _key, _type: type, heading: '', bodyMarkdown: '' }
    case 'franchise_page_block_bullets_section':
      return { _key, _type: type, heading: '', bullets: [''] }
    case 'franchise_page_block_custom_markdown':
      return { _key, _type: type, markdown: '' }
    default:
      return { _key, _type: 'franchise_page_block_custom_markdown', markdown: '' }
  }
}

export default function FranchisePageBodyEditor({ franchiseId, pageBodyBlocks, onSaved }: Props) {
  const initialBlocks = useMemo(() => toBlocks(pageBodyBlocks), [pageBodyBlocks])
  const [blocks, setBlocks] = useState<FranchisePageBlock[]>(initialBlocks)

  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    setBlocks(toBlocks(pageBodyBlocks))
  }, [franchiseId, pageBodyBlocks])

  const [addType, setAddType] = useState<FranchisePageBlock['_type']>('franchise_page_block_hero')

  const save = async () => {
    setStatus('saving')
    setMsg('')

    if (blocks.length === 0) {
      setStatus('error')
      setMsg('Add at least one block.')
      return
    }

    for (const b of blocks) {
      if (b._type === 'franchise_page_block_hero') {
        if (!String(b.title ?? '').trim()) {
          setStatus('error')
          setMsg('Hero block needs a title.')
          return
        }
      }
      if (b._type === 'franchise_page_block_value_checks') {
        const lines = Array.isArray(b.lines) ? b.lines.filter((x) => String(x ?? '').trim()) : []
        if (lines.length === 0) {
          setStatus('error')
          setMsg('Value checks block needs at least one line.')
          return
        }
      }
      if (b._type === 'franchise_page_block_phone') {
        if (!String(b.display ?? '').trim() || !String(b.telHref ?? '').trim()) {
          setStatus('error')
          setMsg('Phone block needs display + tel link.')
          return
        }
      }
      if (b._type === 'franchise_page_block_bullets_section') {
        const bullets = Array.isArray(b.bullets) ? b.bullets.filter((x) => String(x ?? '').trim()) : []
        if (bullets.length === 0) {
          setStatus('error')
          setMsg('Bullets section needs at least one bullet.')
          return
        }
      }
      if (b._type === 'franchise_page_block_custom_markdown') {
        if (!String(b.markdown ?? '').trim()) {
          setStatus('error')
          setMsg('Custom Markdown block cannot be empty.')
          return
        }
      }
    }

    try {
      await apiPatch(`/api/documents/${franchiseId}`, { fields: { pageBodyBlocks: blocks } })
      setStatus('idle')
      setMsg('Saved. Public /franchises will render these blocks.')
      onSaved()
    } catch (e) {
      setStatus('error')
      setMsg(e instanceof Error ? e.message : 'Save failed')
    }
  }

  const field = (label: string, child: ReactNode) => (
    <label className="field">
      <span className="field-label">{label}</span>
      {child}
    </label>
  )

  const move = (idx: number, dir: -1 | 1) => {
    setBlocks((prev) => {
      const next = [...prev]
      const to = idx + dir
      if (to < 0 || to >= next.length) return prev
      const tmp = next[idx]
      next[idx] = next[to]
      next[to] = tmp
      return next
    })
  }

  const remove = (idx: number) => {
    setBlocks((prev) => prev.filter((_b, i) => i !== idx))
  }

  const update = (idx: number, patch: Partial<FranchisePageBlock>) => {
    setBlocks((prev) => prev.map((b, i) => (i === idx ? ({ ...b, ...patch } as FranchisePageBlock) : b)))
  }

  return (
    <section className="card">
      <h3 className="card-title">Franchises page body (blocks)</h3>
      <p className="muted small mb-4">
        Add blocks, reorder, and save. The public <code>/franchises</code> page prefers blocks when present.
      </p>

      <div className="row mb-4" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
        <label className="field" style={{ maxWidth: 360 }}>
          <span className="field-label">Add block</span>
          <select className="input" value={addType} onChange={(e) => setAddType(e.target.value as FranchisePageBlock['_type'])}>
            <option value="franchise_page_block_hero">Hero</option>
            <option value="franchise_page_block_value_checks">Value checks</option>
            <option value="franchise_page_block_ctas">CTAs</option>
            <option value="franchise_page_block_phone">Phone line</option>
            <option value="franchise_page_block_text_section">Text section (Markdown)</option>
            <option value="franchise_page_block_bullets_section">Bullets section</option>
            <option value="franchise_page_block_custom_markdown">Custom Markdown</option>
          </select>
        </label>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setBlocks((prev) => [...prev, makeBlock(addType)])}
        >
          Add
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {blocks.map((b, idx) => (
          <section key={b._key} className="card" style={{ padding: '1rem' }}>
            <div className="row" style={{ justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
              <strong>
                {idx + 1}. <code>{b._type}</code>
              </strong>
              <div className="row" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-secondary" onClick={() => move(idx, -1)} disabled={idx === 0}>
                  Up
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => move(idx, 1)}
                  disabled={idx === blocks.length - 1}
                >
                  Down
                </button>
                <button type="button" className="btn" onClick={() => remove(idx)}>
                  Delete
                </button>
              </div>
            </div>

            <div className="field-grid" style={{ marginTop: '0.75rem' }}>
              {b._type === 'franchise_page_block_hero'
                ? [
                    field(
                      'Title',
                      <textarea
                        className="textarea"
                        rows={2}
                        value={b.title ?? ''}
                        onChange={(e) => update(idx, { title: e.target.value } as Partial<BlockHero>)}
                      />,
                    ),
                    field(
                      'Lead',
                      <textarea
                        className="textarea"
                        rows={4}
                        value={b.lead ?? ''}
                        onChange={(e) => update(idx, { lead: e.target.value } as Partial<BlockHero>)}
                      />,
                    ),
                  ]
                : null}

              {b._type === 'franchise_page_block_value_checks'
                ? field(
                    'Lines (one per line)',
                    <textarea
                      className="textarea"
                      rows={5}
                      value={linesToText(Array.isArray(b.lines) ? b.lines : [])}
                      onChange={(e) => update(idx, { lines: textToLines(e.target.value) } as Partial<BlockValueChecks>)}
                    />,
                  )
                : null}

              {b._type === 'franchise_page_block_ctas'
                ? [
                    field(
                      'Apply label',
                      <input
                        className="input"
                        value={b.applyLabel ?? ''}
                        onChange={(e) => update(idx, { applyLabel: e.target.value } as Partial<BlockCtas>)}
                      />,
                    ),
                    field(
                      'Apply href',
                      <input
                        className="input"
                        value={b.applyHref ?? ''}
                        onChange={(e) => update(idx, { applyHref: e.target.value } as Partial<BlockCtas>)}
                      />,
                    ),
                    field(
                      'Talk label',
                      <input
                        className="input"
                        value={b.talkLabel ?? ''}
                        onChange={(e) => update(idx, { talkLabel: e.target.value } as Partial<BlockCtas>)}
                      />,
                    ),
                    field(
                      'Talk href',
                      <input
                        className="input"
                        value={b.talkHref ?? ''}
                        onChange={(e) => update(idx, { talkHref: e.target.value } as Partial<BlockCtas>)}
                      />,
                    ),
                  ]
                : null}

              {b._type === 'franchise_page_block_phone'
                ? [
                    field(
                      'Display',
                      <input
                        className="input"
                        value={b.display ?? ''}
                        onChange={(e) => update(idx, { display: e.target.value } as Partial<BlockPhone>)}
                      />,
                    ),
                    field(
                      'tel href',
                      <input
                        className="input"
                        value={b.telHref ?? ''}
                        onChange={(e) => update(idx, { telHref: e.target.value } as Partial<BlockPhone>)}
                      />,
                    ),
                  ]
                : null}

              {b._type === 'franchise_page_block_text_section'
                ? [
                    field(
                      'Heading',
                      <input
                        className="input"
                        value={b.heading ?? ''}
                        onChange={(e) => update(idx, { heading: e.target.value } as Partial<BlockTextSection>)}
                      />,
                    ),
                    field(
                      'Body (Markdown)',
                      <textarea
                        className="textarea"
                        rows={8}
                        value={b.bodyMarkdown ?? ''}
                        onChange={(e) => update(idx, { bodyMarkdown: e.target.value } as Partial<BlockTextSection>)}
                      />,
                    ),
                  ]
                : null}

              {b._type === 'franchise_page_block_bullets_section'
                ? [
                    field(
                      'Heading',
                      <input
                        className="input"
                        value={b.heading ?? ''}
                        onChange={(e) => update(idx, { heading: e.target.value } as Partial<BlockBulletsSection>)}
                      />,
                    ),
                    field(
                      'Bullets (one per line)',
                      <textarea
                        className="textarea"
                        rows={8}
                        value={linesToText(Array.isArray(b.bullets) ? b.bullets : [])}
                        onChange={(e) => update(idx, { bullets: textToLines(e.target.value) } as Partial<BlockBulletsSection>)}
                      />,
                    ),
                  ]
                : null}

              {b._type === 'franchise_page_block_custom_markdown'
                ? field(
                    'Markdown',
                    <textarea
                      className="textarea"
                      rows={10}
                      value={b.markdown ?? ''}
                      onChange={(e) => update(idx, { markdown: e.target.value } as Partial<BlockCustomMarkdown>)}
                    />,
                  )
                : null}
            </div>
          </section>
        ))}
      </div>

      <div className="row" style={{ flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
        <button type="button" className="btn" onClick={() => void save()} disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : 'Save page body'}
        </button>
        {msg ? <span className={status === 'error' ? 'text-error' : 'text-muted'}>{msg}</span> : null}
      </div>
    </section>
  )
}
