import React from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import MarkdownContent from "../../components/MarkdownContent";

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim();
}

function asString(v, fallback = "") {
  return isNonEmptyString(v) ? v.trim() : fallback;
}

function asStringArray(v) {
  if (!Array.isArray(v)) return [];
  return v.map((x) => (typeof x === "string" ? x.trim() : "")).filter(Boolean);
}

export default function renderFranchisePageBlock(block) {
  if (!block || typeof block !== "object") return null;

  switch (block._type) {
    case "franchise_page_block_hero": {
      const title = asString(block.title);
      const lead = asString(block.lead);
      if (!title && !lead) return null;
      return (
        <div>
          {title ? (
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-red-500 via-orange-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg leading-tight">
              {title}
            </h1>
          ) : null}
          {lead ? <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8">{lead}</p> : null}
        </div>
      );
    }

    case "franchise_page_block_value_checks": {
      const lines = asStringArray(block.lines);
      if (lines.length === 0) return null;
      return (
        <ul className="space-y-3 mb-8">
          {lines.map((line, i) => (
            <li key={`${i}-${line}`} className="flex items-start gap-3 text-gray-800 font-medium">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white text-xs">
                <FaCheck className="text-[10px]" aria-hidden />
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      );
    }

    case "franchise_page_block_ctas": {
      const applyLabel = asString(block.applyLabel);
      const talkLabel = asString(block.talkLabel);
      const applyHref = asString(block.applyHref, "#franchise-inquiry");
      const talkHref = asString(block.talkHref, "/contact-us#contact-form");
      if (!applyLabel && !talkLabel) return null;
      return (
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">
          {applyLabel ? (
            <a
              href={applyHref}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 text-center text-base font-bold text-white shadow-md transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              {applyLabel}
            </a>
          ) : null}
          {talkLabel ? (
            talkHref.startsWith("/") ? (
              <Link
                to={talkHref}
                className="inline-flex items-center justify-center rounded-xl border-2 border-orange-400 bg-white px-6 py-3 text-center text-base font-bold text-orange-600 shadow-sm transition hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-200"
              >
                {talkLabel}
              </Link>
            ) : (
              <a
                href={talkHref}
                className="inline-flex items-center justify-center rounded-xl border-2 border-orange-400 bg-white px-6 py-3 text-center text-base font-bold text-orange-600 shadow-sm transition hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-200"
              >
                {talkLabel}
              </a>
            )
          ) : null}
        </div>
      );
    }

    case "franchise_page_block_phone": {
      const display = asString(block.display);
      const telHref = asString(block.telHref);
      if (!display || !telHref) return null;
      return (
        <p className="text-gray-700 mb-12">
          <span className="mr-2" aria-hidden>
            📞
          </span>
          Call:{" "}
          <a href={telHref} className="font-semibold text-orange-600 underline-offset-2 hover:underline">
            {display}
          </a>
        </p>
      );
    }

    case "franchise_page_block_text_section": {
      const heading = asString(block.heading);
      const bodyMarkdown = asString(block.bodyMarkdown);
      if (!heading && !bodyMarkdown) return null;
      return (
        <section>
          {heading ? (
            <h2 className="text-xl sm:text-2xl font-bold mb-3 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              {heading}
            </h2>
          ) : null}
          {bodyMarkdown ? <MarkdownContent className="text-gray-700 leading-relaxed">{bodyMarkdown}</MarkdownContent> : null}
        </section>
      );
    }

    case "franchise_page_block_bullets_section": {
      const heading = asString(block.heading);
      const bullets = asStringArray(block.bullets);
      if (!heading && bullets.length === 0) return null;
      return (
        <section>
          {heading ? (
            <h2 className="text-xl sm:text-2xl font-bold mb-3 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              {heading}
            </h2>
          ) : null}
          {bullets.length > 0 ? (
            <ul className="list-disc list-outside space-y-2 pl-5 marker:text-orange-500">
              {bullets.map((line, i) => (
                <li key={`${i}-${line}`}>{line}</li>
              ))}
            </ul>
          ) : null}
        </section>
      );
    }

    case "franchise_page_block_custom_markdown": {
      const markdown = asString(block.markdown);
      if (!markdown) return null;
      return <MarkdownContent className="text-gray-700 leading-relaxed">{markdown}</MarkdownContent>;
    }

    default:
      return null;
  }
}

