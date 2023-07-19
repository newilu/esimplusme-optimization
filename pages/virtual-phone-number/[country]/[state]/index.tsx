import React from "react";
import type { GetServerSideProps } from "next";
import type { ICity, ICountry, IState } from "country-cities";
import { format } from "libphonenumber-js";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { PhoneToBuy, SecondPhoneCountry } from "@/utils/types";
import api from "@/api";
import Navbar from "@/widgets/Navbar";
import PhoneNumbersByRegion from "@/widgets/PhoneNumbersByRegion";
import {
  formatAreaCode,
  formatStringToKebabCase,
  generateMeta,
  getCitiesByStateCode,
  getStatesByCountryCode,
  removeExcludedWords,
} from "@/shared/lib";
import {
  COUNTRY_LIST,
  SECOND_PHONE_SUPPORTED_COUNTRIES,
  STATE_NAME_DEPRECATED_WORDS,
} from "@/shared/constants";
import DownloadAppSection from "@/features/DownloadAppSection";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import WhyDoYouNeedPhoneNumberInRegion from "@/features/WhyDoYouNeedPhoneNumberInRegion";

type PhoneNumberStatePageProps = {
  phones: PhoneToBuy[];
  country: ICountry;
  state: IState;
  cities: ICity[];
  popularCountries: SecondPhoneCountry[];
  phoneNumber: PhoneToBuy | null;
};

function Index({
  phones,
  country,
  state,
  cities,
  popularCountries,
  phoneNumber,
}: PhoneNumberStatePageProps) {
  const { asPath } = useRouter();
  const { t, i18n } = useTranslation("meta");

  const areaCode =
    (country.isoCode === "US" || country.isoCode === "CA") && phones[0]
      ? format(phones[0].phoneNumber, "INTERNATIONAL")
          .slice(0, 6)
          .replaceAll(" ", "-")
      : formatAreaCode(country.phonecode);

  const meta = generateMeta({
    language: i18n.language,
    description: t("virtual_numbers_by_state_description", {
      state: state.name,
      stateIso: state.isoCode,
      areaCode,
    }),
    title: t("virtual_numbers_by_state_title", {
      country: country.name,
      state: state.name,
      stateIso: state.isoCode,
      areaCode,
    }),
    asPath,
    supportedLangs: ["en"],
  });

  return (
    <>
      <Head>{meta}</Head>
      <Navbar />
      <PhoneNumbersByRegion
        phones={phones}
        cities={cities}
        country={country}
        state={state}
        areaCode={areaCode}
        popularCountries={popularCountries}
        phoneNumber={phoneNumber}
      />
      <WhyDoYouNeedPhoneNumberInRegion regionName={state.name} />
      <DownloadAppSection />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  PhoneNumberStatePageProps
> = async ({ locale, params, query }) => {
  const { country, state } = params ?? {};
  const { phone } = query;

  if (typeof country !== "string" || typeof state !== "string") {
    return {
      redirect: {
        destination: "/virtual-phone-number/pricing",
        statusCode: 301,
      },
    };
  }

  const currentCountry = COUNTRY_LIST.find((el) =>
    country.includes(formatStringToKebabCase(el.name))
  );

  const currentState = getStatesByCountryCode(
    currentCountry?.isoCode ?? ""
  ).find((el) =>
    formatStringToKebabCase(
      removeExcludedWords(el.name, STATE_NAME_DEPRECATED_WORDS)
    ).includes(state)
  );

  if (!currentCountry || !currentState) {
    return {
      redirect: {
        destination: "/virtual-phone-number/pricing",
        statusCode: 301,
      },
    };
  }

  const cities = getCitiesByStateCode(
    currentState.isoCode,
    currentCountry.isoCode
  );

  if (!cities.length) {
    return {
      redirect: {
        destination: `/virtual-phone-number/payment?country=${country}&state=${state}`,
        statusCode: 301,
      },
    };
  }

  const { data: secondPhoneCountriesDataRaw } =
    await api.secondPhone.listSecondPhoneCountries();

  const popularCountries =
    secondPhoneCountriesDataRaw?.data.countries.sort(
      (a, b) =>
        SECOND_PHONE_SUPPORTED_COUNTRIES.indexOf(a.code) -
        SECOND_PHONE_SUPPORTED_COUNTRIES.indexOf(b.code)
    ) ?? [];

  if (currentCountry.isoCode === "US") {
    let phones: PhoneToBuy[];
    const { data: phonesByStateUS } =
      await api.secondPhone.getAvailableNumbersByStateISO(currentState.isoCode);

    phones = phonesByStateUS?.data.phones ?? [];

    if (!phones.length) {
      const { data: phonesByCountryDataRaw } =
        await api.secondPhone.getPhonesByCountry("US");
      phones = phonesByCountryDataRaw?.data.phones ?? [];
    }

    const phoneNumber = phone
      ? phones.find((el) => el.phoneNumber === phone) ?? phones[0] ?? null
      : null;

    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", [
          "common",
          "virtual-phone-number",
          "meta",
        ])),
        phones,
        country: currentCountry,
        state: currentState,
        cities,
        phoneNumber,
        popularCountries,
      },
    };
  }

  const { data: phonesByCountryDataRaw } =
    await api.secondPhone.getPhonesByCountry(currentCountry.isoCode);

  const countryPhones = phonesByCountryDataRaw?.data.phones ?? [];

  const filteredPhones = countryPhones.filter(
    (_phone) => _phone.region === currentState.isoCode
  );

  const phones = filteredPhones.length ? filteredPhones : countryPhones;

  const phoneNumber = phone
    ? phones.find((el) => el.phoneNumber === phone) ?? phones[0] ?? null
    : null;

  if (!phones.length) {
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", [
          "common",
          "virtual-phone-number",
          "meta",
        ])),
        phones,
        popularCountries,
        country: currentCountry,
        state: currentState,
        cities,
        phoneNumber,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "virtual-phone-number",
        "meta",
      ])),
      phones,
      country: currentCountry,
      state: currentState,
      cities,
      phoneNumber,
      popularCountries,
    },
  };
};

export default Index;
