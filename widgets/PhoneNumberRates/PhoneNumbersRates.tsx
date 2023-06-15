import React from "react";
import { SecondPhoneCountry } from "@/utils/types";
import PopularCountriesTable from "@/widgets/PhoneNumberRates/PopularCountriesTable";
import { PanelSection, PanelSectionTitle } from "@/shared/ui/styled";
import { Wrapper } from "./styled";
import { useTranslation } from "next-i18next";
import { ICountry } from "country-cities";
import AllCountriesTable from "@/widgets/PhoneNumberRates/AllCountriesTable";

type PhoneNumbersRatesProps = {
  secondPhoneCountries: ICountry[];
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
      <PanelSection>
        <PanelSectionTitle>{t("popular_countries")}</PanelSectionTitle>
        <PopularCountriesTable countries={popularSecondPhoneCountries} />
      </PanelSection>
      <PanelSection>
        <PanelSectionTitle>{t("all_countries")}</PanelSectionTitle>
        <AllCountriesTable countries={secondPhoneCountries} />
      </PanelSection>
    </Wrapper>
  );
}

export { PhoneNumbersRates, type PhoneNumbersRatesProps };
