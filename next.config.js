/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.telegram.org",
        pathname: "/file/**",
      },
      {
        protocol: "https",
        hostname: "*.telegram.org",
        pathname: "/file/**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
