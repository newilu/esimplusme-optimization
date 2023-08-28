import React from "react";
import { useTranslation } from "next-i18next";
import { useMixpanelPageContext } from "@/context/MixpanelPageContextProvider";
import { getCurrencySymbol } from "@/shared/lib";
import { Bundle } from "@/utils/types";
import { sendSafeMixpanelEvent } from "@/utils/common";
import { StyledButton } from "./styled";

type GetPlanButtonProps = {
  isBestPrice?: boolean;
  dataAmount: Bundle["dataAmount"];
  isoName2: Bundle["isoName2"];
  providerType: Bundle["providerType"];
  currency: Bundle["currency"];
  price: Bundle["price"];
};

function GetPlanButton({
  isBestPrice,
  providerType,
  isoName2,
  dataAmount,
  currency,
  price,
}: GetPlanButtonProps) {
  const { t } = useTranslation();
  const { source } = useMixpanelPageContext();

  return (
    <StyledButton
      onClick={() => {
        sendSafeMixpanelEvent("track", "get_plan_button_click", {
          providerType,
          isoName2,
          currency,
          dataAmount,
          price,
          source,
        });
      }}
      isBestPrice={isBestPrice}
      fullWidth
      variant="secondary"
      label={
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://mobiledata.esimplus.me?${new URLSearchParams({
            referrer: "esimplus.me",
            provider: providerType,
            countryISO: isoName2,
            dataSize: String(dataAmount),
          })}`}
        >{`${t("buy_a_plan_for")} ${getCurrencySymbol(currency)}${price}`}</a>
      }
    />
  );
}

export { GetPlanButton, type GetPlanButtonProps };
