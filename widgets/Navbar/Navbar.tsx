import React from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useWindowSize } from "context/WindowSizeContext";
import xmark from "shared/assets/xmark.svg";
import burgerMenu from "./assets/burger-menu.png";
import { useModalControls, useOutsideClick } from "shared/hooks";
import ThemeSwitcher from "features/ThemeSwitcher";
import Logo from "entities/Logo";
import Button from "shared/ui/Button";
import LanguageMenu from "features/LanguageMenu";
import {
  Wrapper,
  Container,
  LinksWrapper,
  NavLink,
  ButtonsWrapper,
  BurgerMenu,
  NavMenu,
} from "./styled";

function Navbar({ color }: { color?: string }) {
  const router = useRouter();
  const { isTablet } = useWindowSize();
  const { t } = useTranslation();
  const [isNumbersDropdownVisible, setIsNumbersDropdownVisible] =
    React.useState(false);
  const virtualNumbersDropdownRef = React.useRef<HTMLUListElement | null>(null);

  const {
    isOpen: isNavMenuOpen,
    closeModal: closeNavMenu,
    openModal: openNavMenu,
  } = useModalControls(false, { disableBodyScroll: true });

  useOutsideClick(virtualNumbersDropdownRef, (e: any) => {
    e.target.id !== "dropdown" && setIsNumbersDropdownVisible(false);
  });

  const handleSignInClick = () => {
    switch (true) {
      case router.pathname.includes("virtual-numbers"):
        // window.gtag('event', 'signin_virtualnumber_click');
        break;
      default:
        // window.gtag('event', 'signin_mobiledata_click');
        break;
    }
  };

  React.useEffect(() => {
    const listener = () => {
      const navbar = document.getElementById("navbar");

      if (navbar) {
        if (window.scrollY >= 1) {
          navbar.removeAttribute("style");
        } else {
          navbar.setAttribute(
            "style",
            "background:transparent;backdrop-filter:none;".concat(
              color ? `color:${color} !important` : ""
            )
          );
        }
      }
    };

    listener();

    window.addEventListener("scroll", listener);

    return () => window.removeEventListener("scroll", listener);
  }, [color]);

  React.useEffect(() => {
    if (isTablet) {
      setIsNumbersDropdownVisible(false);
    }
  }, [isTablet]);

  return (
    <Wrapper id="navbar">
      <Container>
        <Logo color="inherit" />
        <div>
          <LinksWrapper>
            <NavLink href="/">{t("mobile_data")}</NavLink>
            <NavLink $isOpen={isNumbersDropdownVisible} href="/virtual-numbers">
              <>
                <div>{t("virtual_numbers")}</div>
              </>
            </NavLink>
          </LinksWrapper>
        </div>
        <div>
          <ThemeSwitcher />
        </div>
        <div>
          <LanguageMenu />
        </div>
        <ButtonsWrapper>
          <Button
            style={{ height: 45 }}
            onClick={handleSignInClick}
            label={
              <a
                target="_blank"
                rel="noreferrer"
                href={
                  router.pathname.includes("virtual-numbers")
                    ? "https://sms.esimplus.me/"
                    : "https://mobiledata.esimplus.me/"
                }
              >
                {t("sign_in")}
              </a>
            }
          />
        </ButtonsWrapper>
        <BurgerMenu>
          <Image
            onClick={openNavMenu}
            width={24}
            height={24}
            src={burgerMenu}
            alt="burger menu"
          />
          <NavMenu isOpen={isNavMenuOpen}>
            <div>
              <Logo />
              <button onClick={closeNavMenu}>
                <Image width={14} height={14} src={xmark} alt="x mark" />
              </button>
            </div>
            <Button
              style={{ height: 45 }}
              label={
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={
                    router.pathname.includes("virtual-numbers")
                      ? "https://sms.esimplus.me/"
                      : "https://mobiledata.esimplus.me/"
                  }
                >
                  {t("sign_in")}
                </Link>
              }
            />
          </NavMenu>
        </BurgerMenu>
      </Container>
    </Wrapper>
  );
}

export { Navbar };
