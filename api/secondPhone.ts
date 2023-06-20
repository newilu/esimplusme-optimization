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
  numbersByStateISO: (stateIso: string) =>
    `/v6/second-phone/usa/phone-numbers/state/${stateIso}`,
  secondPhoneCountries: () => `/v7/second-phone/countries`,
  secondPhonePopularCountries: () => `/v6/second-phone/countries/top`,
  createTempUser: () => `/v6/auth/temp-user`,
  signature: () => "/v7/second-phone/ecommpay-signature",
  thedexTopUp: () => "/v6/payment-providers/thedex/top-up/second-phone",
  buyNumber: () => `/v6/second-phone/buy-number`,
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
function getAvailableNumbersByStateISO(iso: string) {
  return queryFetcher<{ data: { phones: PhoneToBuy[] } }>(
    `${MAIN_API_URL}${ENDPOINTS.numbersByStateISO(iso)}`
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
function createTempUser<T>() {
  return queryFetcher<T>(`${MAIN_API_URL}${ENDPOINTS.createTempUser()}`, {
    method: "POST",
    credentials: "include",
  });
}

function getSignature({
  stringToSign,
  price,
}: {
  stringToSign: string;
  price: number;
}) {
  return queryFetcher(`${MAIN_API_URL}${ENDPOINTS.signature()}`, {
    method: "POST",
    body: JSON.stringify({ data: stringToSign, price }),
    credentials: "include",
  });
}
function thedexTopUp({ price }: { price: string | number }) {
  return queryFetcher<{ payUrl: string }>(
    `${MAIN_API_URL}${ENDPOINTS.thedexTopUp()}`,
    {
      method: "POST",
      body: JSON.stringify({ amount: price }),
      credentials: "include",
    }
  );
}

function buyNumber(props: { phone: string; country_code: string }) {
  return queryFetcher(`${MAIN_API_URL}${ENDPOINTS.buyNumber()}`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(props),
  });
}

export {
  ENDPOINTS,
  getPhonesByCountry,
  getPhonePrices,
  getAvailableStates,
  getAvailableNumbersByStateCode,
  listSecondPhoneCountries,
  getSecondPhonePopularCountries,
  getAvailableNumbersByStateISO,
  createTempUser,
  getSignature,
  thedexTopUp,
  buyNumber,
};
