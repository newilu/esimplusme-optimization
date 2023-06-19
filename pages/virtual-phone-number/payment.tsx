import React from "react";
import type { ICountry, IState } from "country-cities";
import type { GetServerSideProps } from "next";
import type { PhoneToBuy } from "@/utils/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "@/api";
import Navbar from "@/widgets/Navbar";
import { COUNTRY_LIST } from "@/shared/constants";
import { formatStringToKebabCase, getStatesByCountryCode } from "@/shared/lib";
import PhoneNumberPurchaseHeader from "@/widgets/PhoneNumberPurchaseHeader";

type PageProps = {
  phones: PhoneToBuy[];
  country: ICountry;
  state: IState | null;
  phone: PhoneToBuy | null;
};

function Index({ country, state, phones, phone }: PageProps) {
  return (
    <>
      <Navbar />
      <PhoneNumberPurchaseHeader
        phone={phone}
        state={state}
        phones={phones}
        country={country}
      />
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
  console.log(currentState);
  if (!currentCountry) {
    return {
      redirect: {
        destination: "/virtual-phone-number/pricing",
        statusCode: 301,
      },
    };
  }

  if (currentCountry.isoCode === "US" && currentState) {
    const { data } = await api.secondPhone.getAvailableNumbersByStateISO(
      currentState.isoCode
    );

    const selectedPhone = data?.data.phones.find(
      (_phone) => _phone.phoneNumber === phone
    );

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
        phones: data?.data.phones ?? [],
        phone: selectedPhone,
        country: currentCountry,
        state: currentState,
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
    },
  };
};

export default Index;
