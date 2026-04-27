import nodemailer from 'nodemailer'
import { trimEnv } from './envUtil.js'

function parseEmailList(value) {
  const raw = trimEnv(typeof value === 'string' ? value : '')
  const parts = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  return parts.length > 0 ? parts : null
}

function smtpConfigFromEnv() {
  const host = trimEnv(process.env.SMTP_HOST)
  const port = Number(trimEnv(process.env.SMTP_PORT) || '0')
  const user = trimEnv(process.env.SMTP_USER)
  const pass = trimEnv(process.env.SMTP_PASS)

  if (!host || !port) return null
  if (!user || !pass) return null

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  }
}

export function getRecipientForContactSubmission(source) {
  if (source === 'home_book') return parseEmailList(process.env.CONTACT_SUBMISSION_TO_HOME_BOOK)
  if (source === 'contact_page') return parseEmailList(process.env.CONTACT_SUBMISSION_TO_CONTACT_PAGE)
  return parseEmailList(process.env.CONTACT_SUBMISSION_TO_DEFAULT)
}

export function getRecipientForFranchiseInquiry() {
  return parseEmailList(process.env.FRANCHISE_INQUIRY_TO) || parseEmailList(process.env.CONTACT_SUBMISSION_TO_DEFAULT)
}

export async function sendEmail({ to, subject, text, replyTo, headers }) {
  const from = trimEnv(process.env.SMTP_FROM)
  const cc = parseEmailList(process.env.FORM_EMAIL_CC)

  const smtp = smtpConfigFromEnv()
  if (!smtp || !from) {
    return { emailed: false, reason: 'SMTP_NOT_CONFIGURED' }
  }
  if (!to || to.length === 0) {
    return { emailed: false, reason: 'NO_RECIPIENT' }
  }

  const transporter = nodemailer.createTransport(smtp)
  const info = await transporter.sendMail({
    from,
    to,
    cc: cc || undefined,
    subject,
    text,
    replyTo: replyTo || undefined,
    headers: headers && typeof headers === 'object' ? headers : undefined,
  })

  return { emailed: true, messageId: info?.messageId }
}

