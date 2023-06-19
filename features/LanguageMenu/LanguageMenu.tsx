import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useOutsideClick } from "@/shared/hooks";
import { LANGUAGE_OPTIONS } from "@/utils/constants";
import {
  ActiveLanguage,
  LanguageMenuItem,
  LanguageMenuList,
  Wrapper,
} from "./styled";
import { useTranslation } from "next-i18next";
import Link from "next/link";

function LanguageMenu() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = React.useState(false);
  const [activeLanguageOption, setActiveLanguageOption] = React.useState(
    LANGUAGE_OPTIONS.find((el) => i18n.language.startsWith(el.value)) ??
      LANGUAGE_OPTIONS[0]
  );
  const containerRef = React.useRef<HTMLUListElement>(null);

  const handleOutsideClick = React.useCallback(() => {
    setIsLanguageMenuOpen(false);
  }, []);

  useOutsideClick(containerRef, handleOutsideClick);

  const onToggleLanguageClick = async (newLocale: string) => {
    setIsLanguageMenuOpen(false);
    const { pathname, asPath, query } = router;
    await router.replace({ pathname, query }, asPath, {
      locale: newLocale,
      scroll: false,
    });

    await i18n.changeLanguage(newLocale);
  };

  const redirectedPathName = (newLoc: string) => {
    const segments = router.pathname.split("/");
    i18n.language === "en" ? (segments[0] = newLoc) : (segments[1] = newLoc);

    return segments
      .join("/")
      .concat(new URLSearchParams(router.query as {}).toString());
  };

  return (
    <Wrapper>
      <div>
        <ActiveLanguage onClick={() => setIsLanguageMenuOpen(true)}>
          <div>
            <Image
              width={32}
              height={32}
              src={activeLanguageOption.img}
              alt="active language option"
            />
          </div>
          <div>{activeLanguageOption.label}</div>
        </ActiveLanguage>
        <LanguageMenuList ref={containerRef} show={isLanguageMenuOpen}>
          {LANGUAGE_OPTIONS.map((lang) => (
            <LanguageMenuItem
              key={lang.value}
              active={i18n.language.startsWith(lang.value)}
            >
              <Link
                locale={lang.value}
                href={redirectedPathName(lang.value)}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLanguageOption(lang);
                  onToggleLanguageClick(lang.value);
                }}
              >
                <div>
                  <Image
                    width={30}
                    height={30}
                    src={lang.img}
                    alt={lang.label}
                  />
                </div>
                <div>
                  <div>{lang.label}</div>
                  <div>{lang.country}</div>
                </div>
              </Link>
            </LanguageMenuItem>
          ))}
        </LanguageMenuList>
      </div>
    </Wrapper>
  );
}

export { LanguageMenu };
