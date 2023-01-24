import { queryFetcher } from "./index";
import { Article } from "@/utils/types";

const ENDPOINTS = {
  listArticles: () => "/articles",
};

function listArticles() {
  return queryFetcher<Article[]>(ENDPOINTS.listArticles());
}

export { ENDPOINTS, listArticles };
