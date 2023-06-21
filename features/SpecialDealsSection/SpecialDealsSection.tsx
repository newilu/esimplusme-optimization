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
  Wrapper,
} from "./styled";

type SpecialDealsSectionProps = {
  children?: React.ReactNode;
};

function SpecialDealsSection({ children }: SpecialDealsSectionProps) {
  const { t } = useTranslation("virtual-phone-number");

  return (
    <Wrapper>
      <Container>
        <SectionTitle>special deals</SectionTitle>
        <SpecialDealsWrapper>
          <SpecialDealCard>
            <SpecialDealCardTitle>800 numbers</SpecialDealCardTitle>
            <SpecialDealCardSubtitle>
              in Unites States <CountryFlag width={32} height={24} name="US" />
            </SpecialDealCardSubtitle>
            <Button
              size="small"
              variant="outlined"
              label={
                <Link href="/virtual-phone-number/united-states/new-york">
                  {t("more_info")}
                </Link>
              }
            />
          </SpecialDealCard>{" "}
          <SpecialDealCard>
            <SpecialDealCardTitle>800 numbers</SpecialDealCardTitle>
            <SpecialDealCardSubtitle>
              in Unites States <CountryFlag width={32} height={24} name="US" />
            </SpecialDealCardSubtitle>
            <Button
              size="small"
              variant="outlined"
              label={
                <Link href="/virtual-phone-number/united-kingdom/london-borough-of-barking-and-dagenham">
                  {t("more_info")}
                </Link>
              }
            />
          </SpecialDealCard>{" "}
          <SpecialDealCard>
            <SpecialDealCardTitle>800 numbers</SpecialDealCardTitle>
            <SpecialDealCardSubtitle>
              in Unites States <CountryFlag width={32} height={24} name="US" />
            </SpecialDealCardSubtitle>
            <Button
              size="small"
              variant="outlined"
              label={
                <Link href="/virtual-phone-number/spain/madrid">
                  {t("more_info")}
                </Link>
              }
            />
          </SpecialDealCard>
        </SpecialDealsWrapper>
        {children}
      </Container>
    </Wrapper>
  );
}

export { SpecialDealsSection, type SpecialDealsSectionProps };
