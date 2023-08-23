export const NAV_LINKS = [
  { href: "https://esimplus.me/", label: "mobile_data" },
  {
    href: "https://esimplus.me/virtual-phone-number",
    label: "virtual_numbers",
  },
];

export const LANGUAGE_OPTIONS = [
  {
    img: "https://static.esimplus.net/storage/flags/us.svg",
    label: "English",
    country: "United States",
    value: "en",
  },
  {
    img: "https://static.esimplus.net/storage/flags/ru.svg",
    label: "Russian",
    country: "Russia",
    value: "ru",
  },
  {
    img: "https://static.esimplus.net/storage/flags/pl.svg",
    label: "Polski",
    country: "Poland",
    value: "pl",
  },
  {
    img: "https://static.esimplus.net/storage/flags/de.svg",
    label: "Deutch",
    country: "Germany",
    value: "de",
  },
  {
    img: "https://static.esimplus.net/storage/flags/pt.svg",
    label: "Portuguese",
    country: "Portugal",
    value: "pt",
  },
  {
    img: "https://static.esimplus.net/storage/flags/es.svg",
    label: "Spanish",
    country: "Spain",
    value: "es",
  },
  {
    img: "https://static.esimplus.net/storage/flags/fr.svg",
    label: "French",
    country: "France",
    value: "fr",
  },
  {
    img: "https://static.esimplus.net/storage/flags/it.svg",
    label: "Italian",
    country: "Italy",
    value: "it",
  },
];

export const MAX_ELEMENTS_PER_VIEW = 6;

export enum SectionIDS {
  SearchYourDestination = "search_your_destination_section",
}

export enum ProviderTypes {
  ESIMGO = "ESIMGO",
  TopConnect = "TOP_CONNECT",
  MTX = "MTX",
}

export const BLOG_API_URL = "http://admin-blog.esimplus.me/api";
export const MAIN_API_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ?? "https://api.esimplus.net/api";

export const TG_DEFAULT_LINK = "https://t.me/esimplus_official";
export const TG_RU_LINK = "https://t.me/esimplus";
