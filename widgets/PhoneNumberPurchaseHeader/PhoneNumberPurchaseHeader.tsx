import React from "react";
import PhoneNumberPurchase from "@/features/PhoneNumberPurchase";
import { PanelSection, PanelSectionTitle } from "@/shared/ui/styled";
import { SectionsWrapper, Wrapper } from "./styled";
import CountryFlag from "@/shared/ui/CountryFlag";
import Link from "next/link";
import { formatAreaCode, formatStringToKebabCase } from "@/shared/lib";
import PhoneNumbersTable from "@/features/PhoneNumbersTable";
import { PhoneToBuy } from "@/utils/types";
import { ICity, ICountry, IState } from "country-cities";
import { useTranslation } from "next-i18next";
import { NoDataWrapper } from "@/shared/ui/styled";
import { useWindowSize } from "@/context/WindowSizeContext";
import Button from "@/shared/ui/Button";

type PhoneNumberPurchaseHeaderProps = {
  phones: PhoneToBuy[];
  state: IState;
  city?: ICity;
  country: ICountry;
};

enum Steps {
  SelectNumber = "SelectNumber",
  Purchase = "Purchase",
}

function PhoneNumberPurchaseHeader({
  phones,
  country,
  city,
  state,
}: PhoneNumberPurchaseHeaderProps) {
  const { t } = useTranslation("virtual-phone-number");
  const { isMobile } = useWindowSize();
  const [step, setStep] = React.useState(Steps.SelectNumber);
  const [selectedPhone, setSelectedPhone] = React.useState(
    phones.length ? phones[0] : null
  );

  return (
    <Wrapper>
      <h1>{t("phone_numbers_by_city_title")}</h1>
      <h5>
        {state.name} {city && `,${city.name}`}{" "}
        <CountryFlag
          name={country.isoCode}
          width={32}
          height={24}
          borderRadius={5}
        />{" "}
        {formatAreaCode(country.phonecode)}
      </h5>
      <SectionsWrapper>
        {(isMobile ? step === Steps.SelectNumber : true) && (
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
                )}/${formatStringToKebabCase(state.name)}`}
              >
                {t("change")}
              </Link>
            </PanelSectionTitle>
            {phones.length ? (
              <>
                <PanelSectionTitle>
                  {t("select_phone_number")}
                </PanelSectionTitle>
                <PhoneNumbersTable
                  onRowClick={(phone) => setSelectedPhone(phone)}
                  phones={phones}
                />
              </>
            ) : (
              <NoDataWrapper>{t("no_phones_for_this_region")}</NoDataWrapper>
            )}
            {isMobile && (
              <Button
                label="next"
                onClick={() => {
                  setStep(Steps.Purchase);
                  typeof window !== "undefined" && window.scroll({ top: 0 });
                }}
              />
            )}
          </PanelSection>
        )}
        {(isMobile ? step === Steps.Purchase : true) && selectedPhone && (
          <PanelSection>
            <PhoneNumberPurchase country={country} phone={selectedPhone} />
          </PanelSection>
        )}
      </SectionsWrapper>
    </Wrapper>
  );
}

export { PhoneNumberPurchaseHeader, type PhoneNumberPurchaseHeaderProps };
