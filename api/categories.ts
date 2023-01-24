import { queryFetcher } from "./index";
import { Article, Category } from "@/utils/types";

const ENDPOINTS = {
  listCategories: () => "/categories",
  listArticlesByCategory: (id: string | number) => `/articles/category/${id}`,
};

function listArticlesByCategory(id?: string | number) {
  if (!id) return;
  return queryFetcher<Article[]>(ENDPOINTS.listArticlesByCategory(id));
}

function listCategories() {
  return queryFetcher<Category[]>(ENDPOINTS.listCategories());
}

export { ENDPOINTS, listCategories, listArticlesByCategory };
