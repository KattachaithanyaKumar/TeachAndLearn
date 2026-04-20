/** Site-wide name for Open Graph `og:site_name`. */
export const SITE_NAME = "Teach and Learn";

/**
 * Public marketing routes (no `/admin`). Used by post-build SEO and client Helmet.
 * @type {readonly { path: string; title: string; description: string }[]}
 */
export const STATIC_SEO_ROUTES = [
  {
    path: "/",
    title: "Speech Therapy for Children in Kondapur, Hyderabad",
    description:
      "Teach and Learn offers speech therapy and related services in Kondapur, Hyderabad. Book a consultation and explore our child and adult programs.",
  },
  {
    path: "/about-us",
    title: "About Us | Teach and Learn",
    description:
      "Learn about Teach and Learn’s mission, team, and approach to speech therapy and developmental support in Hyderabad.",
  },
  {
    path: "/child-services",
    title: "Child Services | Teach and Learn",
    description:
      "Explore speech therapy and developmental services for children at Teach and Learn, Kondapur, Hyderabad.",
  },
  {
    path: "/adult-services",
    title: "Adult Services | Teach and Learn",
    description:
      "Speech and communication services for adults at Teach and Learn, Kondapur, Hyderabad.",
  },
  {
    path: "/facilities",
    title: "Facilities | Teach and Learn",
    description:
      "See our learning spaces and facilities at Teach and Learn in Kondapur, Hyderabad.",
  },
  {
    path: "/franchises",
    title: "Franchises | Teach and Learn",
    description:
      "Franchise opportunities and information for Teach and Learn speech therapy centres.",
  },
  {
    path: "/contact-us",
    title: "Contact Us | Teach and Learn",
    description:
      "Contact Teach and Learn in Kondapur, Hyderabad — phone, email, and enquiry form.",
  },
];

/** @param {string} pathname */
export function getStaticSeoForPath(pathname) {
  const p = pathname === "" ? "/" : pathname.startsWith("/") ? pathname : `/${pathname}`;
  return STATIC_SEO_ROUTES.find((r) => r.path === p) ?? null;
}
