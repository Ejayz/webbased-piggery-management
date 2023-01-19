/** @type {import('next').NextConfig} */
const withPwa = require('next-pwa')
const nextConfig =
{
  reactStrictMode: false,
  experimental: {
    appDir: true
  },
}

module.exports = nextConfig
