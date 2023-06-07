// @ts-check

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  debug: process.env.NODE_ENV === "development",
  i18n: {
    locales: ["en", "ru", "pl", "pt", "de", "es", "fr", "it"],
    defaultLocale: "en",
  },
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/locales")
      : "/locales",
};
