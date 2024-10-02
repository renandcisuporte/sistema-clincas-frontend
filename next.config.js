/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_API_URL: process.env.NEXTAUTH_API_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_REDIRECT: process.env.NEXT_REDIRECT,
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
