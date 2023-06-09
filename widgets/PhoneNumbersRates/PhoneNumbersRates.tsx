import React from "react";
import { Wrapper } from "./styled";
import { SecondPhoneCountry } from "@/utils/types";
import CountriesTable from "@/widgets/PhoneNumbersRates/CountriesTable";
import { Container } from "@/shared/ui/styled";
import { Section, SectionTitle } from "@/shared/ui/BaseHeader/styled";

type PhoneNumbersRatesProps = {
  secondPhoneCountries: SecondPhoneCountry[];
  popularSecondPhoneCountries: SecondPhoneCountry[];
};

function PhoneNumbersRates({
  secondPhoneCountries,
  popularSecondPhoneCountries,
}: PhoneNumbersRatesProps) {
  return (
    <Wrapper>
      <Container>
        <h1>Phone Number Rates</h1>
        <p>Текст для каких целей нужен этот сервис</p>
        <Section>
          <SectionTitle>Popular Countries</SectionTitle>
          <CountriesTable countries={popularSecondPhoneCountries} />
        </Section>
        <Section>
          <SectionTitle>All Countries</SectionTitle>
          <CountriesTable countries={secondPhoneCountries} />
        </Section>
      </Container>
    </Wrapper>
  );
}

export { PhoneNumbersRates, type PhoneNumbersRatesProps };
