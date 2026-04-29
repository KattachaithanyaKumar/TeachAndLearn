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

function serverApiBase() {
  return String(import.meta.env.VITE_SERVER_API_ORIGIN ?? "").trim().replace(/\/+$/, "");
}

async function postToServer(path, body) {
  const base = serverApiBase();
  const url = `${base}${path}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    const err = new Error(data?.error || "Request failed");
    err.code = data?.code || "SERVER_ERROR";
    throw err;
  }
  return data;
}

const CONTACT_MAX = {
  name: 200,
  contact: 80,
  email: 320,
  message: 10000,
  service: 200,
  requestType: 40,
  requestedServicesItem: 200,
  requestedServicesTotal: 2000,
};

const FRANCHISE_INQUIRY_MAX = {
  name: 200,
  email: 320,
  mobile: 20,
  education: 120,
  currentState: 120,
  currentDistrict: 120,
  location: 200,
  comments: 10000,
};

/**
 * Creates a `contact_submission` document in Sanity. Requires `VITE_SANITY_WRITE_TOKEN`
 * (Editor token) and the site origin allowed under API → CORS in sanity.io/manage.
 * @param {object} params
 * @param {'contact_page'|'home_book'} [params.source]
 * @param {string} [params.service] Required when source is `home_book` (selected service name).
 * @param {'assessment'|'service'} [params.requestType] Required when source is `home_book`.
 * @param {string[]} [params.requestedServices] Required when source is `home_book`.
 */
export async function submitContactSubmission({
  name,
  contact,
  email,
  message,
  source,
  service,
  requestType,
  requestedServices,
}) {
  const n = String(name ?? "").trim();
  const c = String(contact ?? "").trim();
  const em = String(email ?? "").trim();
  const m = String(message ?? "").trim();
  const svc = String(service ?? "").trim();
  const rt = String(requestType ?? "").trim();
  const requested = Array.isArray(requestedServices)
    ? requestedServices.map((v) => String(v ?? "").trim()).filter(Boolean)
    : [];

  if (!n || !c || !em || !m) {
    const err = new Error("Please fill in all required fields.");
    err.code = "VALIDATION";
    throw err;
  }
  if (source === "home_book" && !rt) {
    const err = new Error("Please select Assessment or Service.");
    err.code = "VALIDATION";
    throw err;
  }
  if (source === "home_book" && requested.length === 0 && !svc) {
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
  if (svc.length > CONTACT_MAX.service || rt.length > CONTACT_MAX.requestType) {
    const err = new Error("A field is too long.");
    err.code = "VALIDATION";
    throw err;
  }
  if (requested.some((s) => s.length > CONTACT_MAX.requestedServicesItem)) {
    const err = new Error("A selected service name is too long.");
    err.code = "VALIDATION";
    throw err;
  }
  const requestedJoin = requested.join(", ");
  if (requestedJoin.length > CONTACT_MAX.requestedServicesTotal) {
    const err = new Error("Too many services selected.");
    err.code = "VALIDATION";
    throw err;
  }
  if (source === "home_book" && rt !== "assessment" && rt !== "service") {
    const err = new Error("Invalid request type.");
    err.code = "VALIDATION";
    throw err;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
    const err = new Error("Please enter a valid email address.");
    err.code = "VALIDATION";
    throw err;
  }

  const derivedService = requested.length > 0 ? requestedJoin : svc;
  // Prefer server endpoint (can send email); fallback to direct Sanity write for dev setups.
  try {
    return await postToServer("/api/public/contact-submission", {
      name: n,
      contact: c,
      email: em,
      message: m,
      source,
      service: derivedService,
      requestType: rt || undefined,
      requestedServices: requested.length > 0 ? requested : undefined,
    });
  } catch (e) {
    const token = import.meta.env.VITE_SANITY_WRITE_TOKEN?.trim();
    if (!token) throw e;
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
  if (derivedService) {
    // Legacy display field used by older admin UI/search paths.
    doc.service = derivedService;
  }
  if (rt) {
    doc.requestType = rt;
  }
  if (requested.length > 0) {
    doc.requestedServices = requested;
  }

  return writeClient.create(doc);
}

/**
 * Creates a `franchise_inquiry` document in Sanity. Requires `VITE_SANITY_WRITE_TOKEN`
 * (Editor token) and the site origin allowed under API → CORS in sanity.io/manage.
 */
export async function submitFranchiseInquiry({
  name,
  email,
  mobile,
  dob,
  education,
  currentState,
  currentDistrict,
  location,
  comments,
}) {
  const n = String(name ?? "").trim();
  const em = String(email ?? "").trim();
  const mob = String(mobile ?? "").trim();
  const dobVal = String(dob ?? "").trim();
  const edu = String(education ?? "").trim();
  const st = String(currentState ?? "").trim();
  const dist = String(currentDistrict ?? "").trim();
  const loc = String(location ?? "").trim();
  const com = String(comments ?? "").trim();

  if (!n || !em || !mob || !dobVal || !edu || !st || !dist || !loc || !com) {
    const err = new Error("Please fill in all required fields.");
    err.code = "VALIDATION";
    throw err;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
    const err = new Error("Please enter a valid email address.");
    err.code = "VALIDATION";
    throw err;
  }
  if (mob.length > FRANCHISE_INQUIRY_MAX.mobile || !/^[0-9]{10}$/.test(mob)) {
    const err = new Error("Enter a valid 10-digit mobile number.");
    err.code = "VALIDATION";
    throw err;
  }
  if (
    n.length > FRANCHISE_INQUIRY_MAX.name ||
    em.length > FRANCHISE_INQUIRY_MAX.email ||
    edu.length > FRANCHISE_INQUIRY_MAX.education ||
    st.length > FRANCHISE_INQUIRY_MAX.currentState ||
    dist.length > FRANCHISE_INQUIRY_MAX.currentDistrict ||
    loc.length > FRANCHISE_INQUIRY_MAX.location ||
    com.length > FRANCHISE_INQUIRY_MAX.comments
  ) {
    const err = new Error("A field is too long.");
    err.code = "VALIDATION";
    throw err;
  }

  // Prefer server endpoint (can send email); fallback to direct Sanity write for dev setups.
  try {
    return await postToServer("/api/public/franchise-inquiry", {
      name: n,
      email: em,
      mobile: mob,
      dob: dobVal,
      education: edu,
      currentState: st,
      currentDistrict: dist,
      location: loc,
      comments: com,
    });
  } catch (e) {
    const token = import.meta.env.VITE_SANITY_WRITE_TOKEN?.trim();
    if (!token) throw e;
  }

  const doc = {
    _type: "franchise_inquiry",
    name: n,
    email: em,
    mobile: mob,
    dob: dobVal,
    education: edu,
    currentState: st,
    currentDistrict: dist,
    location: loc,
    comments: com,
    submittedAt: new Date().toISOString(),
    responded: false,
  };

  return writeClient.create(doc);
}

export function getFooterSettings() {
  return client.fetch(`*[_type == "footer_settings"][0]{
    _id,
    _type,
    brandTitle,
    brandSubtitle,
    brandDescription,
    phone,
    email,
    locationLabel,
    locationLink,
    hoursText,
    socialLinks[]{ _key, platform, url }
  }`);
}

export function getContactUs() {
  return client.fetch(`*[_type == "contact_us"][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    mapLatitude,
    mapLongitude,
    mapZoom,
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
      latitude,
      longitude,
      mapScreenshot,
      "mapScreenshotUrl": mapScreenshot.asset->url
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
 * @param {string} slug URL segment after /service/
 */
export async function getServicePageBySlug(slugParam) {
  const slug = String(slugParam || "").trim();
  if (!slug) return null;
  return client.fetch(
    `*[_type == "service_page" && slug.current == $slug][0]{
      _id,
      _type,
      sortOrder,
      title,
      subtitle,
      body,
      contentHtml,
      isFeaturedInNav,
      headerColor,
      showCta,
      slug,
      contentBlocks[]{
        _key,
        tags,
        title,
        body,
        images[]{
          _key,
          alt,
          caption,
          image{
            asset,
            hotspot,
            crop
          }
        }
      }
    }`,
    { slug },
  );
}

/** Featured services for navbar strip with heading source content. */
export async function getFeaturedServicePagesForNav() {
  return client.fetch(
    `*[_type == "service_page" && isFeaturedInNav == true] | order(sortOrder asc, title asc) {
      _id,
      title,
      "slug": slug.current,
      contentHtml
    }`,
  );
}

/** Minimal rows for footer / nav (title + slug). */
export async function getServicePagesIndex() {
  return client.fetch(
    `*[_type == "service_page"] | order(sortOrder asc, title asc) {
      _id,
      title,
      "slug": slug.current,
      cardHighlights
    }`,
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
      pageBodyBlocks,
      pageBody {
        heroTitle,
        heroLead,
        valueChecks,
        phoneDisplay,
        phoneTel,
        ctaApplyLabel,
        ctaTalkLabel,
        sectionWhyTitle,
        sectionWhyBody,
        sectionImpactTitle,
        sectionImpactBody,
        sectionTrustTitle,
        sectionTrustBody,
        sectionTrustPartner,
        sectionFacilityTitle,
        facilityLines,
        sectionJoinTitle,
        sectionJoinBody,
        sectionPartnersTitle,
        partnerCriteria
      },
      supportCardImage {
        asset,
        "assetUrl": asset->url,
        hotspot,
        crop
      },
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
          aboutPageHeaderPrefix,
          aboutPageHeaderHighlight,
          aboutPageEyebrow,
          aboutPageHeroImage {
            asset,
            "assetUrl": asset->url,
            alt,
            hotspot,
            crop
          },
          promiseEyebrow,
          promiseHeading,
          promiseBody,
          visionTitle,
          visionBody,
          missionTitle,
          missionBody,
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
          icon,
          linkedServicePage->{
            _id,
            title,
            "slug": slug.current
          },
          "serviceSlug": linkedServicePage->slug.current
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
          aboutPageHeaderPrefix,
          aboutPageHeaderHighlight,
          aboutPageEyebrow,
          aboutPageHeroImage {
            asset,
            "assetUrl": asset->url,
            alt,
            hotspot,
            crop
          },
          promiseEyebrow,
          promiseHeading,
          promiseBody,
          visionTitle,
          visionBody,
          missionTitle,
          missionBody,
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
