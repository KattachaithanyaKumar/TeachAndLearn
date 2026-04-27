export type ContactSubmission = {
  _id: string
  name?: string
  contact?: string
  email?: string
  message?: string
  source?: string
  service?: string
  requestType?: string
  requestedServices?: string[]
  submittedAt?: string
  responded?: boolean
  respondedAt?: string
}

export function sourceLabel(source?: string) {
  if (source === 'home_book') return 'Home · Quick appointment'
  if (source === 'contact_page') return 'Contact page'
  return source ?? '—'
}

export function formatDate(iso?: string) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export type SubmissionSort =
  | 'submitted_desc'
  | 'submitted_asc'
  | 'name_asc'
  | 'name_desc'

export function sortSubmissions(
  rows: ContactSubmission[],
  sort: SubmissionSort,
): ContactSubmission[] {
  const out = [...rows]
  const submittedTs = (s: ContactSubmission) => {
    const t = s.submittedAt ? Date.parse(s.submittedAt) : 0
    return Number.isNaN(t) ? 0 : t
  }
  const nameKey = (s: ContactSubmission) => (s.name ?? '').toLowerCase().trim()
  switch (sort) {
    case 'submitted_asc':
      out.sort((a, b) => submittedTs(a) - submittedTs(b))
      break
    case 'name_asc':
      out.sort((a, b) => nameKey(a).localeCompare(nameKey(b)))
      break
    case 'name_desc':
      out.sort((a, b) => nameKey(b).localeCompare(nameKey(a)))
      break
    case 'submitted_desc':
    default:
      out.sort((a, b) => submittedTs(b) - submittedTs(a))
  }
  return out
}

export function filterSubmissions(
  rows: ContactSubmission[],
  filters: {
    status: 'all' | 'open' | 'responded'
    source: 'all' | 'contact_page' | 'home_book'
    q: string
  },
): ContactSubmission[] {
  const needle = filters.q.trim().toLowerCase()
  return rows.filter((s) => {
    if (filters.status === 'open' && s.responded) return false
    if (filters.status === 'responded' && !s.responded) return false
    if (filters.source !== 'all' && s.source !== filters.source) return false
    if (!needle) return true
    const hay = [
      s.name,
      s.email,
      s.contact,
      s.message,
      s.service,
      s.requestType,
      Array.isArray(s.requestedServices) ? s.requestedServices.join(' ') : undefined,
      sourceLabel(s.source),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return hay.includes(needle)
  })
}
