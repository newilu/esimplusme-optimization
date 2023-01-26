import en from "public/staticfiles/countries/us.svg";
import ru from "public/staticfiles/countries/ru.svg";

export const NAV_LINKS = [
  { href: "https://esimplus.me/", label: "mobile_data" },
  { href: "https://esimplus.me/virtual-numbers", label: "virtual_numbers" },
  { href: "/authors", label: "authors" },
  { href: "https://esimplus.me/", label: "faq" },
];

export const LANGUAGE_OPTIONS = [
  { img: en, label: "English", country: "United States", value: "en" },
  { img: ru, label: "Russian", country: "Russia", value: "ru" },
];

export const MAX_ELEMENTS_PER_VIEW = 6;
