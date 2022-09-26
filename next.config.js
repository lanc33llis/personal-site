/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1536],
  },
};

module.exports = nextConfig;
