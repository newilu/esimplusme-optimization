import React from "react";
import xmark from "shared/assets/xmark.svg";
import { getCookie, setCookie } from "shared/lib";
import { Wrapper } from "./styled";
import Link from "next/link";
import Image from "next/image";

function GDPR({ onSubmit = () => {} }: { onSubmit?: () => void }) {
  const [isOpen, setIsOpen] = React.useState(!getCookie("CookieConsent"));

  React.useEffect(() => {
    const hcIframe = Array.from(
      document.getElementsByClassName("helpcrunch-iframe-wrapper")
    )[0] as Element | undefined;

    if (hcIframe && typeof window !== "undefined") {
      isOpen
        ? hcIframe.classList.add("hidden")
        : hcIframe.classList.remove("hidden");
    }
  }, [isOpen]);

  return isOpen ? (
    <Wrapper>
      <div />
      <div>
        <div>
          By using this site you agree to our{" "}
          <Link href="/privacy">
            <b>Cookie Policy.</b>
          </Link>
        </div>
        <button
          onClick={() => {
            setIsOpen(false);
            onSubmit();
            setCookie("CookieConsent", "1", 30);
          }}
        >
          <Image width={14} height={14} src={xmark} alt="" />
        </button>
      </div>
    </Wrapper>
  ) : (
    <></>
  );
}

export { GDPR };
