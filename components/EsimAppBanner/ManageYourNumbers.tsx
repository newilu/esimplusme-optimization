import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useTheme } from "styled-components";
import { useInView } from "utils/hooks";
import { Container } from "utils/styled";
import cloudConnection from "./assets/cloud-connection.svg";
import phone from "./assets/call-calling.svg";
import sms from "./assets/sms.svg";
import support from "./assets/24-support.svg";
import globe from "./assets/globe.svg";
import card from "./assets/card-slash.svg";
import devices from "./assets/devices.webp";
import gplay from "./assets/gplay.svg";
import gplayDark from "./assets/gplay-black.svg";
import appstore from "./assets/appstore.svg";
import appstoreDark from "./assets/appstore-black.svg";
import { ButtonsWrapper, Content, ImageWrapper, Wrapper } from "./styled";

function ManageYourNumbers() {
  const { t } = useTranslation();
  const theme = useTheme();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const isVisible = useInView(ref, { once: true, rootMargin: "-50px" });

  return (
    <Wrapper ref={ref} id="mobile_app_section">
      <div />
      <Container>
        <Content>
          <div>{t("download_the_esimplus_app")}</div>
          <ul>
            <li>
              <Image width={24} height={24} src={phone} alt="phone call" />
              {t("incoming_and_outgoing_calls")}
            </li>{" "}
            <li>
              <Image width={24} height={24} src={sms} alt="sms" />
              {t("incoming_and_outgoing_messages")}
            </li>{" "}
            <li>
              <Image width={24} height={24} src={support} alt="support" />
              {t("24_online_support")}
            </li>{" "}
            <li>
              <Image width={24} height={24} src={globe} alt="globe" />
              {t("esim_profiles_with_worldwide_access")}
            </li>{" "}
            <li>
              <Image
                width={24}
                height={24}
                src={cloudConnection}
                alt="cloud connection"
              />
              {t("access_to_numbers_from_any_device")}
            </li>{" "}
            <li>
              <Image width={24} height={24} src={card} alt="card" />
              {t("price_transparency")}
            </li>
          </ul>
          <ButtonsWrapper>
            <div>{t("download_an_app")}</div>
            <div>
              <button>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://apps.apple.com/by/app/esim-mobile-data-cloud-sim/id1482736281"
                >
                  <Image
                    width={120}
                    height={40}
                    src={
                      isVisible
                        ? (theme as any).name === "light"
                          ? appstore
                          : appstoreDark
                        : ""
                    }
                    alt="appstore"
                  />
                </a>
              </button>
              <button>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://play.google.com/store/apps/details?id=com.appvillis.esim&hl=ru&gl=US"
                >
                  <Image
                    width={140}
                    height={40}
                    src={
                      isVisible
                        ? (theme as any).name === "light"
                          ? gplay
                          : gplayDark
                        : ""
                    }
                    alt="gplay"
                  />
                </a>
              </button>
            </div>
          </ButtonsWrapper>
        </Content>
        <ImageWrapper>
          <Image
            width={300}
            height={570}
            src={isVisible ? devices : ""}
            alt="devices"
          />
        </ImageWrapper>
      </Container>
    </Wrapper>
  );
}

export { ManageYourNumbers };
