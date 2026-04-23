/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // eslint-disable-next-line prettier/prettier
  pageExtensions: ["page.tsx", "api.ts", "api.tsx"],
  // eslint-disable-next-line prettier/prettier
  output: "export",

  images: {
    unoptimized: true,
  },
  // eslint-disable-next-line prettier/prettier
};

// eslint-disable-next-line prettier/prettier
export default nextConfig;
