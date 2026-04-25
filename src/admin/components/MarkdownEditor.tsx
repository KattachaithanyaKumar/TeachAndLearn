import MDEditor from '@uiw/react-md-editor'

type Props = {
  value: string
  onChange: (next: string) => void
  rows?: number
}

export default function MarkdownEditor({ value, onChange, rows = 6 }: Props) {
  return (
    <div data-color-mode="dark" style={{ gridColumn: '1 / -1' }}>
      <MDEditor
        value={value ?? ''}
        onChange={(v) => onChange(v ?? '')}
        preview="live"
        height={Math.max(180, rows * 28)}
        visibleDragbar={false}
      />
    </div>
  )
}

