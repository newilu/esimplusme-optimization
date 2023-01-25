import { queryFetcher } from "./index";
import { Article, Author } from "@/utils/types";

const ENDPOINTS = {
  listAuthors: () => "/authors",
  getAuthorById: (id: string | number) => `/author/${id}`,
};

function listAuthors() {
  return queryFetcher<Author[]>(ENDPOINTS.listAuthors());
}

function getAuthorById(id?: string | number) {
  if (!id) return;
  return queryFetcher<Author>(ENDPOINTS.getAuthorById(id));
}

export { ENDPOINTS, listAuthors, getAuthorById };
