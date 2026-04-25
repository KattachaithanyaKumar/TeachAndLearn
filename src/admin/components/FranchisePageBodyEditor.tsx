import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { apiPatch } from '../api/client'
import { mergeFranchisePageBody, type FranchiseMergedPageBody } from '../../data/franchisePageCopy'

export type FranchisePageBody = {
  heroTitle?: string
  heroLead?: string
  valueChecks?: string[]
  phoneDisplay?: string
  phoneTel?: string
  ctaApplyLabel?: string
  ctaTalkLabel?: string
  sectionWhyTitle?: string
  sectionWhyBody?: string
  sectionImpactTitle?: string
  sectionImpactBody?: string
  sectionTrustTitle?: string
  sectionTrustBody?: string
  sectionTrustPartner?: string
  sectionFacilityTitle?: string
  facilityLines?: string[]
  sectionJoinTitle?: string
  sectionJoinBody?: string
  sectionPartnersTitle?: string
  partnerCriteria?: string[]
} | null

function linesToText(lines: string[]) {
  return lines.join('\n')
}

function textToLines(text: string) {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

type Props = {
  franchiseId: string
  pageBody: FranchisePageBody
  onSaved: () => void
}

export default function FranchisePageBodyEditor({ franchiseId, pageBody, onSaved }: Props) {
  const merged = mergeFranchisePageBody(pageBody ?? undefined)

  const [heroTitle, setHeroTitle] = useState(merged.heroTitle)
  const [heroLead, setHeroLead] = useState(merged.heroLead)
  const [valueChecksText, setValueChecksText] = useState(linesToText(merged.valueChecks))
  const [phoneDisplay, setPhoneDisplay] = useState(merged.phoneDisplay)
  const [phoneTel, setPhoneTel] = useState(merged.phoneTel)
  const [ctaApplyLabel, setCtaApplyLabel] = useState(merged.ctaApplyLabel)
  const [ctaTalkLabel, setCtaTalkLabel] = useState(merged.ctaTalkLabel)
  const [sectionWhyTitle, setSectionWhyTitle] = useState(merged.sectionWhyTitle)
  const [sectionWhyBody, setSectionWhyBody] = useState(merged.sectionWhyBody)
  const [sectionImpactTitle, setSectionImpactTitle] = useState(merged.sectionImpactTitle)
  const [sectionImpactBody, setSectionImpactBody] = useState(merged.sectionImpactBody)
  const [sectionTrustTitle, setSectionTrustTitle] = useState(merged.sectionTrustTitle)
  const [sectionTrustBody, setSectionTrustBody] = useState(merged.sectionTrustBody)
  const [sectionTrustPartner, setSectionTrustPartner] = useState(merged.sectionTrustPartner)
  const [sectionFacilityTitle, setSectionFacilityTitle] = useState(merged.sectionFacilityTitle)
  const [facilityLinesText, setFacilityLinesText] = useState(linesToText(merged.facilityLines))
  const [sectionJoinTitle, setSectionJoinTitle] = useState(merged.sectionJoinTitle)
  const [sectionJoinBody, setSectionJoinBody] = useState(merged.sectionJoinBody)
  const [sectionPartnersTitle, setSectionPartnersTitle] = useState(merged.sectionPartnersTitle)
  const [partnerCriteriaText, setPartnerCriteriaText] = useState(linesToText(merged.partnerCriteria))

  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const hydrateFromMerged = useCallback((m: FranchiseMergedPageBody) => {
    setHeroTitle(m.heroTitle)
    setHeroLead(m.heroLead)
    setValueChecksText(linesToText(m.valueChecks))
    setPhoneDisplay(m.phoneDisplay)
    setPhoneTel(m.phoneTel)
    setCtaApplyLabel(m.ctaApplyLabel)
    setCtaTalkLabel(m.ctaTalkLabel)
    setSectionWhyTitle(m.sectionWhyTitle)
    setSectionWhyBody(m.sectionWhyBody)
    setSectionImpactTitle(m.sectionImpactTitle)
    setSectionImpactBody(m.sectionImpactBody)
    setSectionTrustTitle(m.sectionTrustTitle)
    setSectionTrustBody(m.sectionTrustBody)
    setSectionTrustPartner(m.sectionTrustPartner)
    setSectionFacilityTitle(m.sectionFacilityTitle)
    setFacilityLinesText(linesToText(m.facilityLines))
    setSectionJoinTitle(m.sectionJoinTitle)
    setSectionJoinBody(m.sectionJoinBody)
    setSectionPartnersTitle(m.sectionPartnersTitle)
    setPartnerCriteriaText(linesToText(m.partnerCriteria))
  }, [])

  useEffect(() => {
    hydrateFromMerged(mergeFranchisePageBody(pageBody ?? undefined))
  }, [franchiseId, pageBody, hydrateFromMerged])

  const resetToDefaults = () => {
    hydrateFromMerged(mergeFranchisePageBody(null))
    setMsg('Form reset to built-in defaults (click Save to write to Sanity).')
  }

  const save = async () => {
    setStatus('saving')
    setMsg('')
    const valueChecks = textToLines(valueChecksText)
    const facilityLines = textToLines(facilityLinesText)
    const partnerCriteria = textToLines(partnerCriteriaText)
    if (valueChecks.length === 0) {
      setStatus('error')
      setMsg('Add at least one value-check line.')
      return
    }
    if (facilityLines.length === 0 || partnerCriteria.length === 0) {
      setStatus('error')
      setMsg('Facility lines and partner criteria need at least one line each.')
      return
    }
    const nextBody = {
      heroTitle,
      heroLead,
      valueChecks,
      phoneDisplay,
      phoneTel,
      ctaApplyLabel,
      ctaTalkLabel,
      sectionWhyTitle,
      sectionWhyBody,
      sectionImpactTitle,
      sectionImpactBody,
      sectionTrustTitle,
      sectionTrustBody,
      sectionTrustPartner,
      sectionFacilityTitle,
      facilityLines,
      sectionJoinTitle,
      sectionJoinBody,
      sectionPartnersTitle,
      partnerCriteria,
    }
    try {
      await apiPatch(`/api/documents/${franchiseId}`, { fields: { pageBody: nextBody } })
      setStatus('idle')
      setMsg('Saved. Public /franchises will use this copy.')
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

  return (
    <section className="card">
      <h3 className="card-title">Franchises page body</h3>
      <p className="muted small mb-4">
        This content is shown on the public <code>/franchises</code> page (hero, CTAs, phone link, and sections below).
        Apply still scrolls to the inquiry form; Talk still links to <code>/contact-us#contact-form</code>.
      </p>

      <div className="field-grid">
        {field(
          'Hero title',
          <textarea className="textarea" rows={2} value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />,
        )}
        {field(
          'Hero lead',
          <textarea className="textarea" rows={4} value={heroLead} onChange={(e) => setHeroLead(e.target.value)} />,
        )}
        {field(
          'Value checks (one line each)',
          <textarea
            className="textarea"
            rows={4}
            value={valueChecksText}
            onChange={(e) => setValueChecksText(e.target.value)}
          />,
        )}
        {field(
          'Phone — display',
          <input className="input" value={phoneDisplay} onChange={(e) => setPhoneDisplay(e.target.value)} />,
        )}
        {field(
          'Phone — tel href',
          <input className="input" value={phoneTel} onChange={(e) => setPhoneTel(e.target.value)} />,
        )}
        {field(
          'CTA — Apply label',
          <input className="input" value={ctaApplyLabel} onChange={(e) => setCtaApplyLabel(e.target.value)} />,
        )}
        {field(
          'CTA — Talk label',
          <input className="input" value={ctaTalkLabel} onChange={(e) => setCtaTalkLabel(e.target.value)} />,
        )}
        {field(
          'Why — title',
          <input className="input" value={sectionWhyTitle} onChange={(e) => setSectionWhyTitle(e.target.value)} />,
        )}
        {field(
          'Why — body',
          <textarea className="textarea" rows={5} value={sectionWhyBody} onChange={(e) => setSectionWhyBody(e.target.value)} />,
        )}
        {field(
          'Impact — title',
          <input className="input" value={sectionImpactTitle} onChange={(e) => setSectionImpactTitle(e.target.value)} />,
        )}
        {field(
          'Impact — body',
          <textarea className="textarea" rows={5} value={sectionImpactBody} onChange={(e) => setSectionImpactBody(e.target.value)} />,
        )}
        {field(
          'Trust — title',
          <input className="input" value={sectionTrustTitle} onChange={(e) => setSectionTrustTitle(e.target.value)} />,
        )}
        {field(
          'Trust — body',
          <textarea className="textarea" rows={4} value={sectionTrustBody} onChange={(e) => setSectionTrustBody(e.target.value)} />,
        )}
        {field(
          'Trust — partner paragraph',
          <textarea
            className="textarea"
            rows={4}
            value={sectionTrustPartner}
            onChange={(e) => setSectionTrustPartner(e.target.value)}
          />,
        )}
        {field(
          'Facility — title',
          <input className="input" value={sectionFacilityTitle} onChange={(e) => setSectionFacilityTitle(e.target.value)} />,
        )}
        {field(
          'Facility — bullets (one line each)',
          <textarea
            className="textarea"
            rows={6}
            value={facilityLinesText}
            onChange={(e) => setFacilityLinesText(e.target.value)}
          />,
        )}
        {field(
          'Join — title',
          <input className="input" value={sectionJoinTitle} onChange={(e) => setSectionJoinTitle(e.target.value)} />,
        )}
        {field(
          'Join — body',
          <textarea className="textarea" rows={4} value={sectionJoinBody} onChange={(e) => setSectionJoinBody(e.target.value)} />,
        )}
        {field(
          'Partners — title',
          <input className="input" value={sectionPartnersTitle} onChange={(e) => setSectionPartnersTitle(e.target.value)} />,
        )}
        {field(
          'Partners — bullets (one line each)',
          <textarea
            className="textarea"
            rows={8}
            value={partnerCriteriaText}
            onChange={(e) => setPartnerCriteriaText(e.target.value)}
          />,
        )}
      </div>

      <div className="row" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
        <button type="button" className="btn" onClick={() => void save()} disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : 'Save page body'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={resetToDefaults}>
          Reset form to defaults
        </button>
        {msg ? <span className={status === 'error' ? 'text-error' : 'text-muted'}>{msg}</span> : null}
      </div>
    </section>
  )
}
