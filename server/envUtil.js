/**
 * Normalize env strings (Windows CRLF, accidental spaces, stray quotes in .env).
 * @param {string | undefined} v
 * @returns {string}
 */
export function trimEnv(v) {
  if (typeof v !== 'string') return ''
  let s = v.trim().replace(/\r$/, '')
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1)
  }
  return s
}
