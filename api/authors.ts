import { Author } from '@/utils/types';
import { queryFetcher } from './index';

const ENDPOINTS = {
  listAuthors: (limit: number, offset: number) => `/authors?limit=${limit}&offset=${offset}`,
  getAuthorById: (id?: string | number) => `/author/${id}`,
};

function listAuthors(limit: number, offset: number) {
  return queryFetcher<Author[]>(ENDPOINTS.listAuthors(limit, offset));
}

function getAuthorById(id?: string | number) {
  return queryFetcher<Author>(ENDPOINTS.getAuthorById(id));
}

export { ENDPOINTS, listAuthors, getAuthorById };
