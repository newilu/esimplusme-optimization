import React from "react";
import type { ICountry, IState } from "country-cities";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import api from "@/api";
import Navbar from "@/widgets/Navbar";
import PhoneNumberRegionsByCountry from "@/widgets/PhoneNumberRegionsByCountry";
import DownloadAppSection from "@/features/DownloadAppSection";
import HowToGetPhoneNumber from "@/features/HowToGetPhoneNumber";
import type { PhoneToBuy } from "@/utils/types";
import { COUNTRY_LIST } from "@/shared/constants";
import {
  formatStringToKebabCase,
  generateMeta,
  getStatesByCountryCode,
} from "@/shared/lib";
import Footer from "@/components/Footer";

type PageProps = {
  country: ICountry;
  states: IState[];
  phones: PhoneToBuy[];
  phoneNumberStartingPrice: number | null;
};

function Index({
  country,
  states,
  phoneNumberStartingPrice,
  phones,
}: PageProps) {
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
        phones={phones}
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

  const regions = getStatesByCountryCode(currentCountry.isoCode);

  const { data } = await api.secondPhone.getPhonesByCountry(
    currentCountry.isoCode
  );

  const phoneNumbers = data?.data.phones ?? [];

  const phoneNumberStartingPrice =
    phoneNumbers.sort((a, b) => a.price - b.price)[0]?.price ?? null;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "virtual-phone-number",
        "meta",
      ])),
      phoneNumberStartingPrice,
      phones: phoneNumbers,
      country: currentCountry,
      states: regions,
    },
  };
};

export default Index;
