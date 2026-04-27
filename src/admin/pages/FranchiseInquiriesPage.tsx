import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { apiGet, apiPatch } from '../api/client'
import {
  type FranchiseInquiry,
  type FranchiseInquirySort,
  EDUCATION_LEVELS,
  INDIAN_STATES,
  filterInquiries,
  formatDate,
  sortInquiries,
} from '../lib/franchiseInquiryUtils'

function parseStatus(v: string | null): 'all' | 'open' | 'responded' {
  if (v === 'open' || v === 'responded') return v
  return 'all'
}

function parseState(v: string | null): 'all' | string {
  if (!v || v === 'all') return 'all'
  return INDIAN_STATES.includes(v) ? v : 'all'
}

function parseEducation(v: string | null): 'all' | string {
  if (!v || v === 'all') return 'all'
  return EDUCATION_LEVELS.some((o) => o.value === v) ? v : 'all'
}

function parseSort(v: string | null): FranchiseInquirySort {
  if (v === 'submitted_asc' || v === 'name_asc' || v === 'name_desc') return v
  return 'submitted_desc'
}

export default function FranchiseInquiriesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const status = parseStatus(searchParams.get('status'))
  const stateFilter = parseState(searchParams.get('state'))
  const education = parseEducation(searchParams.get('education'))
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

  const setSortParam = (value: FranchiseInquirySort) => {
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

  const [rows, setRows] = useState<FranchiseInquiry[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [toggleErr, setToggleErr] = useState<string | null>(null)

  const load = useCallback(() => {
    setError(null)
    apiGet<FranchiseInquiry[]>('/api/franchise-inquiries')
      .then(setRows)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filtered = useMemo(() => {
    if (!rows) return []
    const list = filterInquiries(rows, { status, state: stateFilter, education, q })
    return sortInquiries(list, sort)
  }, [rows, status, stateFilter, education, q, sort])

  const toggleResponded = async (row: FranchiseInquiry) => {
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
    status !== 'all' || stateFilter !== 'all' || education !== 'all' || q.trim().length > 0

  if (rows === null && !error) {
    return (
      <div className="page">
        <h1 className="page-title">Franchise inquiries</h1>
        <p>Loading…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page">
        <h1 className="page-title">Franchise inquiries</h1>
        <p className="text-error">{error}</p>
        <button type="button" className="btn" onClick={load}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="page-title">Franchise inquiries</h1>
      <p className="muted">
        Submissions from the franchise page form (<code>franchise_inquiry</code>). Filters apply in
        the browser; the URL reflects filters and sort so you can bookmark or share a view.
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
            <span className="field-label">State</span>
            <select
              className="input select"
              value={stateFilter}
              onChange={(e) => setFilter('state', e.target.value)}
            >
              <option value="all">All states</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="filter-field">
            <span className="field-label">Education</span>
            <select
              className="input select"
              value={education}
              onChange={(e) => setFilter('education', e.target.value)}
            >
              <option value="all">All levels</option>
              {EDUCATION_LEVELS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <label className="filter-field">
            <span className="field-label">Order</span>
            <select
              className="input select"
              value={sort}
              onChange={(e) => setSortParam(e.target.value as FranchiseInquirySort)}
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
              placeholder="Name, email, phone, district, location, message…"
              value={q}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <div className="filter-actions">
          <p className="filter-count muted">
            Showing <strong>{filtered.length}</strong> of <strong>{rows?.length ?? 0}</strong>{' '}
            inquiries
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
        <p className="muted">No franchise inquiries yet.</p>
      ) : filtered.length === 0 ? (
        <p className="muted">No inquiries match the current filters.</p>
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
                </div>
              </div>
              <dl className="submission-dl">
                <div>
                  <dt>Email</dt>
                  <dd>{s.email ?? '—'}</dd>
                </div>
                <div>
                  <dt>Mobile</dt>
                  <dd>{s.mobile ?? '—'}</dd>
                </div>
                <div>
                  <dt>Date of birth</dt>
                  <dd>{s.dob ? formatDate(`${s.dob}T12:00:00`) : '—'}</dd>
                </div>
                <div>
                  <dt>Education</dt>
                  <dd>{s.education ?? '—'}</dd>
                </div>
                <div>
                  <dt>State</dt>
                  <dd>{s.currentState ?? '—'}</dd>
                </div>
                <div>
                  <dt>District</dt>
                  <dd>{s.currentDistrict ?? '—'}</dd>
                </div>
                <div>
                  <dt>Preferred location</dt>
                  <dd>{s.location ?? '—'}</dd>
                </div>
                {s.respondedAt ? (
                  <div>
                    <dt>Responded at</dt>
                    <dd>{formatDate(s.respondedAt)}</dd>
                  </div>
                ) : null}
              </dl>
              <div className="submission-message">
                <span className="field-label">Message</span>
                <p className="submission-message-body">{s.comments ?? '—'}</p>
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                disabled={updatingId === s._id}
                onClick={() => void toggleResponded(s)}
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
