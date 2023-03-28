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

function LanguageMenu() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = React.useState(false);
  const [activeLanguageOption, setActiveLanguageOption] = React.useState(
    LANGUAGE_OPTIONS.find((el) => i18n.language.startsWith(el.value)) ??
      LANGUAGE_OPTIONS[0]
  );
  const containerRef = React.useRef<HTMLUListElement>(null);

  const handleOutsideClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if ((event as any).target?.id === "language") {
        return;
      }

      setIsLanguageMenuOpen(false);
    },
    []
  );

  useOutsideClick(containerRef, handleOutsideClick);

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    void router.replace({ pathname, query }, asPath, {
      locale: newLocale,
      shallow: true,
    });
  };

  return (
    <Wrapper>
      <div>
        <ActiveLanguage onClick={() => setIsLanguageMenuOpen(true)}>
          <Image
            width={32}
            height={32}
            src={activeLanguageOption.img}
            alt="active language option"
          />
        </ActiveLanguage>
        <LanguageMenuList ref={containerRef} show={isLanguageMenuOpen}>
          {LANGUAGE_OPTIONS.map((lang) => (
            <LanguageMenuItem
              key={lang.value}
              active={i18n.language.startsWith(lang.value)}
            >
              <button
                type="button"
                onClick={() => {
                  setActiveLanguageOption(lang);
                  void i18n.changeLanguage(lang.value);
                  onToggleLanguageClick(lang.value);
                }}
              >
                <div>
                  <Image src={lang.img} alt={lang.label} />
                </div>
                <div>
                  <div>{lang.label}</div>
                  <div>{lang.country}</div>
                </div>
              </button>
            </LanguageMenuItem>
          ))}
        </LanguageMenuList>
      </div>
    </Wrapper>
  );
}

export { LanguageMenu };
