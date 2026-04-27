import React, { useEffect, useMemo, useState } from "react";
import Button from "./Button";
import { getServices } from "../network/api_service";
import { submitContactSubmission } from "../network/api_service";

const hasWriteToken = Boolean(import.meta.env.VITE_SANITY_WRITE_TOKEN?.trim());

function digitsOnlyMax10(value) {
  return String(value ?? "").replace(/\D+/g, "").slice(0, 10);
}

function uniqStrings(list) {
  const out = [];
  const seen = new Set();
  for (const v of Array.isArray(list) ? list : []) {
    const s = String(v ?? "").trim();
    if (!s) continue;
    const k = s.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(s);
  }
  return out;
}

function setValidity(el, message) {
  if (el && typeof el.setCustomValidity === "function") el.setCustomValidity(message);
}

/**
 * Extracted from `src/pages/Home.jsx` — keep behavior consistent.
 */
export default function QuickAppointmentForm({
  services,
  servicesLoading,
  branches,
  branchesLoading,
  onSubmitted,
  title = "Quick Appointment",
  embedded = false,
}) {
  const [bookSubmitStatus, setBookSubmitStatus] = useState("idle");
  const [bookMessage, setBookMessage] = useState(null);
  const [bookFormText, setBookFormText] = useState("");
  const [bookEmailError, setBookEmailError] = useState("");
  const [bookContactError, setBookContactError] = useState("");
  const [bookBranchError, setBookBranchError] = useState("");
  const [bookRequestTypeError, setBookRequestTypeError] = useState("");
  const [bookServicesError, setBookServicesError] = useState("");

  const [requestType, setRequestType] = useState("");
  const [selectedServices, setSelectedServices] = useState(() => new Set());

  const [localServices, setLocalServices] = useState([]);
  const [localServicesLoading, setLocalServicesLoading] = useState(false);

  const branchOptions = useMemo(() => {
    const list = Array.isArray(branches) ? branches : [];
    return list.map((b, index) => ({
      key: b?._id ?? index,
      value: `${String(b?.title ?? "Branch").trim()} — ${String(b?.address ?? "").trim()}`.trim(),
      label: `${String(b?.title ?? "Branch").trim()}${b?.address ? ` — ${String(b.address).trim()}` : ""}`,
    }));
  }, [branches]);

  useEffect(() => {
    // If no services are passed in, fetch from Sanity so the form is self-contained.
    if (Array.isArray(services) && services.length > 0) return;
    if (servicesLoading) return;
    let alive = true;
    setLocalServicesLoading(true);
    getServices()
      .then((rows) => {
        if (!alive) return;
        setLocalServices(Array.isArray(rows) ? rows : []);
      })
      .catch(() => {
        if (!alive) return;
        setLocalServices([]);
      })
      .finally(() => {
        if (!alive) return;
        setLocalServicesLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [services, servicesLoading]);

  const serviceNames = useMemo(() => {
    const list = Array.isArray(services) && services.length > 0 ? services : localServices;
    const names = list.map((s) => s?.name);
    return uniqStrings(names);
  }, [services, localServices]);

  const effectiveServicesLoading = Boolean(
    servicesLoading || (serviceNames.length === 0 && localServicesLoading)
  );

  const selectedServiceList = useMemo(() => Array.from(selectedServices), [selectedServices]);

  const allSelected = serviceNames.length > 0 && selectedServices.size === serviceNames.length;
  const someSelected = selectedServices.size > 0 && !allSelected;

  return (
    <form
      className={
        embedded
          ? "w-full space-y-3"
          : "w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 sm:p-8 space-y-5"
      }
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        setBookMessage(null);
        setBookEmailError("");
        setBookContactError("");
        setBookBranchError("");
        setBookRequestTypeError("");
        setBookServicesError("");
        if (!hasWriteToken) {
          setBookSubmitStatus("error");
          setBookMessage(
            "Appointments cannot be saved until VITE_SANITY_WRITE_TOKEN is set (see .env.example)."
          );
          return;
        }
        const form = e.target;
        const contactValue = digitsOnlyMax10(form.contact?.value ?? "");
        if (!contactValue) {
          setBookContactError("Phone number is required");
          form.contact?.focus?.();
          return;
        }
        if (contactValue.length !== 10) {
          setBookContactError("Phone number must be exactly 10 digits");
          form.contact?.focus?.();
          return;
        }
        const emailValue = String(form.email?.value ?? "").trim();
        if (!emailValue) {
          setBookEmailError("Email is required");
          form.email?.focus?.();
          return;
        }
        // Basic email shape check; avoids browser bubble that echoes user input.
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
          setBookEmailError("Enter a valid email address");
          form.email?.focus?.();
          return;
        }
        const branchValue = String(form.branch?.value ?? "").trim();
        if (!branchValue) {
          setBookBranchError("Please select a branch");
          form.branch?.focus?.();
          return;
        }

        if (!requestType) {
          setBookRequestTypeError("Please select Assessment or Service");
          return;
        }
        if (selectedServices.size === 0) {
          setBookServicesError("Please select at least one service");
          return;
        }
        const payload = {
          name: form.name.value.trim(),
          contact: contactValue,
          email: emailValue,
          message: `${form.message.value.trim()}\n\nPreferred branch: ${branchValue}`.trim(),
          requestType,
          requestedServices: selectedServiceList,
          service: selectedServiceList.join(", "),
          source: "home_book",
        };
        setBookSubmitStatus("submitting");
        try {
          await submitContactSubmission(payload);
          setBookSubmitStatus("success");
          setBookMessage("Thanks! We will contact you shortly to confirm.");
          form.reset();
          setBookFormText("");
          setRequestType("");
          setSelectedServices(new Set());
          onSubmitted?.();
        } catch (err) {
          setBookSubmitStatus("error");
          if (err?.code === "MISSING_WRITE_TOKEN") {
            setBookMessage(
              "Configuration error: add VITE_SANITY_WRITE_TOKEN to your environment."
            );
          } else if (err instanceof Error) {
            setBookMessage(err.message);
          } else {
            setBookMessage("Could not submit. Check Sanity CORS settings or try again.");
          }
        }
      }}
    >
      {title ? (
        <h1 className={embedded ? "text-xl font-bold text-gray-800 mb-1" : "text-2xl font-bold text-gray-800 mb-2"}>
          {title}
        </h1>
      ) : null}
      {!hasWriteToken ? (
        <p className="text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs">
          Set <code className="text-[11px]">VITE_SANITY_WRITE_TOKEN</code> to save requests to
          Sanity.
        </p>
      ) : null}
      {bookMessage ? (
        <p
          className={
            bookSubmitStatus === "success"
              ? "text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm"
              : "text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm"
          }
          role="status"
        >
          {bookMessage}
        </p>
      ) : null}

      <input
        type="text"
        name="name"
        required
        pattern="^[A-Za-z][A-Za-z\\s]*$"
        placeholder="Your Name"
        className={
          embedded
            ? "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            : "w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        }
        onChange={(e) => {
          const next = String(e.currentTarget.value ?? "")
            .replace(/[^A-Za-z\s]+/g, "")
            .replace(/\s{2,}/g, " ");
          if (e.currentTarget.value !== next) e.currentTarget.value = next;
        }}
        onInvalid={(e) => {
          const v = e.currentTarget.value.trim();
          if (!v || !/^[A-Za-z][A-Za-z\s]*$/.test(v)) {
            setValidity(e.currentTarget, "Enter a valid full name");
          }
        }}
        onInput={(e) => setValidity(e.currentTarget, "")}
      />

      <input
        type="tel"
        name="contact"
        required
        inputMode="numeric"
        autoComplete="tel"
        maxLength={10}
        pattern="^[0-9]{10}$"
        placeholder="Phone Number"
        className={
          embedded
            ? "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            : "w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        }
        aria-invalid={bookContactError ? "true" : "false"}
        onChange={(e) => {
          const next = digitsOnlyMax10(e.currentTarget.value);
          if (e.currentTarget.value !== next) e.currentTarget.value = next;
          if (bookContactError) setBookContactError("");
        }}
        onInvalid={(e) => setValidity(e.currentTarget, "Enter valid contact number")}
        onInput={(e) => setValidity(e.currentTarget, "")}
      />
      {bookContactError ? (
        <p className="text-sm text-red-700 -mt-3" role="alert">
          {bookContactError}
        </p>
      ) : null}

      <input
        type="email"
        name="email"
        required
        placeholder="Email Address"
        className={
          embedded
            ? "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            : "w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        }
        aria-invalid={bookEmailError ? "true" : "false"}
        onChange={(e) => {
          if (bookEmailError) setBookEmailError("");
          setValidity(e.currentTarget, "");
        }}
      />
      {bookEmailError ? (
        <p className="text-sm text-red-700 -mt-3" role="alert">
          {bookEmailError}
        </p>
      ) : null}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-800">
            Request type <span className="text-orange-500">*</span>
          </p>
          {bookRequestTypeError ? (
            <p className="text-sm text-red-700" role="alert">
              {bookRequestTypeError}
            </p>
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: "assessment", label: "Assessment" },
            { value: "service", label: "Service" },
          ].map((opt) => {
            const checked = requestType === opt.value;
            return (
              <label
                key={opt.value}
                className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer select-none ${
                  checked ? "border-orange-500 ring-2 ring-orange-200 bg-orange-50" : "border-gray-300 bg-white"
                }`}
              >
                <input
                  type="checkbox"
                  className="accent-orange-500"
                  checked={checked}
                  onChange={() => {
                    setRequestType((prev) => (prev === opt.value ? "" : opt.value));
                    if (bookRequestTypeError) setBookRequestTypeError("");
                  }}
                />
                <span className="text-sm text-gray-800">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-gray-800 truncate">
            Select service(s) <span className="text-orange-500">*</span>
          </p>
          <label
            className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer select-none shrink-0 text-sm whitespace-nowrap ${
              effectiveServicesLoading || serviceNames.length === 0
                ? "border-orange-200 text-orange-300 bg-white opacity-70 cursor-not-allowed"
                : allSelected || someSelected
                  ? "border-orange-500 text-orange-700 ring-2 ring-orange-200 bg-orange-50"
                  : "border-orange-300 text-orange-700 bg-white hover:bg-orange-50"
            }`}
          >
            <input
              type="checkbox"
              className="accent-orange-500"
              checked={allSelected}
              ref={(el) => {
                if (el) el.indeterminate = someSelected;
              }}
              onChange={() => {
                setSelectedServices((prev) => {
                  const next = new Set(prev);
                  if (serviceNames.length === 0) return next;
                  if (next.size === serviceNames.length) return new Set();
                  return new Set(serviceNames);
                });
                if (bookServicesError) setBookServicesError("");
              }}
              disabled={effectiveServicesLoading || serviceNames.length === 0}
            />
            {effectiveServicesLoading ? "Loading…" : "Select all"}
          </label>
          {bookServicesError ? (
            <p className="text-sm text-red-700 shrink-0" role="alert">
              {bookServicesError}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {effectiveServicesLoading ? (
            <div className="col-span-2 text-sm text-gray-500">Loading services…</div>
          ) : serviceNames.length === 0 ? (
            <div className="col-span-2 text-sm text-gray-500">No services available</div>
          ) : (
            serviceNames.map((name) => {
              const checked = selectedServices.has(name);
              return (
                <label
                  key={name}
                  className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer select-none ${
                    checked ? "border-orange-500 ring-2 ring-orange-200 bg-orange-50" : "border-gray-300 bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-orange-500"
                    checked={checked}
                    onChange={() => {
                      setSelectedServices((prev) => {
                        const next = new Set(prev);
                        if (next.has(name)) next.delete(name);
                        else next.add(name);
                        return next;
                      });
                      if (bookServicesError) setBookServicesError("");
                    }}
                  />
                  <span className="text-sm text-gray-800">{name}</span>
                </label>
              );
            })
          )}
        </div>
      </div>

      <div className="relative">
        <select
          name="branch"
          required
          defaultValue=""
          className={
            embedded
              ? "w-full border border-gray-300 rounded-lg px-3 py-2 pr-12 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500"
              : "w-full border border-gray-300 rounded-lg p-3 pr-12 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500"
          }
          aria-invalid={bookBranchError ? "true" : "false"}
          onChange={() => {
            if (bookBranchError) setBookBranchError("");
          }}
          onInvalid={(e) => setValidity(e.currentTarget, "Please select a branch")}
          onInput={(e) => setValidity(e.currentTarget, "")}
        >
          <option value="" disabled hidden>
            {branchesLoading
              ? "Loading branches..."
              : branchOptions.length > 0
                ? "Select Branch"
                : "No branches available"}
          </option>
          {!branchesLoading &&
            branchOptions.map((b) => (
              <option key={b.key} value={b.value}>
                {b.label}
              </option>
            ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {bookBranchError ? (
        <p className="text-sm text-red-700 -mt-3" role="alert">
          {bookBranchError}
        </p>
      ) : null}

      <textarea
        name="message"
        required
        placeholder="Your Message"
        maxLength={500}
        className={
          embedded
            ? "w-full border border-gray-300 rounded-lg px-3 py-2 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            : "w-full border border-gray-300 rounded-lg p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
        }
        value={bookFormText}
        onChange={(e) => setBookFormText(e.currentTarget.value.slice(0, 500))}
      />
      <p className="text-xs text-gray-500 -mt-3 text-left" aria-live="polite">
        {bookFormText.length}/500
      </p>

      <Button
        type="submit"
        disabled={bookSubmitStatus === "submitting"}
        className={
          embedded
            ? "w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            : "w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        }
      >
        <p className="text-center w-full">
          {bookSubmitStatus === "submitting" ? "Sending…" : "Book Appointment"}
        </p>
      </Button>
    </form>
  );
}

