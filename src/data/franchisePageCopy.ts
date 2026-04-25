/** Static marketing copy for /franchises; merged with Sanity `franchise.pageBody` when present. */

export const FRANCHISE_HERO_TITLE =
  "Start Your Own Teach and Learn Child Development Center in Your City";

export const FRANCHISE_HERO_LEAD =
  "Build a respected and rewarding center that supports children's growth while generating stable monthly income.";

export const FRANCHISE_VALUE_CHECKS = [
  "Proven Business Model",
  "Complete Training & Support",
  "Growing Demand Sector",
];

export const FRANCHISE_PHONE_DISPLAY = "+91 9581598942";
export const FRANCHISE_PHONE_TEL = "tel:+919581598942";

export const CTA_APPLY_LABEL = "Apply for Franchise";
export const CTA_TALK_LABEL = "Talk to Our Team";

export const SECTION_WHY_TITLE = "Why Teach and Learn?";
export const SECTION_WHY_BODY =
  "Teach and Learn CDC is a structured child development center for children aged 1–13 years, supporting both neurodivergent and typically developing children. Our approach combines therapy, learning, and early intervention to help children grow with confidence and reach their full potential.";

export const SECTION_IMPACT_TITLE = "Built for Impact. Designed for Scale.";
export const SECTION_IMPACT_BODY =
  "Our centers follow standardized processes for assessment, individualized planning, and session delivery, ensuring measurable outcomes for every child. For franchise partners, this structured system simplifies operations and enables consistent quality, making it easier to build a sustainable and impactful center.";

export const SECTION_TRUST_TITLE = "Trust Teach and Learn";
export const SECTION_TRUST_BODY =
  "We understand the trust parents place in us, and every center is built to deliver care with consistency and compassion. Through guided programs and structured support, we aim to make a meaningful difference in every child's life.";

export const SECTION_TRUST_PARTNER =
  "For our partners, this is not just a business—it is an opportunity to build a respected center in your community, backed by a proven system and continuous support.";

export const SECTION_FACILITY_TITLE = "Teach and Learn Facility Requirements";
export const FRANCHISE_FACILITY_LINES = [
  "2000 to 3500 SFT of Open Commercial Space",
  "25 Lakhs to 35 Lakhs in investment",
  "Must be in First Floor or Second Floor with Lift Option",
  "Must be a prime location which is easily accessible",
  "Must have Toilets, Air-Conditioning, Proper Ventilation, Parking facilities, etc.",
];

export const SECTION_JOIN_TITLE = "Join Teach and Learn in Making a Meaningful Difference";
export const SECTION_JOIN_BODY =
  "We are not just building centers—we are building a community that supports children and families through their most important journeys. We invite individuals who truly understand this responsibility and are passionate about creating impact.";

export const SECTION_PARTNERS_TITLE = "We are looking for partners who:";
export const FRANCHISE_PARTNER_CRITERIA = [
  "Empathize deeply with families navigating developmental challenges",
  "Believe in empowering children through structured support",
  "Bring professional integrity and a strong sense of responsibility",
  "Are willing to be actively involved in building and running the center",
  "Value transparency, honesty, and continuous self-improvement",
  "Possess strong leadership, people management, and communication skills",
  "Are ready to invest both financially and personally in this journey",
];

export type FranchiseMergedPageBody = {
  heroTitle: string;
  heroLead: string;
  valueChecks: string[];
  phoneDisplay: string;
  phoneTel: string;
  ctaApplyLabel: string;
  ctaTalkLabel: string;
  sectionWhyTitle: string;
  sectionWhyBody: string;
  sectionImpactTitle: string;
  sectionImpactBody: string;
  sectionTrustTitle: string;
  sectionTrustBody: string;
  sectionTrustPartner: string;
  sectionFacilityTitle: string;
  facilityLines: string[];
  sectionJoinTitle: string;
  sectionJoinBody: string;
  sectionPartnersTitle: string;
  partnerCriteria: string[];
};

