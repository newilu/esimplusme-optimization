import { queryFetcher } from "./index";
import { PhoneToBuy, SecondPhoneCountry, State } from "@/utils/types";
import { MAIN_API_URL } from "@/utils/constants";

const ENDPOINTS = {
  getPhonesByCountry: (countryCode: string) =>
    `/v7/second-phone/phone-numbers/${countryCode}`,
  getPhonePrices: (phone: string) => `/v6/second-phone/prices?phone=${phone}`,
  states: () => "/v6/second-phone/usa/states",
  numbersByStateCode: (code: number) =>
    `/v6/second-phone/usa/phone-numbers/code/${code}`,
  secondPhoneCountries: () => `/v7/second-phone/countries`,
  secondPhonePopularCountries: () => `/v6/second-phone/countries/top`,
};

function listSecondPhoneCountries() {
  return queryFetcher<{ data: { countries: SecondPhoneCountry[] } }>(
    MAIN_API_URL.concat(ENDPOINTS.secondPhoneCountries())
  );
}
function getSecondPhonePopularCountries() {
  return queryFetcher<{ data: { countries: SecondPhoneCountry[] } }>(
    MAIN_API_URL.concat(ENDPOINTS.secondPhonePopularCountries())
  );
}

function getAvailableStates() {
  return queryFetcher<{ states: State[] }>(
    `${MAIN_API_URL}${ENDPOINTS.states()}`
  );
}

function getAvailableNumbersByStateCode(code: number) {
  return queryFetcher<{ phones: PhoneToBuy[] }>(
    `${MAIN_API_URL}${ENDPOINTS.numbersByStateCode(code)}`
  );
}

function getPhonesByCountry(country: string) {
  return queryFetcher<{ data: { phones: PhoneToBuy[] } }>(
    `${MAIN_API_URL}${ENDPOINTS.getPhonesByCountry(country)}`
  );
}

function getPhonePrices<T>(phone: string) {
  return queryFetcher<T>(`${MAIN_API_URL}${ENDPOINTS.getPhonePrices(phone)}`);
}

export {
  ENDPOINTS,
  getPhonesByCountry,
  getPhonePrices,
  getAvailableStates,
  getAvailableNumbersByStateCode,
  listSecondPhoneCountries,
  getSecondPhonePopularCountries,
};
