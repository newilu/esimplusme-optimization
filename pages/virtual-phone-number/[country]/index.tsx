import React from "react";
import { GetServerSideProps } from "next";
import Navbar from "@/widgets/Navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { ICountry, IState } from "country-cities";
import { COUNTRY_LIST } from "@/shared/constants";
import {
  formatStringToKebabCase,
  generateMeta,
  getStatesByCountryCode,
} from "@/shared/lib";
import PhoneNumberRegionsByCountry from "@/widgets/PhoneNumberRegionsByCountry";
import DownloadAppSection from "@/features/DownloadAppSection";
import Footer from "@/components/Footer";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import HowToGetPhoneNumber from "@/features/HowToGetPhoneNumber";
import api from "@/api";

type PageProps = {
  country: ICountry;
  states: IState[];
  phoneNumberStartingPrice: number | null;
};

function Index({ country, states, phoneNumberStartingPrice }: PageProps) {
  const { asPath } = useRouter();
  const { t, i18n } = useTranslation("meta");

  const meta = React.useMemo(
    () =>
      generateMeta({
        language: i18n.language,
        description: t("virtual_numbers_by_country_description", {
          country: country.name,
        }),
        title: t("virtual_numbers_by_country_title", {
          country: country.name,
        }),
        asPath,
      }),
    [asPath, country.name, i18n.language, t]
  );

  return (
    <>
      <Head>{meta}</Head>
      <Navbar />
      <PhoneNumberRegionsByCountry
        phoneNumberStartingPrice={phoneNumberStartingPrice}
        states={states}
        country={country}
      />
      <HowToGetPhoneNumber countryName={country.name} />
      <DownloadAppSection />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  locale,
  params,
}) => {
  const { country } = params ?? {};
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

  if (!currentCountry) {
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

  const phoneNumberStartingPrice =
    data?.data.phones.sort((a, b) => a.price - b.price)[0]?.price ?? null;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "virtual-phone-number",
        "meta",
      ])),
      phoneNumberStartingPrice,
      country: currentCountry,
      states: getStatesByCountryCode(currentCountry.isoCode),
    },
  };
};

export default Index;
