import { getErrorMessage } from 'utils/common';
import { MappedDataType } from '@/utils/types';
import { BLOG_API_URL } from '@/utils/constants';
import * as articles from './articles';
import * as categories from './categories';
import * as authors from './authors';
import * as profiles from './profiles';
import * as secondPhone from './secondPhone';

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
  const startDate = Date.now();

  // Log the outgoing request
  console.log(`\n [OUTGOING] [${new Date().toISOString()}] ${options?.method || 'GET'} ${endpoint}`);

  try {
    const response = await fetch(`${endpoint.startsWith('http') ? endpoint : BLOG_API_URL.concat(endpoint)}`, {
      ...options,
      headers: { ...options?.headers, ...getAuthAndBaseHeaders() },
    });

    const endDate = Date.now();
    const data = await response.json();

    // Log response time
    console.log(endpoint, `${endDate - startDate} ms \n`);

    if (response.status >= 400) {
      return {
        headers: response.headers,
        data: null,
        error: getErrorMessage(data),
      };
    }

    return { headers: response.headers, data, error: null };
  } catch (e: unknown) {
    console.error(`Error occurred while making request to ${endpoint}: \n`, e);
    return {
      headers: null,
      data: null,
      error: getErrorMessage(e),
    };
  }
}

const api = { articles, categories, authors, profiles, secondPhone };

export default api;
export { queryFetcher };
