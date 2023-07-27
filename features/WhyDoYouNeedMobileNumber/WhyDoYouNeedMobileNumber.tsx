import React from "react";
import { useTranslation } from "next-i18next";
import { ICountry } from "country-cities";
import { SectionTitle, Paragraph } from "@/shared/ui/styled";
import { ListTitle, Wrapper } from "./styled";

function WhyDoYouNeedMobileNumber({ country }: { country: ICountry }) {
  const { t } = useTranslation("virtual-phone-number");

  return (
    <Wrapper>
      <div>
        <SectionTitle>
          {t("why_do_you_need_mobile_number", { country: country.name })}
        </SectionTitle>
        <Paragraph>
          {t("why_do_you_need_mobile_number_p1", { country: country.name })}
        </Paragraph>
        <Paragraph>{t("why_do_you_need_mobile_number_p2")}</Paragraph>
        <Paragraph>{t("why_do_you_need_mobile_number_p3")}</Paragraph>
      </div>
      <div>
        <ListTitle>{t("benefits_of_mobile_number")}</ListTitle>
        <ul>
          <li>{t("benefit_of_mobile_number_1")}</li>
          <li>{t("benefit_of_mobile_number_2")}</li>
          <li>{t("benefit_of_mobile_number_3")}</li>
          <li>{t("benefit_of_mobile_number_4")}</li>
          <li>{t("benefit_of_mobile_number_5")}</li>
          <li>{t("benefit_of_mobile_number_6")}</li>
        </ul>
      </div>
    </Wrapper>
  );
}

export { WhyDoYouNeedMobileNumber };
