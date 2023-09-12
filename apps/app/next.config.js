/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  env: {
    WALLETCONNECT_PROJECTID: process.env.WALLETCONNECT_PROJECTID,
    INFURA_PROJECTID: process.env.INFURA_PROJECTID,
    INFURA_PROJECTSECRET: process.env.INFURA_PROJECTSECRET,
  },
}

module.exports = nextConfig
