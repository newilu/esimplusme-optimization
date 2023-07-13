import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Paragraph, SectionTitle } from "@/shared/ui/styled";
import AppstoreDownloadAppButton from "@/entities/AppstoreDownloadAppButton";
import GplayDownloadAppButton from "@/entities/GplayDownloadAppButton";
import globe from "@/shared/assets/globe.svg";
import { AppBlockWrapper, AppButtonsWrapper, Wrapper } from "./styled";

function WhyDoYouNeedPhoneNumberInRegion({
  regionName,
}: {
  regionName: string;
}) {
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
          {t("why_do_you_need_number_in_region", { region: regionName })}
        </SectionTitle>
        <Paragraph>
          {t("why_do_you_need_number_in_region_text", {
            region: regionName,
          })}
        </Paragraph>
        <Paragraph>
          <Image width={20} height={20} src={globe} alt="" />
          {t("discover_all_the_advantages", { region: regionName })}
        </Paragraph>
      </div>
      <AppBlockWrapper>
        <div>{t("make_and_receive_calls")}</div>
        <AppButtonsWrapper>
          <AppstoreDownloadAppButton
            onClick={() => handleMarketClick("appstore")}
          />
          <GplayDownloadAppButton
            onClick={() => handleMarketClick("googleplay")}
          />
        </AppButtonsWrapper>
      </AppBlockWrapper>
    </Wrapper>
  );
}

export { WhyDoYouNeedPhoneNumberInRegion };
