import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Section from "../components/Section";
import { getFranchise, submitFranchiseInquiry } from "../network/api_service";
import { useApiStates } from "../hooks/useApiStates";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { INDIAN_STATES, EDUCATION_LEVELS } from "../constants/indianStates";
import { mergeFranchisePageBody } from "../data/franchisePageCopy";
import renderFranchisePageBlock from "./franchisePageBlocks/renderFranchisePageBlock";

const COMMENTS_MAX = 500;

const hasWriteToken = Boolean(import.meta.env.VITE_SANITY_WRITE_TOKEN?.trim());

function setValidity(el, message) {
  if (el && typeof el.setCustomValidity === "function") el.setCustomValidity(message);
}

function digitsOnlyMax10(value) {
  return String(value ?? "").replace(/\D+/g, "").slice(0, 10);
}

const franchiseSelectClass =
  "w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200";

function SelectChevron() {
  return (
    <span
      className="pointer-events-none absolute right-3 top-1/2 z-[1] -translate-y-1/2 text-gray-500"
      aria-hidden
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  );
}

const Franchises = () => {
  const { states, setLoading, setError, setData } = useApiStates({
    franchise: { loading: false, error: null, data: null },
  });

  const [franchiseData, setFranchiseData] = useState(null);
  const [commentsValue, setCommentsValue] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [dobError, setDobError] = useState("");
  const [educationError, setEducationError] = useState("");
  const [stateError, setStateError] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [commentsError, setCommentsError] = useState("");
  const [formStatus, setFormStatus] = useState("idle");
  const [formFeedback, setFormFeedback] = useState(null);

  const maxDob = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    const fetchFranchiseData = async () => {
      setLoading("franchise", true);
      try {
        const data = await getFranchise();
        setFranchiseData(data);
        setData("franchise", data);
        setLoading("franchise", false);
      } catch (error) {
        console.error("Error fetching franchise data:", error);
        setError("franchise", error.message);
      }
    };

    fetchFranchiseData();
  }, [setLoading, setError, setData]);

  if (states.franchise?.loading) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="pt-24 flex justify-center items-center min-h-[50vh]">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  const showError = states.franchise?.error && !states.franchise?.data;

  if (showError) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="pt-24 flex justify-center items-center min-h-[50vh] flex-col">
          <ErrorMessage
            message="Unable to load franchise data from server."
            onRetry={() => window.location.reload()}
          />
        </div>
        <Footer />
      </div>
    );
  }

  if (!franchiseData) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="pt-24 flex justify-center items-center min-h-[50vh] flex-col">
          <p className="text-gray-600 text-lg">No franchise data available.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const sortedSteps = franchiseData.steps
    ? [...franchiseData.steps].sort((a, b) => (a.index || 0) - (b.index || 0))
    : [];

  const stepsForUi = sortedSteps.map((step) => ({
    _id: step._id,
    title: step.title,
    description: step.description,
  }));

  const blocks = Array.isArray(franchiseData.pageBodyBlocks) ? franchiseData.pageBodyBlocks : null;
  const hasBlocks = Boolean(blocks && blocks.length > 0);
  const pb = hasBlocks ? null : mergeFranchisePageBody(franchiseData.pageBody);

  return (
    <div className="overflow-hidden px-4 sm:px-6">
      <Navbar />

      {states.franchise?.error && (
        <div className="max-w-4xl mx-auto px-4 pt-24 mb-8">
          <ErrorMessage
            message="Some franchise data may not be up to date due to server issues."
            onRetry={() => window.location.reload()}
          />
        </div>
      )}

      <Section className="relative px-2 sm:px-8 md:px-12 lg:px-20 py-0 overflow-hidden mt-6">
        <div className="relative z-10 max-w-3xl mx-auto py-12 sm:py-16 md:py-20 flex flex-col items-stretch text-left">
          {hasBlocks ? (
            <div className="space-y-10">
              {blocks.map((b, idx) => (
                <React.Fragment key={b?._key ?? `${idx}-${b?._type ?? "block"}`}>
                  {renderFranchisePageBlock(b)}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-red-500 via-orange-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg leading-tight">
                {pb.heroTitle}
              </h1>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8">{pb.heroLead}</p>

              <ul className="space-y-3 mb-8">
                {pb.valueChecks.map((line, i) => (
                  <li key={`${i}-${line}`} className="flex items-start gap-3 text-gray-800 font-medium">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white text-xs">
                      <FaCheck className="text-[10px]" aria-hidden />
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">
                <a
                  href="#franchise-inquiry"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 text-center text-base font-bold text-white shadow-md transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  {pb.ctaApplyLabel}
                </a>
                <Link
                  to="/contact-us#contact-form"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-orange-400 bg-white px-6 py-3 text-center text-base font-bold text-orange-600 shadow-sm transition hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-200"
                >
                  {pb.ctaTalkLabel}
                </Link>
              </div>

              <p className="text-gray-700 mb-12">
                <span className="mr-2" aria-hidden>
                  📞
                </span>
                Call:{" "}
                <a href={pb.phoneTel} className="font-semibold text-orange-600 underline-offset-2 hover:underline">
                  {pb.phoneDisplay}
                </a>
              </p>

              <div className="space-y-10 text-gray-700 leading-relaxed">
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    {pb.sectionWhyTitle}
                  </h2>
                  <p>{pb.sectionWhyBody}</p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    {pb.sectionImpactTitle}
                  </h2>
                  <p>{pb.sectionImpactBody}</p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    {pb.sectionTrustTitle}
                  </h2>
                  <p className="mb-3">{pb.sectionTrustBody}</p>
                  <p>{pb.sectionTrustPartner}</p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    {pb.sectionFacilityTitle}
                  </h2>
                  <ul className="list-disc list-outside space-y-2 pl-5 marker:text-orange-500">
                    {pb.facilityLines.map((line, i) => (
                      <li key={`${i}-${line}`}>{line}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    {pb.sectionJoinTitle}
                  </h2>
                  <p>{pb.sectionJoinBody}</p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">{pb.sectionPartnersTitle}</h2>
                  <ul className="list-disc list-outside space-y-2 pl-5 marker:text-orange-500">
                    {pb.partnerCriteria.map((line, i) => (
                      <li key={`${i}-${line}`}>{line}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </>
          )}
        </div>
      </Section>

      <div className="max-w-6xl mx-auto py-12 flex flex-col flex-wrap gap-8 items-start px-2 sm:px-4 lg:flex-row">
        <div
          id="franchise-inquiry"
          className={`min-w-0 ${stepsForUi.length > 0 ? "flex-1" : "w-full max-w-2xl mx-auto"} w-full bg-white rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col justify-center scroll-mt-24`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Ready To Get Started?
          </h2>
          <p className="text-gray-500 mb-8">
            Contact us today to learn more about our services and how we can support you or your loved one’s growth and
            development.
          </p>
          {!hasWriteToken ? (
            <p className="text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm mb-6">
              Form submissions need <code className="text-xs">VITE_SANITY_WRITE_TOKEN</code> in{" "}
              <code className="text-xs">.env</code> (see <code className="text-xs">.env.example</code>) and your site
              origin under Sanity API → CORS.
            </p>
          ) : null}
          {formFeedback ? (
            <p
              className={
                formStatus === "success"
                  ? "text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm mb-6"
                  : "text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm mb-6"
              }
              role="status"
            >
              {formFeedback}
            </p>
          ) : null}
          <form
            className="space-y-6"
            noValidate
            onSubmit={async (e) => {
              e.preventDefault();
              setFormFeedback(null);
              setNameError("");
              setEmailError("");
              setMobileError("");
              setDobError("");
              setEducationError("");
              setStateError("");
              setDistrictError("");
              setLocationError("");
              setCommentsError("");

              const form = e.target;
              const nameTrim = String(form.name?.value ?? "").trim();
              if (!nameTrim || !/^[A-Za-z][A-Za-z\s]*$/.test(nameTrim)) {
                setNameError("Enter a valid full name (letters and spaces only).");
                form.name?.focus?.();
                return;
              }

              const emailValue = String(form.email?.value ?? "").trim();
              if (!emailValue) {
                setEmailError("Email is required");
                form.email?.focus?.();
                return;
              }
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
                setEmailError("Enter a valid email address");
                form.email?.focus?.();
                return;
              }

              const mobileDigits = digitsOnlyMax10(form.mobile?.value ?? "");
              if (!mobileDigits) {
                setMobileError("Phone number is required");
                form.mobile?.focus?.();
                return;
              }
              if (mobileDigits.length !== 10) {
                setMobileError("Phone number must be exactly 10 digits");
                form.mobile?.focus?.();
                return;
              }

              const dobVal = String(form.dob?.value ?? "").trim();
              if (!dobVal) {
                setDobError("Date of birth is required");
                form.dob?.focus?.();
                return;
              }

              const educationValue = String(form.education?.value ?? "").trim();
              if (!educationValue) {
                setEducationError("Please select your highest level of education");
                form.education?.focus?.();
                return;
              }

              const stateVal = String(form.currentState?.value ?? "").trim();
              if (!stateVal) {
                setStateError("Please select your state");
                form.currentState?.focus?.();
                return;
              }

              const districtTrim = String(form.currentDistrict?.value ?? "").trim();
              if (districtTrim.length < 2) {
                setDistrictError("Enter a valid district (at least 2 characters).");
                form.currentDistrict?.focus?.();
                return;
              }

              const locationTrim = String(form.location?.value ?? "").trim();
              if (locationTrim.length < 2) {
                setLocationError("Preferred location is required (at least 2 characters).");
                form.location?.focus?.();
                return;
              }

              const commentsTrim = commentsValue.trim();
              if (!commentsTrim) {
                setCommentsError("Message is required");
                document.getElementById("comments")?.focus?.();
                return;
              }

              const educationLabel =
                EDUCATION_LEVELS.find((o) => o.value === educationValue)?.label ?? educationValue;
              const data = {
                name: nameTrim,
                email: emailValue,
                mobile: mobileDigits,
                dob: dobVal,
                currentState: stateVal,
                currentDistrict: districtTrim,
                education: educationLabel,
                location: locationTrim,
                comments: commentsTrim,
              };

              if (!hasWriteToken) {
                setFormStatus("error");
                setFormFeedback(
                  "Form is not configured. Add VITE_SANITY_WRITE_TOKEN to your environment.",
                );
                return;
              }

              setFormStatus("submitting");
              try {
                await submitFranchiseInquiry(data);
                setFormStatus("success");
                setFormFeedback("Thank you for your interest! We will get back to you soon.");
                form.reset();
                setCommentsValue("");
              } catch (err) {
                setFormStatus("error");
                if (err?.code === "MISSING_WRITE_TOKEN") {
                  setFormFeedback(
                    "Form is not configured. Add VITE_SANITY_WRITE_TOKEN (see .env.example).",
                  );
                } else if (err instanceof Error) {
                  setFormFeedback(err.message);
                } else {
                  setFormFeedback(
                    "Could not send your inquiry. Check CORS settings in Sanity or try again.",
                  );
                }
              }
            }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                  Your Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  pattern="^[A-Za-z][A-Za-z\\s]*$"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none"
                  aria-invalid={nameError ? "true" : "false"}
                  onChange={(e) => {
                    const next = String(e.currentTarget.value ?? "")
                      .replace(/[^A-Za-z\s]+/g, "")
                      .replace(/\s{2,}/g, " ");
                    if (e.currentTarget.value !== next) e.currentTarget.value = next;
                    if (nameError) setNameError("");
                    setValidity(e.currentTarget, "");
                  }}
                  onInvalid={(ev) => {
                    const v = ev.currentTarget.value.trim();
                    if (!v || !/^[A-Za-z][A-Za-z\s]*$/.test(v)) {
                      setValidity(ev.currentTarget, "Enter a valid full name");
                    }
                  }}
                  onInput={(e) => setValidity(e.currentTarget, "")}
                />
                {nameError ? (
                  <p className="text-sm text-red-700 mt-2" role="alert">
                    {nameError}
                  </p>
                ) : null}
              </div>
              <div className="flex-1">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Your Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none"
                  aria-invalid={emailError ? "true" : "false"}
                  onChange={(e) => {
                    if (emailError) setEmailError("");
                    setValidity(e.currentTarget, "");
                  }}
                />
                {emailError ? (
                  <p className="text-sm text-red-700 mt-2" role="alert">
                    {emailError}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="dob" className="block text-gray-700 font-medium mb-1">
                  Date of birth*
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  required
                  max={maxDob}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none"
                  aria-invalid={dobError ? "true" : "false"}
                  onChange={() => {
                    if (dobError) setDobError("");
                  }}
                />
                {dobError ? (
                  <p className="text-sm text-red-700 mt-2" role="alert">
                    {dobError}
                  </p>
                ) : null}
              </div>
              <div className="flex-1">
                <label htmlFor="education" className="block text-gray-700 font-medium mb-1">
                  Highest level of education*
                </label>
                <div className="relative">
                  <select
                    id="education"
                    name="education"
                    required
                    defaultValue=""
                    className={franchiseSelectClass}
                    aria-invalid={educationError ? "true" : "false"}
                    onChange={() => {
                      if (educationError) setEducationError("");
                    }}
                  >
                    <option value="" disabled>
                      Select education
                    </option>
                    {EDUCATION_LEVELS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <SelectChevron />
                </div>
                {educationError ? (
                  <p className="text-sm text-red-700 mt-2" role="alert">
                    {educationError}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="currentState" className="block text-gray-700 font-medium mb-1">
                  Current location — State*
                </label>
                <div className="relative">
                  <select
                    id="currentState"
                    name="currentState"
                    required
                    defaultValue=""
                    className={franchiseSelectClass}
                    aria-invalid={stateError ? "true" : "false"}
                    onChange={() => {
                      if (stateError) setStateError("");
                    }}
                  >
                    <option value="" disabled>
                      Select state
                    </option>
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <SelectChevron />
                </div>
                {stateError ? (
                  <p className="text-sm text-red-700 mt-2" role="alert">
                    {stateError}
                  </p>
                ) : null}
              </div>
              <div className="flex-1">
                <label htmlFor="currentDistrict" className="block text-gray-700 font-medium mb-1">
                  Current location — District*
                </label>
                <input
                  type="text"
                  id="currentDistrict"
                  name="currentDistrict"
                  required
                  placeholder="District"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none"
                  aria-invalid={districtError ? "true" : "false"}
                  onChange={() => {
                    if (districtError) setDistrictError("");
                  }}
                />
                {districtError ? (
                  <p className="text-sm text-red-700 mt-2" role="alert">
                    {districtError}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="mobile" className="block text-gray-700 font-medium mb-1">
                  Mobile*
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  required
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={10}
                  pattern="^[0-9]{10}$"
                  placeholder="Mobile Number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none"
                  aria-invalid={mobileError ? "true" : "false"}
                  onChange={(e) => {
                    const next = digitsOnlyMax10(e.currentTarget.value);
                    if (e.currentTarget.value !== next) e.currentTarget.value = next;
                    if (mobileError) setMobileError("");
                    setValidity(e.currentTarget, "");
                  }}
                  onInvalid={(e) => setValidity(e.currentTarget, "Enter valid contact number")}
                  onInput={(e) => setValidity(e.currentTarget, "")}
                />
                {mobileError ? (
                  <p className="text-sm text-red-700 mt-2" role="alert">
                    {mobileError}
                  </p>
                ) : null}
              </div>
              <div className="flex-1">
                <label htmlFor="location" className="block text-gray-700 font-medium mb-1">
                  Preferred Location*
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  placeholder="Preferred Location"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none"
                  aria-invalid={locationError ? "true" : "false"}
                  onChange={() => {
                    if (locationError) setLocationError("");
                  }}
                />
                {locationError ? (
                  <p className="text-sm text-red-700 mt-2" role="alert">
                    {locationError}
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="comments" className="block text-gray-700 font-medium mb-1">
                Write Message*
              </label>
              <textarea
                id="comments"
                rows={4}
                required
                maxLength={COMMENTS_MAX}
                value={commentsValue}
                onChange={(e) => {
                  setCommentsValue(e.target.value.slice(0, COMMENTS_MAX));
                  if (commentsError) setCommentsError("");
                }}
                placeholder="Write Message"
                aria-describedby="comments-counter"
                aria-invalid={commentsError ? "true" : "false"}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none resize-none"
              />
              <p id="comments-counter" className="text-xs text-gray-500 mt-2 text-left tabular-nums" aria-live="polite">
                {commentsValue.length}/{COMMENTS_MAX}
              </p>
              {commentsError ? (
                <p className="text-sm text-red-700 mt-2" role="alert">
                  {commentsError}
                </p>
              ) : null}
            </div>
            <button
              type="submit"
              disabled={formStatus === "submitting"}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-3 rounded-xl transition text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formStatus === "submitting" ? "Sending…" : "Send Message"}{" "}
              {formStatus === "submitting" ? null : <span aria-hidden>→</span>}
            </button>
          </form>
        </div>

        {stepsForUi.length > 0 ? (
          <aside className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl lg:max-w-md">
            <div className="flex flex-col p-6 sm:p-8">
              <h3 className="mb-6 border-b border-orange-100 pb-3 text-lg font-bold text-gray-900">
                Franchise journey
              </h3>
              <ol className="m-0 flex min-w-0 list-none flex-col space-y-8 overflow-x-hidden p-0">
                {stepsForUi.map((step, idx) => (
                  <li key={step._id ?? idx} className="min-w-0 [overflow-wrap:anywhere]">
                    <div className="mb-1 text-xs font-semibold text-gray-500">Step {idx + 1}</div>
                    <div className="mb-1 break-words text-base font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                      {step.title}
                    </div>
                    <p className="break-words text-sm leading-relaxed text-gray-600">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        ) : null}
      </div>

      <Footer />
    </div>
  );
};

export default Franchises;
