import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import facebook from "public/staticfiles/Facebook.svg";
import telegram from "public/staticfiles/Telegram.svg";
import ln from "public/staticfiles/ln.svg";
import whatWeAccept from "public/staticfiles/what-we-accept.svg";
import { TG_DEFAULT_LINK, TG_RU_LINK } from "@/utils/constants";
import { Container } from "shared/ui/styled";
import Logo from "@/entities/Logo";
import belkal1 from "./assets/belkal-1.svg";
import belkal2 from "./assets/belkal-2.svg";
import mir1 from "./assets/mir-1.svg";
import mir2 from "./assets/mir-2.svg";
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

function Footer({ countryCode = "" }: { countryCode?: string }) {
  const { t, i18n } = useTranslation();

  return (
    <Wrapper>
      <TopSection>
        <Container>
          <div>
            <Logo color="white" />
            <SocialNetworksWrapper>
              <button type="button">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com/esim4world/"
                >
                  <Image src={facebook} alt="facebook" />
                </a>
              </button>{" "}
              <button type="button">
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={i18n.language === "ru" ? TG_RU_LINK : TG_DEFAULT_LINK}
                >
                  <Image src={telegram} alt="telegram" />
                </Link>
              </button>{" "}
              <button type="button">
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/company/esimplus"
                >
                  <Image src={ln} alt="linkedin" />
                </Link>
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
                      <Link href="/virtual-phone-number">
                        {t("virtual_numbers")}
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link href="/">{t("mobile_data")}</Link>
                    </ListItem>
                  </List>
                </ListWrapper>
              </div>
              <div>
                <ListWrapper>
                  <ListTitle>{t("support")}</ListTitle>
                  <List>
                    <ListItem
                      onClick={() => {
                        // eslint-disable-next-line new-cap
                        window.HelpCrunch("openChat");
                      }}
                    >
                      {t("online_support")}
                    </ListItem>
                    <ListItem>
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href="mailto:support.esim@appvillis.com"
                      >
                        support.esim@appvillis.com
                      </Link>
                    </ListItem>{" "}
                    <ListItem>
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href={
                          i18n.language === "ru" ? TG_RU_LINK : TG_DEFAULT_LINK
                        }
                      >
                        Telegram
                      </Link>
                    </ListItem>
                  </List>
                </ListWrapper>
              </div>
              <div>
                <ListWrapper>
                  <ListTitle>{t("contacts")}</ListTitle>
                  <List>
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
                      Appvillis UAB. CRN 304930580. Šiaulių g. 10-56, Vilnius,
                      01134, Lithuania
                    </ListItem>{" "}
                    <ListItem>
                      <a href="tel:+37064757853">+37064757853</a>
                    </ListItem>
                  </List>
                </ListWrapper>
              </div>
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
                <Link href="/esim-supported-devices">
                  {t("esim_supported_devices")}
                </Link>
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
              <Link locale="en" href="/privacy">
                {t("privacy_policy")}
              </Link>
            </li>{" "}
            <li>
              <Link locale="en" href="/terms">
                {t("terms_of_use")}
              </Link>
            </li>{" "}
            <li>
              <Link href="/esim-supported-devices">
                {t("esim_supported_devices")}
              </Link>
            </li>{" "}
          </ul>
          <div>
            <Image
              width={130}
              height={24}
              src={whatWeAccept}
              alt="what we accept"
            />{" "}
            {(countryCode === "RU" || countryCode === "BY") && (
              <>
                <Image width={48} height={24} src={belkal1} alt="" />
                <Image width={72} height={24} src={belkal2} alt="" />
                <Image width={72} height={16} src={mir1} alt="" />
                <Image width={70} height={24} src={mir2} alt="" />
              </>
            )}
          </div>
        </Container>
      </BottomSection>
    </Wrapper>
  );
}

export { Footer };
