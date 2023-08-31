import React from "react";
import { Trans, useTranslation } from "next-i18next";
import { useMixpanelPageContext } from "@/context/MixpanelPageContextProvider";
import { scrollToId } from "@/shared/lib";
import { Container, SectionTitle } from "shared/ui/styled";
import { SectionIDS } from "shared/constants";
import Button from "shared/ui/Button";
import {
  sendSafeGtagEvent,
  sendSafeMixpanelEvent,
  sendSafeYMEvent,
} from "@/utils/common";
import { Content, LeftSide, RightSide, Wrapper } from "./styled";

function SetupGuide() {
  const { t } = useTranslation();
  const { source } = useMixpanelPageContext();

  return (
    <Wrapper>
      <Container>
        <Content>
          <LeftSide>
            <SectionTitle>
              <Trans i18nKey="how_esimplus_works" />
            </SectionTitle>
            <p>{t("four_easy_steps_to_get_esim")}</p>
            <Button
              onClick={() => {
                scrollToId(SectionIDS.SearchYourDestination, 65);
                sendSafeYMEvent("setup_cta_click");
                sendSafeGtagEvent("setup_cta_click");
                sendSafeMixpanelEvent("track", "setup_cta_click", { source });
              }}
              label={t("get_mobile_data")}
              variant="outlined"
            />
          </LeftSide>
          <RightSide>
            <ul>
              <li>
                <div />
                <div>
                  <span>{t("choose_traffic_plan")}</span>
                  {t("choose_traffic_plan_text")}
                </div>
              </li>{" "}
              <li>
                <div />
                <div>
                  <span>{t("install_esim")}</span>
                  {t("install_esim_text")}
                </div>
              </li>{" "}
              <li>
                <div />
                <div>
                  <span>{t("you_are_online")}</span>
                  {t("you_are_online_text")}
                </div>
              </li>{" "}
              <li>
                <div />
                <div>
                  <span>{t("manage_traffic")}</span>
                  {t("manage_traffic_text")}
                </div>
              </li>
            </ul>
          </RightSide>
        </Content>
      </Container>
    </Wrapper>
  );
}

export { SetupGuide };
