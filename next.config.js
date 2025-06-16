/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.cjs$/,
      type: "javascript/auto",
    });

    return config;
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
