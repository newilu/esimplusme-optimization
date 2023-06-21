import React from "react";
import { useTranslation } from "next-i18next";
import Button from "@/shared/ui/Button";
import { useRouter } from "next/router";
import Image from "next/image";
import checkmark from "./assets/checkmark.svg";
import { Wrapper } from "./styled";

function SuccessfulPurchaseHeader() {
  const { t } = useTranslation("virtual-phone-number");
  const router = useRouter();

  return (
    <Wrapper>
      <Image width={150} height={120} src={checkmark} alt="" />
      <h1>{t("success")}</h1>
      <p>{t("you_have_successfully_purchased_number")}</p>
      <Button
        fullWidth
        onClick={() => router.push("https://sms.esimplus.me")}
        label={t("create_account")}
      />
    </Wrapper>
  );
}

export { SuccessfulPurchaseHeader };
