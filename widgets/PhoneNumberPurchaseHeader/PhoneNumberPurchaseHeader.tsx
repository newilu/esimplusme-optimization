import React from "react";
import type { ICity, ICountry, IState } from "country-cities";
import { format } from "libphonenumber-js";
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

  const areaCode =
    (country.isoCode === "US" || country.isoCode === "CA") && phones[0]
      ? format(phones[0].phoneNumber, "INTERNATIONAL")
          .slice(0, 6)
          .replaceAll(" ", "-")
      : formatAreaCode(country.phonecode);

  return (
    <Wrapper>
      <h1>
        {t("phone_numbers_by_city_title", {
          stateIso: state?.isoCode,
          city: city?.name,
          areaCode,
          country: country.name,
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
                {areaCode} {country.name}
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
