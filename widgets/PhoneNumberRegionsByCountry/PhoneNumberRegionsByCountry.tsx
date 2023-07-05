import React from "react";
import type { ICountry, IState } from "country-cities";
import { Trans, useTranslation } from "next-i18next";
import Link from "next/link";
import { formatStringToKebabCase } from "@/shared/lib";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import { StatesTable } from "@/entities/StatesTable/StatesTable";
import {
  PanelSection,
  PanelSectionTitle,
  PanelSectionsWrapper,
} from "@/shared/ui/styled";
import { PhoneToBuy } from "@/utils/types";
import PhoneNumbersTable from "@/features/PhoneNumbersTable";
import PhoneNumberPurchase from "@/features/PhoneNumberPurchase";
import { Wrapper } from "./styled";
import { useRouter } from "next/router";

type PhoneNumberRegionsByCountryProps = {
  states: IState[];
  country: ICountry;
  phones: PhoneToBuy[];
  phoneNumberStartingPrice: number | null;
};

function PhoneNumberRegionsByCountry({
  country,
  states,
  phones,
  phoneNumberStartingPrice,
}: PhoneNumberRegionsByCountryProps) {
  const router = useRouter();
  const { t } = useTranslation("virtual-phone-number");
  const [selectedPhone, setSelectedPhone] = React.useState(
    phones.length ? phones[0] : null
  );

  const handlePhoneNumberPurchase = async () => {
    if (!selectedPhone) return;

    const params = new URLSearchParams({
      paymentAmount: String((selectedPhone.price + 1) * 100),
      phoneNumber: selectedPhone.phoneNumber,
      country: country.isoCode,
    });

    await router.push(
      `/virtual-phone-number/payment/provider-select?${params.toString()}`
    );
  };

  return (
    <Wrapper>
      <h1>
        {t("phone_number_regions_by_country_title", { country: country.name })}
      </h1>
      <p>
        <Trans
          i18nKey="virtual-phone-number:phone_number_regions_by_country_text"
          values={{
            country: country.name,
          }}
        />
      </p>
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
      </Breadcrumbs>
      <PanelSectionsWrapper dir="row">
        {states.length ? (
          <PanelSection>
            <PanelSectionTitle>
              {t("regions")}{" "}
              <Link href="/virtual-phone-number/pricing">{t("change")}</Link>
            </PanelSectionTitle>
            <StatesTable
              country={country}
              states={states}
              phoneNumberStartingPrice={phoneNumberStartingPrice}
            />
          </PanelSection>
        ) : (
          <>
            <PanelSection>
              <PanelSectionTitle>
                {t("select_phone_number")}{" "}
                <Link href="/virtual-phone-number/pricing">{t("change")}</Link>
              </PanelSectionTitle>
              <PhoneNumbersTable
                phones={phones}
                onRowClick={setSelectedPhone}
              />
            </PanelSection>
            <PanelSection>
              {selectedPhone && (
                <PhoneNumberPurchase
                  country={country}
                  phone={selectedPhone}
                  onSubmit={handlePhoneNumberPurchase}
                />
              )}
            </PanelSection>
          </>
        )}
      </PanelSectionsWrapper>
    </Wrapper>
  );
}

export { PhoneNumberRegionsByCountry, type PhoneNumberRegionsByCountryProps };
