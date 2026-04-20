import type { CSSProperties, ReactNode } from 'react'
import type { ServicePageBlock } from '../types/servicePageBlocks'

const box: CSSProperties = {
  border: '1px solid var(--border)',
  borderRadius: 4,
  background: 'rgba(255,255,255,0.04)',
}

const bar =
  (compact: boolean) =>
  (w: string, h: number): CSSProperties => ({
    height: compact ? Math.max(2, Math.round(h * 0.75)) : h,
    width: w,
    borderRadius: 2,
    background: 'var(--muted)',
    opacity: 0.45,
  })

function imgBox(compact: boolean, w: number, h: number): CSSProperties {
  const z = compact ? 0.65 : 1
  return {
    ...box,
    width: Math.round(w * z),
    height: Math.round(h * z),
    flexShrink: 0,
    background: 'rgba(91, 159, 212, 0.15)',
  }
}

type Size = 'default' | 'compact'

export default function ServiceBlockTypePreview({
  type,
  size = 'default',
}: {
  type: ServicePageBlock['_type']
  size?: Size
}) {
  const compact = size === 'compact'
  const B = bar(compact)
  const pad = compact ? 6 : 12
  const gap = compact ? 6 : 10

  const wrap: CSSProperties = {
    maxWidth: compact ? 132 : 380,
    padding: pad,
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    background: 'rgba(255,255,255,0.02)',
  }

  const inner = (child: ReactNode) => <div style={wrap}>{child}</div>

  switch (type) {
    case 'service_page_block_intro_split':
      return inner(
        <div style={{ display: 'flex', gap, alignItems: 'flex-start' }}>
          <div style={imgBox(compact, 72, 72)} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}>
            <div style={B('55%', 8)} />
            <div style={B('100%', 4)} />
            <div style={B('100%', 4)} />
            <div style={B('85%', 4)} />
          </div>
        </div>
      )
    case 'service_page_block_alternating_media':
      return inner(
        <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 8 }}>
          <div style={B('40%', 8)} />
          <div style={{ display: 'flex', gap, alignItems: 'center' }}>
            <div style={imgBox(compact, 64, 56)} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={B('100%', 4)} />
              <div style={B('90%', 4)} />
              <div style={B('90%', 4)} />
            </div>
          </div>
        </div>
      )
    case 'service_page_block_icon_card_grid':
      return inner(
        <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 8 }}>
          <div style={B('50%', 7)} />
          <div style={B('75%', 4)} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: compact ? 4 : 6,
            }}
          >
            {(compact ? [0, 1, 2] : [0, 1, 2, 3, 4, 5]).map((i) => (
              <div
                key={i}
                style={{
                  ...box,
                  padding: compact ? 4 : 6,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: compact ? 3 : 4,
                }}
              >
                <div
                  style={{
                    width: compact ? 10 : 14,
                    height: compact ? 10 : 14,
                    borderRadius: 4,
                    background: 'rgba(91, 159, 212, 0.35)',
                  }}
                />
                <div style={B('100%', 4)} />
                <div style={B('100%', 3)} />
              </div>
            ))}
          </div>
        </div>
      )
    case 'service_page_block_icon_card_stack':
      return inner(
        <div style={{ display: 'flex', gap, alignItems: 'flex-start' }}>
          <div style={imgBox(compact, 56, 80)} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}>
            <div style={B('55%', 6)} />
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  ...box,
                  padding: compact ? 4 : 6,
                  display: 'flex',
                  gap: compact ? 4 : 6,
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: compact ? 9 : 12,
                    height: compact ? 9 : 12,
                    borderRadius: 3,
                    background: 'rgba(91, 159, 212, 0.35)',
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={B('70%', 4)} />
                  <div style={{ ...B('100%', 3), marginTop: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    case 'service_page_block_split_disorders':
      return inner(
        <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 8, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap, width: '100%' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={B('80%', 6)} />
              <div style={B('100%', 3)} />
              <div style={B('100%', 3)} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={B('100%', 3)} />
              <div style={B('100%', 3)} />
              <div style={B('100%', 3)} />
              <div style={B('100%', 3)} />
            </div>
          </div>
          <div style={imgBox(compact, 72, 48)} />
        </div>
      )
    case 'service_page_block_media_side_icon_list':
      return inner(
        <div style={{ display: 'flex', gap, alignItems: 'flex-start' }}>
          <div style={imgBox(compact, 56, 72)} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}>
            <div style={B('60%', 6)} />
            <div style={B('90%', 3)} />
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ display: 'flex', gap: compact ? 4 : 6, alignItems: 'center' }}>
                <div
                  style={{
                    width: compact ? 8 : 10,
                    height: compact ? 8 : 10,
                    borderRadius: 2,
                    background: 'rgba(91, 159, 212, 0.35)',
                  }}
                />
                <div style={B('100%', 4)} />
              </div>
            ))}
          </div>
        </div>
      )
    case 'service_page_block_goals_split':
      return inner(
        <div style={{ display: 'flex', gap, alignItems: 'flex-start' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}>
            <div style={B('55%', 6)} />
            <div style={B('90%', 3)} />
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ display: 'flex', gap: compact ? 4 : 6, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: compact ? 9 : 12,
                    height: compact ? 9 : 12,
                    borderRadius: 3,
                    background: 'rgba(91, 159, 212, 0.35)',
                  }}
                />
                <div style={B('100%', 4)} />
              </div>
            ))}
          </div>
          <div style={imgBox(compact, 56, 72)} />
        </div>
      )
    case 'service_page_block_two_column_plain':
      return inner(
        <div style={{ display: 'flex', gap, alignItems: 'flex-start' }}>
          <div style={imgBox(compact, 64, 64)} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}>
            <div style={B('70%', 7)} />
            <div style={B('100%', 4)} />
            <div style={B('100%', 4)} />
            <div style={B('85%', 4)} />
          </div>
        </div>
      )
    default:
      return inner(
        <div>
          <div style={B('40%', 6)} />
        </div>
      )
  }
}
