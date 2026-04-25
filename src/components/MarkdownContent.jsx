import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownContent({ children, className = "" }) {
  const text = typeof children === "string" ? children : "";

  if (!text.trim()) return null;

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: (props) => <p className="mb-3 last:mb-0" {...props} />,
          ol: (props) => <ol className="list-decimal pl-6 mb-3 last:mb-0" {...props} />,
          ul: (props) => <ul className="list-disc pl-6 mb-3 last:mb-0" {...props} />,
          li: (props) => <li className="mb-1 last:mb-0" {...props} />,
          a: (props) => (
            <a className="text-indigo-600 underline underline-offset-2" {...props} />
          ),
          strong: (props) => <strong className="font-semibold" {...props} />,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

