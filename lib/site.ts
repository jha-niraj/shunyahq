export const SITE_URL =
  process.env.MAIN_APP_URL ?? 'https://shunyahq.com'

// Brand name as it is shown - titles, OG cards, the wordmark. `SITE_ORG.legalName` below is the
// registered entity and deliberately still reads "Shunya Tech".
export const SITE_NAME = 'ShunyaHQ'

// Display domain (no protocol), derived from SITE_URL - used in OG cards, footers, etc.
export const SITE_DOMAIN = SITE_URL.replace(/^https?:\/\//, '')

export const SITE_DESCRIPTION =
  'ShunyaHQ is a web engineering studio. We design, build and ship custom web applications - SaaS platforms, dashboards and marketing sites - end to end.'

// Brand assets used in metadata, manifest, and structured data.
// The raw mark is white on transparency, which disappears against the white surfaces search engines
// and social cards render logos on - so the structured-data logo points at the ink-plate version.
export const SITE_LOGO = '/shunyahq-icon-512.png'

// Organization details used to build the Organization JSON-LD (knowledge-panel signals).
export const SITE_ORG = {
  legalName: 'Shunya Tech',
  foundingDate: '2019',
  email: 'contact@shunyatech.com',
  address: {
    locality: 'Woodbridge',
    region: 'NJ',
    country: 'US',
  },
} as const

// Public social / external profile URLs for the Organization `sameAs` array.
// The Organization schema only emits `sameAs` when this array is non-empty.
export const SITE_SOCIALS: string[] = [
  'https://x.com/shunyagroups',
  'https://www.linkedin.com/company/shunya-tech',
  'https://github.com/Shunya-Tech-Agency',
  'https://instagram.com/shunyatechofficial',
]
