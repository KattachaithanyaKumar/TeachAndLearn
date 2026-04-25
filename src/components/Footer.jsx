import logo from "../assets/logo.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { getFooterSettings } from "../network/api_service";
import { getServiceItemsWithFallback } from "../network/serviceListing";
import {
  fallbackChildServiceItems,
  fallbackAdultServiceItems,
} from "../utils/serviceListingFallbacks";

const FOOTER_FALLBACK = {
  brandTitle: "Teach & Learn",
  brandSubtitle: "Therapy Center",
  brandDescription:
    "Empowering children and adults to reach their full potential through comprehensive therapy services.",
  phone: "+91 9876543210",
  email: "info@teachandlearn.com",
  locationLabel: "Hyderabad, India",
  locationLink: "/contact-us",
};

const FALLBACK_HOUR_LINES = [
  "Mon - Fri: 9:00 AM - 6:00 PM",
  "Sat: 9:00 AM - 2:00 PM",
  "Sun: Closed",
];

function pickStr(cms, fallback) {
  const t = typeof cms === "string" ? cms.trim() : "";
  return t || fallback;
}

function telHref(displayPhone) {
  const raw = pickStr(displayPhone, "");
  if (!raw) return "#";
  return `tel:${raw.replace(/\s+/g, "").replace(/-/g, "")}`;
}

function hourLinesFromText(text) {
  if (!text || typeof text !== "string") return null;
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  return lines.length ? lines : null;
}

const Footer = ({ color }) => {
  const [childServices, setChildServices] = useState([]);
  const [adultServices, setAdultServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [footerCfg, setFooterCfg] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [child, adult] = await Promise.all([
          getServiceItemsWithFallback("child"),
          getServiceItemsWithFallback("adult"),
        ]);
        if (!cancelled) {
          setChildServices(child);
          setAdultServices(adult);
        }
      } catch (e) {
        console.error("Footer: failed to load service listings", e);
        if (!cancelled) {
          setChildServices(fallbackChildServiceItems());
          setAdultServices(fallbackAdultServiceItems());
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const doc = await getFooterSettings();
        if (!cancelled && doc?._id) setFooterCfg(doc);
      } catch (e) {
        console.error("Footer: failed to load footer settings", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const brandTitle = pickStr(footerCfg?.brandTitle, FOOTER_FALLBACK.brandTitle);
  const brandSubtitle = pickStr(
    footerCfg?.brandSubtitle,
    FOOTER_FALLBACK.brandSubtitle,
  );
  const brandDescription = pickStr(
    footerCfg?.brandDescription,
    FOOTER_FALLBACK.brandDescription,
  );
  const phone = pickStr(footerCfg?.phone, FOOTER_FALLBACK.phone);
  const email = pickStr(footerCfg?.email, FOOTER_FALLBACK.email);
  const locationLabel = pickStr(
    footerCfg?.locationLabel,
    FOOTER_FALLBACK.locationLabel,
  );
  const locationLink = pickStr(
    footerCfg?.locationLink,
    FOOTER_FALLBACK.locationLink,
  );
  const hourLines =
    hourLinesFromText(footerCfg?.hoursText) ?? FALLBACK_HOUR_LINES;
  const locationIsExternal = /^https?:\/\//i.test(locationLink);
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: color }} className="pt-16 px-4 md:px-12">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={logo}
              alt={`${brandTitle} logo`}
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-semibold">{brandTitle}</h1>
              <p className="text-sm text-gray-600">{brandSubtitle}</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm">{brandDescription}</p>
        </div>

        {/* Child services — own column */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          {loading ? (
            <p className="text-sm text-gray-500">Loading…</p>
          ) : (
            <ul className="text-sm text-gray-700 space-y-1">
              {childServices.map((item) => (
                <li key={item._id}>
                  <Link
                    to={`/child-services/${encodeURIComponent(String(item.pathSegment ?? "").trim())}`}
                    className="hover:text-orange-600 hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Adult services — own column */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          {loading ? (
            <p className="text-sm text-gray-500">Loading…</p>
          ) : (
            <ul className="text-sm text-gray-700 space-y-1">
              {adultServices.map((item) => (
                <li key={item._id}>
                  <Link
                    to={`/adult-services/${encodeURIComponent(String(item.pathSegment ?? "").trim())}`}
                    className="hover:text-orange-600 hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Contact */}
        <div className="min-w-0">
          <h2 className="text-lg font-semibold mb-3">Contact</h2>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex min-w-0 items-start gap-2">
              <FaPhoneAlt className="mt-0.5 shrink-0 text-orange-600" aria-hidden="true" />
              <a
                href={telHref(phone)}
                className="min-w-0 max-w-full flex-1 break-words text-left hover:text-orange-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 rounded-sm cursor-pointer"
              >
                {phone}
              </a>
            </li>
            <li className="flex min-w-0 items-start gap-2">
              <FaEnvelope className="mt-0.5 shrink-0 text-orange-600" aria-hidden="true" />
              <a
                href={`mailto:${email}`}
                className="min-w-0 max-w-full flex-1 break-all text-left hover:text-orange-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 rounded-sm cursor-pointer"
              >
                {email}
              </a>
            </li>
            <li className="flex min-w-0 items-start gap-2">
              <FaMapMarkerAlt className="mt-0.5 shrink-0 text-orange-600" aria-hidden="true" />
              {locationIsExternal ? (
                <a
                  href={locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-0 max-w-full flex-1 break-words text-left hover:text-orange-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 rounded-sm cursor-pointer"
                >
                  {locationLabel}
                </a>
              ) : (
                <Link
                  to={locationLink}
                  className="min-w-0 max-w-full flex-1 break-words text-left hover:text-orange-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 rounded-sm cursor-pointer"
                >
                  {locationLabel}
                </Link>
              )}
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Hours</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {hourLines.map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 ? <br /> : null}
                {line}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>

      {/* Credits */}
      <div className="mt-12 text-center text-xs text-gray-500">
        Asset credits: Illustrations by{" "}
        <a
          href="https://pikkovia.com"
          className="underline hover:text-blue-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pikkovia
        </a>
        , Icons from{" "}
        <a
          href="https://www.flaticon.com/"
          className="underline hover:text-blue-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          Flaticon
        </a>
        .
      </div>

      <div className="mt-3 pb-8 text-center text-xs text-gray-600">
        © {year} {brandTitle}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
