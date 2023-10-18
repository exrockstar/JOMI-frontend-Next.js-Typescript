import { string } from 'yup'

/**
 * Place for constant variables like this one
 */
export const isProduction = process.env.NODE_ENV === 'production'
export const PROTOCOL =
  process.env.BASE_IMAGE_PROTOCOL || (isProduction ? 'https://' : 'http://')
export const BASE_IMAGE_URL = `${PROTOCOL}${process.env.NEXT_PUBLIC_VERCEL_URL}`
export const BASE_URL = process.env.NEXTAUTH_URL ?? BASE_IMAGE_URL
export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME || 'Journal of Medical Insight'
export const IS_SERVER = typeof window === 'undefined'

/**
 * *NOTE: We will uncomment other languages over time
 */
export const LOCALES = [
  'en',
  'hi',
  'ar',
  'zh',
  'nl',
  'fr',
  'de',
  'he',
  'it',
  'ja',
  'jv',
  'ko',
  'pt',
  'ru',
  'es',
  'tr'
]

type InterestCategory = {
  name: string
  sub_categories?: string[]
}
// Used for user interests in RegisterPanel.jsx and ProfilePanel.jsx
export const INTEREST_CATEGORIES: InterestCategory[] = [
  {
    name: 'General Surgery',
    sub_categories: [
      'Endocrine Surgery',
      'Breast Surgery',
      'Colorectal Surgery',
      'Gastrointestinal'
    ]
  },
  {
    name: 'Orthopaedics',
    sub_categories: [
      'Orthopaedic Trauma',
      'Joint Replacement',
      'Shoulder',
      'Hand & Elbow',
      'Ankle'
    ]
  },
  { name: 'Otolaryngology' },
  { name: 'Neurosurgery' },
  { name: 'Cardiac Surgery' },
  { name: 'Vascular Surgery' },
  { name: 'Ophthalmology' },
  { name: 'Urology' },
  { name: 'OB/GYN' },
  { name: 'Interventional Radiology' },
  { name: 'Skin and Soft Tissue' }
]

/*
 * Array of all categories in our DB
 * Used right now for filtering articles in article management CMS
 */
export const ARTICLE_CATEGORIES = [
  'Interventional Radiology',
  'Obstetrics & Gynecology',
  'Fundamentals',
  'Hand Surgery',
  'Vascular Surgery',
  'Pediatric Surgery',
  'Trauma and Acute Care',
  'Otolaryngology',
  'Urology',
  'Orthopaedics',
  'Neurosurgery',
  'Basic Skills for the OR',
  'Plastic Surgery',
  'Global Surgery',
  'Orthopaedic Trauma',
  'General Surgery',
  'Cardiac Surgery',
  '(OMFS)',
  'Ophthalmology'
]

export const STRIPE_BASE_URL = isProduction
  ? `https://dashboard.stripe.com`
  : `https://dashboard.stripe.com/test`
