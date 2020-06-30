const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  serverRuntimeConfig: {
    JWT_SECRET: process.env.JWT_SECRET,
    FIREBASE_KEY: process.env.FIREBASE_KEY,
    FIREBASE_DOMAIN: process.env.FIREBASE_DOMAIN,
    FIREBASE_ID: process.env.FIREBASE_ID,
  },
})
