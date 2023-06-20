import { Category } from "@/utils/types";
import Link from "next/link";
import React from "react";
import { useTranslation } from "next-i18next";
import {
  CategoriesGridItem,
  CategoriesGridWrapper,
  CategoryArticlesCount,
  CategoryTitle,
  Wrapper,
} from "./styled";

function ArticleCategories({ categories }: { categories: Category[] }) {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <h2>{t("article_categories")}</h2>
      <CategoriesGridWrapper>
        {categories.map(({ name, articleCount, id }) => (
          <CategoriesGridItem key={id}>
            <Link href={`/categories/${name}`}>
              <CategoryTitle>{name}</CategoryTitle>
              <CategoryArticlesCount>
                {articleCount} {t("articles")}
              </CategoryArticlesCount>
            </Link>
          </CategoriesGridItem>
        ))}
      </CategoriesGridWrapper>
    </Wrapper>
  );
}

export { ArticleCategories };
