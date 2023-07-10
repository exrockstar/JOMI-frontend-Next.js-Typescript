const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL || 'http://localhost:4000',
    STRIPE_CLIENT_DEV: process.env.STRIPE_CLIENT_DEV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    GOOGLE_GTAG: process.env.GOOGLE_GTAG,
    APP_ENV: process.env.APP_ENV,
    BASE_IMAGE_PROTOCOL: process.env.BASE_IMAGE_PROTOCOL,
    V4_URL: process.env.V4_URL,
    GOOGLE_GTM: process.env.GOOGLE_GTM,
    FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID,
    NEXT_PUBLIC_LINKEDIN_PARTNER_ID: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID,
    AMPLITUDE_API_KEY: process.env.AMPLITUDE_API_KEY
  },
  images: {
    domains: [
      'localhost',
      'jomi2.vercel.app',
      'jomi6-jmarioste-jomi.vercel.app',
      'app.jomi.com',
      'develop.jomi.com',
      'staging.jomi.com',
      'jomi.com',
      //used for profile images of users.
      'lh2.googleusercontent.com',
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com',
      'lh7.googleusercontent.com',
      'platform-lookaside.fbsbx.com',
      'scontent.xx.fbcdn.net',
      'ssl.wistia.com',
      'embed-ssl.wistia.com',
      process.env.VERCEL_URL
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  },
  async redirects() {
    return [
      { source: '/account', destination: '/account/profile', permanent: true },
    ]
  },
  async rewrites() {
    let rewrites = [
      {
        source: '/request-subscription',
        destination: '/account/request-subscription'
      },
      {
        source: '/rss.xml',
        destination: '/api/rss.xml'
      },
      {
        source: '/request-publication',
        destination: '/api/request-publication'
      }
    ]

    // add /home and /index rewrites locally for development since it's not deployed in vercel yet
    if(process.env.NODE_ENV === "development"){
      rewrites = rewrites.concat([
        {
          "source": "/index",
          "destination": "/article-index"
        },
        {
          "source": "/",
          "destination": "/home"
        }
      ])
    }
    return rewrites
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: true
  },
  swcMinify: true,
  experimental: {
    modularizeImports: {
      '@mui/material': {
        transform: '@mui/material/{{member}}'
      },
      '@mui/icons-material': {
        transform: '@mui/icons-material/{{member}}'
      },
      '@mui/styles': {
        transform: '@mui/styles/{{member}}'
      },
      '@mui/lab': {
        transform: '@mui/lab/{{member}}'
      }
    }
  },
  poweredByHeader: false
}
const isProduction = process.env.NODE_ENV === 'production'
module.exports = isProduction ? withPWA(config) : config
