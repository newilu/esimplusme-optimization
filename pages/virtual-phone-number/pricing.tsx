import React from "react";
import type { ICountry } from "country-cities";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "@/api";
import Footer from "@/components/Footer";
import PhoneNumbersRates from "@/widgets/PhoneNumberRates";
import Navbar from "@/widgets/Navbar";
import DownloadAppSection from "@/features/DownloadAppSection";
import { SecondPhoneCountry } from "@/utils/types";
import {
  COUNTRY_LIST,
  SECOND_PHONE_SUPPORTED_COUNTRIES,
} from "@/shared/constants";
import SpecialDealsSection from "@/features/SpecialDealsSection";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { generateMeta } from "@/shared/lib";

function Pricing({
  popularSecondPhoneCountries,
  secondPhoneCountries,
  countryCode,
}: {
  popularSecondPhoneCountries: SecondPhoneCountry[];
  secondPhoneCountries: ICountry[];
  countryCode: string;
}) {
  const { asPath } = useRouter();
  const { t, i18n } = useTranslation("meta");

  const meta = React.useMemo(
    () =>
      generateMeta({
        language: i18n.language,
        description: t("virtual_numbers_pricing_description"),
        title: t("virtual_numbers_pricing_title"),
        asPath,
        supportedLangs: ["en"],
      }),
    [asPath, i18n.language, t]
  );

  return (
    <>
      <Head>{meta}</Head>
      <Navbar />
      <PhoneNumbersRates
        popularSecondPhoneCountries={popularSecondPhoneCountries}
        secondPhoneCountries={secondPhoneCountries}
      />
      <SpecialDealsSection />
      <DownloadAppSection />
      <Footer countryCode={countryCode} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
}) => {
  const countryCode = (req.headers["cf-ipcountry"] ?? "") as string;

  const [{ data: popularCountriesRaw }] = await Promise.all([
    api.secondPhone.listSecondPhoneCountries(),
  ]);
  const popularSecondPhoneCountries = popularCountriesRaw?.data.countries
    .filter(({ code }) => SECOND_PHONE_SUPPORTED_COUNTRIES.includes(code))
    .sort(
      (a, b) =>
        SECOND_PHONE_SUPPORTED_COUNTRIES.indexOf(a.code) -
        SECOND_PHONE_SUPPORTED_COUNTRIES.indexOf(b.code)
    );

  if (!popularSecondPhoneCountries) {
    return {
      redirect: {
        destination: "/virtual-phone-number",
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
      popularSecondPhoneCountries,
      secondPhoneCountries: COUNTRY_LIST,
      countryCode,
    },
  };
};

export default Pricing;
