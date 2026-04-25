/** Aligned with `sanity/schemaTypes/footer_settings.ts` social link platforms. */

export const FOOTER_SOCIAL_PLATFORMS = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'x', label: 'X (Twitter)' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'other', label: 'Other' },
] as const

export type FooterSocialPlatform = (typeof FOOTER_SOCIAL_PLATFORMS)[number]['value']

export function footerSocialPlatformLabel(platform: string | undefined): string {
  const p = FOOTER_SOCIAL_PLATFORMS.find((x) => x.value === platform)
  return p?.label ?? 'Social link'
}
