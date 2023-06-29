import React from "react";
import type { ICountry } from "country-cities";
import { useTranslation } from "next-i18next";
import type { SecondPhoneCountry } from "@/utils/types";
import {
  PanelSection,
  PanelSectionsWrapper,
  PanelSectionTitle,
} from "@/shared/ui/styled";
import PopularCountriesTable from "./PopularCountriesTable";
import AllCountriesTable from "./AllCountriesTable";
import { Wrapper } from "./styled";

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
      <p>{t("phone_number_rates_subtitle")}</p>
      <PanelSectionsWrapper dir="column">
        <PanelSection>
          <PanelSectionTitle>{t("popular_countries")}</PanelSectionTitle>
          <PopularCountriesTable countries={popularSecondPhoneCountries} />
        </PanelSection>
        <PanelSection>
          <PanelSectionTitle>{t("all_countries")}</PanelSectionTitle>
          <AllCountriesTable countries={secondPhoneCountries} />
        </PanelSection>
      </PanelSectionsWrapper>
    </Wrapper>
  );
}

export { PhoneNumbersRates, type PhoneNumbersRatesProps };
