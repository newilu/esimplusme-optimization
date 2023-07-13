import {
  Country,
  CountryByISO,
  Region,
  RegionById,
  SecondPhoneCountry,
} from "utils/types";
import { MAIN_API_URL } from "@/utils/constants";
import { queryFetcher } from "./index";

const ENDPOINTS = {
  countries: () => "/v6/bundles/countries",
  country: (countryIso2: string) => `/v6/bundles/countries/${countryIso2}`,
  regions: () => `/v6/bundles/regions`,
  region: (regionId: number) => `/v6/bundles/regions/${regionId}`,
  worldwideRegion: () => `/v6/bundles/regions/worldwide`,
  countriesByFilterText: (filterText: string, locale: string) =>
    `/v6/countries/search/${filterText}/${locale}`,
};

function listCountries() {
  return queryFetcher<{ data: { countries: Country[] } }>(
    MAIN_API_URL.concat(ENDPOINTS.countries())
  );
}

function getCountryByIsoName(isoName: string) {
  return queryFetcher<{ data: { country: CountryByISO } }>(
    MAIN_API_URL.concat(ENDPOINTS.country(isoName))
  );
}

function listRegions() {
  return queryFetcher<{ data: { regions: Region[] } }>(
    MAIN_API_URL.concat(ENDPOINTS.regions())
  );
}

function getWorldwideRegion() {
  return queryFetcher<{ data: { region: RegionById } }>(
    MAIN_API_URL.concat(ENDPOINTS.worldwideRegion())
  );
}

function getRegionById(regionId: number) {
  return queryFetcher<{ data: { region: RegionById } }>(
    MAIN_API_URL.concat(ENDPOINTS.region(regionId))
  );
}

function getCountriesByFilterText(text: string, locale: string) {
  return queryFetcher<{ data: Country[] }>(
    MAIN_API_URL.concat(ENDPOINTS.countriesByFilterText(text, locale))
  );
}

export {
  ENDPOINTS,
  getCountryByIsoName,
  listCountries,
  listRegions,
  getRegionById,
  getWorldwideRegion,
  getCountriesByFilterText,
};
