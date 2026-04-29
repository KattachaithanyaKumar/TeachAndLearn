import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import MarkdownContent from "../components/MarkdownContent";
import { getServicePageBySlug } from "../network/api_service";
import { injectHeadingAnchorsIntoHtml } from "../utils/serviceHeadingAnchors";
import { servicePageDescription, servicePageTitle } from "../seo/servicePageMeta";
import { SITE_NAME } from "../seo/staticMeta.js";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getServicePageBySlug(slug)
      .then((d) => {
        if (!cancelled) {
          setDoc(d);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const contentHtmlWithAnchors = useMemo(
    () => injectHeadingAnchorsIntoHtml(doc?.contentHtml || ""),
    [doc?.contentHtml],
  );

  useEffect(() => {
    if (!location.hash || !doc) return;
    const rawId = location.hash.replace(/^#/, "");
    const hashId = decodeURIComponent(rawId);
    if (!hashId) return;

    const scrollToTarget = () => {
      const byExactId = document.getElementById(hashId);
      const esc = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(hashId) : hashId.replace(/"/g, '\\"');
      // Some editors prefix IDs (e.g. "user-content-..."); make hash links more resilient.
      const bySuffixId = byExactId
        ? null
        : document.querySelector(`[id$="${esc}"]`) || document.querySelector(`h2[id$="${esc}"], h3[id$="${esc}"]`);
      const target = byExactId || bySuffixId;

      if (!target) return false;
      const navEl = document.querySelector('[data-site-navbar="true"]');
      const navHeight = navEl ? navEl.getBoundingClientRect().height : 140;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      return true;
    };

    let attempts = 0;
    const intervalId = window.setInterval(() => {
      attempts += 1;
      if (scrollToTarget() || attempts > 20) {
        window.clearInterval(intervalId);
      }
    }, 50);

    return () => window.clearInterval(intervalId);
  }, [location.hash, doc, contentHtmlWithAnchors]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-[40vh] flex items-center justify-center text-gray-600">Loading…</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 px-4">
          <p className="text-red-600">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!doc) {
    return (
      <div>
        <Navbar />
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Service not found</h1>
          <p className="text-gray-600 max-w-md">
            There is no service page for this URL. Check the slug in Sanity matches <code className="text-sm bg-gray-100 px-1 rounded">/service/…</code>.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  const headerColor = doc.headerColor || "#E0F2FE";
  const showCta = doc.showCta !== false;

  const siteBase = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");
  const canonicalUrl = siteBase ? `${siteBase}${location.pathname}` : undefined;
  const shareImage = siteBase ? `${siteBase}/og-default.jpg` : "/og-default.jpg";
  const pageTitle = servicePageTitle(doc);
  const pageDescription = servicePageDescription(doc);

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
        <meta property="og:image" content={shareImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={shareImage} />
      </Helmet>
      <Navbar />
      <Header color={headerColor}>
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-900">{doc.title}</h1>
        {doc.subtitle ? (
          <div className="flex gap-2 items-center justify-center">
            <p className="max-w-2xl text-lg sm:text-xl text-center text-gray-800">{doc.subtitle}</p>
          </div>
        ) : null}
      </Header>
      {contentHtmlWithAnchors ? (
        <div className="max-w-4xl mx-auto px-4 py-10">
          <MarkdownContent className="text-gray-700 leading-relaxed text-lg">
            {contentHtmlWithAnchors}
          </MarkdownContent>
        </div>
      ) : null}
      <div className="clear-both">{showCta ? <CTA /> : null}</div>
      <Footer />
    </div>
  );
}
