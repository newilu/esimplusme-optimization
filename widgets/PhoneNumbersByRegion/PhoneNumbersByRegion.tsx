import React from "react";
import { ICity, ICountry, IState } from "country-cities";
import { PhoneToBuy } from "@/utils/types";
import PhoneNumbersTable from "@/features/PhoneNumbersTable";
import CountryFlag from "@/shared/ui/CountryFlag";
import { Section, SectionTitle } from "@/shared/ui/BaseHeader/styled";
import { SectionsWrapper, Wrapper } from "./styled";
import CitiesTable from "@/widgets/PhoneNumbersByRegion/CitiesTable";
import Link from "next/link";
import { formatStringToKebabCase } from "@/shared/lib";
import { useTranslation } from "next-i18next";
import { NoDataWrapper } from "@/shared/ui/styled";

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
}: PhoneNumbersByCountryProps) {
  const { t } = useTranslation("virtual-phone-number");

  return (
    <Wrapper>
      <h1>{t("phone_numbers_by_region_title")}</h1>
      <h5>
        in{" "}
        <CountryFlag
          name={country.isoCode}
          width={32}
          height={24}
          borderRadius={5}
        />{" "}
        {country.phonecode} {country.name}
      </h5>
      <SectionsWrapper>
        <Section>
          <SectionTitle>
            <div>
              <CountryFlag
                name={country.isoCode}
                width={32}
                height={24}
                borderRadius={5}
              />{" "}
              {country.phonecode} {country.name}
            </div>
            <Link
              href={`/virtual-phone-number/${formatStringToKebabCase(
                country.name
              )}`}
            >
              {t("change")}
            </Link>
          </SectionTitle>
          <SectionTitle style={{ padding: "15px 25px" }}>
            {t("cities")}
          </SectionTitle>
          {cities.length ? (
            <CitiesTable cities={cities} />
          ) : (
            <NoDataWrapper>{t("no_cities_for_this_region")}</NoDataWrapper>
          )}
        </Section>
        <Section>
          <SectionTitle>{t("all_numbers")}</SectionTitle>
          {phones.length ? (
            <PhoneNumbersTable phones={phones} />
          ) : (
            <NoDataWrapper>{t("no_phones_for_this_region")}</NoDataWrapper>
          )}
        </Section>
      </SectionsWrapper>
    </Wrapper>
  );
}

export { PhoneNumbersByRegion, type PhoneNumbersByCountryProps };
