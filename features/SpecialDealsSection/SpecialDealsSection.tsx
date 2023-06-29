import React from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Button from "@/shared/ui/Button";
import CountryFlag from "@/shared/ui/CountryFlag";
import { Container, SectionTitle } from "@/shared/ui/styled";
import {
  SpecialDealCard,
  SpecialDealCardSubtitle,
  SpecialDealCardTitle,
  SpecialDealsWrapper,
  VirtualPhoneNumberServicesInformationItem,
  VirtualPhoneNumberServicesInformationList,
  Wrapper,
} from "./styled";

function SpecialDealsSection() {
  const { t } = useTranslation("virtual-phone-number");

  return (
    <Wrapper>
      <Container>
        <SectionTitle>{t("special_deals")}</SectionTitle>
        <SpecialDealsWrapper>
          <SpecialDealCard>
            <SpecialDealCardTitle>{t("number_in")}</SpecialDealCardTitle>
            <SpecialDealCardSubtitle>
              New York, United States{" "}
              <CountryFlag width={32} height={24} name="US" />
            </SpecialDealCardSubtitle>
            <Button
              as="a"
              href="/virtual-phone-number/united-states/new-york"
              size="small"
              variant="secondary"
              label={t("more_info")}
            />
          </SpecialDealCard>{" "}
          <SpecialDealCard>
            <SpecialDealCardTitle>{t("number_in")}</SpecialDealCardTitle>
            <SpecialDealCardSubtitle>
              London, United Kingdom{" "}
              <CountryFlag width={32} height={24} name="GB" />
            </SpecialDealCardSubtitle>
            <Button
              as="a"
              href="/virtual-phone-number/united-kingdom/london-borough-of-barking-and-dagenham"
              size="small"
              variant="secondary"
              label={t("more_info")}
            />
          </SpecialDealCard>{" "}
          <SpecialDealCard>
            <SpecialDealCardTitle>{t("number_in")}</SpecialDealCardTitle>
            <SpecialDealCardSubtitle>
              Madrid, Spain <CountryFlag width={32} height={24} name="ES" />
            </SpecialDealCardSubtitle>
            <Button
              as="a"
              href="/virtual-phone-number/spain/madrid"
              size="small"
              variant="secondary"
              label={t("more_info")}
            />
          </SpecialDealCard>
        </SpecialDealsWrapper>
        <VirtualPhoneNumberServicesInformationList>
          <VirtualPhoneNumberServicesInformationItem>
            {t("special_deals_services_info_item_1")}
          </VirtualPhoneNumberServicesInformationItem>
          <VirtualPhoneNumberServicesInformationItem>
            {t("special_deals_services_info_item_2")}
          </VirtualPhoneNumberServicesInformationItem>
          <VirtualPhoneNumberServicesInformationItem>
            {t("special_deals_services_info_item_3")}
          </VirtualPhoneNumberServicesInformationItem>
          <VirtualPhoneNumberServicesInformationItem>
            {t("special_deals_services_info_item_4")}
          </VirtualPhoneNumberServicesInformationItem>
          <VirtualPhoneNumberServicesInformationItem>
            {t("special_deals_services_info_item_5")}
          </VirtualPhoneNumberServicesInformationItem>
          <VirtualPhoneNumberServicesInformationItem>
            {t("special_deals_services_info_item_6")}
          </VirtualPhoneNumberServicesInformationItem>
          <VirtualPhoneNumberServicesInformationItem>
            {t("special_deals_services_info_item_7")}
          </VirtualPhoneNumberServicesInformationItem>
        </VirtualPhoneNumberServicesInformationList>
      </Container>
    </Wrapper>
  );
}

export { SpecialDealsSection };
