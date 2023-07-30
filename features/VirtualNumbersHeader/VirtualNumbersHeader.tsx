import React from "react";
import { Trans, useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useWindowSize } from "context/WindowSizeContext";
import Button from "shared/ui/Button";
import { Container } from "shared/ui/styled";
import wechat from "./assets/Wechat.svg";
import snapchat from "./assets/Snapchat.svg";
import allo from "./assets/Allo.svg";
import {
  SectionTitle,
  InfoSection,
  Message,
  MessagesSection,
  MessagesWrapper,
  MessageTitle,
  MessageText,
  SectionSubtitle,
  Wrapper,
} from "./styled";

export const messages = [
  {
    title: "CityMobile",
    text: "CityMobile activation code: 1381",
    img: wechat,
  },
  {
    title: "Snapchat",
    text: "Snapchat Code: 259579. Happy Snapping!",
    img: snapchat,
  },
  {
    title: "CityMobile",
    text: "CityMobile activation code: 1489",
    img: wechat,
  },
  {
    title: "Burgerking",
    text: "Your confirmation code: 7371",
    img: allo,
  },
  {
    title: "Snapchat",
    text: "Snapchat Code: 259569. Happy Snapping!",
    img: snapchat,
  },
  {
    title: "Snapchat",
    text: "Snapchat Code: 212579. Happy Snapping!",
    img: snapchat,
  },
];

function VirtualNumbersHeader() {
  const { t } = useTranslation();
  const { isMobile } = useWindowSize();
  const [items, setItems] = React.useState(messages);

  React.useEffect(() => {
    const interval = setInterval(
      () => setItems([items[items.length - 1]].concat(items.slice(0, -1))),
      4500
    );
    return () => clearInterval(interval);
  }, [items]);

  return (
    <Container>
      <Wrapper id="header">
        <InfoSection>
          <div>
            <SectionTitle>
              <div>
                <Trans i18nKey="acceptance_and_activation" />
              </div>
            </SectionTitle>
            <SectionSubtitle>{t("for_anonymous_reg")}</SectionSubtitle>
          </div>
          <Button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.gtag(
                  "event",
                  "virtualnumber_header_call_to_action_click"
                );
              }
            }}
            label={
              <Link locale="en" href="/virtual-phone-number/pricing">
                {t("get_a_number")}
              </Link>
            }
          />
        </InfoSection>
        <MessagesSection>
          <MessagesWrapper layout>
            {items.slice(0, isMobile ? 3 : 5).map(({ title, text, img }) => (
              <Message
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layout
                key={text.replace(/\D/g, "")}
              >
                <div>
                  <Image
                    width={40}
                    height={40}
                    src={img}
                    alt="message sender image"
                  />
                </div>
                <div>
                  <MessageTitle>{title}</MessageTitle>
                  <MessageText>{text}</MessageText>
                </div>
              </Message>
            ))}
          </MessagesWrapper>
        </MessagesSection>
      </Wrapper>
    </Container>
  );
}

export { VirtualNumbersHeader };
