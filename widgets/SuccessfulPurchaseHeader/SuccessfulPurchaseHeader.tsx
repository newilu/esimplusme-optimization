import React from "react";
import Button from "@/shared/ui/Button";
import { useRouter } from "next/router";
import Image from "next/image";
import checkmark from "./assets/checkmark.svg";
import { Wrapper } from "./styled";

function SuccessfulPurchaseHeader() {
  const router = useRouter();

  return (
    <Wrapper>
      <Image width={150} height={120} src={checkmark} alt="" />
      <h1>Success</h1>
      <p>
        You have successfully purchased a number. Continue with your ESIM Plus
        account to start using your virtual phone number!
      </p>
      <Button
        fullWidth
        onClick={() => router.push("https://sms.esimplus.me")}
        label="create account"
      />
    </Wrapper>
  );
}

export { SuccessfulPurchaseHeader };
