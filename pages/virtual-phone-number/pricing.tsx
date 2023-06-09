import React from "react";
import PhoneNumbersRates from "@/widgets/PhoneNumbersRates";
import { GetServerSideProps } from "next";
import api from "@/api";
import { SecondPhoneCountry } from "@/utils/types";
import Navbar from "@/widgets/Navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function Pricing({
  popularSecondPhoneCountries,
  secondPhoneCountries,
}: {
  popularSecondPhoneCountries: SecondPhoneCountry[];
  secondPhoneCountries: SecondPhoneCountry[];
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
  const [{ data: popularCountriesRaw }, { data: secondPhoneCountriesRaw }] =
    await Promise.all([
      api.secondPhone.getSecondPhonePopularCountries(),
      api.secondPhone.listSecondPhoneCountries(),
    ]);
  const popularSecondPhoneCountries = popularCountriesRaw?.data.countries;
  const secondPhoneCountries = secondPhoneCountriesRaw?.data.countries;

  if (!popularSecondPhoneCountries || !secondPhoneCountries) {
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
        "navbar",
        "footer",
      ])),
      popularSecondPhoneCountries,
      secondPhoneCountries,
    },
  };
};

export default Pricing;
