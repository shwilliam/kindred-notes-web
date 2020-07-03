const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  serverRuntimeConfig: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
})
