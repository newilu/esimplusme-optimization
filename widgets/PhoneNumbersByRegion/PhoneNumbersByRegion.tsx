import React from "react";
import type { ICity, ICountry, IState } from "country-cities";
import { Trans, useTranslation } from "next-i18next";
import Link from "next/link";
import type { PhoneToBuy } from "@/utils/types";
import PhoneNumbersTable from "@/features/PhoneNumbersTable";
import { formatAreaCode, formatStringToKebabCase } from "@/shared/lib";
import CountryFlag from "@/shared/ui/CountryFlag";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import {
  PanelSection,
  PanelSectionTitle,
  NoDataWrapper,
} from "@/shared/ui/styled";
import CitiesTable from "./CitiesTable";
import { SectionsWrapper, Wrapper } from "./styled";

type PhoneNumbersByCountryProps = {
  phones: PhoneToBuy[];
  country: ICountry;
  state: IState;
  cities: ICity[];
};

function PhoneNumbersByRegion({
  phones,
  country,
  cities,
  state,
}: PhoneNumbersByCountryProps) {
  const { t } = useTranslation("virtual-phone-number");

  return (
    <Wrapper>
      <Breadcrumbs>
        <Link href="/">{t("common:home")}</Link>
        <Link href="/virtual-phone-number/pricing">
          {t("common:virtual_numbers")}
        </Link>
        <Link
          href={`/virtual-phone-number/${formatStringToKebabCase(
            country.name
          )}`}
        >
          {country.isoCode === "US" ? country.isoCode : country.name}
        </Link>
        <Link
          href={`/virtual-phone-number/${formatStringToKebabCase(
            country.name
          )}/${formatStringToKebabCase(state.name)}`}
        >
          {state.name}
        </Link>
      </Breadcrumbs>
      <h1>{t("phone_numbers_by_region_title")}</h1>
      <h5>
        <Trans
          i18nKey="virtual-phone-number:phone_numbers_by_region_subtitle"
          components={{
            flag: (
              <CountryFlag
                name={country.isoCode}
                width={32}
                height={24}
                borderRadius={5}
              />
            ),
          }}
          values={{
            country: `${formatAreaCode(country.phonecode)} ${country.name}`,
            state: state.name,
          }}
        />
      </h5>
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
              {formatAreaCode(country.phonecode)} {country.name}
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
            <NoDataWrapper>{t("no_phones_for_this_region")}</NoDataWrapper>
          )}
        </PanelSection>
      </SectionsWrapper>
    </Wrapper>
  );
}

export { PhoneNumbersByRegion, type PhoneNumbersByCountryProps };
