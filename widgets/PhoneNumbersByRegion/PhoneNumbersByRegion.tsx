import React from "react";
import type { ICity, ICountry, IState } from "country-cities";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import type { PhoneToBuy } from "@/utils/types";
import { formatAreaCode, formatStringToKebabCase } from "@/shared/lib";
import CountryFlag from "@/shared/ui/CountryFlag";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import {
  PanelSection,
  PanelSectionTitle,
  NoDataWrapper,
} from "@/shared/ui/styled";
import CitiesTable from "./CitiesTable";
import PhoneNumbersTable from "./PhoneNumbersTable";
import { SectionsWrapper, Wrapper } from "./styled";
import { NoNumbersAvailableView } from "../../features/NoNumbersAvailableView/NoNumbersAvailableView";
import { SecondPhoneCountry } from "@/utils/types";

type PhoneNumbersByCountryProps = {
  phones: PhoneToBuy[];
  country: ICountry;
  state: IState;
  cities: ICity[];
  areaCode?: string;
  popularCountries: SecondPhoneCountry[];
};

function PhoneNumbersByRegion({
  phones,
  country,
  cities,
  state,
  areaCode,
  popularCountries,
}: PhoneNumbersByCountryProps) {
  const { t } = useTranslation("virtual-phone-number");

  return (
    <Wrapper>
      <h1>
        {t("phone_numbers_by_region_title", {
          country: country.name,
          state: state.name,
          stateIso: state.isoCode,
          areaCode,
        })}
      </h1>
      <Breadcrumbs>
        <Link href="/">{t("common:home")}</Link>
        <Link href="/virtual-phone-number/pricing">
          {t("common:phone_number")}
        </Link>
        <Link
          href={`/virtual-phone-number/${formatStringToKebabCase(
            country.name
          )}`}
        >
          {country.name}
        </Link>
        <Link
          href={`/virtual-phone-number/${formatStringToKebabCase(
            country.name
          )}/${formatStringToKebabCase(state.name)}`}
        >
          {state.name}
        </Link>
      </Breadcrumbs>
      <SectionsWrapper>
        <PanelSection>
          <PanelSectionTitle>
            <div>
              <CountryFlag
                name={country.isoCode}
                width={32}
                height={24}
                borderRadius={5}
              />{" "}
              {areaCode ?? formatAreaCode(country.phonecode)} {country.name}
            </div>
            <Link
              href={`/virtual-phone-number/${formatStringToKebabCase(
                country.name
              )}`}
            >
              {t("change")}
            </Link>
          </PanelSectionTitle>
          <PanelSectionTitle style={{ padding: "15px 25px" }}>
            {t("cities")}
          </PanelSectionTitle>
          {cities.length ? (
            <CitiesTable cities={cities} />
          ) : (
            <NoDataWrapper>{t("no_cities_for_this_region")}</NoDataWrapper>
          )}
        </PanelSection>
        <PanelSection>
          <PanelSectionTitle>{t("all_numbers")}</PanelSectionTitle>
          {phones.length ? (
            <PhoneNumbersTable phones={phones} />
          ) : (
            <NoNumbersAvailableView countries={popularCountries} />
          )}
        </PanelSection>
      </SectionsWrapper>
    </Wrapper>
  );
}

export { PhoneNumbersByRegion, type PhoneNumbersByCountryProps };
