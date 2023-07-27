import React from "react";
import { useTranslation } from "next-i18next";
import Button from "@/shared/ui/Button";
import { useRouter } from "next/router";
import Image from "next/image";
import api from "@/api";
import checkmark from "./assets/checkmark.svg";
import { Wrapper } from "./styled";

function SuccessfulPurchaseHeader() {
  const { t } = useTranslation("virtual-phone-number");
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

  const { phone_number: phone, country } = router.query;

  React.useEffect(() => {
    if (typeof phone === "string" && typeof country === "string") {
      setIsLoading(true);
      let attempt = 0;
      const interval = setInterval(async () => {
        if (attempt >= 2) {
          clearInterval(interval);
          setIsLoading(false);
          return;
        }
        attempt += 1;
        await api.secondPhone.buyNumber({ phone, country_code: country });
      }, 1000);
    }
  }, [country, phone]);

  return (
    <Wrapper>
      <Image width={150} height={120} src={checkmark} alt="" />
      <h1>{t("success")}</h1>
      <p>{t("you_have_successfully_purchased_number")}</p>
      <Button
        disabled={isLoading}
        fullWidth
        onClick={() => router.push("https://sms.esimplus.me/register")}
        label={t("create_account")}
      />
    </Wrapper>
  );
}

export { SuccessfulPurchaseHeader };
