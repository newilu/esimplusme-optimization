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

function Pricing({
  popularSecondPhoneCountries,
  secondPhoneCountries,
}: {
  popularSecondPhoneCountries: SecondPhoneCountry[];
  secondPhoneCountries: ICountry[];
}) {
  return (
    <>
      <Navbar />
      <PhoneNumbersRates
        popularSecondPhoneCountries={popularSecondPhoneCountries}
        secondPhoneCountries={secondPhoneCountries}
      />
      <DownloadAppSection />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const [{ data: popularCountriesRaw }] = await Promise.all([
    api.secondPhone.listSecondPhoneCountries(),
  ]);
  const popularSecondPhoneCountries = popularCountriesRaw?.data.countries;

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
      ])),
      popularSecondPhoneCountries,
      secondPhoneCountries: COUNTRY_LIST,
    },
  };
};

export default Pricing;
