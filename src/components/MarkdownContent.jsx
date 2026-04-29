import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

const SERVICE_HTML_SCHEMA = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    "figure",
    "figcaption",
    "table",
    "thead",
    "tbody",
    "tfoot",
    "tr",
    "th",
    "td",
  ],
  attributes: {
    ...(defaultSchema.attributes ?? {}),
    h1: [...(defaultSchema.attributes?.h1 ?? []), "id"],
    h2: [...(defaultSchema.attributes?.h2 ?? []), "id"],
    h3: [...(defaultSchema.attributes?.h3 ?? []), "id"],
    h4: [...(defaultSchema.attributes?.h4 ?? []), "id"],
    img: [
      ...(defaultSchema.attributes?.img ?? []),
      "src",
      "alt",
      "title",
      "width",
      "height",
      "loading",
      "className",
      "style",
    ],
    figure: [...(defaultSchema.attributes?.figure ?? []), "className", "style"],
    figcaption: [...(defaultSchema.attributes?.figcaption ?? []), "className", "style"],
    table: [...(defaultSchema.attributes?.table ?? []), "style"],
    td: [...(defaultSchema.attributes?.td ?? []), "style", "colspan", "rowspan"],
    th: [...(defaultSchema.attributes?.th ?? []), "style", "colspan", "rowspan"],
    tr: [...(defaultSchema.attributes?.tr ?? []), "style"],
  },
};

export default function MarkdownContent({ children, className = "" }) {
  const text = typeof children === "string" ? children : "";

  if (!text.trim()) return null;

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeRaw], [rehypeSanitize, SERVICE_HTML_SCHEMA]]}
        components={{
          h1: (props) => <h1 className="text-4xl font-bold leading-tight mb-4 mt-6 first:mt-0" {...props} />,
          h2: (props) => <h2 className="text-3xl font-bold leading-tight mb-3 mt-6 first:mt-0" {...props} />,
          h3: (props) => <h3 className="text-2xl font-semibold leading-snug mb-3 mt-5 first:mt-0" {...props} />,
          h4: (props) => <h4 className="text-xl font-semibold leading-snug mb-2 mt-4 first:mt-0" {...props} />,
          figure: ({ className: figureClassName, ...props }) => {
            const raw = String(figureClassName ?? "");
            const isSide = raw.includes("image-style-side");
            const isInline = raw.includes("image-style-inline");
            const alignClass = isSide
              ? "float-right ml-6 mb-4 mt-1 max-w-[50%]"
              : isInline
                ? "inline-block align-middle my-3"
                : "mx-auto my-4";
            return (
              <figure
                className={`ck-image ${alignClass} ${raw}`.trim()}
                {...props}
              />
            );
          },
          figcaption: (props) => (
            <figcaption className="text-sm text-gray-600 mt-2 text-center" {...props} />
          ),
          p: (props) => <p className="mb-3 last:mb-0" {...props} />,
          ol: (props) => <ol className="list-decimal list-outside ps-6 mb-3 last:mb-0" {...props} />,
          ul: (props) => <ul className="list-disc list-outside ps-6 mb-3 last:mb-0" {...props} />,
          li: (props) => <li className="mb-1 last:mb-0" {...props} />,
          a: (props) => (
            <a className="text-indigo-600 underline underline-offset-2" {...props} />
          ),
          table: (props) => (
            <div className="w-full overflow-x-auto my-4">
              <table className="w-full border-collapse" {...props} />
            </div>
          ),
          th: (props) => (
            <th className="border border-gray-200 bg-gray-50 px-3 py-2 text-left" {...props} />
          ),
          td: (props) => <td className="border border-gray-200 px-3 py-2 align-top" {...props} />,
          img: ({ className: imageClassName, ...props }) => (
            <img
              className={`max-w-full h-auto rounded-lg border border-gray-100 shadow-sm ${String(imageClassName ?? "")}`.trim()}
              alt={props.alt ?? ""}
              loading="lazy"
              {...props}
            />
          ),
          strong: (props) => <strong className="font-semibold" {...props} />,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

