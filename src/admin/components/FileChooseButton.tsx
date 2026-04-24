import type { ChangeEvent, ReactNode } from 'react'

type Props = {
  accept?: string
  disabled?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  /** Visible button label (also used as `aria-label` on the input). */
  children?: ReactNode
  /** Accessibility name when `children` is not plain text. */
  'aria-label'?: string
}

export default function FileChooseButton({
  accept = 'image/*',
  disabled = false,
  onChange,
  children = 'Choose image',
  'aria-label': ariaLabel,
}: Props) {
  const labelText =
    ariaLabel ?? (typeof children === 'string' || typeof children === 'number' ? String(children) : 'Choose image')

  return (
    <div className={`file-choose-wrap${disabled ? ' file-choose-wrap--disabled' : ''}`}>
      <span className="btn file-choose-fake" aria-hidden="true">
        {children}
      </span>
      <input
        type="file"
        accept={accept}
        className="file-choose-input"
        disabled={disabled}
        onChange={onChange}
        aria-label={labelText}
      />
    </div>
  )
}
