import React, { useEffect } from "react";

import {
  loadFacebookScript,
  loadGtagScript,
  loadMixpanel,
  loadYMScript,
} from "@/utils/analyticScripts";
import { CountryCode, getCountryCallingCode } from "libphonenumber-js";
import { formatAreaCode, getCountryByIsoCode } from "@/shared/lib";
import { SecondPhoneCountry } from "@/utils/types";
import {
  DEFAULT_PHONE_NUMBER_PRICE,
  SECOND_PHONE_SUPPORTED_COUNTRIES,
} from "@/shared/constants";

function useOutsideClick(
  elementRef: React.RefObject<any>,
  onOutsideClick: (event: any) => void
) {
  React.useEffect(() => {
    function handleClickOutside(event: Event) {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        onOutsideClick(event);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elementRef, onOutsideClick]);
}

function useAnalyticScripts() {
  useEffect(() => {
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_RUNTIME_ENV !== 'development') {
      const loadAnalyticScripts = () => {
        loadYMScript();
        loadFacebookScript();
        loadGtagScript();
        loadMixpanel();
      };

      if(document.readyState === 'complete') {
        loadAnalyticScripts()
      } else {
        window.addEventListener('load', loadAnalyticScripts)

        return () => {
          window.removeEventListener('load', loadAnalyticScripts)
        }
      }
    }
  }, []);
}

function useModalControls(
  initState = false,
  options?: { disableBodyScroll?: boolean }
) {
  const [isOpen, setIsOpen] = React.useState(initState);

  const openModal = React.useCallback(() => setIsOpen(true), []);
  const closeModal = React.useCallback(() => setIsOpen(false), []);

  React.useEffect(() => {
    if (options?.disableBodyScroll) {
      const escapeKeyListener = (e: KeyboardEvent) =>
        e.code === "Escape" && closeModal();

      if (isOpen) {
        window.addEventListener("keydown", escapeKeyListener);
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      } else {
        window.removeEventListener("keydown", escapeKeyListener);
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    }
  }, [closeModal, isOpen, options?.disableBodyScroll]);

  return {
    isOpen,
    openModal,
    closeModal,
  };
}

function useSecondPhoneCountries(options?: {
  initCountryList?: SecondPhoneCountry[];
}) {
  const { initCountryList } = options ?? {};

  return React.useMemo(() => {
    if (initCountryList?.length) {
      return initCountryList
        .filter(({ code }) => SECOND_PHONE_SUPPORTED_COUNTRIES.includes(code))
        .sort(
          (a, b) =>
            SECOND_PHONE_SUPPORTED_COUNTRIES.indexOf(a.code) -
            SECOND_PHONE_SUPPORTED_COUNTRIES.indexOf(b.code)
        );
    }

    return SECOND_PHONE_SUPPORTED_COUNTRIES.map((code) => {
      const country = getCountryByIsoCode(code);
      if (!country) return null;

      return {
        code,
        country: country.name,
        prefix: formatAreaCode(getCountryCallingCode(code as CountryCode)),
        prices: {
          cheapest: {
            currency: "USD",
            price: DEFAULT_PHONE_NUMBER_PRICE,
          },
        },
      } as SecondPhoneCountry;
    }).filter(Boolean) as SecondPhoneCountry[];
  }, [initCountryList]);
}

export {
  useModalControls,
  useOutsideClick,
  useSecondPhoneCountries,
  useAnalyticScripts,
};
