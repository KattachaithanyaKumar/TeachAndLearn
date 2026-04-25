import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLink,
  FaLinkedin,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { footerSocialPlatformLabel } from "../constants/footerSocialPlatforms";
import { getFooterSettings } from "../network/api_service";
import { getServiceItemsWithFallback } from "../network/serviceListing";
import {
  fallbackChildServiceItems,
} from "../utils/serviceListingFallbacks";

const FOOTER_FALLBACK = {
  brandTitle: "Teach & Learn",
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

const SOCIAL_ICON_MAP = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  x: FaXTwitter,
  whatsapp: FaWhatsapp,
  other: FaLink,
};

const SOCIAL_TILE_CLASS =
  "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200/90 bg-white/95 text-gray-700 shadow-sm transition-all duration-200 hover:scale-105 hover:border-orange-300 hover:text-orange-600 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2";

function FooterSocialLinks({ links }) {
  const valid = (Array.isArray(links) ? links : []).filter((l) =>
    pickStr(l?.url, ""),
  );
  if (!valid.length) return null;

  return (
    <div className="mt-6 min-w-0">
      <h2 className="text-lg font-semibold mb-3">Social links</h2>
      <div className="flex flex-wrap gap-3">
        {valid.map((link) => {
          const url = String(link.url).trim();
          const platform = String(link.platform || "other").trim() || "other";
          const Icon = SOCIAL_ICON_MAP[platform] ?? SOCIAL_ICON_MAP.other;
          const label = footerSocialPlatformLabel(platform);
          const key = link._key || `${platform}-${url}`;
          const iconEl = <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />;

          if (url.startsWith("/") && !url.startsWith("//")) {
            return (
              <Link
                key={key}
                to={url}
                className={SOCIAL_TILE_CLASS}
                aria-label={label}
              >
                {iconEl}
              </Link>
            );
          }

          const external = /^https?:\/\//i.test(url);
          return (
            <a
              key={key}
              href={url}
              className={SOCIAL_TILE_CLASS}
              aria-label={label}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {iconEl}
            </a>
          );
        })}
      </div>
    </div>
  );
}

const Footer = ({ color }) => {
  const [childServices, setChildServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [footerCfg, setFooterCfg] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const child = await getServiceItemsWithFallback("child");
        if (!cancelled) {
          setChildServices(child);
        }
      } catch (e) {
        console.error("Footer: failed to load service listings", e);
        if (!cancelled) {
          setChildServices(fallbackChildServiceItems());
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

  const toServiceDetail = (audience, item) => {
    const seg = String(item?.pathSegment ?? "").trim();
    return seg ? `/${audience}-services/${encodeURIComponent(seg)}` : `/${audience}-services`;
  };

  return (
    <footer style={{ backgroundColor: color }} className="pt-16 px-4 md:px-12">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* Child services — own column */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          {loading ? (
            <p className="text-sm text-gray-500">Loading…</p>
          ) : (
            <ul className="text-sm text-gray-700 space-y-1">
              {childServices.map((item) => (
                <li key={item._id ?? item.pathSegment ?? item.title}>
                  <Link
                    to={toServiceDetail("child", item)}
                    className="cursor-pointer text-gray-700 no-underline transition-colors hover:text-orange-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 rounded-sm"
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
          <FooterSocialLinks links={footerCfg?.socialLinks} />
        </div>

        {/* Hours */}
        <div>
          <h2 className="text-lg font-semibold mb-3 inline-flex items-center gap-2">
            <FaClock className="text-orange-600" aria-hidden="true" />
            Working Hours
          </h2>
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

      <div className="mt-12 pb-8 text-center text-xs text-gray-600">
        Copyright © {year} {brandTitle}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
