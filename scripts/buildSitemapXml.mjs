/**
 * Shared sitemap URL list for post-build SEO and Vite dev server.
 */
import { createClient } from "@sanity/client";
import { STATIC_SEO_ROUTES } from "../src/seo/staticMeta.js";

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * @param {{ allowPartial?: boolean }} [options]
 *   If `allowPartial` is true (dev), missing Sanity or failed fetch yields static routes only.
 *   If false (production generate-seo), missing project id or fetch failure throws.
 */
async function fetchServiceItemsForSitemap(options) {
  const allowPartial = options?.allowPartial === true;
  const projectId = process.env.VITE_SANITY_PROJECT_ID;
  const dataset = process.env.VITE_SANITY_DATASET || "production";
  const apiVersion = process.env.VITE_SANITY_API_VERSION || "2024-01-01";
  if (!projectId) {
    if (allowPartial) return [];
    throw new Error("Missing VITE_SANITY_PROJECT_ID for sitemap");
  }
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  });
  try {
    return await client.fetch(
      `*[_type == "service_listing_item" && defined(pathSegment)]{
      audience,
      pathSegment,
      _updatedAt
    }`,
    );
  } catch (e) {
    if (allowPartial) {
      console.warn("buildSitemapXml: Sanity fetch failed; sitemap will omit service URLs.", e);
      return [];
    }
    throw e;
  }
}

/**
 * @param {string} siteUrl Absolute origin, no trailing slash (e.g. https://example.com or http://localhost:5173)
 * @param {{ allowPartial?: boolean; serviceDocs?: unknown[] }} [options]
 *   Pass `serviceDocs` from generate-seo (same Sanity query) to avoid a second fetch.
 * @returns {Promise<string>}
 */
export async function buildSitemapXml(siteUrl, options) {
  const base = String(siteUrl || "").replace(/\/+$/, "");
  if (!base || !/^https?:\/\//i.test(base)) {
    throw new Error("buildSitemapXml: siteUrl must be an absolute http(s) URL");
  }

  const buildDate = new Date().toISOString().slice(0, 10);
  /** @type {{ loc: string; lastmod: string }[]} */
  const sitemapUrls = [];

  for (const row of STATIC_SEO_ROUTES) {
    const path = row.path;
    const canonicalUrl = path === "/" ? base : `${base}${path}`;
    sitemapUrls.push({ loc: canonicalUrl, lastmod: buildDate });
  }

  const serviceDocs = Array.isArray(options?.serviceDocs)
    ? options.serviceDocs
    : await fetchServiceItemsForSitemap(options);

  for (const doc of serviceDocs) {
    const seg = String(doc.pathSegment || "").trim();
    if (!seg) continue;
    const audience = doc.audience === "adult" ? "adult" : "child";
    const slug = audience === "child" ? "child-services" : "adult-services";
    const routePath = `/${slug}/${seg}`;
    const canonicalUrl = `${base}${routePath}`;
    const lastmod =
      typeof doc._updatedAt === "string" ? doc._updatedAt.slice(0, 10) : buildDate;
    sitemapUrls.push({ loc: canonicalUrl, lastmod });
  }

  sitemapUrls.sort((a, b) => a.loc.localeCompare(b.loc));

  const urlset = sitemapUrls
    .map(
      (u) =>
        `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${escapeXml(u.lastmod)}</lastmod>\n  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>
`;
}
