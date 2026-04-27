import { EDUCATION_LEVELS, INDIAN_STATES } from '../../constants/indianStates.js'

export { EDUCATION_LEVELS, INDIAN_STATES }

export type FranchiseInquiry = {
  _id: string
  name?: string
  email?: string
  mobile?: string
  dob?: string
  education?: string
  currentState?: string
  currentDistrict?: string
  location?: string
  comments?: string
  submittedAt?: string
  responded?: boolean
  respondedAt?: string
}

export function formatDate(iso?: string) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export type FranchiseInquirySort =
  | 'submitted_desc'
  | 'submitted_asc'
  | 'name_asc'
  | 'name_desc'

export function sortInquiries(
  rows: FranchiseInquiry[],
  sort: FranchiseInquirySort,
): FranchiseInquiry[] {
  const out = [...rows]
  const submittedTs = (r: FranchiseInquiry) => {
    const t = r.submittedAt ? Date.parse(r.submittedAt) : 0
    return Number.isNaN(t) ? 0 : t
  }
  const nameKey = (r: FranchiseInquiry) => (r.name ?? '').toLowerCase().trim()
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

function educationMatchesFilter(rowEducation: string | undefined, educationFilter: string) {
  if (educationFilter === 'all') return true
  const level = EDUCATION_LEVELS.find((o) => o.value === educationFilter)
  if (!level) return true
  return rowEducation === level.label || rowEducation === level.value
}

export function filterInquiries(
  rows: FranchiseInquiry[],
  filters: {
    status: 'all' | 'open' | 'responded'
    state: 'all' | string
    education: 'all' | string
    q: string
  },
): FranchiseInquiry[] {
  const needle = filters.q.trim().toLowerCase()
  return rows.filter((r) => {
    if (filters.status === 'open' && r.responded) return false
    if (filters.status === 'responded' && !r.responded) return false
    if (filters.state !== 'all' && r.currentState !== filters.state) return false
    if (!educationMatchesFilter(r.education, filters.education)) return false
    if (!needle) return true
    const hay = [
      r.name,
      r.email,
      r.mobile,
      r.currentDistrict,
      r.location,
      r.comments,
      r.education,
      r.currentState,
      r.dob,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return hay.includes(needle)
  })
}
