import React from "react";
import PhoneNumbersRates from "@/widgets/PhoneNumberRates";
import { GetServerSideProps } from "next";
import api from "@/api";
import { SecondPhoneCountry } from "@/utils/types";
import Navbar from "@/widgets/Navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { COUNTRY_LIST } from "@/shared/constants";
import { ICountry } from "country-cities";

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
