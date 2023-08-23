import React, { useEffect } from "react";
import { v4 } from "uuid";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Image from "next/image";
import api from "@/api";
import Loader from "@/shared/ui/Loader";
import Button from "@/shared/ui/Button";
import {
  sendSafeEcommerceEvent,
  sendSafeFbqEvent,
  sendSafeGtagEvent,
  sendSafeYMEvent,
} from "@/utils/common";
import { recursiveCheckPaymentStatus } from "@/api/secondPhone";
import checkmark from "./assets/checkmark.svg";

import { Wrapper } from "./styled";

function SuccessfulPurchaseHeader() {
  const { t } = useTranslation("virtual-phone-number");
  const {
    push,
    query: {
      phone_number: phone,
      country,
      payment_amount: paymentAmount,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      payment_id,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      wsb_order_num,
      invoiceId,
      sms,
      calls,
      type,
      code,
      count,
    },
  } = useRouter();
  const paymentId = payment_id || wsb_order_num || invoiceId;
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (paymentId && paymentAmount) {
      const formatedPaymentAmount = Number.isNaN(Number(paymentAmount))
        ? paymentAmount
        : Number(paymentAmount) / 100;

      sendSafeFbqEvent("Purchase", {
        content_ids: paymentId,
        content_name: "phone number",
        currency: "USD",
        num_items: 1,
        value: formatedPaymentAmount,
      });

      sendSafeGtagEvent("purchase", {
        transaction_id: paymentId,
        value: formatedPaymentAmount,
        tax: 0,
        shipping: 0,
        currency: "USD",
        items: [
          {
            item_id: v4(),
            item_name: "phone number",
            currency: "USD",
            discount: 0,
            index: 0,
            price: formatedPaymentAmount,
            quantity: 1,
          },
        ],
      });

      sendSafeEcommerceEvent({
        ecommerce: {
          currencyCode: "USD",
          purchase: {
            actionField: { id: paymentId },
            products: [
              {
                id: paymentId,
                name: "phone number",
                price: formatedPaymentAmount,
              },
            ],
          },
        },
      });

      sendSafeYMEvent("number_purchase_success", {
        price: paymentAmount,
        currency: "USD",
        country_code: `+${code}`,
        country,
        type,
        sms,
        calls,
        source: "webapp",
      });
    }
  }, [calls, code, country, paymentAmount, paymentId, sms, type]);

  useEffect(() => {
    if (
      typeof phone === "string" &&
      typeof country === "string" &&
      typeof paymentId === "string"
    ) {
      setIsLoading(true);

      recursiveCheckPaymentStatus(paymentId, 3)
        .then(() => {
          const validCount = !Number.isNaN(Number(count)) ? Number(count) : 1;

          const promise = () =>
            validCount > 1
              ? api.secondPhone.buyMultipleNumbers({
                  referencePhoneNumber: phone,
                  countryCode: country,
                  requiredQuantity: validCount,
                })
              : api.secondPhone.buyNumber({ phone, country_code: country });

          promise().then(() => {
            window.fbq("track", "Purchase", {
              content_ids: [phone],
              eventref: "",
              currency: "USD",
              num_items: 1,
              value: Number(paymentAmount) / 100,
            });
          });
        })
        .catch(() => {
          console.log("error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [count, country, paymentAmount, paymentId, phone]);

  return (
    <Wrapper>
      {isLoading ? (
        <>
          <Loader />
          <h1>Your payment is being processed</h1>
          <p>Do not leave the screen</p>
        </>
      ) : (
        <>
          <Image width={150} height={120} src={checkmark} alt="" />
          <h1>{t("success")}</h1>
          <p>{t("you_have_successfully_purchased_number")}</p>
        </>
      )}
      <Button
        disabled={isLoading}
        fullWidth
        onClick={() => {
          const environmentPrefix =
            window.location.origin.includes("dev") ||
            window.location.origin.includes("localhost")
              ? "dev-"
              : "";
          push(`https://${environmentPrefix}sms.esimplus.me/register`);
        }}
        label={t("create_account")}
      />
    </Wrapper>
  );
}

export { SuccessfulPurchaseHeader };
