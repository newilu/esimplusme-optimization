import { Article, Category } from "@/utils/types";
import { MAX_ELEMENTS_PER_VIEW } from "@/utils/constants";
import { queryFetcher } from "./index";

const ENDPOINTS = {
  listCategories: () => "/categories",
  listArticlesByCategory: (
    id: string | number,
    limit?: number,
    offset?: number
  ) => `/articles/category/${id}?limit=${limit}&offset=${offset}`,
  listArticlesByCategoryName: (name: string, limit?: number, offset?: number) =>
    `/articles/category?name=${name}&limit=${limit}&offset=${offset}`,
  getCategoryById: (id: string | number) => `/category/${id}`,
};

function listArticlesByCategory(
  id: string | number,
  limit = MAX_ELEMENTS_PER_VIEW,
  offset = 0
) {
  return queryFetcher<Article[]>(
    ENDPOINTS.listArticlesByCategory(id, limit, offset)
  );
}

function listArticlesByCategoryName(
  name: string,
  limit = MAX_ELEMENTS_PER_VIEW,
  offset = 0
) {
  return queryFetcher<Article[]>(
    ENDPOINTS.listArticlesByCategoryName(name, limit, offset)
  );
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
