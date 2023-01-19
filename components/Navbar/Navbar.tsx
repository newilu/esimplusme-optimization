import React from "react";
import { useTranslation } from "react-i18next";
import xmark from "public/staticfiles/xmark.svg";
import { useModalControls, useOutsideClick } from "../../utils/hooks";
import { NAV_LINKS } from "utils/constants";
import ThemeSwitcher from "../ThemeSwitcher";
import Logo from "../Logo";
import LanguageMenu from "../LanguageMenu";
import {
  Wrapper,
  Container,
  LinksWrapper,
  Link,
  BurgerMenu,
  NavMenu,
  NavMenuItem,
  HotMenuWrapper,
} from "./styled";

const Arrow = () => {
  return (
    <svg
      width="8"
      height="6"
      viewBox="0 0 8 6"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.12851 4.82401L0.491029 2.1525C0.036193 1.69766 0.0361938 0.960227 0.49103 0.505392C0.945866 0.0505557 1.6833 0.0505557 2.13814 0.505392L2.80516 1.17242L3.55227 1.92511C3.77982 2.15437 4.15036 2.15506 4.37876 1.92665L5.78997 0.515443C6.24481 0.0606075 6.98224 0.060608 7.43708 0.515444C7.89191 0.97028 7.89191 1.70771 7.43708 2.16255L4.7996 4.81396C4.34476 5.2688 3.58334 5.27885 3.12851 4.82401Z" />
    </svg>
  );
};

function Navbar() {
  const { t } = useTranslation();
  const userProfileDropdownRef = React.useRef<HTMLUListElement | null>(null);

  const {
    isOpen: isUserProfileDropdownOpen,
    openModal: openUserProfileDropdown,
    closeModal: closeUserProfileDropdown,
  } = useModalControls();
  const {
    isOpen: isNavMenuOpen,
    closeModal: closeNavMenu,
    openModal: openNavMenu,
  } = useModalControls(false, { disableBodyScroll: true });

  useOutsideClick(userProfileDropdownRef, closeUserProfileDropdown);

  React.useEffect(() => {
    const listener = () => {
      const navbar = document.querySelector("nav");

      if (navbar) {
        if (window.scrollY >= 1) {
          navbar.removeAttribute("style");
        } else {
          navbar.setAttribute("style", "background:transparent;");
        }
      }
    };

    listener();

    window.addEventListener("scroll", listener);

    return () => window.removeEventListener("scroll", listener);
  }, []);

  const handleNavMenuItemCLick = (e: React.MouseEvent<any, MouseEvent>) => {
    closeNavMenu();
    e.stopPropagation();
  };

  return (
    <>
      <div style={{ paddingTop: 65 }} />
      <Wrapper>
        <Container>
          <Logo />
          <div>
            <LinksWrapper>
              {NAV_LINKS.map(({ label, href }) => (
                <Link key={label} href={href}>
                  {t(label)}
                </Link>
              ))}
              <div onClick={() => {}}>{t("support")}</div>
            </LinksWrapper>
          </div>
          <HotMenuWrapper>
            <div>
              <ThemeSwitcher size={"medium"} />
            </div>
            <LanguageMenu />
          </HotMenuWrapper>
          <BurgerMenu>
            <svg
              onClick={openNavMenu}
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21.5 7.75H3.5C3.09 7.75 2.75 7.41 2.75 7C2.75 6.59 3.09 6.25 3.5 6.25H21.5C21.91 6.25 22.25 6.59 22.25 7C22.25 7.41 21.91 7.75 21.5 7.75Z" />
              <path d="M21.5 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H21.5C21.91 11.25 22.25 11.59 22.25 12C22.25 12.41 21.91 12.75 21.5 12.75Z" />
              <path d="M21.5 17.75H3.5C3.09 17.75 2.75 17.41 2.75 17C2.75 16.59 3.09 16.25 3.5 16.25H21.5C21.91 16.25 22.25 16.59 22.25 17C22.25 17.41 21.91 17.75 21.5 17.75Z" />
            </svg>
            <NavMenu isOpen={isNavMenuOpen}>
              <div>
                <Logo />
                <button onClick={closeNavMenu}>
                  <img width={14} height={14} src={xmark} alt="x mark" />
                </button>
              </div>
              <ul>
                <NavMenuItem>
                  <Link href="/" onClick={handleNavMenuItemCLick}>
                    <>{t("my_esim")}</>
                  </Link>{" "}
                </NavMenuItem>{" "}
                <NavMenuItem>
                  <Link href="/faq" onClick={handleNavMenuItemCLick}>
                    <>{t("faq")}</>
                  </Link>{" "}
                </NavMenuItem>{" "}
                <NavMenuItem
                  onClick={(e) => {
                    handleNavMenuItemCLick(e);
                  }}
                >
                  <>{t("support")}</>
                </NavMenuItem>{" "}
                <NavMenuItem>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://sms.esimplus.me"
                    onClick={handleNavMenuItemCLick}
                  >
                    <>{t("virtual_numbers")}</>
                  </a>
                </NavMenuItem>{" "}
              </ul>
            </NavMenu>
          </BurgerMenu>
        </Container>
      </Wrapper>
    </>
  );
}

export { Navbar };
