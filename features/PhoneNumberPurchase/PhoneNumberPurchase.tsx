import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import type { ICountry, IState } from "country-cities";
import { Trans, useTranslation } from "next-i18next";
import { format } from "libphonenumber-js";
import Link from "next/link";
import Image from "next/image";

import type { PhoneToBuy } from "@/utils/types";
import CountryFlag from "@/shared/ui/CountryFlag";
import Button from "@/shared/ui/Button";
import PhoneSVG from "@/shared/assets/PhoneSVG";
import SmsSVG from "@/shared/assets/SmsSVG";
import SectionIcon from "@/shared/assets/SectionIcon";
import RandomIcon from "@/shared/assets/RandomIcon";
import MinusIcon from "@/shared/assets/MinusIcon";
import PlusIcon from "@/shared/assets/PlusIcon";
import CheckmarkSVG from "@/shared/assets/CheckmarkSVG";
import cross from "@/shared/assets/red-cross.svg";

import Checkbox from "@/shared/ui/Checkbox";
import { RadioButtons } from "@/shared/ui/RadioButtons/RadioButtons";
import { MAX_PURCHASE_PRICE } from "@/shared/constants";
import { geteratePurchaseRedirectUrl } from "@/utils/common";

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
  InfoField,
  Agreements,
  Agreement,
  PhoneNumberCapabilityAvailability,
  RadioButtonsWrapper,
  PhoneDurationOptionWrapper,
  PhoneDurationOptionWrapperTitlte,
  MultiplePurchaseLabel,
  PurchaseLimit,
  MultiplePurchaseWrapper,
  MultiplePurchaseInfoField,
  MultiplePurchaseRange,
  MultiplePurchaseIconsWrapper,
  MultiplePurchaseRangeWrapper,
  MultiplePurchaseIcon,
} from "./styled";

const PhoneDurationOption = ({ title, price }: { title: string; price: number }) => (
  <PhoneDurationOptionWrapper>
    <PhoneDurationOptionWrapperTitlte>{title}</PhoneDurationOptionWrapperTitlte>
    ${price}
  </PhoneDurationOptionWrapper>
);

type PhoneNumberPurchaseProps = {
  phone: PhoneToBuy;
  country: ICountry;
  state?: IState | null;
  isNumberOfMobileType?: boolean;
};

const MIN_COUNT_OF_NUMBERS = 10;

function PhoneNumberPurchase({
  phone,
  country,
  state,
  isNumberOfMobileType = false,
}: PhoneNumberPurchaseProps) {
  const router = useRouter();
  const { t } = useTranslation("virtual-phone-number");
  const [checkedAgreements, setCheckedAgreements] = useState(true);
  const [multiplePurchase, setMultiplePurchase] = useState(false);
  const [multipleNumberCount, setMultipleNumberCount] = useState(MIN_COUNT_OF_NUMBERS);
  const numbersCount = multiplePurchase ? multipleNumberCount : 1;
  const price = phone.price + 1

  const phoneDurationList = useMemo(() => ([
    {
      value: 1,
      title: <PhoneDurationOption title={t('month')} price={price * numbersCount} />,
      disabled: price * numbersCount > MAX_PURCHASE_PRICE
    },
    {
      value: 3,
      title: <PhoneDurationOption title={'3 ' + t("months")} price={price * 3 * numbersCount} />,
      disabled: price * 3 * numbersCount > MAX_PURCHASE_PRICE
    },
    {
      value: 12,
      title: <PhoneDurationOption title={t('year')} price={price * 12 * numbersCount} />,
      disabled: price * 12 * numbersCount > MAX_PURCHASE_PRICE
    }
  ]), [t, price, numbersCount])
  const [phoneDuration, setPhoneDuration] = useState(phoneDurationList[2].value);

  const handleSubmit = async () => {
    const path = geteratePurchaseRedirectUrl({ phone, state, country, count: numbersCount, duration: phoneDuration })

    await router.push(path);
  }

  const toggleMultipleSelector = () => {
    if (!multiplePurchase) {
      setMaxAvailableDuration();
    } else {
      setMultipleNumberCount(MIN_COUNT_OF_NUMBERS);
    }

    setMultiplePurchase(!multiplePurchase)
  }

  const setMaxAvailableDuration = () => {
    for (let i = phoneDurationList.length - 1; i >= 0; i -= 1) {
      const priceInRange = phoneDurationList[i].value * price * multipleNumberCount < MAX_PURCHASE_PRICE

      if (priceInRange) {
        setPhoneDuration(phoneDurationList[i].value)
        return
      }
    }
  }

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
        <PhoneNumberPrice>${price}</PhoneNumberPrice>
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
          <InfoField>
            <PhoneSVG />
            {t("calls")}
          </InfoField>
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
          <InfoField>
            <SmsSVG />
            {t("sms")}
          </InfoField>
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
      <MultiplePurchaseLabel htmlFor='multiple_purchase'>
        {t('multiple_purchase')}
        <Checkbox id='multiple_purchase' checked={multiplePurchase} onChange={toggleMultipleSelector} />
      </MultiplePurchaseLabel>
      <PurchaseLimit>
        <Trans i18nKey="purchase_limit" values={{ value: MAX_PURCHASE_PRICE }} />
      </PurchaseLimit>
      <MultiplePurchaseWrapper>
        {multiplePurchase && (
          <>
            <MultiplePurchaseInfoField>
              <SectionIcon />
              <span>{t('multiple_purchase_description_1')}</span>
            </MultiplePurchaseInfoField>
            <MultiplePurchaseInfoField>
              <RandomIcon />
              <span><Trans i18nKey='multiple_purchase_description_2' components={{ 1: <b></b> }} /></span>
            </MultiplePurchaseInfoField>
            <MultiplePurchaseRangeWrapper>
              <span>{t('multiple_purchase_count')}</span>
              <MultiplePurchaseRange>
                <span>{multipleNumberCount}</span>
                <MultiplePurchaseIconsWrapper>
                  <MultiplePurchaseIcon
                    onClick={() => setMultipleNumberCount(multipleNumberCount - 10)}
                    $disabled={multipleNumberCount === MIN_COUNT_OF_NUMBERS}
                  >
                    <MinusIcon />
                  </MultiplePurchaseIcon>
                  <MultiplePurchaseIcon
                    onClick={() => setMultipleNumberCount(multipleNumberCount + 10)}
                    $disabled={MAX_PURCHASE_PRICE < price * phoneDuration * (multipleNumberCount + 10)}
                  >
                    <PlusIcon />
                  </MultiplePurchaseIcon>
                </MultiplePurchaseIconsWrapper>
              </MultiplePurchaseRange>
            </MultiplePurchaseRangeWrapper>
          </>
        )}
      </MultiplePurchaseWrapper>
      <RadioButtonsWrapper>
        <RadioButtons value={phoneDuration} items={phoneDurationList} onChange={setPhoneDuration} />
      </RadioButtonsWrapper>
      <Button
        fullWidth
        disabled={!checkedAgreements}
        label={t("get_number")}
        onClick={handleSubmit}
      />
      <Agreements>
        <Agreement>
          <Checkbox
            checked={checkedAgreements}
            onChange={() => {
              setCheckedAgreements((prev) => !prev);
            }}
          />
          <div>
            <Trans
              i18nKey="virtual-phone-number:phone_purchase_agreement_second"
              components={{
                1: <Link target="_blank" href="/privacy" />,
                2: <Link target="_blank" href="/terms" />,
              }}
            />
          </div>
        </Agreement>
      </Agreements>
    </Wrapper>
  );
}

export { PhoneNumberPurchase, type PhoneNumberPurchaseProps };
