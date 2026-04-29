import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { getServicePagesIndex } from "../network/api_service";

export default function Services() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const rows = await getServicePagesIndex();
      setItems(Array.isArray(rows) ? rows : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  return (
    <div>
      <Navbar />
      <Header color="#E0F2FE">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-900">
          Services
        </h1>
        <p className="max-w-2xl text-lg sm:text-xl text-center text-gray-800">
          Browse our service pages. Each page includes rich markdown content and
          images.
        </p>
      </Header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <ErrorMessage message={error} onRetry={load} />
        ) : items.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">
              No services yet. Create service pages from the admin.
            </p>
            <Link
              to="/admin/service-pages"
              className="inline-flex mt-4 text-orange-600 font-semibold hover:underline"
            >
              Go to admin → Service pages
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((row) => {
              const slug = String(row?.slug ?? "").trim();
              const to = slug ? `/service/${encodeURIComponent(slug)}` : null;
              const highlights = Array.isArray(row?.cardHighlights)
                ? row.cardHighlights.filter((x) => typeof x === "string" && x.trim()).slice(0, 4)
                : [];
              return (
                <div
                  key={row._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      {row.title || "Untitled"}
                    </h2>
                    {highlights.length > 0 ? (
                      <ul className="mt-3 text-sm text-gray-700 list-disc list-inside space-y-1">
                        {highlights.map((point, idx) => (
                          <li key={`${row._id}-point-${idx}`}>{point}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600 mt-1">
                        {slug ? `/service/${slug}` : "Missing slug"}
                      </p>
                    )}
                    {to ? (
                      <Link
                        to={to}
                        className="inline-flex mt-4 text-orange-600 font-semibold hover:underline"
                      >
                        View page →
                      </Link>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

