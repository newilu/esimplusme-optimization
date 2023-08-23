import React from "react";
import { ICountry } from "country-cities";
import { format } from "libphonenumber-js";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import {
  PanelSection,
  PanelSectionsWrapper,
  PanelSectionTitle,
} from "@/shared/ui/styled";
import { COUNTRY_LIST } from "@/shared/constants";
import {
  formatAreaCode,
  formatStringToKebabCase,
  generateFakeNumber,
} from "@/shared/lib";
import CountryFlag from "@/shared/ui/CountryFlag";
import repeat from "./assets/repeat.svg";
import {
  CountryListWrapper,
  CountryWrapper,
  GeneratedPhoneNumber,
  GetNumberButton,
  RegeneratePhoneNumberButton,
  SelectedCountryNameWrapper,
  Wrapper,
} from "./styled";

function FakeNumberGeneratorHeader() {
  const { t } = useTranslation("random-number");
  const [selectedCountry, setSelectedCountry] = React.useState(COUNTRY_LIST[0]);
  const [generatedNumber, setGeneratedNumber] = React.useState<string | null>(
    null
  );

  const handleRegenerateNumber = (iso: string, areaCode: string) => {
    const newFakePhoneNumber = generateFakeNumber(iso, areaCode);

    setGeneratedNumber(newFakePhoneNumber);
  };
  const handleCountrySelect = (country: ICountry) => {
    setSelectedCountry(country);
    handleRegenerateNumber(country.isoCode, country.phonecode);
  };

  React.useEffect(() => {
    setGeneratedNumber(
      generateFakeNumber(COUNTRY_LIST[0].isoCode, COUNTRY_LIST[0].phonecode) ??
        null
    );
  }, []);

  return (
    <Wrapper>
      <h1>{t("generate_random_number")}</h1>
      <PanelSectionsWrapper dir="row">
        <PanelSection flex="1 1 45%">
          <PanelSectionTitle>{t("select_country")}</PanelSectionTitle>
          <CountryListWrapper>
            {COUNTRY_LIST.map(({ isoCode, name, phonecode, ...rest }) => (
              <CountryWrapper
                key={name}
                active={selectedCountry.name === name}
                onClick={() =>
                  handleCountrySelect({ isoCode, name, phonecode, ...rest })
                }
              >
                <CountryFlag
                  width={28}
                  height={20}
                  borderRadius={4}
                  name={isoCode}
                />
                {name}
                <span>({formatAreaCode(phonecode)})</span>
              </CountryWrapper>
            ))}
          </CountryListWrapper>
        </PanelSection>
        <PanelSection flex="1 1 55%" style={{ justifyContent: "center" }}>
          <SelectedCountryNameWrapper>
            <CountryFlag
              width={34}
              height={24}
              name={selectedCountry.isoCode}
            />
            {selectedCountry.name}
          </SelectedCountryNameWrapper>
          <GeneratedPhoneNumber>
            {generatedNumber && format(generatedNumber, "INTERNATIONAL")}
          </GeneratedPhoneNumber>
          <RegeneratePhoneNumberButton
            onClick={() =>
              handleRegenerateNumber(
                selectedCountry.isoCode,
                selectedCountry.phonecode
              )
            }
          >
            <Image width={18} height={18} src={repeat} alt="" />
            {t("regenerate")}
          </RegeneratePhoneNumberButton>
          <GetNumberButton
            href={`/virtual-phone-number/payment?country=${formatStringToKebabCase(
              selectedCountry.name
            )}&phone=${generatedNumber}`}
          >
            {t("get_number")}
          </GetNumberButton>
        </PanelSection>
      </PanelSectionsWrapper>
    </Wrapper>
  );
}

export { FakeNumberGeneratorHeader };
