import { Article } from '@/utils/types';
import { queryFetcher } from './index';

const ENDPOINTS = {
  listArticles: (limit?: string | number, offset?: string | number) => `/articles?limit=${limit}&offset=${offset}`,
  getArticleById: (id: string | number) => `/articles/${id}`,
  getArticleByCustomUrl: (url?: string) => `/article?url=${url}`,
  getArticlesByAuthorId: (id?: string | number, limit?: string | number, offset?: string | number) =>
    `/articles/author/${id}?limit=${limit}&offset=${offset}`,
  getArticlesByCategoryId: (id: string | number) => `/articles/category/${id}`,
};

function listArticles(limit?: string | number, offset?: string | number) {
  return queryFetcher<Article[]>(ENDPOINTS.listArticles(limit, offset));
}

function getArticleById(id?: string | number) {
  if (!id) return;
  return queryFetcher<Article>(ENDPOINTS.getArticleById(id));
}

function getArticlesByAuthorId(id?: string | number, limit?: string | number, offset?: string | number) {
  return queryFetcher<Article>(ENDPOINTS.getArticlesByAuthorId(id, limit, offset));
}

function getArticleByCustomUrl(url?: string) {
  return queryFetcher<Article>(ENDPOINTS.getArticleByCustomUrl(url));
}

export { ENDPOINTS, listArticles, getArticleById, getArticleByCustomUrl, getArticlesByAuthorId };
