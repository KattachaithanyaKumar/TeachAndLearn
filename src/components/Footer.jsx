import logo from "../assets/logo.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getServiceItemsWithFallback } from "../network/serviceListing";
import {
  fallbackChildServiceItems,
  fallbackAdultServiceItems,
} from "../utils/serviceListingFallbacks";

const Footer = ({ color }) => {
  const [childServices, setChildServices] = useState([]);
  const [adultServices, setAdultServices] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <footer style={{ backgroundColor: color }} className="pt-16 px-4 md:px-12">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
            <div>
              <h1 className="text-xl font-semibold">Teach & Learn</h1>
              <p className="text-sm text-gray-600">Therapy Center</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm">
            Empowering children and adults to reach their full potential through
            comprehensive therapy services.
          </p>
        </div>

        {/* Child services — own column */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Child services</h2>
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
          <h2 className="text-lg font-semibold mb-3">Adult services</h2>
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
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              <a
                href="tel:+919876543210"
                className="hover:text-orange-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 rounded-sm inline-block"
              >
                +91 9876543210
              </a>
            </li>
            <li>
              <a
                href="mailto:info@teachandlearn.com"
                className="hover:text-orange-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 rounded-sm inline-block"
              >
                info@teachandlearn.com
              </a>
            </li>
            <li>
              <Link
                to="/contact-us"
                className="hover:text-orange-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 rounded-sm inline-block"
              >
                Hyderabad, India
              </Link>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Hours</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Mon - Fri: 9:00 AM - 6:00 PM <br />
            Sat: 9:00 AM - 2:00 PM <br />
            Sun: Closed
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
    </footer>
  );
};

export default Footer;
