import { queryFetcher } from "./index";
import { Article } from "@/utils/types";

const ENDPOINTS = {
  listArticles: () => "/articles",
  getArticleById: (id: string | number) => `/articles/${id}`,
  getArticleByCustomUrl: (url: string) => `/article?url=${url}`,
  getArticlesByAuthorId: (id: string | number) => `/articles/author/${id}`,
  getArticlesByCategoryId: (id: string | number) => `/articles/category/${id}`,
};

function listArticles() {
  return queryFetcher<Article[]>(ENDPOINTS.listArticles());
}

function getArticleById(id?: string | number) {
  if (!id) return;
  return queryFetcher<Article>(ENDPOINTS.getArticleById(id));
}

function getArticlesByAuthorId(id?: string | number) {
  if (!id) return;
  return queryFetcher<Article>(ENDPOINTS.getArticlesByAuthorId(id));
}

function getArticleByCustomUrl(url?: string) {
  if (!url) return;
  return queryFetcher<Article>(ENDPOINTS.getArticleByCustomUrl(url));
}

export {
  ENDPOINTS,
  listArticles,
  getArticleById,
  getArticleByCustomUrl,
  getArticlesByAuthorId,
};