/** Full default `pageBody` shape stored in Sanity and used when `pageBody` is missing. */
export const DEFAULT_FRANCHISE_PAGE_BODY: FranchiseMergedPageBody = {
  heroTitle: FRANCHISE_HERO_TITLE,
  heroLead: FRANCHISE_HERO_LEAD,
  valueChecks: [...FRANCHISE_VALUE_CHECKS],
  phoneDisplay: FRANCHISE_PHONE_DISPLAY,
  phoneTel: FRANCHISE_PHONE_TEL,
  ctaApplyLabel: CTA_APPLY_LABEL,
  ctaTalkLabel: CTA_TALK_LABEL,
  sectionWhyTitle: SECTION_WHY_TITLE,
  sectionWhyBody: SECTION_WHY_BODY,
  sectionImpactTitle: SECTION_IMPACT_TITLE,
  sectionImpactBody: SECTION_IMPACT_BODY,
  sectionTrustTitle: SECTION_TRUST_TITLE,
  sectionTrustBody: SECTION_TRUST_BODY,
  sectionTrustPartner: SECTION_TRUST_PARTNER,
  sectionFacilityTitle: SECTION_FACILITY_TITLE,
  facilityLines: [...FRANCHISE_FACILITY_LINES],
  sectionJoinTitle: SECTION_JOIN_TITLE,
  sectionJoinBody: SECTION_JOIN_BODY,
  sectionPartnersTitle: SECTION_PARTNERS_TITLE,
  partnerCriteria: [...FRANCHISE_PARTNER_CRITERIA],
};

export function mergeFranchisePageBody(pageBody: Record<string, unknown> | null | undefined): FranchiseMergedPageBody {
  const d = DEFAULT_FRANCHISE_PAGE_BODY;
  if (!pageBody || typeof pageBody !== "object") {
    return {
      ...d,
      valueChecks: [...d.valueChecks],
      facilityLines: [...d.facilityLines],
      partnerCriteria: [...d.partnerCriteria],
    };
  }

  const pickStr = (v: unknown, fallback: string) =>
    typeof v === "string" && v.trim() ? v.trim() : fallback;
  const pickArr = (v: unknown, fallback: string[]) =>
    Array.isArray(v) && v.length > 0 && v.every((x) => typeof x === "string")
      ? (v as string[]).map((s) => s.trim()).filter(Boolean)
      : [...fallback];

  return {
    heroTitle: pickStr(pageBody.heroTitle, d.heroTitle),
    heroLead: pickStr(pageBody.heroLead, d.heroLead),
    valueChecks: pickArr(pageBody.valueChecks, d.valueChecks),
    phoneDisplay: pickStr(pageBody.phoneDisplay, d.phoneDisplay),
    phoneTel: pickStr(pageBody.phoneTel, d.phoneTel),
    ctaApplyLabel: pickStr(pageBody.ctaApplyLabel, d.ctaApplyLabel),
    ctaTalkLabel: pickStr(pageBody.ctaTalkLabel, d.ctaTalkLabel),
    sectionWhyTitle: pickStr(pageBody.sectionWhyTitle, d.sectionWhyTitle),
    sectionWhyBody: pickStr(pageBody.sectionWhyBody, d.sectionWhyBody),
    sectionImpactTitle: pickStr(pageBody.sectionImpactTitle, d.sectionImpactTitle),
    sectionImpactBody: pickStr(pageBody.sectionImpactBody, d.sectionImpactBody),
    sectionTrustTitle: pickStr(pageBody.sectionTrustTitle, d.sectionTrustTitle),
    sectionTrustBody: pickStr(pageBody.sectionTrustBody, d.sectionTrustBody),
    sectionTrustPartner: pickStr(pageBody.sectionTrustPartner, d.sectionTrustPartner),
    sectionFacilityTitle: pickStr(pageBody.sectionFacilityTitle, d.sectionFacilityTitle),
    facilityLines: pickArr(pageBody.facilityLines, d.facilityLines),
    sectionJoinTitle: pickStr(pageBody.sectionJoinTitle, d.sectionJoinTitle),
    sectionJoinBody: pickStr(pageBody.sectionJoinBody, d.sectionJoinBody),
    sectionPartnersTitle: pickStr(pageBody.sectionPartnersTitle, d.sectionPartnersTitle),
    partnerCriteria: pickArr(pageBody.partnerCriteria, d.partnerCriteria),
  };
}
