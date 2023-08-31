import React from "react";
import { useTranslation } from "next-i18next";
import { useTheme } from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import { useMixpanelPageContext } from "@/context/MixpanelPageContextProvider";
import { APPSTORE_LINK, GPLAY_LINK } from "@/shared/constants";
import { SectionTitle } from "shared/ui/styled";
import {
  sendSafeFbqEvent,
  sendSafeGtagEvent,
  sendSafeMixpanelEvent,
} from "@/utils/common";
import cloudConnection from "@/shared/assets/images/cloud-connection.svg";
import phone from "@/shared/assets/images/call-calling.svg";
import sms from "@/shared/assets/images/sms.svg";
import support from "@/shared/assets/images/24-support.svg";
import globe from "@/shared/assets/images/globe.svg";
import card from "@/shared/assets/images/card-slash.svg";
import devices from "./assets/devices.webp";
import gplay from "./assets/gplay.svg";
import gplayDark from "./assets/gplay-black.svg";
import appstore from "./assets/appstore.svg";
import appstoreDark from "./assets/appstore-black.svg";
import { ButtonsWrapper, Content, ImageWrapper, Wrapper } from "./styled";

function DownloadAppSection({
  sectionTitle = "download_the_esimplus_app",
}: {
  sectionTitle?: string;
}) {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme();
  const { source } = useMixpanelPageContext();

  const handleMarketClick = (market: string) => {
    sendSafeFbqEvent("Lead");
    switch (true) {
      case router.pathname.includes("virtual-phone-number"):
        sendSafeGtagEvent(`virtualnumber_${market}_click`);
        sendSafeMixpanelEvent("track", `virtualnumber_${market}_click`, {
          source,
        });
        break;

      default:
        sendSafeGtagEvent(`mobiledata_${market}_click`);
        sendSafeMixpanelEvent("track", `mobiledata_${market}_click`, {
          source,
        });

        break;
    }
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Wrapper id="mobile_app_section">
        <Content>
          <SectionTitle as="div">{t(sectionTitle)}</SectionTitle>
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
              {t("online_support_virtual_phone")}
            </li>{" "}
            <li>
              <Image width={24} height={24} src={globe} alt="globe" />
              {t("user_frendly_multiple_languages")}
            </li>{" "}
            <li>
              <Image
                width={24}
                height={24}
                src={cloudConnection}
                alt="cloud connection"
              />
              {t("access_to_phone_numbers_from_any_device")}
            </li>{" "}
            <li>
              <Image width={24} height={24} src={card} alt="card" />
              {t("price_transparency_virtual_number")}
            </li>
          </ul>
          <ButtonsWrapper>
            <div>{t("download_an_app")}</div>
            <div>
              <button
                type="button"
                onClick={() => handleMarketClick("appstore")}
              >
                <a target="_blank" rel="noreferrer" href={APPSTORE_LINK}>
                  <Image
                    width={120}
                    height={40}
                    src={
                      (theme as any).name === "light" ? appstore : appstoreDark
                    }
                    alt="appstore"
                  />
                </a>
              </button>
              <button
                type="button"
                onClick={() => handleMarketClick("googleplay")}
              >
                <a target="_blank" rel="noreferrer" href={GPLAY_LINK}>
                  <Image
                    width={140}
                    height={40}
                    src={(theme as any).name === "light" ? gplay : gplayDark}
                    alt="gplay"
                  />
                </a>
              </button>
            </div>
          </ButtonsWrapper>
        </Content>
        <ImageWrapper>
          <div />
          <Image width={640} height={850} src={devices} alt="devices" />
        </ImageWrapper>
      </Wrapper>
    </div>
  );
}

export { DownloadAppSection };
