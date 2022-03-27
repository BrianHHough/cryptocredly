/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  env: {
      NEXT_PUBLIC_MORALIS_APP_ID: process.env.NEXT_PUBLIC_MORALIS_APP_ID,
      NEXT_PUBLIC_MORALIS_SERVER_URL: process.env.NEXT_PUBLIC_MORALIS_SERVER_URL
  },
  images: {
      domains: ['localhost', 'upload.wikimedia.org', 'miro.medium.com', 'i.pinImage.com', 'i.pinimage.com', 'www.coveros.com'],
  },
}
