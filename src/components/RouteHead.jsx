import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getStaticSeoForPath, SITE_NAME } from "../seo/staticMeta.js";

function siteBase() {
  return (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");
}

/**
 * Sets document title and meta for static marketing routes. Service detail pages
 * set their own tags in `ServiceDetailPage`. Admin uses `noindex` in `AdminModule`.
 */
export default function RouteHead() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) return null;
  if (/^\/(child-services|adult-services)\/.+/.test(pathname)) return null;

  const meta = getStaticSeoForPath(pathname);
  if (!meta) return null;

  const base = siteBase();
  const url = base ? base + (pathname === "/" ? "" : pathname) : undefined;
  const image = base ? `${base}/og-default.jpg` : "/og-default.jpg";

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {url ? <link rel="canonical" href={url} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      {url ? <meta property="og:url" content={url} /> : null}
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
