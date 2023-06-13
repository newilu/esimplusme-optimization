import React from "react";
import { GetServerSideProps } from "next";
import { PhoneToBuy } from "@/utils/types";
import Navbar from "@/widgets/Navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PhoneNumbersByRegion from "@/widgets/PhoneNumbersByRegion";
import type { ICity, ICountry, IState } from "country-cities";
import { COUNTRY_LIST } from "@/shared/constants";
import {
  formatStringToKebabCase,
  getCitiesByStateCode,
  getStatesByCountryCode,
} from "@/shared/lib";
import api from "@/api";
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
  return (
    <>
      <Navbar />
      <PhoneNumbersByRegion
        phones={phones}
        cities={cities}
        country={country}
        state={state}
      />
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
      cities: getCitiesByStateCode(
        currentState.isoCode,
        currentCountry.isoCode
      ),
    },
  };
};

export default Index;
