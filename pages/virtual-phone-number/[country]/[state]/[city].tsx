import React from "react";
import type { ICity, ICountry, IState } from "country-cities";
import type { GetServerSideProps } from "next";
import type { PhoneToBuy } from "@/utils/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "@/api";
import Navbar from "@/widgets/Navbar";
import { COUNTRY_LIST } from "@/shared/constants";
import {
  formatStringToKebabCase,
  getCitiesByStateCode,
  getStatesByCountryCode,
} from "@/shared/lib";
import PhoneNumbersByCity from "@/widgets/PhoneNumberPurchaseHeader";
import DownloadAppSection from "@/features/DownloadAppSection";
import Footer from "@/components/Footer";

type PageProps = {
  phones: PhoneToBuy[];
  country: ICountry;
  state: IState;
  city: ICity;
};

function Index({ country, city, state, phones }: PageProps) {
  return (
    <>
      <Navbar />
      <PhoneNumbersByCity
        city={city}
        state={state}
        phones={phones}
        country={country}
      />
      <DownloadAppSection />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  locale,
  params,
}) => {
  const { country, state, city } = params ?? {};

  if (
    typeof country !== "string" ||
    typeof state !== "string" ||
    typeof city !== "string"
  ) {
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

  const currentCity = getCitiesByStateCode(
    currentState?.isoCode ?? "",
    currentCountry?.isoCode ?? ""
  ).find((el) => city.includes(formatStringToKebabCase(el.name)));

  if (!currentCountry || !currentState || !currentCity) {
    return {
      redirect: {
        destination: "/virtual-phone-number/pricing",
        statusCode: 301,
      },
    };
  }

  if (currentCountry.isoCode === "US") {
    const { data } = await api.secondPhone.getAvailableNumbersByStateISO(
      currentState.isoCode
    );

    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", [
          "common",
          "virtual-phone-number",
        ])),
        phones: data?.data.phones ?? [],
        country: currentCountry,
        state: currentState,
        city: currentCity,
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
      ])),
      phones: filteredPhones.length ? filteredPhones : countryPhones,
      country: currentCountry,
      state: currentState,
      city: currentCity,
    },
  };
};

export default Index;
