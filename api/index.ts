import { getErrorMessage } from 'utils/common';
import { MappedDataType } from '@/utils/types';
import { BLOG_API_URL } from '@/utils/constants';
import * as articles from './articles';
import * as categories from './categories';
import * as authors from './authors';
import * as profiles from './profiles';
import * as secondPhone from './secondPhone';

export type DefaultOptionsType = {
  fetcher?: <T>(...args: any[]) => Promise<MappedDataType<T>>;
};

type AuthTypes = {
  [key: string]: string;
};

function getAuthAndBaseHeaders(): AuthTypes {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

async function queryFetcher<T = unknown>(endpoint = '', options?: RequestInit): Promise<MappedDataType<T>> {
  const { ...restOptions } = options ?? {};
  const startDate = Date.now();

  return fetch(`${endpoint.startsWith('http') ? endpoint : BLOG_API_URL.concat(endpoint)}`, {
    ...restOptions,
    headers: { ...restOptions?.headers, ...getAuthAndBaseHeaders() },
  })
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
