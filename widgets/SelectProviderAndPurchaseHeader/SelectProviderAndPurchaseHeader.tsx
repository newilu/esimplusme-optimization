import React from "react";
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
import {
  CancelPaymentTypeSelection,
  PaymentMethodCard,
  PaymentMethodsWrapper,
} from "./styled";

function SelectProviderAndPurchaseHeader() {
  const { query, back, push } = useRouter();
  const { paymentAmount, phoneNumber, country, state, code, type, calls, sms } = query;
  const { t } = useTranslation("virtual-phone-number");

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
        code: code as string || '', 
        type: type as string || '', 
        calls: calls as string || '', 
        sms: sms as string || '',
        state: state as string || ''
      }, 
    });

    return `${process.env.NEXT_PUBLIC_BASE_URL
      }/virtual-phone-number/payment/success?${redirectURLSearchParams.toString()}`;
  }

  const handlePurchaseWithCrypto = async () => {
    const { data: tempUserDataRaw } = await api.secondPhone.createTempUser();
    const systemAuthToken = tempUserDataRaw?.data.systemAuthToken;

    if (systemAuthToken) {
      setCookie("session", systemAuthToken, 30);
    }

    const paymentId = v4()

    console.log(getRedirectURL(paymentId));
    
    const { data, error } = await api.secondPhone.thedexTopUp({
      price: paymentAmount as string,
      successUrl: getRedirectURL(paymentId),
      failureUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/virtual-phone-number/`,
    });
    if (error) {
      toast.error(getErrorMessage(error));
    } else if (data?.data.payUrl) {
      push(data?.data.payUrl);
    }
  };

  const handlePurchaseWithCard = async () => {
    if (
      typeof paymentAmount !== "string" ||
      typeof phoneNumber !== "string" ||
      typeof country !== "string"
    )
      return;

    const { data: tempUserDataRaw } = await api.secondPhone.createTempUser();
    const systemAuthToken = tempUserDataRaw?.data.systemAuthToken;

    if (systemAuthToken) {
      setCookie("session", systemAuthToken, 30);
    }

    const paymentId = v4();
    const customerId = v4();
    const redirectURL = getRedirectURL(paymentId)

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
    });
  };

  return (
    <BaseHeader style={{ padding: "50px 0" }}>
      <h1>{t("choose_payment_method")}</h1>
      <PaymentMethodsWrapper>
        <PaymentMethodCard onClick={handlePurchaseWithCard}>
          <Image width={64} height={64} src={card} alt="" />
          {t("pay_with_card")}
        </PaymentMethodCard>{" "}
        <PaymentMethodCard onClick={handlePurchaseWithCrypto}>
          <Image width={64} height={64} src={usdt} alt="" />
          {t("pay_with_crypto")}
        </PaymentMethodCard>
      </PaymentMethodsWrapper>
      <CancelPaymentTypeSelection onClick={back}>
        {t("go_back_one_step")}
      </CancelPaymentTypeSelection>
    </BaseHeader>
  );
}

export { SelectProviderAndPurchaseHeader };
