import React from "react";
import { GetServerSideProps } from "next";
import Navbar from "@/widgets/Navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { ICountry, IState } from "country-cities";
import { COUNTRY_LIST } from "@/shared/constants";
import { getStatesByCountryCode } from "@/shared/lib";
import PhoneNumberRegionsByCountry from "@/widgets/PhoneNumberRegionsByCountry";
import DownloadAppSection from "@/features/DownloadAppSection";
import Footer from "@/components/Footer";

type PageProps = { country: ICountry; states: IState[] };

function Index({ country, states }: PageProps) {
  return (
    <>
      <Navbar />
      <PhoneNumberRegionsByCountry states={states} country={country} />
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
    country.includes(
      el.name
        .toLowerCase()
        .replaceAll(/[^a-zA-Z -]/gi, "")
        .replaceAll(" ", "-")
    )
  );

  if (!currentCountry) {
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
      country: currentCountry,
      states: getStatesByCountryCode(currentCountry.isoCode),
    },
  };
};

export default Index;
