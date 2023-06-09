import React from "react";
import { GetServerSideProps } from "next";
import api from "@/api";
import { PhoneToBuy, SecondPhoneCountry } from "@/utils/types";
import Navbar from "@/widgets/Navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PhoneNumbersByCountry from "@/widgets/PhoneNumbersByCountry";

function Country({
  phones,
  country,
}: {
  phones: PhoneToBuy[];
  country: SecondPhoneCountry;
}) {
  console.log(phones);
  return (
    <>
      <Navbar />
      <PhoneNumbersByCountry country={country} phones={phones} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
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
  const { data: secondPhoneCountriesRaw } =
    await api.secondPhone.listSecondPhoneCountries();

  const currentCountry = secondPhoneCountriesRaw?.data.countries.find((el) =>
    country.includes(el.country.toLowerCase().replaceAll(" ", "-"))
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
    currentCountry.code
  );

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "navbar",
        "footer",
      ])),
      phones: data?.data.phones ?? [],
      country: currentCountry,
    },
  };
};

export default Country;
