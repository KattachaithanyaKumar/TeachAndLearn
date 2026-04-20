/**
 * One-time migration: uploads local images and creates/replaces service_listing_item docs.
 *
 * Requires env (same as Vite): VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET, VITE_SANITY_API_VERSION,
 * and VITE_SANITY_WRITE_TOKEN (or SANITY_* aliases).
 *
 * Run from repo root: node scripts/import-service-detail-pages.mjs
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { dirname, join } from "path";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Avoid `import-src_assets_foo.jpg.jpg` — strip extension before sanitizing, then add once. */
function safeUploadFilename(relPath) {
  const normalized = relPath.replace(/^\//, "").replace(/\\/g, "/");
  const lastDot = normalized.lastIndexOf(".");
  const stem = lastDot > 0 ? normalized.slice(0, lastDot) : normalized;
  const ext = lastDot > 0 ? normalized.slice(lastDot + 1) : "png";
  const safeStem = stem.replace(/[^a-z0-9.-]/gi, "_");
  return `import-${safeStem}.${ext}`;
}
import { fileURLToPath } from "url";
import { services } from "./import-service-pages-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

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

const projectId =
  process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || "production";
const apiVersion =
  process.env.VITE_SANITY_API_VERSION || process.env.SANITY_API_VERSION || "2024-01-01";
const token =
  process.env.VITE_SANITY_WRITE_TOKEN ||
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing VITE_SANITY_PROJECT_ID or VITE_SANITY_WRITE_TOKEN (or SANITY_* aliases).");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function uploadImageFromPath(relPath) {
  const abs = join(root, relPath.replace(/^\//, ""));
  const buf = readFileSync(abs);
  const filename = safeUploadFilename(relPath);

  const maxAttempts = 6;
  let lastErr;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const asset = await client.assets.upload("image", buf, { filename });
      return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
    } catch (e) {
      lastErr = e;
      const code = e?.statusCode ?? e?.response?.statusCode;
      const retryable =
        code === 502 ||
        code === 503 ||
        code === 504 ||
        code === 429 ||
        code === 408 ||
        (typeof e?.message === "string" && /invalid response|upstream|timeout/i.test(e.message));
      if (!retryable || attempt === maxAttempts - 1) throw e;
      const delayMs = Math.min(45_000, 1500 * 2 ** attempt);
      console.warn(
        `  Asset upload retry ${attempt + 1}/${maxAttempts - 1} for ${relPath} (${code ?? "error"}) in ${delayMs}ms…`,
      );
      await sleep(delayMs);
    }
  }
  throw lastErr;
}

async function transformLocalImages(obj) {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return Promise.all(obj.map(transformLocalImages));
  if (typeof obj === "object") {
    if (typeof obj.localImagePath === "string") {
      return uploadImageFromPath(obj.localImagePath);
    }
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      out[k] = await transformLocalImages(v);
    }
    return out;
  }
  return obj;
}

function docIdFor(audience, pathSegment) {
  const safe = String(pathSegment).replace(/[^a-z0-9-]/gi, "-");
  return `service-page-${audience}-${safe}`;
}

async function main() {
  for (const raw of services) {
    const { audience, pathSegment, ...rest } = raw;
    const _id = docIdFor(audience, pathSegment);
    const payload = await transformLocalImages(rest);
    const doc = {
      _id,
      _type: "service_listing_item",
      audience,
      pathSegment,
      ...payload,
    };
    await client.createOrReplace(doc);
    console.log("OK", _id);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
