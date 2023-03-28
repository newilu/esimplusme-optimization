import en from "public/staticfiles/countries/us.svg";
import ru from "public/staticfiles/countries/ru.svg";

export const NAV_LINKS = [
  { href: "https://esimplus.me/", label: "mobile_data" },
  { href: "https://esimplus.me/virtual-numbers", label: "virtual_numbers" },
];

export const LANGUAGE_OPTIONS = [
  { img: en, label: "English", country: "United States", value: "en" },
  { img: ru, label: "Russian", country: "Russia", value: "ru" },
];

export const MAX_ELEMENTS_PER_VIEW = 6;
export const MAX_AUTHORS_PER_VIEW = 12;

export enum SectionIDS {
  SearchYourDestination = "search_your_destination_section",
}

export enum ProviderTypes {
  ESIMGO = "ESIMGO",
  TopConnect = "TOP_CONNECT",
  MTX = "MTX",
}

export const BLOG_API_URL = "http://admin-blog.esimplus.me/api";
export const MAIN_API_URL = "https://api.esimplus.net/api";
