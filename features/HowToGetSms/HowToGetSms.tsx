import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import card from "./assets/card.svg";
import busd from "./assets/busd.png";
import usdt from "./assets/tether.png";
import { Container, PanelSectionTitle } from "shared/ui/styled";
import Button from "shared/ui/Button";
import {
  Card,
  CardsWrapper,
  CardText,
  CardTitle,
  GetNumberWrapper,
  SecondaryBg,
  Subtitle,
  WhatWeAccept,
  Wrapper,
} from "./styled";

function HowToGetSms() {
  const { t } = useTranslation();
  return (
    <Container>
      <Wrapper>
        <PanelSectionTitle>{t("how_to_get_sms")}</PanelSectionTitle>
        <Subtitle>{t("three_steps_to_receive_sms")}</Subtitle>
        <CardsWrapper>
          <Card>
            <CardTitle>{t("get_virtual_number")}</CardTitle>
            <CardText>{t("select_the_country_to_receive_the_number")}</CardText>
          </Card>{" "}
          <Card>
            <CardTitle> {t("use_it_to_receive_sms")}</CardTitle>
            <CardText>{t("selected_number_should_be_copied")}</CardText>
          </Card>{" "}
          <Card>
            <CardTitle> {t("receive_sms_from_any_website")}</CardTitle>
            <CardText>{t("you_need_to_copy_conf_code")}</CardText>
          </Card>
        </CardsWrapper>
        <GetNumberWrapper>
          <Button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.gtag("event", "virtualnumber_setup_button_click");
              }
            }}
            label={
              <a
                target="_blank"
                rel="noreferrer"
                href="https://sms.esimplus.me/"
              >
                {t("get_a_number")}
              </a>
            }
          />
          <WhatWeAccept>{t("to_get_number_you_can_use")}</WhatWeAccept>
          <div>
            <div>
              <Image width={24} height={24} src={card} alt="card" />
              {t("credit_card")}
            </div>
            <div>
              <Image width={24} height={24} src={usdt} alt="usdt" />
              USDT
            </div>
            <div>
              <Image width={24} height={24} src={busd} alt="BUSD" />
              BUSD
            </div>
          </div>
        </GetNumberWrapper>
        <SecondaryBg />
      </Wrapper>
    </Container>
  );
}

export { HowToGetSms };
