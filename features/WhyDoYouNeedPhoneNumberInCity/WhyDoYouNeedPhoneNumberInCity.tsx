import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Paragraph, SectionTitle } from "@/shared/ui/styled";
import AppstoreDownloadAppButton from "@/entities/AppstoreDownloadAppButton";
import GplayDownloadAppButton from "@/entities/GplayDownloadAppButton";
import clock from "./assets/clock.svg";
import note from "./assets/note.svg";
import { AppBlockWrapper, AppButtonsWrapper, Wrapper } from "./styled";

function WhyDoYouNeedPhoneNumberInCity({ cityName }: { cityName: string }) {
  const router = useRouter();
  const { t } = useTranslation("virtual-phone-number");

  const handleMarketClick = (market: string) => {
    if (typeof window !== "undefined") window.fbq("track", "Lead");
    switch (true) {
      case router.asPath.includes("virtual-phone-number"):
        if (typeof window !== "undefined")
          window.gtag("event", `virtualnumber_${market}_click`);
        break;

      default:
        if (typeof window !== "undefined")
          window.gtag("event", `mobiledata_${market}_click`);
        break;
    }
  };

  return (
    <Wrapper>
      <div>
        <SectionTitle>
          {t("why_do_you_need_number_in_city", { city: cityName })}
        </SectionTitle>
        <Paragraph>
          {t("why_do_you_need_number_in_city_text_1", {
            city: cityName,
          })}
        </Paragraph>
        <Paragraph as="div">
          <ul>
            <li>
              <Image width={20} height={20} src={note} alt="" />
              {t("why_do_you_need_number_in_city_text_2", { city: cityName })}
            </li>
            <li>
              <Image width={20} height={20} src={clock} alt="" />
              {t("why_do_you_need_number_in_city_text_3", { city: cityName })}
            </li>
          </ul>
        </Paragraph>
      </div>
      <AppBlockWrapper>
        <div>{t("download_an_app", { city: cityName })}</div>
        <AppButtonsWrapper>
          <AppstoreDownloadAppButton
            onClick={() => handleMarketClick("appstore")}
          />
          <GplayDownloadAppButton
            onClick={() => handleMarketClick("googleplay")}
          />
        </AppButtonsWrapper>
        <div>{t("level_up_business", { city: cityName })}</div>
      </AppBlockWrapper>
    </Wrapper>
  );
}

export { WhyDoYouNeedPhoneNumberInCity };
