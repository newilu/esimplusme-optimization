/**
 * If you want to enable locale keys typechecking and enhance IDE experience.
 *
 * Requires `resolveJsonModule:true` in your tsconfig.json.
 *
 * @link https://www.i18next.com/overview/typescript
 */
import "react-i18next";

import type common from "../public/locales/en/common.json";
import type meta from "../public/locales/en/meta.json";
import type randomNumber from "../public/locales/en/random-number.json";
import type virtualPhoneNumber from "../public/locales/en/virtual-phone-number.json";

interface I18nNamespaces {
  common: typeof common;
  meta: typeof meta;
  randomNumber: typeof randomNumber;
  virtualPhoneNumber: typeof virtualPhoneNumber;
}

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: I18nNamespaces;
  }
}

declare global {
  interface Window {
    EPayWidget: { run: (config: any) => void };
    HelpCrunch: (method: string) => void;
    gtag: (event: string, action: string, params?: any) => void;
    fbq: (event: string, name: string, options?: any) => void;
    ym: (...args: any) => void;
    dataLayer: { push: (...args: any) => void }
  }
}
