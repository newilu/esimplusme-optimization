import React from "react";
import { useTranslation } from "next-i18next";
import Button from "@/shared/ui/Button";
import CountryFlag from "@/shared/ui/CountryFlag";
import { Container, SectionTitle } from "@/shared/ui/styled";
import {
  SpecialDealCard,
  SpecialDealCardTitle,
  SpecialDealsWrapper,
  TextSEO,
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
            <SpecialDealCardTitle>
              {t("number_in")} New York, United States{" "}
              <CountryFlag width={32} height={24} name="US" />
            </SpecialDealCardTitle>
            <Button
              as="a"
              href="/virtual-phone-number/united-states/new-york"
              size="small"
              variant="secondary"
              label={
                <>
                  {t("more_info")}
                  <TextSEO>{t("number_in")} New York, United States</TextSEO>
                </>
              }
            />
          </SpecialDealCard>{" "}
          <SpecialDealCard>
            <SpecialDealCardTitle>
              {t("number_in")} London, United Kingdom{" "}
              <CountryFlag width={32} height={24} name="GB" />
            </SpecialDealCardTitle>
            <Button
              as="a"
              href="/virtual-phone-number/united-kingdom/london-borough-of-barking-and-dagenham"
              size="small"
              variant="secondary"
              label={
                <>
                  {t("more_info")}
                  <TextSEO>{t("number_in")} London, United Kingdom</TextSEO>
                </>
              }
            />
          </SpecialDealCard>{" "}
          <SpecialDealCard>
            <SpecialDealCardTitle>
              {t("number_in")} Madrid, Spain{" "}
              <CountryFlag width={32} height={24} name="ES" />
            </SpecialDealCardTitle>
            <Button
              as="a"
              href="/virtual-phone-number/spain/madrid"
              size="small"
              variant="secondary"
              label={
                <>
                  {t("more_info")}
                  <TextSEO>{t("number_in")} Madrid, Spain</TextSEO>
                </>
              }
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
