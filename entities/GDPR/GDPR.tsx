import React from "react";
import { useWindowSize } from "context/WindowSizeContext";
import { getCookie, setCookie } from "@/shared/lib";
import Button from "shared/ui/Button";
import CookieIcon from "./assets/CookieIcon";
import { ButtonsWrapper, Wrapper } from "./styled";
import Link from "next/link";

function GDPR({ onSubmit = () => {} }: { onSubmit?: () => void }) {
  const { width } = useWindowSize();
  const [isOpen, setIsOpen] = React.useState(!getCookie("CookieConsent"));

  return isOpen ? (
    <Wrapper>
      <div />
      <div>
        <div>
          <div>
            <h2>Cookie Policy</h2>
            <p>
              We use cookies to provide the necessary site functionality and
              improve your experience on our website. By clicking "Accept", you
              agree to the use of cookies as outlined in our Privacy and Data{" "}
              <Link href="/privacy">Protection Policy.</Link>
            </p>
          </div>
          <CookieIcon />
        </div>
        <ButtonsWrapper>
          <Button
            onClick={() => {
              setIsOpen(false);
              onSubmit();
              setCookie("CookieConsent", "1", 30);
            }}
            label={width < 500 ? "Accept" : "Accept all cookies"}
          />
        </ButtonsWrapper>
      </div>
    </Wrapper>
  ) : (
    <></>
  );
}

export { GDPR };
