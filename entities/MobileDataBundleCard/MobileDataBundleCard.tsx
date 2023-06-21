import React from "react";
import type { CSSObject } from "styled-components";
import { Trans, useTranslation } from "next-i18next";
import { Bundle } from "utils/types";
import { formatDataSize } from "@/shared/lib";
// import CoverageCountriesModal from "../CoverageCountriesModal";
import {
  BundleCapabilities,
  BundleCapability,
  BundleCountry,
  BundleImage,
  BundleTitle,
  Wrapper,
} from "./styled";

type MobileDataBundleCardProps = {
  img?: string;
  title: string;
  dataSize?: string | number;
  price: string | number;
  duration: string | number;
  worldwide?: 1 | 0;
  supportedCountries?: Bundle["countries"];
  style?: CSSObject;
  embeddedHeader?: React.ReactNode;
  embeddedFooter?: React.ReactNode;
};

function MobileDataBundleCard({
  img,
  title,
  dataSize,
  duration,
  supportedCountries,
  style,
  worldwide,
  embeddedHeader,
  embeddedFooter,
}: MobileDataBundleCardProps) {
  const { t } = useTranslation();

  return (
    <>
      <Wrapper style={style}>
        <BundleTitle>
          <div>
            <BundleImage src={img} />
            <BundleCountry>{title}</BundleCountry>
          </div>
          {embeddedHeader}
        </BundleTitle>
        <BundleCapabilities>
          {dataSize && (
            <BundleCapability>
              <div>{formatDataSize(dataSize)}</div>
              <div>{t("traffic")}</div>
            </BundleCapability>
          )}
          <BundleCapability>
            <div>
              {worldwide ? (
                t("unlimited")
              ) : (
                <Trans
                  i18nKey="duration_in_days"
                  values={{
                    days: duration,
                  }}
                />
              )}
            </div>
            <div>{t("duration")}</div>
          </BundleCapability>
          {Boolean(supportedCountries?.length) && (
            <BundleCapability>
              <div>{supportedCountries?.length}</div>
              <div>{t("countries")}</div>
            </BundleCapability>
          )}
        </BundleCapabilities>
        {embeddedFooter}
      </Wrapper>
    </>
  );
}

export { MobileDataBundleCard };
