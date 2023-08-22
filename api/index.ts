import { getErrorMessage } from "utils/common";
import { BLOG_API_URL } from "@/utils/constants";
import * as articles from "./articles";
import * as categories from "./categories";
import * as authors from "./authors";
import * as profiles from "./profiles";
import * as secondPhone from "./secondPhone";

type AuthTypes = {
  [key: string]: string;
};

function getAuthAndBaseHeaders(): AuthTypes {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

function queryFetcher<T = unknown>(endpoint = "", options?: RequestInit) {
  return fetch(
    `${endpoint.startsWith("http") ? endpoint : BLOG_API_URL.concat(endpoint)}`,
    {
      ...options,
      headers: { ...options?.headers, ...getAuthAndBaseHeaders() },
    }
  ).then(async (result) => {
    const data = await result.json();
    if (result.status >= 400) {
      return {
        headers: result.headers,
        data: null,
        error: getErrorMessage(data),
      } as {
        headers: Headers;
        data: T | null;
        error: string | null;
      };
    }
    return { headers: result.headers, data, error: null } as {
      headers: Headers;
      data: T | null;
      error: string | null;
    };
  });
}

const api = { articles, categories, authors, profiles, secondPhone };

export default api;
export { queryFetcher };
