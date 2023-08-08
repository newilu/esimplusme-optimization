import type { ICountry, IState } from "country-cities";
import type { PhoneToBuy } from "./types";

function getErrorMessage(error: any): string {
  let message = "";

  if (!error) {
    return message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (error?.details) {
    return error?.details;
  }
  if (error?.errors?.length) {
    Object.values(
      error?.errors as { [s: string]: unknown } | ArrayLike<unknown>
    ).forEach((err: any) => {
      message += ` ${err?.message}\n`;
    });
  } else if (error?.message) {
    if (error.message.includes("Firebase")) {
      message = error.message
        .split("/")[1]
        .replaceAll(/[(\-)]/g, " ") as string;
    } else {
      message = error.message as string;
    }
  } else if (error?.errorMessage) {
    message = error.errorMessage as string;
  } else if (typeof error === "object") {
    Object.values(
      error as { [s: string]: unknown } | ArrayLike<unknown>
    ).forEach((err) => {
      message += ` ${err}\n`;
    });
  }

  if (message.startsWith("Unexpected JSON")) {
    return "Server error.";
  }
  return message;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof window === "undefined") return;
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ""}${expires};  Path=/;`;
}

function getCookie(name: string) {
  if (typeof window === "undefined") return;

  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    while (c.startsWith(" ")) c = c.substring(1, c.length);
    if (c.startsWith(nameEQ)) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

const scrollToId = (id: string, offsetY = 0) => {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offsetY,
      behavior: "smooth",
    });
  }
};

function uuid() {
  // Public Domain/MIT
  let d = new Date().getTime(); //Timestamp
  let d2 =
    (typeof performance !== "undefined" && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      // eslint-disable-next-line no-bitwise
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      // eslint-disable-next-line no-bitwise
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    // eslint-disable-next-line no-bitwise
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function sendSafeYMEvent(name: string, paramets?: object) {
  return sendSafeEvent('ym', () => window.ym(79496440, "reachGoal", name, paramets))
}

function sendSafeEcommerceEvent(paramets?: object) {
  return sendSafeEvent('dataLayer', () => window.dataLayer.push(paramets))
}

function sendSafeGtagEvent(name: string, paramets?: object) {
  return sendSafeEvent('gtag', () => window.gtag("event", name, paramets))
}

function sendSafeFbqEvent(name: string, paramets?: object) {
  return sendSafeEvent('fbq', () => window.fbq("track", name, paramets))
}

function sendSafeEvent(type: 'ym' | 'gtag' | 'fbq' | 'dataLayer', callback: () => void) {
  const timerId = setInterval(() => {
    if (typeof window !== 'undefined' && typeof window[type] !== 'undefined') {
      callback()
      clearInterval(timerId)
    } else {
      console.log(type + " мetric not initialized");
    }
  }, 500)

  return timerId
}

const geteratePurchaseRedirectUrl = (
  { phone, country, duration, count, state }: 
  { phone: PhoneToBuy, country: ICountry, state?: IState | null, count: number, duration: number }
) => {
  const params = new URLSearchParams({
    paymentAmount: String((phone.price + 1) * 100 * duration * count),
    phoneNumber: phone.phoneNumber,
    country: country.isoCode,
    code: country.phonecode,
    type: phone.numberType,
    state: state?.isoCode ?? "",
    calls: String(phone.capabilities.voice),
    sms: String(phone.capabilities.SMS),
    count: String(count),
    duration: String(duration)
  });

  return `/virtual-phone-number/payment/provider-select?${params.toString()}`
}

const loadPromeseInterval = async (
  { getPromise, maxAttempts, errorMessage, intervalMS = 1000 }: 
  { getPromise: () => () => Promise<any>, maxAttempts: number, errorMessage: String, intervalMS?: number }
) => {
  const _load = (resolve: (value: unknown) => void, reject: (error: unknown) => void, attempts = 1) => {
    if (attempts === maxAttempts) {
      return reject(new Error(`Ad failed to load after ${attempts} tries`));
    }

    const promise = getPromise();

    return promise()
      .then(resolve)
      .catch((error) => {
        if (error.message === errorMessage) {
          setTimeout(() => _load(resolve, reject, attempts + 1), intervalMS);
        } else {
          reject(error);
        }
      });
  };

  return new Promise(_load);
};

export { sendSafeFbqEvent, sendSafeYMEvent, sendSafeGtagEvent, setCookie, getCookie, scrollToId, getErrorMessage, uuid, sendSafeEcommerceEvent, geteratePurchaseRedirectUrl, loadPromeseInterval };
