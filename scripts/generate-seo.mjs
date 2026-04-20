/**
 * Post-build: inject Open Graph / Twitter meta into dist HTML per route, sitemap.xml, robots.txt.
 *
 * Requires: VITE_SITE_URL (no trailing slash), VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET, VITE_SANITY_API_VERSION
 *
 * Run: node scripts/generate-seo.mjs (after `vite build`)
 */
import { createClient } from "@sanity/client";
import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { existsSync, readFileSync } from "fs";

import { SITE_NAME, STATIC_SEO_ROUTES } from "../src/seo/staticMeta.js";
import {
  serviceListingDescription,
  serviceListingTitle,
} from "../src/seo/serviceListingMeta.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");

function loadEnvFromDotenv() {
  const p = join(root, ".env");
  if (!existsSync(p)) return;
  const raw = readFileSync(p, "utf8");
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvFromDotenv();

function normalizeSiteUrl(raw) {
  if (!raw || typeof raw !== "string") return "";
  let s = raw.trim();
  if (!s) return "";
  s = s.replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(s)) {
    throw new Error(
      "VITE_SITE_URL must be an absolute URL (e.g. https://www.example.com)",
    );
  }
  return s;
}

function escapeHtmlAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtmlText(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function pathToDistHtml(routePath) {
  if (routePath === "/") return join(dist, "index.html");
  const segments = routePath.replace(/^\/+/, "").split("/").filter(Boolean);
  return join(dist, ...segments, "index.html");
}

function buildHeadInjection({ title, description, canonicalUrl, imageUrl }) {
  const t = escapeHtmlAttr(title);
  const d = escapeHtmlAttr(description);
  const u = escapeHtmlAttr(canonicalUrl);
  const img = escapeHtmlAttr(imageUrl);
  const site = escapeHtmlAttr(SITE_NAME);
  return `
    <!-- SEO_META -->
    <meta name="description" content="${d}" />
    <link rel="canonical" href="${u}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${site}" />
    <meta property="og:title" content="${t}" />
    <meta property="og:description" content="${d}" />
    <meta property="og:url" content="${u}" />
    <meta property="og:image" content="${img}" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${t}" />
    <meta name="twitter:description" content="${d}" />
    <meta name="twitter:image" content="${img}" />
    <!-- END_SEO_META -->
`;
}

function injectIntoHtml(template, { title, description, canonicalUrl, imageUrl }) {
  const headBlock = buildHeadInjection({ title, description, canonicalUrl, imageUrl });
  let out = template;
  out = out.replace(/<!--\s*SEO_META\s*-->[\s\S]*?<!--\s*END_SEO_META\s*-->/, "");
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtmlText(title)}</title>`);
  const injectPoint = out.indexOf("</head>");
  if (injectPoint === -1) throw new Error("dist/index.html missing </head>");
  out = out.slice(0, injectPoint) + headBlock + "\n  " + out.slice(injectPoint);
  return out;
}

async function fetchServiceItems() {
  const projectId = process.env.VITE_SANITY_PROJECT_ID;
  const dataset = process.env.VITE_SANITY_DATASET || "production";
  const apiVersion = process.env.VITE_SANITY_API_VERSION || "2024-01-01";
  if (!projectId) {
    throw new Error("Missing VITE_SANITY_PROJECT_ID for generate-seo.mjs");
  }
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  });
  return client.fetch(
    `*[_type == "service_listing_item" && defined(pathSegment)]{
      audience,
      pathSegment,
      title,
      description,
      heroTagline,
      pageTitlePrefix,
      pageTitleAccent,
      _updatedAt
    }`,
  );
}

async function main() {
  const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL);
  if (!siteUrl) {
    console.error(
      "generate-seo.mjs: VITE_SITE_URL is required (e.g. https://www.example.com). Set it in .env or Netlify build env.",
    );
    process.exit(1);
  }

  const indexPath = join(dist, "index.html");
  if (!existsSync(indexPath)) {
    console.error("generate-seo.mjs: dist/index.html not found. Run vite build first.");
    process.exit(1);
  }

  const template = await readFile(indexPath, "utf8");
  const defaultImageUrl = `${siteUrl}/og-default.jpg`;
  const buildDate = new Date().toISOString().slice(0, 10);

  /** @type {{ loc: string; lastmod: string }[]} */
  const sitemapUrls = [];

  for (const row of STATIC_SEO_ROUTES) {
    const path = row.path;
    const canonicalUrl = path === "/" ? siteUrl : `${siteUrl}${path}`;
    const html = injectIntoHtml(template, {
      title: row.title,
      description: row.description,
      canonicalUrl,
      imageUrl: defaultImageUrl,
    });
    const outFile = pathToDistHtml(path);
    await mkdir(dirname(outFile), { recursive: true });
    await writeFile(outFile, html, "utf8");
    sitemapUrls.push({ loc: canonicalUrl, lastmod: buildDate });
  }

  let serviceDocs = [];
  try {
    serviceDocs = await fetchServiceItems();
  } catch (e) {
    console.error("generate-seo.mjs: Sanity fetch failed:", e);
    process.exit(1);
  }

  for (const doc of serviceDocs) {
    const seg = String(doc.pathSegment || "").trim();
    if (!seg) continue;
    const audience = doc.audience === "adult" ? "adult" : "child";
    const base = audience === "child" ? "child-services" : "adult-services";
    const routePath = `/${base}/${seg}`;
    const title = serviceListingTitle(doc);
    const description = serviceListingDescription(doc);
    const canonicalUrl = `${siteUrl}${routePath}`;
    const lastmod =
      typeof doc._updatedAt === "string"
        ? doc._updatedAt.slice(0, 10)
        : buildDate;

    const html = injectIntoHtml(template, {
      title,
      description,
      canonicalUrl,
      imageUrl: defaultImageUrl,
    });
    const outFile = pathToDistHtml(routePath);
    await mkdir(dirname(outFile), { recursive: true });
    await writeFile(outFile, html, "utf8");
    sitemapUrls.push({ loc: canonicalUrl, lastmod });
  }

  sitemapUrls.sort((a, b) => a.loc.localeCompare(b.loc));

  const urlset = sitemapUrls
    .map(
      (u) =>
        `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${escapeXml(u.lastmod)}</lastmod>\n  </url>`,
    )
    .join("\n");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>
`;

  await writeFile(join(dist, "sitemap.xml"), sitemapXml, "utf8");

  const robots = `User-agent: *
Allow: /

Disallow: /admin/

Sitemap: ${siteUrl}/sitemap.xml
`;

  await writeFile(join(dist, "robots.txt"), robots, "utf8");

  console.log(
    `generate-seo.mjs: wrote ${STATIC_SEO_ROUTES.length} static + ${serviceDocs.length} service HTML files, sitemap.xml, robots.txt`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
