import { differenceInDays, getHours } from "date-fns";

function formatDataSize(dataSize: string | number) {
  return +dataSize >= 1000 ? `${+dataSize / 1000} GB` : `${dataSize} MB`;
}

function scrollToId(id: string, offsetY = 0) {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offsetY,
      behavior: "smooth",
    });
  }
}

function getCurrencySymbol(currency: string) {
  return (0)
    .toLocaleString("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, "")
    .trim();
}

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

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomReviewsCount(setReviesCount: (props: string) => void) {
  const randomReviewsIncrease = randomIntFromInterval(1200, 1450);
  const diffBetweenTodayAndStartDate =
    differenceInDays(new Date(), new Date(2022, 8, 15)) - 1;

  const getAndFormatReviewsCount = (todaysIncrease: number) => {
    return Math.round(
      diffBetweenTodayAndStartDate * randomReviewsIncrease +
        todaysIncrease +
        350000
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const interval = setInterval(() => {
    const todaysIncrease = getHours(new Date()) * (randomReviewsIncrease / 24);
    setReviesCount(getAndFormatReviewsCount(todaysIncrease));
  }, 360 * 1000);

  setReviesCount(
    getAndFormatReviewsCount(
      getHours(new Date()) * (randomReviewsIncrease / 24)
    )
  );

  return interval;
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

function eraseCookie(name: string) {
  document.cookie = `${name}=; domain=.esimplus.me; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
  formatDataSize,
  scrollToId,
  getCurrencySymbol,
  getErrorMessage,
  generateRandomReviewsCount,
  getCookie,
  setCookie,
  eraseCookie,
};
