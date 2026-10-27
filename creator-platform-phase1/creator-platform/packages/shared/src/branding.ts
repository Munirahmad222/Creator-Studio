/** Central brand configuration. Replace values here when the final brand is chosen. */
export const branding = {
  name: 'Creator Platform',
  shortName: 'Creator',
  description: 'A workspace for creators, collaborations and content planning.',
  themeColor: '#6D4AFF',
  backgroundColor: '#F8F7FC',
  localeDefault: 'en',
  supportedLocales: ['en', 'ur', 'ar'] as const,
  instagramMode: 'demo' as const,
} as const;

export type SupportedLocale = (typeof branding.supportedLocales)[number];
