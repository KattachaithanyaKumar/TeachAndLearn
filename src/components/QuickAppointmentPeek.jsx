import React, { useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";

export default function QuickAppointmentPeek({ onClick }) {
  const [isTeasing, setIsTeasing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let cancelled = false;
    const startDelayMs = 600;
    const teaseDurationMs = 700;
    const restBetweenTeasesMs = 450;
    const timeouts = [];

    const addTimeout = (fn, ms) => {
      const id = window.setTimeout(fn, ms);
      timeouts.push(id);
      return id;
    };

    addTimeout(() => {
      if (cancelled) return;
      setIsTeasing(true);
      addTimeout(() => {
        if (cancelled) return;
        setIsTeasing(false);

        // Second tease (out + back), after a short rest.
        addTimeout(() => {
          if (cancelled) return;
          setIsTeasing(true);
          addTimeout(() => {
            if (cancelled) return;
            setIsTeasing(false);
          }, teaseDurationMs);
        }, restBetweenTeasesMs);
      }, teaseDurationMs);
    }, startDelayMs);

    return () => {
      cancelled = true;
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <div className="fixed right-0 top-[55%] -translate-y-1/2 z-[55]">
      <button
        type="button"
        onClick={onClick}
        className={[
          "group relative",
          "cursor-pointer",
          "h-[220px] w-12",
          "bg-gradient-to-r from-red-500 to-orange-500 text-white",
          "rounded-l-2xl shadow-xl",
          "flex flex-col items-center justify-center gap-3",
          "py-4",
          "transform",
          isTeasing ? "translate-x-[calc(100%-32px)]" : "translate-x-[calc(100%-16px)]",
          "hover:translate-x-0 focus:translate-x-0",
          "transition-transform duration-200 ease-out",
          "focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2",
        ].join(" ")}
        aria-label="Open Quick Appointment"
      >
        <span
          className="flex items-center justify-center w-9 h-9"
          aria-hidden="true"
        >
          <FiCalendar size={18} />
        </span>
        <span
          className={[
            "font-bold text-sm uppercase",
            "[writing-mode:vertical-rl] [text-orientation:mixed]",
            "tracking-wider",
            "select-none",
          ].join(" ")}
        >
          Quick&nbsp;Appointment
        </span>

      </button>
    </div>
  );
}

