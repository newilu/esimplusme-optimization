import { getErrorMessage } from "utils/common";
import { MappedDataType } from "@/utils/types";
import { BLOG_API_URL } from "@/utils/constants";
import { buildRedisKey } from "@/shared/lib";
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

async function queryFetcher<T = unknown>(
  endpoint = "",
  options?: RequestInit & { enableCaching?: boolean }
): Promise<MappedDataType<T>> {
  const { enableCaching, ...restOptions } = options ?? {};
  const startDate = Date.now();
  const cacheKey = buildRedisKey(endpoint);

  if (enableCaching) {
    const cached = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/cache`,
      {
        headers: { cacheKey, ...getAuthAndBaseHeaders() },
        credentials: "include",
      }
    ).then((res) => res.json());

    if (cached) {
      const endDate = Date.now();

      // log response time
      console.log(endpoint, `${endDate - startDate} ms`);
      return {
        headers: null,
        data: JSON.parse(cached),
        error: null,
      };
    }
  }

  return fetch(
    `${endpoint.startsWith("http") ? endpoint : BLOG_API_URL.concat(endpoint)}`,
    {
      ...restOptions,
      headers: { ...restOptions?.headers, ...getAuthAndBaseHeaders() },
    }
  )
    .then(async (result) => {
      const endDate = Date.now();

      // log response time
      console.log(endpoint, `${endDate - startDate} ms`);

      const data = await result.json();

      if (result.status >= 400) {
        return {
          headers: result.headers,
          data: null,
          error: getErrorMessage(data),
        };
      }
      if (enableCaching) {
        // cache data
        fetch("http://localhost:3000/api/cache", {
          headers: { cacheKey },
          method: "POST",
          body: JSON.stringify(data),
        });
      }

      return { headers: result.headers, data, error: null };
    })
    .catch((e: unknown) => ({
      headers: null,
      data: null,
      error: getErrorMessage(e),
    }));
}

const api = { articles, categories, authors, profiles, secondPhone };

export default api;
export { queryFetcher };
