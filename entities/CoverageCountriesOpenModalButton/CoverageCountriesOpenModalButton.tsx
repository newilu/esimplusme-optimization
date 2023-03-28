import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import globe from "shared/assets/globe.svg";
import { Wrapper } from "./styled";

type CoverageCountriesOpenModalButtonProps = React.ButtonHTMLAttributes<any>;

function CoverageCountriesOpenModalButton(
  props: CoverageCountriesOpenModalButtonProps
) {
  const { t } = useTranslation();
  return (
    <Wrapper {...props}>
      <Image width={14} height={14} src={globe} alt="globe" />
      {t("countries")}
    </Wrapper>
  );
}

export {
  CoverageCountriesOpenModalButton,
  type CoverageCountriesOpenModalButtonProps,
};
