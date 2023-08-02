import React, { useEffect } from "react";
import { v4 } from "uuid";
import { useTranslation } from "next-i18next";
import Button from "@/shared/ui/Button";
import { useRouter } from "next/router";
import Image from "next/image";
import api from "@/api";
import checkmark from "./assets/checkmark.svg";
import { Wrapper } from "./styled";

function SuccessfulPurchaseHeader() {
  const { t } = useTranslation("virtual-phone-number");
  const {
    push,
    query: { phone_number: phone, country, payment_amount: paymentAmount, payment_id: paymentId }
  } = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (paymentId && paymentAmount) {
      const formatedPaymentAmount = isNaN(Number(paymentAmount)) || paymentAmount

      window.fbq('track', 'Purchase', {
        content_ids: paymentId,
        content_name: 'phone number',
        currency: 'USD',
        num_items: 1,
        value: formatedPaymentAmount,
      });

      window.gtag('event', 'purchase', {
        transaction_id: paymentId,
        value: formatedPaymentAmount,
        tax: 0,
        shipping: 0,
        currency: 'USD',
        items: [
          {
            item_id: v4(),
            item_name: 'phone number',
            currency: 'USD',
            discount: 0,
            index: 0,
            price: formatedPaymentAmount,
            quantity: 1,
          },
        ],
      });
    }
  }, [paymentAmount, paymentId])

  useEffect(() => {
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
        onClick={() => push("https://sms.esimplus.me/register")}
        label={t("create_account")}
      />
    </Wrapper>
  );
}

export { SuccessfulPurchaseHeader };
