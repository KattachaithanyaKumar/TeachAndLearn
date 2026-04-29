import { useMemo, useState } from 'react'
import MarkdownContent from '../../components/MarkdownContent'

type Props = {
  value: string
  onChange: (next: string) => void
  rows?: number
  placeholder?: string
}

/**
 * Simple HTML editor (textarea) with optional live preview.
 * Preview uses the public `MarkdownContent` renderer, which supports raw HTML
 * (tables/images) and sanitizes it.
 */
export default function HtmlEditor({ value, onChange, rows = 10, placeholder }: Props) {
  const [showPreview, setShowPreview] = useState(true)
  const v = value ?? ''
  const height = useMemo(() => Math.max(220, rows * 22), [rows])

  return (
    <div style={{ gridColumn: '1 / -1' }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span className="muted small">HTML</span>
        <label className="row muted small" style={{ gap: 8, userSelect: 'none' }}>
          <input
            type="checkbox"
            checked={showPreview}
            onChange={(e) => setShowPreview(e.target.checked)}
          />
          Preview
        </label>
      </div>

      <div
        className="field-grid"
        style={{
          gridTemplateColumns: showPreview ? '1fr 1fr' : '1fr',
          gap: 12,
          alignItems: 'start',
        }}
      >
        <textarea
          className="textarea"
          value={v}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          style={{
            minHeight: height,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace',
            fontSize: 13,
            lineHeight: 1.5,
            resize: 'vertical',
          }}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
        />

        {showPreview ? (
          <div
            className="card"
            style={{
              padding: 12,
              minHeight: height,
              overflow: 'auto',
              background: 'var(--muted-bg, #f9fafb)',
            }}
          >
            <MarkdownContent className="text-sm text-gray-800">{v}</MarkdownContent>
          </div>
        ) : null}
      </div>
    </div>
  )
}

