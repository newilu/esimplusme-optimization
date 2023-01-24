import { Category } from "@/utils/types";
import Link from "next/link";
import React from "react";
import {
  CategoriesGridItem,
  CategoriesGridWrapper,
  CategoryArticlesCount,
  CategoryTitle,
  Wrapper,
} from "./styled";
import { useTranslation } from "next-i18next";

function ArticleCategories({ categories }: { categories: Category[] }) {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <div>{t("article_categories")}</div>
      <CategoriesGridWrapper>
        {categories.map(({ name }) => (
          <CategoriesGridItem>
            <Link href={`/categories/${name}`}>
              <CategoryTitle>{name}</CategoryTitle>
              <CategoryArticlesCount>1</CategoryArticlesCount>
            </Link>
          </CategoriesGridItem>
        ))}
      </CategoriesGridWrapper>
    </Wrapper>
  );
}

export { ArticleCategories };
