import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Image from "next/image";
import xmark from "@/shared/assets/images/xmark.svg";
import { useModalControls } from "shared/hooks";
import ThemeSwitcher from "features/ThemeSwitcher";
import Logo from "entities/Logo";
import Button from "shared/ui/Button";
import LanguageMenu from "features/LanguageMenu";
import CountryFlag from "@/shared/ui/CountryFlag";
import { Country, Region, RegionById } from "@/utils/types";
import burgerMenu from "./assets/burger-menu.png";
import ArrowRight from "./assets/ArrowRight";
import { sendSafeGtagEvent } from "@/utils/common";
import {
  Wrapper,
  Container,
  LinksWrapper,
  Link,
  ButtonsWrapper,
  BurgerMenu,
  NavMenu,
  SelectedRegionTitle,
  SelectedRegion,
  NavMenuItem,
  Chat,
} from "./styled";

enum Regions {
  Local = "local_esim",
  Regional = "regional_esim",
  Global = "global_esim",
}
const redirectUrls = {
  dev: {
    mobiledata: "https://dev-mobiledata.esimplus.me/",
    sms: "https://dev-sms.esimplus.me/",
  },
  prod: {
    mobiledata: "https://mobiledata.esimplus.me/",
    sms: "https://sms.esimplus.me/",
  },
};

