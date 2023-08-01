import React from "react";
import type { ICountry, IState } from "country-cities";
import type { GetServerSideProps } from "next";
import type { PhoneToBuy, SecondPhoneCountry } from "@/utils/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "@/api";
import Navbar from "@/widgets/Navbar";
import { COUNTRY_LIST } from "@/shared/constants";
import {
  formatStringToKebabCase,
  generateMeta,
  getStatesByCountryCode,
} from "@/shared/lib";
import PhoneNumberPurchaseHeader from "@/widgets/PhoneNumberPurchaseHeader";
import DownloadAppSection from "@/features/DownloadAppSection";
import Footer from "@/components/Footer";
import NoNumbersAvailableView from "@/features/NoNumbersAvailableView";
import BaseHeader from "@/shared/ui/BaseHeader";
import { PanelSection } from "@/shared/ui/styled";

type PageProps = {
  phones: PhoneToBuy[] | null;
  countries: SecondPhoneCountry[];
  country: ICountry | null;
  state: IState | null;
  phone: PhoneToBuy | null;
};

function Index({ country, state, phones, phone, countries }: PageProps) {
  const { asPath } = useRouter();
  const { t, i18n } = useTranslation("virtual-phone-number");

  const meta = generateMeta({
    language: i18n.language,
    title: t("meta:payment_title"),
    description: t("meta:payment_description"),
    asPath,
    supportedLangs: ["en"],
  });

  return (
    <>
      <Head>{meta}</Head>
      <Navbar />
      {phones && country ? (
        <PhoneNumberPurchaseHeader
          phone={phone}
          state={state}
          phones={phones}
          country={country}
          countries={countries}
        />
      ) : (
        <BaseHeader>
          <PanelSection>
            <NoNumbersAvailableView countries={countries} />
          </PanelSection>
        </BaseHeader>
      )}
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

  const { data: secondPhoneCountries } =
    await api.secondPhone.listSecondPhoneCountries();

  const countries = secondPhoneCountries ?? [];

  if (typeof country !== "string") {
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", [
          "common",
          "virtual-phone-number",
          "meta",
        ])),
        country: null,
        phone: null,
        countries,
        state: null,
        phones: null,
      },
    };
  }

  const currentCountry = COUNTRY_LIST.find((el) => country === formatStringToKebabCase(el.name));

  const currentState = getStatesByCountryCode(currentCountry?.isoCode ?? "")
    .find((el) => state === formatStringToKebabCase(el.name)) ?? null;

  if (!currentCountry) {
    return {
      redirect: {
        destination: "/virtual-phone-number/pricing",
        statusCode: 301,
      },
    };
  }

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
          "meta",
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
        "meta",
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
