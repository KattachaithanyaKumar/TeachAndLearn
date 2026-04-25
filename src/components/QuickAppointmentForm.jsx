import React, { useMemo, useState } from "react";
import Button from "./Button";
import { submitContactSubmission } from "../network/api_service";

const hasWriteToken = Boolean(import.meta.env.VITE_SANITY_WRITE_TOKEN?.trim());

function digitsOnlyMax10(value) {
  return String(value ?? "").replace(/\D+/g, "").slice(0, 10);
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

  const branchOptions = useMemo(() => {
    const list = Array.isArray(branches) ? branches : [];
    return list.map((b, index) => ({
      key: b?._id ?? index,
      value: `${String(b?.title ?? "Branch").trim()} — ${String(b?.address ?? "").trim()}`.trim(),
      label: `${String(b?.title ?? "Branch").trim()}${b?.address ? ` — ${String(b.address).trim()}` : ""}`,
    }));
  }, [branches]);

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
        const payload = {
          name: form.name.value.trim(),
          contact: contactValue,
          email: emailValue,
          message: `${form.message.value.trim()}\n\nPreferred branch: ${branchValue}`.trim(),
          service: form.service.value.trim(),
          source: "home_book",
        };
        setBookSubmitStatus("submitting");
        try {
          await submitContactSubmission(payload);
          setBookSubmitStatus("success");
          setBookMessage("Thanks! We will contact you shortly to confirm.");
          form.reset();
          setBookFormText("");
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

      <select
        name="service"
        required
        defaultValue=""
        className={
          embedded
            ? "w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            : "w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        }
      >
        <option value="" disabled hidden>
          {servicesLoading ? "Loading services..." : "Select Service"}
        </option>
        {!servicesLoading &&
          (Array.isArray(services) ? services : []).map((item, index) => (
            <option key={item?._id ?? index} value={item?.name}>
              {item?.name}
            </option>
          ))}
      </select>

      <select
        name="branch"
        required
        defaultValue=""
        className={
          embedded
            ? "w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            : "w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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

