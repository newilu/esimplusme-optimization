import { queryFetcher } from "./index";
import { Article, Author } from "@/utils/types";

const ENDPOINTS = {
  listAuthors: () => "/authors",
  listArticlesByAuthor: (id: string | number) => `/articles/author/${id}`,
};

function listAuthors() {
  return queryFetcher<Author[]>(ENDPOINTS.listAuthors());
}

function listArticlesByAuthor(id?: string | number) {
  if (!id) return;
  return queryFetcher<Article[]>(ENDPOINTS.listArticlesByAuthor(id));
}

export { ENDPOINTS, listAuthors, listArticlesByAuthor };
