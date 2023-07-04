import { countries } from "country-cities";

export const DEFAULT_SELECTED_DATA_SIZE = 1000;

export const BASE_STORAGE_URL = "https://static.esimplus.net/storage/plans/";

export enum SectionIDS {
  SearchYourDestination = "search_your_destination_section",
}

export const LANGS_LIST = ["ru", "en", "pl", "de", "es", "pt", "it", "fr"];

export const COUNTRY_LIST = countries.all();

export const APPSTORE_LINK =
  "https://apps.apple.com/by/app/esim-mobile-data-cloud-sim/id1482736281";

export const GPLAY_LINK =
  "https://play.google.com/store/apps/details?id=com.appvillis.esim&hl=ru&gl=US";

export const STATE_NAME_DEPRECATED_WORDS = [
  "Region",
  "Voivodeship",
  "Islands",
  "Island",
  "Department",
  "Province",
  "Parish",
  "Unit",
  "County",
];
