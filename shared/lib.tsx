import React from "react";
import latinize from "latinize";
import { differenceInDays, getHours } from "date-fns";
import { cities, countries, states } from "country-cities";
import {
  CountryCode,
  getCountryCallingCode,
  getExampleNumber,
  isValidPhoneNumber,
} from "libphonenumber-js";
import examples from "libphonenumber-js/examples.mobile.json";
import { PhoneToBuy } from "@/utils/types";
import {
  DEFAULT_PHONE_NUMBER_PRICE,
  DEFAULT_PHONE_NUMBER_TYPE,
} from "@/shared/constants";
import statesByIso from "./assets/us-state-info-by-iso.json";

function formatDataSize(dataSize: string | number) {
  return +dataSize >= 1000 ? `${+dataSize / 1000} GB` : `${dataSize} MB`;
}

function scrollToId(id: string, offsetY = 0) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offsetY,
      behavior: "smooth",
    });
  }
}

function getCurrencySymbol(currency: string) {
  return (0)
    .toLocaleString("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, "")
    .trim();
}

function getErrorMessage(error: any): string {
  let message = "";

  if (!error) {
    return message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (error?.details) {
    return error?.details;
  }
  if (error?.errors?.length) {
    Object.values(
      error?.errors as { [s: string]: unknown } | ArrayLike<unknown>
    ).forEach((err: any) => {
      message += ` ${err?.message}\n`;
    });
  } else if (error?.message) {
    if (error.message.includes("Firebase")) {
      message = error.message
        .split("/")[1]
        .replaceAll(/[(\-)]/g, " ") as string;
    } else {
      message = error.message as string;
    }
  } else if (error?.errorMessage) {
    message = error.errorMessage as string;
  } else if (typeof error === "object") {
    Object.values(
      error as { [s: string]: unknown } | ArrayLike<unknown>
    ).forEach((err) => {
      message += ` ${err}\n`;
    });
  }

  if (message.startsWith("Unexpected JSON")) {
    return "Server error.";
  }
  return message;
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomReviewsCount(setReviesCount: (props: string) => void) {
  const randomReviewsIncrease = randomIntFromInterval(1200, 1450);
  const diffBetweenTodayAndStartDate =
    differenceInDays(new Date(), new Date(2022, 8, 15)) - 1;

  const getAndFormatReviewsCount = (todaysIncrease: number) =>
    Math.round(
      diffBetweenTodayAndStartDate * randomReviewsIncrease +
        todaysIncrease +
        350000
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const interval = setInterval(() => {
    const todaysIncrease = getHours(new Date()) * (randomReviewsIncrease / 24);
    setReviesCount(getAndFormatReviewsCount(todaysIncrease));
  }, 360 * 1000);

  setReviesCount(
    getAndFormatReviewsCount(
      getHours(new Date()) * (randomReviewsIncrease / 24)
    )
  );

  return interval;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof window === "undefined") return;
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${
    value || ""
  }${expires}; domain=.esimplus.me; Path=/;`;
}

function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;

  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    while (c.startsWith(" ")) c = c.substring(1, c.length);
    if (c.startsWith(nameEQ)) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name: string) {
  document.cookie = `${name}=; domain=.esimplus.me; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

function formatAreaCode(areaCode: string | number) {
  return typeof areaCode === "string" && areaCode.startsWith("+")
    ? areaCode
    : `+${areaCode}`;
}

function formatStringToKebabCase(string: string) {
  return latinize(string)
    .toLowerCase()
    .trim()
    .replaceAll(/  +/g, " ")
    .replaceAll(/[^a-zA-Z -]/gi, "")
    .replaceAll(" ", "-");
}

function formatStringFromKebabToTileCase(string: string) {
  return latinize(string)
    .split("-")
    .map((el) => el[0].toUpperCase().concat(el.slice(1, el.length)))
    .join(" ");
}

function getCountryByIsoCode(isoCode: string) {
  return countries.getByCode(isoCode);
}

function getStatesByCountryCode(countryIsoCode: string) {
  return states.getByCountry(countryIsoCode);
}

function getStateByCode(stateCode: string, countryIsoCode: string) {
  return states.getByCode(stateCode, countryIsoCode);
}

function getCitiesByStateCode(stateCode: string, countryIsoCode: string) {
  return cities.getByState(stateCode, countryIsoCode);
}

function getCitiesByCountryCode(countryIsoCode: string) {
  return cities.getByCountry(countryIsoCode);
}

const generateFakeNumber = (
  countryCode: string,
  areaCode: string | number
): string => {
  const formattedAreaCode = String(areaCode)
    .split(" ")[0]
    .replaceAll(/\D/g, "");
  const generatedNumber = getExampleNumber(
    countryCode as CountryCode,
    examples
  );
  if (!generatedNumber) return "";

  let number = generatedNumber.number.slice(formattedAreaCode.length + 1);

  let isValid = false;

  while (!isValid) {
    const nationalNumber = number.replaceAll(/\S/g, () =>
      String(Math.floor(Math.random() * 10))
    );

    if (isValidPhoneNumber(`+${formattedAreaCode}`.concat(nationalNumber))) {
      number = nationalNumber;
      isValid = true;
      break;
    }
  }

  return `+${formattedAreaCode}`.concat(number);
};

function generateMeta({
  language,
  supportedLangs,
  asPath,
  title,
  description,
}: {
  title: string;
  description: string;
  language: string;
  asPath: string;
  supportedLangs: string[];
}) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:locale" content={language} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://esimplus.me${asPath.split("?")[0]}`}
      />
      <meta property="og:site_name" content="eSIM+" />
      <meta
        property="og:image"
        content="https://static.esimplus.net/storage/logos/logo.png"
      />
      <meta property="og:image:width" content="112" />
      <meta property="og:image:height" content="93" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://static.esimplus.net/storage/logos/logo.png"
      />
      <link
        rel="canonical"
        href={`https://esimplus.me${
          language.startsWith("en") ? "" : `/${language.slice(0, 2)}`
        }${asPath.split("?")[0]}`}
      />
      {supportedLangs.length > 1 &&
        supportedLangs.map((lng) => (
          <link
            key={lng.concat("2")}
            rel="alternate"
            href={`https://esimplus.me${
              lng.startsWith("en") ? "" : `/${lng.slice(0, 2)}`
            }${asPath.split("?")[0]}`}
            hrefLang={lng.toLowerCase()}
          />
        ))}
    </>
  );
}

const removeExcludedWords = (str: string, words: string[]) => {
  let sentence = "";
  const regex = new RegExp(`(${words.join("|")})`, "gi");
  sentence = str.replaceAll(regex, "");
  return sentence;
};

function getRandomInt(min: number, max: number) {
  return (
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) +
    Math.ceil(min)
  );
}

function getRandomBoolean() {
  return Math.random() < 0.5;
}

function getUSStateInfoByIso(stateIso = "AL") {
  if (stateIso in statesByIso) {
    return statesByIso[stateIso as keyof typeof statesByIso];
  }

  return statesByIso.AL;
}

function getUSStateInfoByStateName(stateName = "Alabama") {
  const state = Object.entries(statesByIso).find(([, info]) =>
    info.name.includes(stateName)
  );
  if (state) return { isoCode: state[0], ...state[1] };

  return { isoCode: "AL", ...statesByIso.AL };
}

function generateSecondPhonesList({
  countryIso,
  stateIso,
}: {
  countryIso: string;
  stateIso?: string;
}): PhoneToBuy[] {
  const countryCode =
    countryIso === "US" && stateIso
      ? getUSStateInfoByIso(stateIso).codes[0]
      : getCountryCallingCode(countryIso as CountryCode);

  return Array(10)
    .fill(null)
    .map(() => ({
      phoneNumber: generateFakeNumber(countryIso, countryCode),
      price: DEFAULT_PHONE_NUMBER_PRICE,
      numberType: DEFAULT_PHONE_NUMBER_TYPE,
      region: stateIso ?? countryIso,
      capabilities: {
        voice: getRandomBoolean(),
        MMS: getRandomBoolean(),
        SMS: getRandomBoolean(),
      },
      beta: false,
      addressRequirements: "",
      coinsPrice: DEFAULT_PHONE_NUMBER_PRICE,
      locality: null,
    }));
}

export {
  getRandomBoolean,
  generateSecondPhonesList,
  getUSStateInfoByStateName,
  getUSStateInfoByIso,
  getRandomInt,
  removeExcludedWords,
  getCountryByIsoCode,
  getStatesByCountryCode,
  getStateByCode,
  getCitiesByStateCode,
  getCitiesByCountryCode,
  formatDataSize,
  scrollToId,
  getCurrencySymbol,
  getErrorMessage,
  generateRandomReviewsCount,
  getCookie,
  setCookie,
  eraseCookie,
  formatStringToKebabCase,
  formatAreaCode,
  generateFakeNumber,
  generateMeta,
  formatStringFromKebabToTileCase,
};
