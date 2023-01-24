import { getErrorMessage } from "utils/common";
import * as articles from "./articles";
import * as categories from "./categories";
import * as authors from "./authors";

type AuthTypes = {
  [key: string]: string;
};

const BASE_URL = "http://admin-blog.esimplus.me/api";

function getAuthAndBaseHeaders(): AuthTypes {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

function queryFetcher<T = unknown>(endpoint = "", options?: RequestInit) {
  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: { ...options?.headers, ...getAuthAndBaseHeaders() },
  })
    .then(async (result) => {
      const data = await result.json();
      if (result.status >= 400) {
        throw new Error(getErrorMessage(data));
      }
      return data as T;
    })
    .catch((e: unknown) => {
      throw e;
    });
}

const api = { articles, categories, authors };

export default api;
export { queryFetcher };
