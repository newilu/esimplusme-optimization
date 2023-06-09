import React from "react";
import { Wrapper } from "./styled";
import { PhoneToBuy, SecondPhoneCountry } from "@/utils/types";
import CountryFlag from "@/shared/ui/CountryFlag";
import { Section, SectionTitle } from "@/shared/ui/BaseHeader/styled";
import PhoneNumbersTable from "@/widgets/PhoneNumbersByCountry/PhoneNumbersTable";

type PhoneNumbersByCountryProps = {
  phones: PhoneToBuy[];
  country: SecondPhoneCountry;
};

function PhoneNumbersByCountry({
  phones,
  country,
}: PhoneNumbersByCountryProps) {
  return (
    <Wrapper>
      <h1>Phone Numbers</h1>
      <h5>
        in{" "}
        <CountryFlag
          name={country.code}
          width={32}
          height={24}
          borderRadius={5}
        />{" "}
        +{country.prefix} {country.country}
      </h5>
      <Section>
        <SectionTitle>All numbers</SectionTitle>
        <PhoneNumbersTable phones={phones} />
      </Section>
    </Wrapper>
  );
}

export { PhoneNumbersByCountry, type PhoneNumbersByCountryProps };
