import React from "react";
import type { ICity, ICountry, IState } from "country-cities";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import type { PhoneToBuy, SecondPhoneCountry } from "@/utils/types";
import PhoneNumberPurchase from "@/features/PhoneNumberPurchase";
import { NoNumbersAvailableView } from "@/features/NoNumbersAvailableView/NoNumbersAvailableView";
import { STATE_NAME_DEPRECATED_WORDS } from "@/shared/constants";
import {
  formatAreaCode,
  formatStringToKebabCase,
  removeExcludedWords,
} from "@/shared/lib";
import CountryFlag from "@/shared/ui/CountryFlag";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import { PanelSection, PanelSectionTitle } from "@/shared/ui/styled";
import CitiesTable from "./CitiesTable";
import PhoneNumbersTable from "./PhoneNumbersTable";
import { SectionsWrapper, Wrapper } from "./styled";

type PhoneNumbersByCountryProps = {
  phones: PhoneToBuy[];
  country: ICountry;
  state: IState;
  cities: ICity[];
  areaCode: string;
  popularCountries: SecondPhoneCountry[];
  phoneNumber?: PhoneToBuy | null;
};

function PhoneNumbersByRegion({
  phones,
  country,
  cities,
  state,
  areaCode,
  popularCountries,
  phoneNumber = null,
}: PhoneNumbersByCountryProps) {
  const { pathname, query, push, replace } = useRouter();
  const { t } = useTranslation("virtual-phone-number");

  const { phone, ...rest } = query;

  React.useEffect(() => {
    if (
      typeof phone === "string" &&
      phoneNumber !== null &&
      phoneNumber.phoneNumber !== phone
    ) {
      replace(
        { query: { ...rest, phone: phoneNumber?.phoneNumber } },
        undefined,
        { shallow: true, scroll: false }
      );
    }
  }, [phoneNumber?.phoneNumber]);

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
          )}/${formatStringToKebabCase(
            removeExcludedWords(state.name, STATE_NAME_DEPRECATED_WORDS)
          )}`}
        >
          {removeExcludedWords(state.name, STATE_NAME_DEPRECATED_WORDS)}
        </Link>
      </Breadcrumbs>
      <SectionsWrapper>
        {phoneNumber ? (
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
              <Link href={pathname}>{t("change")}</Link>
            </PanelSectionTitle>
            <PhoneNumberPurchase
              state={state}
              phone={phoneNumber}
              country={country}
            />
          </PanelSection>
        ) : (
          <>
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
                {cities.length ? t("cities") : t("all_numbers")}
              </PanelSectionTitle>
              {!!cities.length && (
                <CitiesTable areaCode={areaCode} cities={cities} />
              )}
              {!cities.length &&
                (phones.length ? (
                  <PhoneNumbersTable
                    onRowClick={(data) => {
                      push({
                        pathname,
                        query: { ...rest, phone: data.phoneNumber },
                      });
                    }}
                    phones={phones}
                  />
                ) : (
                  <NoNumbersAvailableView countries={popularCountries} />
                ))}
            </PanelSection>
            {!!cities.length && (
              <PanelSection>
                <PanelSectionTitle>{t("all_numbers")}</PanelSectionTitle>
                {phones.length ? (
                  <PhoneNumbersTable
                    phones={phones}
                    onRowClick={(data) => {
                      push({
                        pathname,
                        query: { ...rest, phone: data.phoneNumber },
                      });
                    }}
                  />
                ) : (
                  <NoNumbersAvailableView countries={popularCountries} />
                )}
              </PanelSection>
            )}
          </>
        )}
      </SectionsWrapper>
    </Wrapper>
  );
}

export { PhoneNumbersByRegion, type PhoneNumbersByCountryProps };
