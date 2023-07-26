import React from "react";
import type { ICountry, IState } from "country-cities";
import type { GetServerSideProps } from "next";
import type { PhoneToBuy, SecondPhoneCountry } from "@/utils/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "@/api";
import Navbar from "@/widgets/Navbar";
import { COUNTRY_LIST } from "@/shared/constants";
import { formatStringToKebabCase, getStatesByCountryCode } from "@/shared/lib";
import PhoneNumberPurchaseHeader from "@/widgets/PhoneNumberPurchaseHeader";
import DownloadAppSection from "@/features/DownloadAppSection";
import Footer from "@/components/Footer";

type PageProps = {
  phones: PhoneToBuy[];
  country: ICountry;
  state: IState | null;
  phone: PhoneToBuy | null;
  countries: SecondPhoneCountry[];
};

function Index({ country, state, phones, phone, countries }: PageProps) {
  return (
    <>
      <Navbar />
      <PhoneNumberPurchaseHeader
        phone={phone}
        state={state}
        phones={phones}
        country={country}
        countries={countries}
      />
      <DownloadAppSection />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  locale,
  query,
}) => {
  const { country, state, phone } = query;

  if (typeof country !== "string") {
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

  const currentState =
    getStatesByCountryCode(currentCountry?.isoCode ?? "").find((el) =>
      state?.includes(formatStringToKebabCase(el.name))
    ) ?? null;

  if (!currentCountry) {
    return {
      redirect: {
        destination: "/virtual-phone-number/pricing",
        statusCode: 301,
      },
    };
  }

  const { data: secondPhoneCountriesDataRaw } =
    await api.secondPhone.listSecondPhoneCountries();

  const countries = secondPhoneCountriesDataRaw?.data.countries ?? [];

  if (currentCountry.isoCode === "US" && currentState) {
    let selectedPhone: PhoneToBuy | null = null;
    let phones: PhoneToBuy[] = [];

    const { data: phonesByStateDataRaw } =
      await api.secondPhone.getAvailableNumbersByStateISO(currentState.isoCode);

    phones = phonesByStateDataRaw?.data.phones ?? [];

    const selectedPhoneFromStatePhones = phones.find(
      (_phone) => _phone.phoneNumber === phone
    );

    if (!selectedPhoneFromStatePhones) {
      const { data } = await api.secondPhone.getPhonesByCountry("US");
      selectedPhone = data?.data.phones[0] ?? null;
      phones = data?.data.phones ?? [];
    }

    if (!selectedPhone) {
      return {
        redirect: {
          destination: "/virtual-phone-number/pricing",
          statusCode: 301,
        },
      };
    }

    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", [
          "common",
          "virtual-phone-number",
        ])),
        phones,
        phone: selectedPhone,
        country: currentCountry,
        state: currentState,
        countries,
      },
    };
  }

  const { data } = await api.secondPhone.getPhonesByCountry(
    currentCountry.isoCode
  );

  const selectedPhone =
    data?.data.phones.find((_phone) => _phone.phoneNumber === phone) ??
    data?.data.phones[0] ??
    null;

  const countryPhones = data?.data.phones ?? [];

  const filteredPhones = currentState
    ? countryPhones.filter((_phone) => _phone.region === currentState.isoCode)
    : countryPhones;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "virtual-phone-number",
      ])),
      phones: filteredPhones.length ? filteredPhones : countryPhones,
      country: currentCountry,
      state: currentState,
      phone: selectedPhone,
      countries,
    },
  };
};

export default Index;
