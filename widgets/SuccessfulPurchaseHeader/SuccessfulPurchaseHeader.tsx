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
  sendSafeMixpanelEvent,
  sendSafeYMEvent,
} from "@/utils/common";
import { recursiveCheckPaymentStatus } from "@/api/secondPhone";
import checkmark from "./assets/checkmark.svg";

import { Wrapper } from "./styled";

function SuccessfulPurchaseHeader() {
  const { t } = useTranslation("virtual-phone-number");
  const {
    pathname,
    push,
    replace,
    query: {
      phone_number: phone,
      country,
      payment_amount: paymentAmount,
      payment_id: paymentIdQuery,
      wsb_order_num: wsbOrderNum,
      invoiceId,
      sms,
      calls,
      type,
      code,
      count,
    },
  } = useRouter();
  const paymentId = paymentIdQuery || wsbOrderNum || invoiceId;
  const [isLoading, setIsLoading] = React.useState(true);

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
          const formatedPaymentAmount = Number.isNaN(Number(paymentAmount))
                ? paymentAmount
                : Number(paymentAmount) / 100;   

          const promise = () =>
            validCount > 1
              ? api.secondPhone.buyMultipleNumbers({
                  referencePhoneNumber: phone,
                  countryCode: country,
                  requiredQuantity: validCount,
                })
              : api.secondPhone.buyNumber({ phone, country_code: country });

          sendSafeMixpanelEvent("track", "temp_user_balance_topup", {
            paymentId,
            currency: "USD",
            value: formatedPaymentAmount,
          });

          return promise().then(() => {
            if (paymentId && formatedPaymentAmount) {
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
                price: formatedPaymentAmount,
                currency: "USD",
                country_code: `+${code}`,
                country,
                type,
                sms,
                calls,
                source: "webapp",
              });

              sendSafeMixpanelEvent("track", "temp_user_number_purchase", {
                currency: "USD",
                price: Number(paymentAmount) / 100,
                phone,
                country,
              });
            }
            
            replace(pathname, undefined, { shallow: true })
          })
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

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
            process.env.NEXT_PUBLIC_RUNTIME_ENV === 'development'
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
