import React from "react";
import PhoneNumberPurchase from "@/features/PhoneNumberPurchase";
import { PanelSection, PanelSectionTitle } from "@/shared/ui/styled";
import CountryFlag from "@/shared/ui/CountryFlag";
import Link from "next/link";
import Image from "next/image";
import { formatAreaCode, formatStringToKebabCase } from "@/shared/lib";
import PhoneNumbersTable from "@/features/PhoneNumbersTable";
import { PhoneToBuy } from "@/utils/types";
import { ICity, ICountry, IState } from "country-cities";
import { useTranslation } from "next-i18next";
import { NoDataWrapper } from "@/shared/ui/styled";
import { useWindowSize } from "@/context/WindowSizeContext";
import Button from "@/shared/ui/Button";
import card from "./assets/card.svg";
import usdt from "./assets/usdt.svg";
import {
  PaymentMethodCard,
  PaymentMethodsWrapper,
  SectionsWrapper,
  Wrapper,
} from "./styled";
import api from "@/api";
import { v4 } from "uuid";

type PhoneNumberPurchaseHeaderProps = {
  phones: PhoneToBuy[];
  state: IState | null;
  city?: ICity;
  country: ICountry;
  phone: PhoneToBuy | null;
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
  phone,
}: PhoneNumberPurchaseHeaderProps) {
  const { t } = useTranslation("virtual-phone-number");
  const { isMobile } = useWindowSize();
  const [step, setStep] = React.useState(Steps.SelectNumber);
  const [selectedPhone, setSelectedPhone] = React.useState(
    phone ?? phones.length ? phones[0] : null
  );
  const [showPaymentOptions, setShowPaymentOptions] = React.useState(false);

  const handlePurchaseWithCrypto = async () => {
    await api.secondPhone.createTempUser();
  };

  const handlePurchaseWithCard = async () => {
    if (!selectedPhone) return;

    const redirectURL = `${process.env.NEXT_PUBLIC_BASE_URL}?payment_amount:${
      selectedPhone.price * 100
    }`;
    await api.secondPhone.createTempUser();

    const paymentId = v4();
    const customerId = v4();

    const { data } = await api.secondPhone.getSignature({
      price: Number(selectedPhone.price * 100),
      stringToSign: `customer_id:${customerId};payment_amount:${
        selectedPhone.price * 100
      };payment_currency:USD;payment_id:${paymentId};project_id:${
        process.env.NEXT_PUBLIC_ECOMMPAY_PROJECT_ID
      };redirect_success_mode:parent_page;redirect_success_url:${redirectURL}`,
    });

    window.EPayWidget.run({
      customer_id: customerId,
      payment_amount: selectedPhone.price * 100,
      payment_currency: "USD",
      payment_id: paymentId,
      project_id: process.env.NEXT_PUBLIC_ECOMMPAY_PROJECT_ID,
      redirect_success_mode: "parent_page",
      redirect_success_url: redirectURL,
      signature: (data as any)?.data.data,
    });
  };

  return (
    <Wrapper>
      <PaymentMethodsWrapper>
        <PaymentMethodCard onClick={handlePurchaseWithCard}>
          <Image width={64} height={64} src={card} alt="" />
          {t("pay_with_card")}
        </PaymentMethodCard>{" "}
        <PaymentMethodCard onClick={handlePurchaseWithCrypto}>
          <Image width={64} height={64} src={usdt} alt="" />
          {t("pay_with_crypto")}
        </PaymentMethodCard>
      </PaymentMethodsWrapper>
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
                  typeof window !== "undefined" && window.scroll({ top: 0 });
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
              onSubmit={() => setShowPaymentOptions(true)}
            />
          </PanelSection>
        )}
      </SectionsWrapper>
    </Wrapper>
  );
}

export { PhoneNumberPurchaseHeader, type PhoneNumberPurchaseHeaderProps };
