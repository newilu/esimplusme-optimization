// @ts-check
const { i18n } = require("./next-i18next.config.js");

// You can remove the following 2 lines when integrating our example.
const { loadCustomBuildParams } = require("./next-utils.config");
const { esmExternals = false, tsconfigPath } = loadCustomBuildParams();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    esmExternals, // https://nextjs.org/blog/next-11-1#es-modules-support
  },
  i18n,
  reactStrictMode: true,
  typescript: {
    tsconfigPath,
  },
  images: {
    domains: ["static.esimplus.net", "admin-blog.esimplus.me", "mc.yandex.ru"],
    minimumCacheTTL: 999999,
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      {
        source: "/esim/regional",
        destination: "/esim",
      },
    ];
  },
};

module.exports = nextConfig;
