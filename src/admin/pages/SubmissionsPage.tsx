import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { apiGet, apiPatch } from '../api/client'
import {
  type ContactSubmission,
  type SubmissionSort,
  filterSubmissions,
  formatDate,
  sortSubmissions,
  sourceLabel,
} from '../lib/submissionUtils'

function parseStatus(v: string | null): 'all' | 'open' | 'responded' {
  if (v === 'open' || v === 'responded') return v
  return 'all'
}

function parseSource(v: string | null): 'all' | 'contact_page' | 'home_book' {
  if (v === 'contact_page' || v === 'home_book') return v
  return 'all'
}

function parseSort(v: string | null): SubmissionSort {
  if (v === 'submitted_asc' || v === 'name_asc' || v === 'name_desc') return v
  return 'submitted_desc'
}

export default function SubmissionsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const status = parseStatus(searchParams.get('status'))
  const source = parseSource(searchParams.get('source'))
  const sort = parseSort(searchParams.get('sort'))
  const q = searchParams.get('q') ?? ''

  const setFilter = (key: string, value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (!value || value === 'all') {
          next.delete(key)
        } else {
          next.set(key, value)
        }
        return next
      },
      { replace: true },
    )
  }

  const setQuery = (value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        const t = value.trim()
        if (!t) next.delete('q')
        else next.set('q', t)
        return next
      },
      { replace: true },
    )
  }

  const clearFilters = () => {
    setSearchParams({}, { replace: true })
  }

  const setSortParam = (value: SubmissionSort) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value === 'submitted_desc') next.delete('sort')
        else next.set('sort', value)
        return next
      },
      { replace: true },
    )
  }

  const [rows, setRows] = useState<ContactSubmission[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [toggleErr, setToggleErr] = useState<string | null>(null)

  const load = useCallback(() => {
    setError(null)
    apiGet<ContactSubmission[]>('/api/contact-submissions')
      .then(setRows)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filtered = useMemo(() => {
    if (!rows) return []
    const list = filterSubmissions(rows, { status, source, q })
    return sortSubmissions(list, sort)
  }, [rows, status, source, q, sort])

  const toggleResponded = async (row: ContactSubmission) => {
    const next = !row.responded
    setUpdatingId(row._id)
    setToggleErr(null)
    try {
      await apiPatch(`/api/documents/${row._id}`, {
        fields: {
          responded: next,
          respondedAt: next ? new Date().toISOString() : null,
        },
      })
      setRows((prev) =>
        prev
          ? prev.map((s) =>
              s._id === row._id
                ? {
                    ...s,
                    responded: next,
                    respondedAt: next ? new Date().toISOString() : undefined,
                  }
                : s,
            )
          : prev,
      )
    } catch (e) {
      setToggleErr(e instanceof Error ? e.message : 'Update failed')
    } finally {
      setUpdatingId(null)
    }
  }

  const hasActiveFilters =
    status !== 'all' || source !== 'all' || q.trim().length > 0

  if (rows === null && !error) {
    return (
      <div className="page">
        <h1 className="page-title">Form submissions</h1>
        <p>Loading…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page">
        <h1 className="page-title">Form submissions</h1>
        <p className="text-error">{error}</p>
        <button type="button" className="btn" onClick={load}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="page-title">Form submissions</h1>
      <p className="muted">
        Inquiries from the public site (<code>contact_submission</code>). Filters apply in the
        browser; the URL reflects filters and sort so you can bookmark or share a view.
      </p>

      <div className="filter-bar card">
        <div className="filter-row">
          <label className="filter-field">
            <span className="field-label">Status</span>
            <select
              className="input select"
              value={status}
              onChange={(e) => setFilter('status', e.target.value)}
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="responded">Responded</option>
            </select>
          </label>
          <label className="filter-field">
            <span className="field-label">Source</span>
            <select
              className="input select"
              value={source}
              onChange={(e) => setFilter('source', e.target.value)}
            >
              <option value="all">All sources</option>
              <option value="contact_page">Contact page</option>
              <option value="home_book">Home · Quick appointment</option>
            </select>
          </label>
          <label className="filter-field">
            <span className="field-label">Order</span>
            <select
              className="input select"
              value={sort}
              onChange={(e) => setSortParam(e.target.value as SubmissionSort)}
            >
              <option value="submitted_desc">Newest submitted first</option>
              <option value="submitted_asc">Oldest submitted first</option>
              <option value="name_asc">Name A–Z</option>
              <option value="name_desc">Name Z–A</option>
            </select>
          </label>
          <label className="filter-field filter-grow">
            <span className="field-label">Search</span>
            <input
              type="search"
              className="input"
              placeholder="Name, email, phone, message…"
              value={q}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <div className="filter-actions">
          <p className="filter-count muted">
            Showing <strong>{filtered.length}</strong> of <strong>{rows?.length ?? 0}</strong>{' '}
            submissions
          </p>
          {hasActiveFilters ? (
            <button type="button" className="btn btn-secondary btn-sm" onClick={clearFilters}>
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {toggleErr ? <p className="text-error">{toggleErr}</p> : null}

      {!rows?.length ? (
        <p className="muted">No submissions yet.</p>
      ) : filtered.length === 0 ? (
        <p className="muted">No submissions match the current filters.</p>
      ) : (
        <ul className="submission-list">
          {filtered.map((s) => (
            <li key={s._id} className="card submission-card">
              <div className="submission-head">
                <div>
                  <strong>{s.name ?? '—'}</strong>
                  <span className={`submission-badge ${s.responded ? 'done' : 'open'}`}>
                    {s.responded ? 'Responded' : 'Open'}
                  </span>
                </div>
                <div className="submission-meta">
                  <span>{formatDate(s.submittedAt)}</span>
                  <span className="muted">{sourceLabel(s.source)}</span>
                </div>
              </div>
              <dl className="submission-dl">
                <div>
                  <dt>Email</dt>
                  <dd>{s.email ?? '—'}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>{s.contact ?? '—'}</dd>
                </div>
                {s.service ? (
                  <div>
                    <dt>Service</dt>
                    <dd>{s.service}</dd>
                  </div>
                ) : null}
                {s.respondedAt ? (
                  <div>
                    <dt>Responded at</dt>
                    <dd>{formatDate(s.respondedAt)}</dd>
                  </div>
                ) : null}
              </dl>
              <div className="submission-message">
                <span className="field-label">Message</span>
                <p className="submission-message-body">{s.message ?? '—'}</p>
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                disabled={updatingId === s._id}
                onClick={() => toggleResponded(s)}
              >
                {updatingId === s._id
                  ? 'Updating…'
                  : s.responded
                    ? 'Mark as open'
                    : 'Mark as responded'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
