const themes = {
  light: {
    name: "light",
    primary: "#0076FF",
    primaryText: "#101010",
    secondaryText: "#6F6F6F",
    borderColor: "#f1f1f1",
    bg: "#ffffff",
    htmlBg: "#ffffff",
    benefitsBg: "#F7F7F7",
    cardsBg: "#ffffff",
    navbarBg: "#ffffff",
    appBannerBg: "rgba(233, 236, 242, 0.5)",
    tocBorderColor: "rgba(128, 141, 158, 0.1)",
    cardCategoryStripBg: "rgba(128, 141, 158, 0.15)",
    cardBaseBg: "rgba(128, 141, 158, 0.05)",
    downloadAppBg: "rgba(233, 236, 242, 0.5)",
    notificationsBg:
      "linear-gradient(180deg, rgba(0, 0, 0, 0.05) 43.57%, rgba(0, 0, 0, 0) 100%)",
  },
  dark: {
    name: "dark",
    primary: "#0076FF",
    primaryText: "#FFFFFF",
    secondaryText: "rgba(255,255,255,0.65)",
    borderColor: "rgba(255,255,255,0.1)",
    bg: "radial-gradient(84.44% 84.68% at -3.96% -9.68%, #040D30 0%, #000006 100%)",
    htmlBg: "#000006",
    benefitsBg: "rgba(247, 247, 247, 0.1)",
    cardsBg: "#17171F",
    navbarBg: "rgba(15,16,28,0.85)",
    appBannerBg: "rgba(233, 236, 242, 0.15)",
    tocBorderColor: "rgba(128, 141, 158, 0.1)",
    cardCategoryStripBg: "rgba(255, 255, 255, 0.15)",
    cardBaseBg: "rgba(255, 255, 255, 0.05)",
    downloadAppBg: "rgba(233, 236, 242, 0.15)",
    notificationsBg:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 43.57%, rgba(255, 255, 255, 0) 100%)",
  },
};

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
export { setCookie, getCookie, scrollToId, getErrorMessage, themes };
