/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions
  // so you can co-locate components inside `pages` directory
  pageExtensions: ['page.tsx', 'page.ts', 'api.ts'],
  /* https://nextjs.org/docs/basic-features/image-optimization#domains */
  images: {
    domains: [
      's3-ap-southeast-1.amazonaws.com', // prod
    ],
  },
};

module.exports = nextConfig;
