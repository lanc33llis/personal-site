/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    deviceSizes: [
      640, 768, 1024, 1280, 1536, 1792, 2048, 2304, 2560, 2816, 3072, 3328,
      3584, 3840, 4096,
    ],
  },
  i18n: {
    locales: ["en-us"],
    defaultLocale: "en-us",
  },
  transpilePackages: ["geist"],
};

module.exports = nextConfig;
