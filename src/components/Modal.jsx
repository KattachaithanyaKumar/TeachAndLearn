import React, { useEffect, useId, useMemo, useRef } from "react";

function getFocusable(container) {
  if (!container) return [];
  const nodes = container.querySelectorAll(
    [
      'a[href]',
      'area[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(",")
  );
  return Array.from(nodes).filter((n) => {
    const el = /** @type {HTMLElement} */ (n);
    return !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true";
  });
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  initialFocus = "first",
  panelClassName = "",
}) {
  const titleId = useId();
  const panelRef = useRef(null);
  const lastActive = useRef(null);

  const ariaLabelledBy = useMemo(() => {
    if (!title) return undefined;
    return titleId;
  }, [title, titleId]);

  useEffect(() => {
    if (!open) return;

    lastActive.current = document.activeElement;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = getFocusable(panel);
    const toFocus =
      initialFocus === "panel"
        ? panel
        : focusables[0] || panel;
    if (toFocus && typeof toFocus.focus === "function") {
      requestAnimationFrame(() => toFocus.focus());
    }

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
        return;
      }
      if (e.key !== "Tab") return;

      const items = getFocusable(panelRef.current);
      if (items.length === 0) {
        e.preventDefault();
        panelRef.current?.focus?.();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || !panelRef.current?.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      const el = lastActive.current;
      if (el && typeof el.focus === "function") {
        requestAnimationFrame(() => el.focus());
      }
    };
  }, [open, onClose, initialFocus]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close dialog"
        onClick={() => onClose?.()}
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className={
          "relative z-[61] w-[min(92vw,52rem)] max-h-[92vh] overflow-hidden rounded-2xl bg-white shadow-2xl outline-none " +
          panelClassName
        }
      >
        <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-gray-100 px-5 py-4 flex items-center justify-between gap-4">
          {title ? (
            <h2 id={titleId} className="text-lg sm:text-xl font-bold text-gray-900">
              {title}
            </h2>
          ) : (
            <span />
          )}
          <button
            type="button"
            className="rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
            onClick={() => onClose?.()}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

