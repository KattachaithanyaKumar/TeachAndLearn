import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import ServicePageBlockRenderer from "../components/servicePage/ServicePageBlockRenderer";
import { getServiceListingPage } from "../network/api_service";
import {
  serviceListingDescription,
  serviceListingTitle,
} from "../seo/serviceListingMeta";
import { SITE_NAME } from "../seo/staticMeta.js";

export default function ServiceDetailPage({ audience }) {
  const { slug } = useParams();
  const location = useLocation();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getServiceListingPage(audience, slug)
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
  }, [audience, slug]);

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
            There is no service page for this URL. Check that the listing exists in Sanity and
            pathSegment matches.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  const headerColor = doc.headerColor || (audience === "adult" ? "#EDE9FE" : "#E0F2FE");
  const prefix = doc.pageTitlePrefix || (audience === "adult" ? "Adult" : "Child");
  const accent = doc.pageTitleAccent || doc.title || "";
  const tagline = doc.heroTagline || doc.description || "";
  const showCta = doc.showCta !== false;

  const siteBase = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");
  const canonicalUrl = siteBase ? `${siteBase}${location.pathname}` : undefined;
  const shareImage = siteBase ? `${siteBase}/og-default.jpg` : "/og-default.jpg";
  const pageTitle = serviceListingTitle(doc);
  const pageDescription = serviceListingDescription(doc);

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
        <h1 className="text-4xl font-bold mb-4 text-center">
          {prefix}{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            {accent}
          </span>
        </h1>
        <div className="flex gap-2 items-center justify-center">
          <p className="max-w-2xl text-lg sm:text-xl text-center text-gray-800">{tagline}</p>
        </div>
      </Header>
      <ServicePageBlockRenderer blocks={doc.pageBlocks} />
      {showCta ? <CTA /> : null}
      <Footer />
    </div>
  );
}
