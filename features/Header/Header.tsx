import React from "react";
import { Trans, useTranslation } from "next-i18next";
import { scrollToId } from "@/shared/lib";
import { SectionIDS } from "shared/constants";
import { Container } from "shared/ui/styled";
import Button from "shared/ui/Button";
import { sendSafeGtagEvent, sendSafeYMEvent } from "@/utils/common";
import { Wrapper } from "./styled";

function Header() {
  const { t } = useTranslation();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const ymTimerId = sendSafeYMEvent("landing_page_view");
      const gtagTimerId = sendSafeGtagEvent("landing_page_view");

      return () => {
        clearInterval(ymTimerId);
        clearInterval(gtagTimerId);
      };
    }
  }, []);

  return (
    <Wrapper>
      <Container>
        <h1>
          <Trans i18nKey="two_in_one" components={{ 1: <span /> }} />
        </h1>
        <p>{t("mobile_data_subtitle")}</p>
        <Button
          onClick={() => {
            scrollToId(SectionIDS.SearchYourDestination, 65);
            sendSafeYMEvent("header_cta_click");
            sendSafeGtagEvent("header_cta_click");
          }}
          label={t("get_mobile_data")}
        />
      </Container>
    </Wrapper>
  );
}

export { Header };
