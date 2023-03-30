import React from "react";
import { eraseCookie, getCookie, setCookie } from "shared/lib";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const GDPR = dynamic(() => import("entities/GDPR"), { ssr: false });

type CookieConsentContextProps = {
  isCookieConsentEnabled: boolean;
};

const CookieConsentContext = React.createContext<CookieConsentContextProps>({
  isCookieConsentEnabled: false,
});

function CookieConsentProvider<T extends { children: React.ReactNode }>(
  props: T
) {
  const { query, push } = useRouter();
  const [isCookieConsentEnabled, setIcCookieConsentEnabled] = React.useState(
    !!Number(getCookie("CookieConsent"))
  );

  React.useEffect(
    function setSalesDoublerCookie() {
      const { aff_id: aid, aff_sub: clid, ...restQuery } = query;

      if (aid && clid) {
        setCookie("sd-user", clid as string, 30);
        push({ query: restQuery }, undefined, { shallow: true, scroll: false });
      }
    },
    [push, query]
  );

  React.useEffect(
    function forgetSalesDoublerCookie() {
      const { anotherAdSource, ...restQuery } = query;

      if (anotherAdSource) {
        eraseCookie("sd-user");
        push({ query: restQuery }, undefined, { shallow: true, scroll: false });
      }
    },
    [push, query]
  );

  return (
    <CookieConsentContext.Provider
      value={{ isCookieConsentEnabled }}
      {...props}
    >
      <GDPR onSubmit={() => setIcCookieConsentEnabled(true)} />
      {props.children}
    </CookieConsentContext.Provider>
  );
}

function useCookieConsent() {
  return React.useContext(CookieConsentContext);
}

export { CookieConsentProvider, useCookieConsent, CookieConsentContext };
