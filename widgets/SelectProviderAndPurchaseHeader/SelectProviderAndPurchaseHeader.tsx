import React, { useState } from "react";
import { v4 } from "uuid";
import toast from "react-hot-toast";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Image from "next/image";
import api from "@/api";
import { getErrorMessage, setCookie } from "@/shared/lib";
import BaseHeader from "@/shared/ui/BaseHeader";
import card from "./assets/card.svg";
import usdt from "./assets/usdt.svg";
import bycard from "./assets/bycard-min.png";
import rucard from "./assets/rucard-min.png";
import mir from "./assets/mir-min.png";
import visa from "./assets/visa-min.png";
import mastercard from "./assets/mastercard-min.png";
import {
  CancelPaymentTypeSelection,
  PaymentMethodCard,
  PaymentMethodsWrapper,
  PaymentMethodSupportedCards,
  PaymentMethodCardInfo,
} from "./styled";

function SelectProviderAndPurchaseHeader() {
  const { query, back, push } = useRouter();
  const { paymentAmount, phoneNumber, country, state, code, type, calls, sms, duration, count } =
    query;
  const { t } = useTranslation("virtual-phone-number");
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [disabledPurchase, setDisabledPurchase] = useState(false)

  const getRedirectURL = (paymentId: string) => {
    if (
      typeof paymentAmount !== "string" ||
      typeof phoneNumber !== "string" ||
      typeof country !== "string"
    ) {
      return "";
    }

    const redirectURLSearchParams = new URLSearchParams({
      payment_amount: paymentAmount,
      phone_number: phoneNumber,
      payment_id: paymentId,
      country,
      ...{
        code: (code as string) || "",
        type: (type as string) || "",
        calls: (calls as string) || "",
        sms: (sms as string) || "",
        state: (state as string) || "",
        duration: (duration as string) || "",
        count: (count as string) || "",
      },
    });

    return `${process.env.NEXT_PUBLIC_BASE_URL
      }/virtual-phone-number/payment/success?${redirectURLSearchParams.toString()}`;
  };

  const handlePurchaseWithCrypto = async () => {
    setDisabledPurchase(true)

    try {
      const { data: tempUserDataRaw } = await api.secondPhone.createTempUser();
      const systemAuthToken = tempUserDataRaw?.data.systemAuthToken;

      if (systemAuthToken) {
        setCookie("session", systemAuthToken, 30);
      }

      const paymentId = v4();

      const { data, error } = await api.secondPhone.thedexTopUp({
        price: paymentAmount as string,
        successUrl: getRedirectURL(paymentId),
        failureUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/virtual-phone-number/`,
      });
      if (error) {
        toast.error(getErrorMessage(error));
        setDisabledPurchase(false)
      } else if (data?.data.payUrl) {
        push(data?.data.payUrl);
      }
    } finally {
      setDisabledPurchase(false)
    }
  };

  const handlePurchaseWithCard = async () => {
    if (
      typeof paymentAmount !== "string" ||
      typeof phoneNumber !== "string" ||
      typeof country !== "string"
    )
      return;

    setDisabledPurchase(true)

    try {
      const { data: tempUserDataRaw } = await api.secondPhone.createTempUser();
      const systemAuthToken = tempUserDataRaw?.data.systemAuthToken;

      if (systemAuthToken) {
        setCookie("session", systemAuthToken, 30);
      }

      const paymentId = v4();
      const customerId = v4();
      const redirectURL = getRedirectURL(paymentId);

      const { data } = await api.secondPhone.getSignature({
        price: paymentAmount,
        stringToSign: `customer_id:${customerId};payment_amount:${paymentAmount};payment_currency:USD;payment_id:${paymentId};project_id:${process.env.NEXT_PUBLIC_ECOMMPAY_PROJECT_ID};redirect_success_mode:parent_page;redirect_success_url:${redirectURL}`,
      });

      window.EPayWidget.run({
        customer_id: customerId,
        payment_amount: paymentAmount,
        payment_currency: "USD",
        payment_id: paymentId,
        project_id: process.env.NEXT_PUBLIC_ECOMMPAY_PROJECT_ID,
        redirect_success_mode: "parent_page",
        redirect_success_url: redirectURL,
        signature: (data as any)?.data.data,
        onExit: () => { setDisabledPurchase(false) }
      });
    } finally {
      setDisabledPurchase(false)
    }
  };

  const handlePurchaseWithWebpay = async () => {
    if (
      typeof paymentAmount !== "string" ||
      typeof phoneNumber !== "string" ||
      typeof country !== "string"
    )
      return;

    setDisabledPurchase(true)

    const { data: tempUserDataRaw } = await api.secondPhone.createTempUser();
    const systemAuthToken = tempUserDataRaw?.data.systemAuthToken;

    if (systemAuthToken) {
      setCookie("session", systemAuthToken, 30);
    }

    const redirectURLSearchParams = new URLSearchParams({
      payment_amount: paymentAmount,
      phone_number: phoneNumber,
      country,
      ...{
        code: (code as string) || "",
        type: (type as string) || "",
        calls: (calls as string) || "",
        sms: (sms as string) || "",
        state: (state as string) || "",
      },
    });

    const { data, error } = await api.secondPhone.topupWithWebpay({
      amount: +paymentAmount,
      successUrl: `${process.env.NEXT_PUBLIC_BASE_URL
        }/virtual-phone-number/payment/success?${redirectURLSearchParams.toString()}`,
      failureUrl: process.env.NEXT_PUBLIC_BASE_URL,
    });

    if (data?.data.payUrl) {
      push(data.data.payUrl);
    } else {
      toast.error(getErrorMessage(error));
      setDisabledPurchase(false)
    }
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setCountryCode(document.documentElement.getAttribute("data-country"));
    }
  }, []);

  return (
    <BaseHeader style={{ padding: "50px 0" }}>
      <h1>{t("choose_payment_method")}</h1>
      <PaymentMethodsWrapper>
        {(countryCode === "RU" || countryCode === "BY") && (
          <PaymentMethodCard $disabled={disabledPurchase} onClick={handlePurchaseWithWebpay}>
            <Image
              width={52}
              height={48}
              src={countryCode === "RU" ? rucard : bycard}
              alt=""
            />
            <PaymentMethodCardInfo>
              Pay with card
              <PaymentMethodSupportedCards>
                {countryCode === "RU" ? (
                  <div>
                    <Image width={20} height={20} src={mir} alt="" />
                    МИР
                  </div>
                ) : (
                  <>
                    <div>
                      <Image width={20} height={20} src={visa} alt="" />
                      Visa
                    </div>{" "}
                    <div>
                      <Image width={20} height={20} src={mastercard} alt="" />
                      Mastercard
                    </div>
                  </>
                )}
              </PaymentMethodSupportedCards>
            </PaymentMethodCardInfo>
          </PaymentMethodCard>
        )}
        <PaymentMethodCard $disabled={disabledPurchase} onClick={handlePurchaseWithCard}>
          <Image width={48} height={48} src={card} alt="" />
          <PaymentMethodCardInfo>
            Pay with card
            <PaymentMethodSupportedCards>
              <div>
                <Image width={20} height={20} src={visa} alt="" />
                Visa
              </div>{" "}
              <div>
                <Image width={20} height={20} src={mastercard} alt="" />
                Mastercard
              </div>
            </PaymentMethodSupportedCards>
          </PaymentMethodCardInfo>
        </PaymentMethodCard>
        <PaymentMethodCard $disabled={disabledPurchase} onClick={handlePurchaseWithCrypto}>
          <Image width={48} height={48} src={usdt} alt="" />
          Pay with crypto
        </PaymentMethodCard>
      </PaymentMethodsWrapper>
      <CancelPaymentTypeSelection onClick={back}>
        {t("go_back_one_step")}
      </CancelPaymentTypeSelection>
    </BaseHeader>
  );
}

export { SelectProviderAndPurchaseHeader };
