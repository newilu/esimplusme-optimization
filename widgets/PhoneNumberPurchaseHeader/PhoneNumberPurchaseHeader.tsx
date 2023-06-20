import React from "react";
import type { ICity, ICountry, IState } from "country-cities";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useWindowSize } from "@/context/WindowSizeContext";
import type { PhoneToBuy } from "@/utils/types";
import PhoneNumberPurchase from "@/features/PhoneNumberPurchase";
import PhoneNumbersTable from "@/features/PhoneNumbersTable";
import { formatAreaCode, formatStringToKebabCase } from "@/shared/lib";
import CountryFlag from "@/shared/ui/CountryFlag";
import Button from "@/shared/ui/Button";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import {
  PanelSection,
  PanelSectionTitle,
  NoDataWrapper,
} from "@/shared/ui/styled";
import { SectionsWrapper, Wrapper } from "./styled";

type PhoneNumberPurchaseHeaderProps = {
  phones: PhoneToBuy[];
  state: IState | null;
  city?: ICity;
  country: ICountry;
  phone?: PhoneToBuy | null;
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
  phone = null,
}: PhoneNumberPurchaseHeaderProps) {
  const router = useRouter();
  const { t } = useTranslation("virtual-phone-number");
  const { isMobile } = useWindowSize();
  const [step, setStep] = React.useState(Steps.SelectNumber);
  const [selectedPhone, setSelectedPhone] = React.useState(
    phone ?? phones.length ? phones[0] : null
  );

  return (
    <Wrapper>
      <Breadcrumbs>
        <Link href="/virtual-phone-number">{t("common:virtual_numbers")}</Link>
        <Link
          href={`/virtual-phone-number/${formatStringToKebabCase(
            country.name
          )}`}
        >
          {country.name}
        </Link>
        {state && (
          <Link
            href={`/virtual-phone-number/${formatStringToKebabCase(
              country.name
            )}/${formatStringToKebabCase(state.name)}`}
          >
            {state.name}
          </Link>
        )}
        {city && state && (
          <Link
            href={`/virtual-phone-number/${formatStringToKebabCase(
              country.name
            )}/${formatStringToKebabCase(state.name)}/${formatStringToKebabCase(
              city.name
            )}`}
          >
            {city.name}
          </Link>
        )}
      </Breadcrumbs>

      <h1>{t("phone_numbers_by_city_title")}</h1>
      <h5>
        {state?.name} {city && `,${city.name}`}{" "}
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
                )}${state ? `/${formatStringToKebabCase(state.name)}` : ""}`}
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
                  onRowClick={setSelectedPhone}
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
                  if (typeof window !== "undefined") window.scroll({ top: 0 });
                }}
              />
            )}
          </PanelSection>
        )}
        {(isMobile ? step === Steps.Purchase : true) && selectedPhone && (
          <PanelSection>
            <PhoneNumberPurchase
              country={country}
              phone={selectedPhone}
              onSubmit={() => {
                const params = new URLSearchParams({
                  paymentAmount: String((selectedPhone.price + 1) * 100),
                  phoneNumber: selectedPhone.phoneNumber,
                  country: country.isoCode,
                  state: state?.isoCode ?? "",
                });

                router.push(
                  `/virtual-phone-number/payment/provider-select?${params.toString()}`
                );
              }}
            />
          </PanelSection>
        )}
      </SectionsWrapper>
    </Wrapper>
  );
}

export { PhoneNumberPurchaseHeader, type PhoneNumberPurchaseHeaderProps };
