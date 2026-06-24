export const SITE_URL =
  process.env.MAIN_APP_URL ?? 'https://shunyahq.com'

export const SITE_NAME = 'Shunya'

// Display domain (no protocol), derived from SITE_URL - used in OG cards, footers, etc.
export const SITE_DOMAIN = SITE_URL.replace(/^https?:\/\//, '')

export const SITE_DESCRIPTION =
  'Shunya is a software engineering studio that architects, builds, and scales production-grade digital products. Web, mobile, AI, and cloud - one team that owns everything from concept to launch.'

// Brand assets used in metadata, manifest, and structured data.
export const SITE_LOGO = '/shunyatech.png'

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
