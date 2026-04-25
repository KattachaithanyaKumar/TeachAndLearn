/**
 * Writes default `pageBody` onto the first `franchise` document (same defaults as
 * `src/data/franchisePageCopy.js` DEFAULT_FRANCHISE_PAGE_BODY).
 *
 * Run after deploying the Sanity schema change: `node scripts/seed-franchise-page-body.mjs`
 *
 * Requires: VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET, VITE_SANITY_API_VERSION,
 * VITE_SANITY_WRITE_TOKEN. Loads .env from repo root.
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

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

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET;
const apiVersion = process.env.VITE_SANITY_API_VERSION || process.env.SANITY_API_VERSION || "2024-01-01";
const token = process.env.VITE_SANITY_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing env: project/dataset/write token");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const pageBody = {
  heroTitle: "Start Your Own Teach and Learn Child Development Center in Your City",
  heroLead:
    "Build a respected and rewarding center that supports children's growth while generating stable monthly income.",
  valueChecks: ["Proven Business Model", "Complete Training & Support", "Growing Demand Sector"],
  phoneDisplay: "+91 9581598942",
  phoneTel: "tel:+919581598942",
  ctaApplyLabel: "Apply for Franchise",
  ctaTalkLabel: "Talk to Our Team",
  sectionWhyTitle: "Why Teach and Learn?",
  sectionWhyBody:
    "Teach and Learn CDC is a structured child development center for children aged 1–13 years, supporting both neurodivergent and typically developing children. Our approach combines therapy, learning, and early intervention to help children grow with confidence and reach their full potential.",
  sectionImpactTitle: "Built for Impact. Designed for Scale.",
  sectionImpactBody:
    "Our centers follow standardized processes for assessment, individualized planning, and session delivery, ensuring measurable outcomes for every child. For franchise partners, this structured system simplifies operations and enables consistent quality, making it easier to build a sustainable and impactful center.",
  sectionTrustTitle: "Trust Teach and Learn",
  sectionTrustBody:
    "We understand the trust parents place in us, and every center is built to deliver care with consistency and compassion. Through guided programs and structured support, we aim to make a meaningful difference in every child's life.",
  sectionTrustPartner:
    "For our partners, this is not just a business—it is an opportunity to build a respected center in your community, backed by a proven system and continuous support.",
  sectionFacilityTitle: "Teach and Learn Facility Requirements",
  facilityLines: [
    "2000 to 3500 SFT of Open Commercial Space",
    "25 Lakhs to 35 Lakhs in investment",
    "Must be in First Floor or Second Floor with Lift Option",
    "Must be a prime location which is easily accessible",
    "Must have Toilets, Air-Conditioning, Proper Ventilation, Parking facilities, etc.",
  ],
  sectionJoinTitle: "Join Teach and Learn in Making a Meaningful Difference",
  sectionJoinBody:
    "We are not just building centers—we are building a community that supports children and families through their most important journeys. We invite individuals who truly understand this responsibility and are passionate about creating impact.",
  sectionPartnersTitle: "We are looking for partners who:",
  partnerCriteria: [
    "Empathize deeply with families navigating developmental challenges",
    "Believe in empowering children through structured support",
    "Bring professional integrity and a strong sense of responsibility",
    "Are willing to be actively involved in building and running the center",
    "Value transparency, honesty, and continuous self-improvement",
    "Possess strong leadership, people management, and communication skills",
    "Are ready to invest both financially and personally in this journey",
  ],
};

const id = await client.fetch(`*[_type == "franchise"][0]._id`);
if (!id) {
  console.error("No franchise document found.");
  process.exit(1);
}

await client.patch(id).set({ pageBody }).commit();
console.log("Updated franchise", id, "with pageBody.");
