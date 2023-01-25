import { queryFetcher } from "./index";
import { Article, Category } from "@/utils/types";

const ENDPOINTS = {
  listCategories: () => "/categories",
  listArticlesByCategory: (id: string | number) => `/articles/category/${id}`,
  listArticlesByCategoryName: (name: string) =>
    `/articles/category?name=${name}`,
  getCategoryById: (id: string | number) => `/category/${id}`,
};

function listArticlesByCategory(id?: string | number) {
  if (!id) return;
  return queryFetcher<Article[]>(ENDPOINTS.listArticlesByCategory(id));
}

function listArticlesByCategoryName(name?: string) {
  if (!name) return;
  return queryFetcher<Article[]>(ENDPOINTS.listArticlesByCategoryName(name));
}

function listCategories() {
  return queryFetcher<Category[]>(ENDPOINTS.listCategories());
}
function getCategoryById(id?: string | number) {
  if (!id) return;
  return queryFetcher<Category>(ENDPOINTS.getCategoryById(id));
}

export {
  ENDPOINTS,
  listCategories,
  listArticlesByCategory,
  listArticlesByCategoryName,
  getCategoryById,
};
