/**
 * Pushes the default About content (same as `aboutUs` in src/CONSTANTS.js) into Sanity.
 *
 * - Updates the first `about_us` block referenced on the `home` document when it exists.
 * - Otherwise creates `about_us` + `about_us_items` docs and sets `home.aboutUs[0]`.
 *
 * Requires: VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET, VITE_SANITY_API_VERSION,
 * VITE_SANITY_WRITE_TOKEN (or SANITY_* aliases). Loads .env from repo root.
 *
 * Run: node scripts/seed-about-us.mjs
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

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

/** Mirror of `aboutUs` in src/CONSTANTS.js — keep in sync when defaults change. */
const ABOUT_US_DEFAULTS = {
  title: "Top Choice For Children",
  description:
    "Our team of experienced and dedicated therapists is here to provide the guidance, support, and encouragement needed to overcome challenges and build skills. With our help, individuals can reach their goals and thrive.",
  aboutPageHeaderPrefix: "About",
  aboutPageHeaderHighlight: "Teach & Learn",
  aboutPageEyebrow: "About us",
  promiseEyebrow: "Our Promise",
  promiseHeading: "Providing Exceptional Care & Support Every Step of the Way",
  promiseBody:
    "Our promise to you is to provide exceptional care and support every step of the way. We are committed to helping individuals reach their full potential and achieve success in all areas of their lives.",
  visionTitle: "Our Vision",
  visionBody:
    "A world in which children with special needs recognize their abilities.",
  missionTitle: "Our Mission",
  missionBody:
    "To nurture children with special needs in a safe, inclusive and supportive environment, which will enable them to function with dignity at their highest potential.",
  items: [
    {
      title: "Great Staff",
      description: " Our carers respond every time with a big warm smile.",
    },
    {
      title: "Safety",
      description:
        "We keep your child safe and happy with careful supervision and child-friendly surroundings.",
    },
    {
      title: "Experience",
      description:
        "We provide enriching experiences that help children learn and thrive.",
    },
    {
      title: "Activities",
      description:
        "At our Teach And Learn, kids have fun while learning through various enjoyable activities.",
    },
  ],
};

function refKey() {
  return randomUUID().replace(/-/g, "").slice(0, 16);
}

async function patchItem(id, title, description) {
  await client.patch(id).set({ title, description: String(description).trim() }).commit();
}

async function createItem(title, description) {
  return client.create({
    _type: "about_us_items",
    title,
    description: String(description).trim(),
  });
}

async function main() {
  const home = await client.fetch(
    `*[_type == "home"][0]{
      _id,
      aboutUs[]->{
        _id,
        title,
        items[]->{ _id, title, description }
      }
    }`,
  );

  if (!home?._id) {
    console.error('No document of type "home" found. Create a Home document in Sanity first.');
    process.exit(1);
  }

  const firstBlock = home.aboutUs?.[0];
  const defaults = ABOUT_US_DEFAULTS;
  const itemDefaults = defaults.items;

  let aboutId = firstBlock?._id;
  const existingItems = firstBlock?.items ?? [];

  if (!aboutId) {
    console.log("No about_us linked on Home — creating documents…");
    const itemIds = [];
    for (const row of itemDefaults) {
      const doc = await createItem(row.title, row.description);
      itemIds.push(doc._id);
    }
    const itemRefs = itemIds.map((id) => ({
      _type: "reference",
      _ref: id,
      _key: refKey(),
    }));

    const created = await client.create({
      _type: "about_us",
      title: defaults.title,
      description: defaults.description,
      aboutPageHeaderPrefix: defaults.aboutPageHeaderPrefix,
      aboutPageHeaderHighlight: defaults.aboutPageHeaderHighlight,
      aboutPageEyebrow: defaults.aboutPageEyebrow,
      promiseEyebrow: defaults.promiseEyebrow,
      promiseHeading: defaults.promiseHeading,
      promiseBody: defaults.promiseBody,
      visionTitle: defaults.visionTitle,
      visionBody: defaults.visionBody,
      missionTitle: defaults.missionTitle,
      missionBody: defaults.missionBody,
      items: itemRefs,
    });
    aboutId = created._id;

    await client
      .patch(home._id)
      .set({
        aboutUs: [
          {
            _type: "reference",
            _ref: aboutId,
            _key: refKey(),
          },
        ],
      })
      .commit();
    console.log(`Created about_us ${aboutId} and linked it as home.aboutUs[0].`);
    return;
  }

  console.log(`Updating existing about_us ${aboutId}…`);

  for (let i = 0; i < itemDefaults.length; i++) {
    const row = itemDefaults[i];
    const existing = existingItems[i];
    if (existing?._id) {
      await patchItem(existing._id, row.title, row.description);
    } else {
      const doc = await createItem(row.title, row.description);
      await client
        .patch(aboutId)
        .append("items", [
          {
            _type: "reference",
            _ref: doc._id,
            _key: refKey(),
          },
        ])
        .commit();
    }
  }

  await client
    .patch(aboutId)
    .set({
      title: defaults.title,
      description: defaults.description,
      aboutPageHeaderPrefix: defaults.aboutPageHeaderPrefix,
      aboutPageHeaderHighlight: defaults.aboutPageHeaderHighlight,
      aboutPageEyebrow: defaults.aboutPageEyebrow,
      promiseEyebrow: defaults.promiseEyebrow,
      promiseHeading: defaults.promiseHeading,
      promiseBody: defaults.promiseBody,
      visionTitle: defaults.visionTitle,
      visionBody: defaults.visionBody,
      missionTitle: defaults.missionTitle,
      missionBody: defaults.missionBody,
    })
    .commit();

  console.log("Done. about_us document and items updated from CONSTANTS defaults.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
