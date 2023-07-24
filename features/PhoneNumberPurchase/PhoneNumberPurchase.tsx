import React from "react";
import type { ICountry } from "country-cities";
import type { PhoneToBuy } from "@/utils/types";
import { format } from "libphonenumber-js";
import Link from "next/link";
import Image from "next/image";
import CountryFlag from "@/shared/ui/CountryFlag";
import Button from "@/shared/ui/Button";
import PhoneSVG from "@/shared/assets/PhoneSVG";
import SmsSVG from "@/shared/assets/SmsSVG";
import CheckmarkSVG from "@/shared/assets/CheckmarkSVG";
import cross from "@/shared/assets/red-cross.svg";
import Checkbox from "@/shared/ui/Checkbox";
import { Trans, useTranslation } from "next-i18next";
import {
  CountryNameWrapper,
  CountryNameAndNumberTypeWrapper,
  Wrapper,
  NumberType,
  PhoneNumberAndPriceWrapper,
  PhoneNumberPrice,
  PhoneNumber,
  PhoneNumberAlert,
  PhoneNumberAlertTitle,
  PhoneNumberAlertText,
  AboutServiceSection,
  PhoneNumberCapabilitiesInfo,
  PhoneNumberCapability,
  PhoneNumberCapabilityName,
  Agreements,
  Agreement,
  PhoneNumberCapabilityAvailability,
} from "./styled";

type PhoneNumberPurchaseProps = {
  phone: PhoneToBuy;
  country: ICountry;
  onSubmit?: () => void;
  isNumberOfMobileType?: boolean;
};

function PhoneNumberPurchase({
  phone,
  country,
  onSubmit = () => {},
  isNumberOfMobileType = false,
}: PhoneNumberPurchaseProps) {
  const { t } = useTranslation("virtual-phone-number");
  const [checkedAgreements, setCheckedAgreements] = React.useState({
    first: false,
    second: false,
  });

  return (
    <Wrapper>
      <CountryNameAndNumberTypeWrapper>
        <CountryNameWrapper>
          <CountryFlag width={24} height={18} name={country.isoCode} />
          {!isNumberOfMobileType &&
            (country.isoCode === "US" ? "US" : country.name)}
          {isNumberOfMobileType && country.name}
        </CountryNameWrapper>
        <NumberType>
          {isNumberOfMobileType ? "Mobile" : phone.numberType}
        </NumberType>
      </CountryNameAndNumberTypeWrapper>
      <PhoneNumberAndPriceWrapper>
        <PhoneNumber>{format(phone.phoneNumber, "INTERNATIONAL")}</PhoneNumber>
        <PhoneNumberPrice>${phone.price + 1}</PhoneNumberPrice>
      </PhoneNumberAndPriceWrapper>
      <PhoneNumberAlert>
        <PhoneNumberAlertTitle>{t("alert_title")}</PhoneNumberAlertTitle>
        <PhoneNumberAlertText>{t("alert_text")}</PhoneNumberAlertText>
      </PhoneNumberAlert>
      <AboutServiceSection>
        <div>{t("about_our_service")}</div>
        <ul>
          <li>
            <CheckmarkSVG />
            <div>{t("international_calls")}</div>
          </li>{" "}
          <li>
            <CheckmarkSVG />
            <div>{t("cheap_phone_numbers")}</div>
          </li>{" "}
          <li>
            <CheckmarkSVG />
            <div>{t("suitable_for_accs_reg")}</div>
          </li>
        </ul>
      </AboutServiceSection>
      <PhoneNumberCapabilitiesInfo>
        <div>{t("info_about_number")}</div>
        <PhoneNumberCapability>
          <PhoneNumberCapabilityName>
            <PhoneSVG />
            {t("calls")}
          </PhoneNumberCapabilityName>
          <PhoneNumberCapabilityAvailability>
            {phone.capabilities.voice ? (
              <CheckmarkSVG />
            ) : (
              <Image width={20} height={20} src={cross} alt="" />
            )}
            {phone.capabilities.voice ? t("available") : t("unavailable")}
          </PhoneNumberCapabilityAvailability>
        </PhoneNumberCapability>
        <PhoneNumberCapability>
          <PhoneNumberCapabilityName>
            <SmsSVG />
            {t("sms")}
          </PhoneNumberCapabilityName>
          <PhoneNumberCapabilityAvailability>
            {phone.capabilities.SMS ? (
              <CheckmarkSVG />
            ) : (
              <Image width={20} height={20} src={cross} alt="" />
            )}
            {phone.capabilities.SMS ? t("available") : t("unavailable")}
          </PhoneNumberCapabilityAvailability>
        </PhoneNumberCapability>
      </PhoneNumberCapabilitiesInfo>
      <Button
        fullWidth
        disabled={!checkedAgreements.first || !checkedAgreements.second}
        label={t("get_number")}
        onClick={onSubmit}
      />
      <Agreements>
        <Agreement>
          <Checkbox
            value={checkedAgreements.first}
            onChange={() => {
              setCheckedAgreements((prev) => ({ ...prev, first: !prev.first }));
            }}
          />
          <div>
            <Trans
              i18nKey="virtual-phone-number:phone_purchase_agreement_first"
              components={{ a: <Link href="/esim-supported-devices" /> }}
            />
          </div>
        </Agreement>{" "}
        <Agreement>
          <Checkbox
            value={checkedAgreements.second}
            onChange={() => {
              setCheckedAgreements((prev) => ({
                ...prev,
                second: !prev.second,
              }));
            }}
          />
          <div>
            <Trans
              i18nKey="virtual-phone-number:phone_purchase_agreement_second"
              components={{
                1: <Link href="/privacy" />,
                2: <Link href="/terms" />,
              }}
            />
          </div>
        </Agreement>
      </Agreements>
    </Wrapper>
  );
}

export { PhoneNumberPurchase, type PhoneNumberPurchaseProps };
