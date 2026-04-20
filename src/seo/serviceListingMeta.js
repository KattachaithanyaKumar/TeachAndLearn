import { SITE_NAME } from "./staticMeta.js";

/** @param {Record<string, unknown>} doc */
export function serviceListingTitle(doc) {
  const prefix =
    doc.pageTitlePrefix || (String(doc.audience) === "adult" ? "Adult" : "Child");
  const accent = String(doc.pageTitleAccent || doc.title || "");
  const combined = `${prefix} ${accent}`.trim();
  return combined
    ? `${combined} | ${SITE_NAME}`
    : `${String(doc.title || "Service")} | ${SITE_NAME}`;
}

/** @param {Record<string, unknown>} doc */
export function serviceListingDescription(doc) {
  const d = doc.description || doc.heroTagline || doc.title || "";
  const s = String(d).trim();
  return s || `Services at ${SITE_NAME}, Hyderabad.`;
}
