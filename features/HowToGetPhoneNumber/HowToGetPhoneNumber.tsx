import React from "react";
import { Trans, useTranslation } from "next-i18next";
import Image from "next/image";
import phone from "@/shared/assets/images/call-calling.svg";
import calendar from "@/shared/assets/images/calendar.svg";
import smartphone from "@/shared/assets/images/smartphone.svg";
import {
  SectionTitle,
  Paragraph,
  OrderedList,
  OrderedListItem,
} from "@/shared/ui/styled";
import {
  PhoneNumberCapabilities,
  PhoneNumberCapability,
  Wrapper,
} from "./styled";

function HowToGetPhoneNumber({ countryName }: { countryName: string }) {
  const { t } = useTranslation("virtual-phone-number");

  return (
    <Wrapper>
      <div>
        <SectionTitle>{t("how_to_get_phone_number")}</SectionTitle>
        <Paragraph>{t("to_get_number_follow_steps")}</Paragraph>
        <OrderedList>
          <OrderedListItem>{t("visit_website_to_get_app")}</OrderedListItem>
          <OrderedListItem>{t("setup_account")}</OrderedListItem>
          <OrderedListItem>
            {t("purchase_phone_number_in_country", { country: countryName })}
          </OrderedListItem>
        </OrderedList>
        <Paragraph>{t("contact_support_if_you_have_any_questions")}</Paragraph>
      </div>
      <div>
        <PhoneNumberCapabilities>
          <PhoneNumberCapability>
            <Image src={phone} alt="" />
            {t("how_to_get_number_capability_1", { country: countryName })}
          </PhoneNumberCapability>
          <PhoneNumberCapability>
            <Image src={calendar} alt="" />{" "}
            {t("how_to_get_number_capability_2", { country: countryName })}
          </PhoneNumberCapability>
          <PhoneNumberCapability>
            <Image src={smartphone} alt="" />
            {t("how_to_get_number_capability_3", { country: countryName })}
          </PhoneNumberCapability>
        </PhoneNumberCapabilities>
      </div>
    </Wrapper>
  );
}

export { HowToGetPhoneNumber };
