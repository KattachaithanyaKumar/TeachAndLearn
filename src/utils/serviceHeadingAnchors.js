function normalizeHeadingText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

export function slugifyHeading(value) {
  const normalized = normalizeHeadingText(value).toLowerCase();
  const slug = normalized
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "section";
}

function uniqueSlug(baseSlug, slugCounts) {
  const count = slugCounts.get(baseSlug) ?? 0;
  slugCounts.set(baseSlug, count + 1);
  return count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;
}

function withDocument(html, onDocument, fallbackValue) {
  if (!html || typeof window === "undefined" || typeof DOMParser === "undefined") {
    return fallbackValue;
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(String(html), "text/html");
  return onDocument(doc);
}

export function extractServiceHeadingAnchorsFromHtml(html) {
  return withDocument(
    html,
    (doc) => {
      const slugCounts = new Map();
      return Array.from(doc.querySelectorAll("h2, h3"))
        .map((node) => {
          const text = normalizeHeadingText(node.textContent);
          if (!text) return null;
          const existingId = String(node.getAttribute("id") ?? "").trim();
          // Prefer stable IDs already present in the content HTML (many editors pre-generate them).
          const baseId = existingId || slugifyHeading(text);
          const anchorId = uniqueSlug(baseId, slugCounts);
          return { text, anchorId, level: node.tagName.toLowerCase() };
        })
        .filter(Boolean);
    },
    [],
  );
}

export function injectHeadingAnchorsIntoHtml(html) {
  return withDocument(
    html,
    (doc) => {
      const slugCounts = new Map();
      doc.querySelectorAll("h2, h3").forEach((node) => {
        const text = normalizeHeadingText(node.textContent);
        if (!text) return;
        const existingId = String(node.getAttribute("id") ?? "").trim();
        const baseId = existingId || slugifyHeading(text);
        const anchorId = uniqueSlug(baseId, slugCounts);
        node.setAttribute("id", anchorId);
      });
      return doc.body.innerHTML;
    },
    String(html ?? ""),
  );
}