function Navbar({
  color,
  regions,
  worldwideRegion,
  countries,
}: {
  color?: string;
  countries?: Country[];
  regions?: Region[];
  worldwideRegion?: RegionById;
}) {
  const router = useRouter();
  const { t } = useTranslation();
  const [navSelectedRegion, setNavSelectedRegion] = useState<Regions | null>(
    null
  );
  const [redirectUrl, setRedirectUrl] = useState("");

  const {
    isOpen: isMobileDataDropdownOpen,
    closeModal: closeMobileDataDropdown,
    openModal: openMobileDataDropdown,
  } = useModalControls();

  const {
    isOpen: isNavMenuOpen,
    closeModal: closeNavMenu,
    openModal: openNavMenu,
  } = useModalControls(false, { disableBodyScroll: true });

  const handleSignInClick = () => {
    switch (true) {
      case router.pathname.includes("virtual-phone-number"):
        sendSafeGtagEvent("signin_virtualnumber_click");
        break;
      default:
        sendSafeGtagEvent("signin_mobiledata_click");
        break;
    }
  };

  useEffect(() => {
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

  const handleNavMenuItemCLick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    closeNavMenu();
    e.stopPropagation();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const environment =
        window.location.origin.includes("dev") ||
        window.location.origin.includes("localhost")
          ? "dev"
          : "prod";
      const product = router.pathname.includes("virtual-phone-number")
        ? "sms"
        : "mobiledata";
      setRedirectUrl(redirectUrls[environment][product]);
    }
  }, []);

  return (
    <>
      <div style={{ marginBottom: 65 }} />
      <Wrapper id="navbar">
        <Container>
          <Logo color="inherit" />
          <div>
            <LinksWrapper>
              <Link exact href="/">
                {t("mobile_data")}
              </Link>
              <Link href="/virtual-phone-number">
                <div>{t("virtual_numbers")}</div>
              </Link>
            </LinksWrapper>
          </div>
          <div>
            <ThemeSwitcher />
          </div>
          {(router.pathname === "/" ||
            router.pathname === "/404" ||
            router.asPath.includes("/esim") ||
            router.asPath.endsWith("/virtual-phone-number") ||
            router.asPath.endsWith("/esim-supported-devices")) && (
            <div>
              <LanguageMenu />
            </div>
          )}
          <ButtonsWrapper>
            <Button
              style={{ height: 45 }}
              onClick={handleSignInClick}
              label={
                <a target="_blank" rel="noreferrer" href={redirectUrl}>
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
                <button type="button" onClick={closeNavMenu}>
                  <Image width={14} height={14} src={xmark} alt="x mark" />
                </button>
              </div>
              {navSelectedRegion ? (
                <SelectedRegion>
                  <SelectedRegionTitle>
                    <button
                      type="button"
                      onClick={() => setNavSelectedRegion(null)}
                      aria-label="unset region"
                    >
                      <ArrowRight />
                    </button>
                    {t(navSelectedRegion as string)}
                  </SelectedRegionTitle>
                  <ul>
                    {navSelectedRegion === Regions.Local &&
                      countries &&
                      countries.map(({ isoName2, ...rest }) => (
                        <li key={isoName2}>
                          <Link
                            href={{
                              href: "/",
                              query: { region: isoName2.toLowerCase() },
                            }}
                            onClick={() => {
                              closeNavMenu();
                              setNavSelectedRegion(null);
                            }}
                          >
                            <Chat>
                              <div>
                                <CountryFlag
                                  width={22}
                                  height={22}
                                  src={rest.image}
                                  name={isoName2}
                                />
                              </div>
                              {isoName2}
                            </Chat>
                            <ArrowRight />
                          </Link>
                        </li>
                      ))}{" "}
                    {navSelectedRegion === Regions.Regional &&
                      regions &&
                      regions.map(({ name }) => (
                        <li key={name}>
                          <Link
                            href={{
                              href: "/",
                              query: { region: name.toLowerCase() },
                            }}
                            onClick={() => {
                              closeNavMenu();
                              setNavSelectedRegion(null);
                            }}
                          >
                            <Chat>
                              <div>
                                <CountryFlag
                                  width={22}
                                  height={22}
                                  name={name}
                                />
                              </div>
                              {name}
                            </Chat>
                            <ArrowRight />
                          </Link>
                        </li>
                      ))}{" "}
                    {navSelectedRegion === Regions.Global &&
                      worldwideRegion && (
                        <li>
                          <Link
                            href={{
                              href: "/",
                              query: {
                                region: worldwideRegion.name.toLowerCase(),
                              },
                            }}
                            onClick={() => {
                              closeNavMenu();
                              setNavSelectedRegion(null);
                            }}
                          >
                            <Chat>
                              <div>
                                <CountryFlag
                                  width={22}
                                  height={22}
                                  name={worldwideRegion.name}
                                />
                              </div>
                              {worldwideRegion.name}
                            </Chat>
                            <ArrowRight />
                          </Link>
                        </li>
                      )}
                  </ul>
                </SelectedRegion>
              ) : (
                <ul>
                  <NavMenuItem isDropdownOpen={isMobileDataDropdownOpen}>
                    <div>
                      <Link exact onClick={handleNavMenuItemCLick} href="/">
                        {t("mobile_data")}
                      </Link>
                      {countries && (
                        <ArrowRight
                          onClick={(e) => {
                            e.stopPropagation();

                            if (isMobileDataDropdownOpen) {
                              closeMobileDataDropdown();
                            } else {
                              openMobileDataDropdown();
                            }
                          }}
                        />
                      )}
                    </div>
                    <ul>
                      {Object.values(Regions).map((el) => (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                        <li key={el} onClick={() => setNavSelectedRegion(el)}>
                          {t(el)} <ArrowRight />
                        </li>
                      ))}
                    </ul>
                  </NavMenuItem>
                  <NavMenuItem>
                    <Link
                      href="/virtual-phone-number"
                      onClick={handleNavMenuItemCLick}
                    >
                      <>{t("virtual_numbers")}</>
                    </Link>
                  </NavMenuItem>{" "}
                </ul>
              )}
              <Button
                style={{ height: 45 }}
                label={
                  <Link target="_blank" rel="noreferrer" href={redirectUrl}>
                    {t("sign_in")}
                  </Link>
                }
              />
            </NavMenu>
          </BurgerMenu>
        </Container>
      </Wrapper>
    </>
  );
}

export { Navbar };
