import React from "react";
import type { GetServerSideProps } from "next";
import type { ICity, ICountry, IState } from "country-cities";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { PhoneToBuy } from "@/utils/types";
import api from "@/api";
import Navbar from "@/widgets/Navbar";
import PhoneNumbersByRegion from "@/widgets/PhoneNumbersByRegion";
import {
  formatAreaCode,
  formatStringToKebabCase,
  generateMeta,
  getCitiesByStateCode,
  getStatesByCountryCode,
} from "@/shared/lib";
import { COUNTRY_LIST } from "@/shared/constants";
import DownloadAppSection from "@/features/DownloadAppSection";
import Footer from "@/components/Footer";
import { format } from "libphonenumber-js";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import HowToGetPhoneNumber from "@/features/HowToGetPhoneNumber";

function Index({
  phones,
  country,
  state,
  cities,
}: {
  phones: PhoneToBuy[];
  country: ICountry;
  state: IState;
  cities: ICity[];
}) {
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
      country: country.name,
      state: state.isoCode,
      areaCode,
    }),
    title: t("virtual_numbers_by_state_title", {
      country: country.name,
      state: state.isoCode,
      areaCode,
    }),
    asPath,
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
      />
      <HowToGetPhoneNumber />
      <DownloadAppSection />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const { country, state } = params ?? {};

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
  ).find((el) => state.includes(formatStringToKebabCase(el.name)));

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

  if (currentCountry.isoCode === "US") {
    let phones: PhoneToBuy[];
    const { data: phonesByStateUS } =
      await api.secondPhone.getAvailableNumbersByStateISO(currentState.isoCode);

    phones = phonesByStateUS?.data.phones ?? [];

    if (!phones.length) {
      const { data } = await api.secondPhone.getPhonesByCountry("US");
      phones = data?.data.phones ?? [];
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
      },
    };
  }
  const { data } = await api.secondPhone.getPhonesByCountry(
    currentCountry.isoCode
  );

  const countryPhones = data?.data.phones ?? [];

  const filteredPhones = countryPhones.filter(
    (_phone) => _phone.region === currentState.isoCode
  );

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "virtual-phone-number",
        "meta",
      ])),
      phones: filteredPhones.length ? filteredPhones : countryPhones,
      country: currentCountry,
      state: currentState,
      cities,
    },
  };
};

export default Index;
