import React from "react";
import { useTranslation } from "next-i18next";
import card from "@/shared/assets/images/card.svg";
import phone from "@/shared/assets/images/call-calling.svg";
import globe from "@/shared/assets/images/globe.svg";
import cloud from "@/shared/assets/images/cloud-connection.svg";
import cardSlash from "@/shared/assets/images/card-slash.svg";
import wallet from "@/shared/assets/images/wallet-minus.svg";
import support from "@/shared/assets/images/24-support.svg";
import cpu from "@/shared/assets/images/cpu.svg";
import { Container, SectionTitle } from "shared/ui/styled";
import {
  Feature,
  FeatureIcon,
  FeaturesWrapper,
  FeatureText,
  FeatureTitle,
  Wrapper,
} from "./styled";

function EsimFeaturesSection() {
  const { t } = useTranslation();

  const features = React.useMemo(
    () => [
      {
        title: t("incoming_and_outgoing_messages"),
        text: t("send_and_receive_from_any_service"),
        img: card,
      },
      {
        title: t("incoming_and_outgoing_calls"),
        text: t("make_and_receive_calls_from_any_service"),
        img: phone,
      },
      {
        title: t("esim_profiles_with_worldwide_access"),
        text: t("buy_traffic_at_prices_below_roaming"),
        img: globe,
      },
      {
        title: t("access_to_numbers_from_any_device"),
        text: t("your_numbers_are_stored_in_cloud"),
        img: cloud,
      },
      {
        title: t("price_transparency"),
        text: t("connect_numbers_without_fees"),
        img: cardSlash,
      },
      {
        title: t("convenient_payment_method"),
        text: t("pay_with_card_or_crypto"),
        img: wallet,
      },
      {
        title: t("online_support"),
        text: t("ask_any_questions"),
        img: support,
      },
      {
        title: t("quick_connection"),
        text: t("get_number_in_3_mins"),
        img: cpu,
      },
    ],
    [t]
  );

  return (
    <Wrapper>
      <Container>
        <SectionTitle>{t("why_esim")}</SectionTitle>
        <FeaturesWrapper>
          {features.map(({ title, text, img }) => (
            <Feature key={title}>
              <div>
                <FeatureIcon src={img} width={40} height={40} alt={title} />
                <FeatureTitle>{title}</FeatureTitle>
              </div>
              <FeatureText>{text}</FeatureText>
            </Feature>
          ))}
        </FeaturesWrapper>
      </Container>
    </Wrapper>
  );
}

export { EsimFeaturesSection };
