import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import xmark from "public/staticfiles/xmark.svg";
import { useModalControls } from "../../utils/hooks";
import { NAV_LINKS } from "utils/constants";
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

function Navbar() {
  const { t } = useTranslation();

  const {
    isOpen: isNavMenuOpen,
    closeModal: closeNavMenu,
    openModal: openNavMenu,
  } = useModalControls(false, { disableBodyScroll: true });

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
            </LinksWrapper>
          </div>
          <HotMenuWrapper>
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
                  <Image width={14} height={14} src={xmark} alt="x mark" />
                </button>
              </div>
              <ul>
                {NAV_LINKS.map(({ href, label }) => (
                  <NavMenuItem key={label}>
                    <Link href={href} onClick={handleNavMenuItemCLick}>
                      <>{t(label)}</>
                    </Link>{" "}
                  </NavMenuItem>
                ))}
              </ul>
            </NavMenu>
          </BurgerMenu>
        </Container>
      </Wrapper>
    </>
  );
}

export { Navbar };
