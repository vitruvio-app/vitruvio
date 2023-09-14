/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  env: {
    WALLETCONNECT_PROJECTID: process.env.WALLETCONNECT_PROJECTID,
    INFURA_API_SECRET: process.env.INFURA_API_SECRET,
    INFURA_API_KEY: process.env.INFURA_API_KEY,
  },
}

module.exports = nextConfig
