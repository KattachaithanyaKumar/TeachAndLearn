import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export function getNowDate() {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

const sanityConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: false,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
};

const client = createClient(sanityConfig);

const writeClient = createClient({
  ...sanityConfig,
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN,
});

const CONTACT_MAX = {
  name: 200,
  contact: 80,
  email: 320,
  message: 10000,
  service: 200,
};

/**
 * Creates a `contact_submission` document in Sanity. Requires `VITE_SANITY_WRITE_TOKEN`
 * (Editor token) and the site origin allowed under API → CORS in sanity.io/manage.
 * @param {object} params
 * @param {'contact_page'|'home_book'} [params.source]
 * @param {string} [params.service] Required when source is `home_book` (selected service name).
 */
export async function submitContactSubmission({
  name,
  contact,
  email,
  message,
  source,
  service,
}) {
  const token = import.meta.env.VITE_SANITY_WRITE_TOKEN?.trim();
  if (!token) {
    const err = new Error("MISSING_WRITE_TOKEN");
    err.code = "MISSING_WRITE_TOKEN";
    throw err;
  }

  const n = String(name ?? "").trim();
  const c = String(contact ?? "").trim();
  const em = String(email ?? "").trim();
  const m = String(message ?? "").trim();
  const svc = String(service ?? "").trim();

  if (!n || !c || !em || !m) {
    const err = new Error("Please fill in all required fields.");
    err.code = "VALIDATION";
    throw err;
  }
  if (source === "home_book" && !svc) {
    const err = new Error("Please select a service.");
    err.code = "VALIDATION";
    throw err;
  }
  if (n.length > CONTACT_MAX.name || c.length > CONTACT_MAX.contact) {
    const err = new Error("A field is too long.");
    err.code = "VALIDATION";
    throw err;
  }
  if (em.length > CONTACT_MAX.email || m.length > CONTACT_MAX.message) {
    const err = new Error("A field is too long.");
    err.code = "VALIDATION";
    throw err;
  }
  if (svc.length > CONTACT_MAX.service) {
    const err = new Error("A field is too long.");
    err.code = "VALIDATION";
    throw err;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
    const err = new Error("Please enter a valid email address.");
    err.code = "VALIDATION";
    throw err;
  }

  const doc = {
    _type: "contact_submission",
    name: n,
    contact: c,
    email: em,
    message: m,
    submittedAt: new Date().toISOString(),
    responded: false,
  };
  if (source === "contact_page" || source === "home_book") {
    doc.source = source;
  }
  if (svc) {
    doc.service = svc;
  }

  return writeClient.create(doc);
}

export function getContactUs() {
  return client.fetch(`*[_type == "contact_us"][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    contactDetails[]->{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      label,
      icon,
      value,
      isAction,
      actionType
    },
    contactAddress[]->{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      address,
    }
  }`);
}

// Create image URL builder
const builder = imageUrlBuilder(client);

export function getImageUrlFromRef(asset) {
  if (!asset || !asset._ref) return null;

  try {
    // Use the image URL builder to create the image URL
    return builder.image(asset).url();
  } catch (error) {
    console.error("Error generating image URL:", error);
    return null;
  }
}

/** Sanity image field `{ asset: { _ref } }` → CDN URL */
export function urlForSanityImage(image) {
  if (!image?.asset) return null;
  try {
    return builder.image(image).width(1800).url();
  } catch {
    return null;
  }
}

/**
 * @param {'child'|'adult'} audience
 * @param {string} pathSegment slug, e.g. speech, psychology
 */
export async function getServiceListingPage(audience, pathSegment) {
  const slug = String(pathSegment || "").trim();
  if (!slug) return null;
  return client.fetch(
    `*[_type == "service_listing_item" && audience == $audience && pathSegment == $slug][0]{
      _id,
      _type,
      audience,
      sortOrder,
      title,
      pathSegment,
      description,
      items,
      iconKey,
      headerColor,
      pageTitlePrefix,
      pageTitleAccent,
      heroTagline,
      showCta,
      pageBlocks
    }`,
    { audience, slug },
  );
}

export async function getFranchise() {
  try {
    const franchise = await client.fetch(`*[_type == "franchise"][0]{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      description,
      requirements->{
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        requirements,
      },

      steps[]->{
        _id,
        _type,
        _createdAt,
        _updatedAt,
        index,
        title,
        description,
        icon
      },
      contact[]->{
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        content,
        icon
      },
      }`);
    return franchise;
  } catch (error) {
    console.error("Error fetching franchise data:", error);
    throw error;
  }
}

export async function getHome() {
  try {
    const home = await client.fetch(`
      *[_type == "home"][0]{
        _id,
        _type,
        _createdAt,
        _updatedAt,
        heroEyebrow,
        heroTitleLine1,
        heroTitleHighlight,
        heroDescription,
        heroPrimaryCtaLabel,
        heroSecondaryCtaLabel,
        heroImage {
          asset,
          "assetUrl": asset->url,
          alt,
          hotspot,
          crop
        },
        aboutUs[]->{
          _id,
          _type,
          _createdAt,
          _updatedAt,
          title,
          description,
          items[]->{
            _id,
            title,
            description
          }
        },
        service[]->{
          _id,
          _type,
          _createdAt,
          _updatedAt,
          name,
          description,
          icon
        },
        stats[]->{
          _id,
          _type,
          _createdAt,
          _updatedAt,
          number,
          label,
          icon,
          bgColor,
          iconColor
        },
        whyUs[]->{
          _id,
          _type,
          _createdAt,
          _updatedAt,
          heading,
          description,
          approaches[]->{
            _id,
            label,
            icon
          }
        },
        ourPhilosophy[]->{
          _id,
          _type,
          _createdAt,
          _updatedAt,
          heading,
          description
        },
        testimonials[]->{
          _id,
          _type,
          _createdAt,
          _updatedAt,
          author,
          review,
          rating
        }
      }
    `);
    return home;
  } catch (error) {
    console.error("Error fetching home data:", error);
    throw error;
  }
}

export async function getFacilities() {
  try {
    const facilities = await client.fetch('*[_type == "facility"]');
    return facilities;
  } catch (error) {
    console.error("Error fetching facilities:", error);
    throw error;
  }
}

export async function getServices() {
  try {
    const services = await client.fetch('*[_type == "service"]');
    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}

export async function getStatistics() {
  try {
    const statistics = await client.fetch('*[_type == "stats"]');
    return statistics;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
}

export async function getServiceListingLanding(audience) {
  return client.fetch(
    `*[_type == "service_listing_landing" && audience == $audience][0]{
      _id,
      _type,
      audience,
      heroIntro,
      sectionTitle,
      sectionSubtitle
    }`,
    { audience },
  );
}

export async function getServiceListingItems(audience) {
  return client.fetch(
    `*[_type == "service_listing_item" && audience == $audience] | order(sortOrder asc, title asc) {
      _id,
      _type,
      audience,
      sortOrder,
      title,
      pathSegment,
      description,
      items,
      iconKey
    }`,
    { audience },
  );
}

/** First `about_us` block as referenced on the `home` document (same ordering as Home page). */
export async function getAboutSectionFromHome() {
  try {
    const doc = await client.fetch(`
      *[_type == "home"][0]{
        aboutUs[]->{
          _id,
          _type,
          _createdAt,
          _updatedAt,
          title,
          description,
          items[]->{
            _id,
            title,
            description
          }
        }
      }
    `);
    return doc?.aboutUs?.[0] ?? null;
  } catch (error) {
    console.error("Error fetching about section from home:", error);
    throw error;
  }
}
