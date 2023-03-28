import React from "react";
import { Trans, useTranslation } from "next-i18next";
import { scrollToId } from "shared/lib";
import { SectionIDS } from "shared/constants";
import { Container } from "shared/ui/styled";
import Button from "shared/ui/Button";
import { Wrapper } from "./styled";

function MobileDataHeader() {
  const { t } = useTranslation();

  // React.useEffect(() => {
  //   window.ym(79496440, "reachGoal", "landing_page_view");
  //   window.gtag("event", "landing_page_view");
  // }, []);

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
            // window.ym(79496440, "reachGoal", "header_cta_click");
            // window.gtag("event", "header_cta_click");
          }}
          label={t("get_mobile_data")}
        />
      </Container>
    </Wrapper>
  );
}

export { MobileDataHeader };
