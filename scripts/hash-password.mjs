/**
 * Usage: npm run hash-password -- "YourPassword"
 * Paste the printed hash into the admin_user document's passwordHash field in Sanity Studio.
 */
import bcrypt from 'bcryptjs'

const pwd = process.argv[2]
if (!pwd || pwd === '--help' || pwd === '-h') {
  console.error('Usage: npm run hash-password -- "YourPassword"')
  process.exit(pwd ? 0 : 1)
}

const hash = await bcrypt.hash(pwd, 10)
console.log(hash)
