import React from "react";
import PhoneNumberPurchase from "@/features/PhoneNumberPurchase";
import { Section, SectionTitle } from "@/shared/ui/BaseHeader/styled";
import { SectionsWrapper, Wrapper } from "./styled";
import CountryFlag from "@/shared/ui/CountryFlag";
import Link from "next/link";
import { formatAreaCode, formatStringToKebabCase } from "@/shared/lib";
import PhoneNumbersTable from "@/entities/PhoneNumbersTable";
import { PhoneToBuy } from "@/utils/types";
import { ICity, ICountry, IState } from "country-cities";
import { useTranslation } from "next-i18next";
import { NoDataWrapper } from "@/shared/ui/styled";

type PhoneNumbersByCityProps = {
  phones: PhoneToBuy[];
  state: IState;
  city: ICity;
  country: ICountry;
};

function PhoneNumbersByCity({
  phones,
  country,
  city,
  state,
}: PhoneNumbersByCityProps) {
  const { t } = useTranslation("virtual-phone-number");
  const [selectedPhone, setSelectedPhone] = React.useState(
    phones.length ? phones[0] : null
  );

  return (
    <Wrapper>
      <h1>{t("phone_numbers_by_city_title")}</h1>
      <h5>
        {state.name}, {city.name}{" "}
        <CountryFlag
          name={country.isoCode}
          width={32}
          height={24}
          borderRadius={5}
        />{" "}
        {formatAreaCode(country.phonecode)}
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
              {formatAreaCode(country.phonecode)} {country.name}
            </div>
            <Link
              href={`/virtual-phone-number/${formatStringToKebabCase(
                country.name
              )}/${formatStringToKebabCase(state.name)}`}
            >
              {t("change")}
            </Link>
          </SectionTitle>
          {phones.length ? (
            <>
              <SectionTitle>{t("select_phone_number")}</SectionTitle>
              <PhoneNumbersTable
                onRowClick={(phone) => setSelectedPhone(phone)}
                phones={phones}
              />
            </>
          ) : (
            <NoDataWrapper>{t("no_phones_for_this_region")}</NoDataWrapper>
          )}
        </Section>{" "}
        {selectedPhone && (
          <Section>
            <PhoneNumberPurchase country={country} phone={selectedPhone} />
          </Section>
        )}
      </SectionsWrapper>
    </Wrapper>
  );
}

export { PhoneNumbersByCity, type PhoneNumbersByCityProps };
