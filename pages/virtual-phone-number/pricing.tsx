import React from "react";
import { ICountry } from "country-cities";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "@/api";
import Footer from "@/components/Footer";
import PhoneNumbersRates from "@/widgets/PhoneNumberRates";
import Navbar from "@/widgets/Navbar";
import DownloadAppSection from "@/features/DownloadAppSection";
import { SecondPhoneCountry } from "@/utils/types";
import { COUNTRY_LIST } from "@/shared/constants";
import SpecialDealsSection from "@/features/SpecialDealsSection";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { generateMeta } from "@/shared/lib";

function Pricing({
  popularSecondPhoneCountries,
  secondPhoneCountries,
}: {
  popularSecondPhoneCountries: SecondPhoneCountry[];
  secondPhoneCountries: ICountry[];
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
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const [{ data: popularCountriesRaw }] = await Promise.all([
    api.secondPhone.listSecondPhoneCountries(),
  ]);
  const popularSecondPhoneCountries = popularCountriesRaw?.data.countries
    .sort((_, b) => (b.code === "US" ? 1 : -1))
    .filter((el) => el.code !== "PH");

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
    },
  };
};

export default Pricing;
