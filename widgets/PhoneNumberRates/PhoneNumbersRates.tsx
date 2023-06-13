import React from "react";
import { SecondPhoneCountry } from "@/utils/types";
import CountriesTable from "@/widgets/PhoneNumberRates/CountriesTable";
import { Section, SectionTitle } from "@/shared/ui/BaseHeader/styled";
import { Wrapper } from "./styled";
import { useTranslation } from "next-i18next";

type PhoneNumbersRatesProps = {
  secondPhoneCountries: SecondPhoneCountry[];
  popularSecondPhoneCountries: SecondPhoneCountry[];
};

function PhoneNumbersRates({
  secondPhoneCountries,
  popularSecondPhoneCountries,
}: PhoneNumbersRatesProps) {
  const { t } = useTranslation("virtual-phone-number");
  return (
    <Wrapper>
      <h1>{t("phone_number_rates_title")}</h1>
      <p>{t("phone_number_rates_text")}</p>
      <Section>
        <SectionTitle>{t("popular_countries")}</SectionTitle>
        <CountriesTable countries={popularSecondPhoneCountries} />
      </Section>
      <Section>
        <SectionTitle>{t("all_countries")}</SectionTitle>
        <CountriesTable countries={secondPhoneCountries} />
      </Section>
    </Wrapper>
  );
}

export { PhoneNumbersRates, type PhoneNumbersRatesProps };
