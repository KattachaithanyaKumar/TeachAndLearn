import { SITE_NAME } from "./staticMeta.js";

function plainSnippet(text, maxLen = 200) {
  if (!text || typeof text !== "string") return "";
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= maxLen) return t;
  return `${t.slice(0, maxLen - 1).trim()}…`;
}

/** Strip common markdown tokens for a short meta description fallback. */
function stripMarkdownish(s) {
  return String(s || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_\-~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {{ title?: string } | null | undefined} doc */
export function servicePageTitle(doc) {
  const t = doc?.title?.trim();
  if (t) return `${t} | ${SITE_NAME}`;
  return SITE_NAME;
}

/** @param {{ subtitle?: string; body?: string } | null | undefined} doc */
export function servicePageDescription(doc) {
  const sub = doc?.subtitle?.trim();
  if (sub) return plainSnippet(sub, 300);
  const body = stripMarkdownish(doc?.body || "");
  if (body) return plainSnippet(body, 300);
  return `Therapy and support services — ${SITE_NAME}.`;
}
