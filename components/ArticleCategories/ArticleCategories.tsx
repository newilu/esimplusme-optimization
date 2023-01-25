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
      <div>{t("article_categories")}</div>
      <CategoriesGridWrapper>
        {categories.map(({ name, articleCount }, i) => (
          <CategoriesGridItem key={i}>
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
