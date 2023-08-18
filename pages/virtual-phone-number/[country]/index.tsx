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
import type { PhoneToBuy, SecondPhoneCountry } from "@/utils/types";
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
  phones: PhoneToBuy[] | null;
  phoneNumberStartingPrice: number | null;
  popularCountries: SecondPhoneCountry[];
  phoneNumber?: PhoneToBuy | null;
};

function Index({
  country,
  states,
  phoneNumberStartingPrice,
  phones,
  popularCountries,
  phoneNumber
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
        supportedLangs: ["en"],
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
        popularCountries={popularCountries}
        phoneNumber={phoneNumber}
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
  query,
}) => {
  const { country } = params ?? {};
  const autonumber = query.autonumber === 'true';

  let phoneNumberStartingPrice: number | null = null;
  let phoneNumbers: PhoneToBuy[] | null = null;

  if (typeof country !== "string") {
    return {
      redirect: {
        destination: "/virtual-phone-number/pricing",
        statusCode: 301,
      },
    };
  }

  const currentCountry = COUNTRY_LIST.find((el) => country === formatStringToKebabCase(el.name));

  if (!currentCountry) {
    return {
      redirect: {
        destination: "/virtual-phone-number/pricing",
        statusCode: 301,
      },
    };
  }

  let regions = getStatesByCountryCode(currentCountry.isoCode);

  if (currentCountry.isoCode === "US" && regions.length > 0) {
    const mobileField = {
      name: "Mobile",
      phonecode: currentCountry.phonecode,
      countryCode: currentCountry.isoCode,
      isoCode: '',
      flag: '',
      currency: '',
      latitude: '',
      longitude: '',
    } as IState;

    const start = regions.length - 1 > 10 ? 10 : regions.length - 1;

    regions = [...regions.slice(0, start), mobileField, ...regions.slice(start + 1)]
  }

  if (!regions.length || autonumber) {
    const { data } = await api.secondPhone.getPhonesByCountry(
      currentCountry.isoCode
    );

    phoneNumbers = data?.data.phones ?? [];
  }

  const { data: secondPhoneCountries } =
    await api.secondPhone.listSecondPhoneCountries();

  const popularCountries = secondPhoneCountries ?? [];

  phoneNumberStartingPrice =
    popularCountries.find((el) => el.code === currentCountry.isoCode)?.prices
      .cheapest.price ?? null;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "virtual-phone-number",
        "meta",
      ])),
      popularCountries,
      phoneNumberStartingPrice,
      phones: phoneNumbers,
      country: currentCountry,
      states: regions,
      phoneNumber: !autonumber && phoneNumbers?.[0] || null
    },
  };
};

export default Index;
