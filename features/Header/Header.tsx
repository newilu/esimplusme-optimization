import React from "react";
import { Trans, useTranslation } from "next-i18next";
import { useMixpanelPageContext } from "@/context/MixpanelPageContextProvider";
import { scrollToId } from "@/shared/lib";
import { SectionIDS } from "shared/constants";
import { Container } from "shared/ui/styled";
import Button from "shared/ui/Button";
import {
  sendSafeMixpanelEvent,
  sendSafeGtagEvent,
  sendSafeYMEvent,
} from "@/utils/common";
import { Wrapper } from "./styled";

function Header() {
  const { t } = useTranslation();
  const { source } = useMixpanelPageContext();

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
            sendSafeMixpanelEvent("track", "header_cta_click", { source });
          }}
          label={t("get_mobile_data")}
        />
      </Container>
    </Wrapper>
  );
}

export { Header };
