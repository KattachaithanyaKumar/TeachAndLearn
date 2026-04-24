import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";

const COMING_SOON_TOAST_MS = 3500;

const CTA = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (!toastMessage) return;
    const id = window.setTimeout(() => setToastMessage(null), COMING_SOON_TOAST_MS);
    return () => window.clearTimeout(id);
  }, [toastMessage]);

  const goToBooking = () => {
    if (location.pathname === "/") {
      document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate({ pathname: "/", hash: "book" });
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-sky-100 to-emerald-100 m-10 p-10 rounded-2xl text-center shadow-md">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-teal-800">
        Nurturing Every Child's Potential
      </h1>
      <p className="text-gray-700 text-base md:text-lg mb-6 max-w-2xl mx-auto">
        Every child has unique strengths and abilities. Our dedicated team is
        here to support your child's growth with personalized care and proven
        programs that help them thrive.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Button onClick={goToBooking}>Book an Assessment</Button>
        <Button onClick={() => setToastMessage("Coming soon")}>
          Explore Our School Readiness Program
        </Button>
      </div>
      {toastMessage
        ? createPortal(
            <div
              role="status"
              aria-live="polite"
              className="pointer-events-none fixed bottom-8 left-1/2 z-[9999] max-w-[min(calc(100vw-2rem),20rem)] -translate-x-1/2 rounded-xl bg-gray-900 px-5 py-3 text-center text-sm font-medium text-white shadow-lg ring-1 ring-white/10"
            >
              {toastMessage}
            </div>,
            document.body
          )
        : null}
    </div>
  );
};

export default CTA;
