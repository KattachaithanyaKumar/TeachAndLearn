export function formatIstLong(isoString) {
  const iso = typeof isoString === 'string' ? isoString : ''
  const d = iso ? new Date(iso) : null
  if (!d || Number.isNaN(d.getTime())) return iso || '—'
  const fmt = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  })
  return fmt.format(d).replace(/GMT\+5:30/i, 'IST')
}

