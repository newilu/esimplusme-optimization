import React from "react";
import { useTranslation } from "next-i18next";
import { SectionTitle } from "@/shared/ui/styled";
import {
  FaqItem,
  FaqItemText,
  FaqItemTitle,
  FaqWrapper,
  Wrapper,
} from "./styled";

function MobileNumberFaq() {
  const { t } = useTranslation("virtual-phone-number");

  return (
    <Wrapper>
      <SectionTitle>{t("common:faq")}</SectionTitle>
      <FaqWrapper>
        <FaqItem>
          <FaqItemTitle>{t("mobile_number_faq_q1")}</FaqItemTitle>
          <FaqItemText>{t("mobile_number_faq_a1")}</FaqItemText>
        </FaqItem>
        <FaqItem>
          <FaqItemTitle>{t("mobile_number_faq_q2")}</FaqItemTitle>
          <FaqItemText>{t("mobile_number_faq_a2")}</FaqItemText>
        </FaqItem>
        <FaqItem>
          <FaqItemTitle>{t("mobile_number_faq_q3")}</FaqItemTitle>
          <FaqItemText>{t("mobile_number_faq_a3")}</FaqItemText>
        </FaqItem>
        <FaqItem>
          <FaqItemTitle>{t("mobile_number_faq_q4")}</FaqItemTitle>
          <FaqItemText>{t("mobile_number_faq_a4")}</FaqItemText>
        </FaqItem>
      </FaqWrapper>
    </Wrapper>
  );
}

export { MobileNumberFaq };
