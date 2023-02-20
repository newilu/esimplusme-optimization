import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import facebook from "public/staticfiles/Facebook.svg";
import telegram from "public/staticfiles/Telegram.svg";
import whatWeAccept from "public/staticfiles/what-we-accept.svg";
import { Container } from "utils/styled";
import Logo from "../Logo";
import {
  ListItem,
  List,
  ListTitle,
  Wrapper,
  ListWrapper,
  SocialNetworksWrapper,
  LinksWrapper,
  TopSection,
  BottomSection,
} from "./styled";

function Footer() {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <TopSection>
        <Container>
          <div>
            <Logo color="white" />
            <SocialNetworksWrapper>
              <button>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com/esim4world/"
                >
                  <Image src={facebook} alt="facebook" />
                </a>
              </button>{" "}
              <button>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://t.me/esimplus"
                >
                  <Image src={telegram} alt="telegram" />
                </a>
              </button>{" "}
            </SocialNetworksWrapper>
          </div>
          <div>
            <LinksWrapper>
              <div>
                <ListWrapper>
                  <ListTitle>{t("services")}</ListTitle>
                  <List>
                    <ListItem>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://sms.esimplus.me"
                      >
                        {t("virtual_numbers")}
                      </a>
                    </ListItem>
                    <ListItem>
                      <a href="https://mobiledata.esimplus.me">
                        {t("mobile_data")}
                      </a>
                    </ListItem>
                  </List>
                </ListWrapper>
              </div>
              <div>
                <ListWrapper>
                  <ListTitle>{t("support")}</ListTitle>
                  <List>
                    <ListItem onClick={() => {}}>
                      {t("online_support")}
                    </ListItem>
                    <ListItem>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="mailto:support.esim@appvillis.com"
                      >
                        support.esim@appvillis.com
                      </a>
                    </ListItem>{" "}
                    <ListItem>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://t.me/esimplus_support"
                      >
                        Telegram
                      </a>
                    </ListItem>
                  </List>
                </ListWrapper>
              </div>
              <div />
            </LinksWrapper>
            <ul>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://esimplus.me/privacy"
                >
                  {t("privacy_policy")}
                </a>
              </li>{" "}
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://esimplus.me/terms"
                >
                  {t("terms_of_use")}
                </a>
              </li>{" "}
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://esimplus.me/esim-supported-devices"
                >
                  {t("esim_supported_devices")}
                </a>
              </li>{" "}
            </ul>
          </div>
        </Container>
      </TopSection>
      <BottomSection>
        <Container>
          <div>Appvillis UAB, {new Date().getFullYear()}</div>
          <ul>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://esimplus.me/privacy"
              >
                {t("privacy_policy")}
              </a>
            </li>{" "}
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://esimplus.me/terms"
              >
                {t("terms_of_use")}
              </a>
            </li>{" "}
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://esimplus.me/esim-supported-devices"
              >
                {t("esim_supported_devices")}
              </a>
            </li>{" "}
          </ul>
          <div>
            <Image
              width={130}
              height={24}
              src={whatWeAccept}
              alt="what we accept"
            />
          </div>
        </Container>
      </BottomSection>
    </Wrapper>
  );
}

export { Footer };
