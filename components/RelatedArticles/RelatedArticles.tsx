import React from "react";
import { useTranslation } from "next-i18next";
import { Article } from "utils/types";
import BlogPreviewCard from "../BlogPreviewCard";
import { GridWrapper, Title, Wrapper } from "./styled";

function RelatedArticles({
  articles,
}: {
  articles: Article["relatedArticles"];
}) {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Title>{t("related_articles")}</Title>
      <GridWrapper>
        {articles.map((el, i) => (
          <BlogPreviewCard key={i} {...el} />
        ))}
      </GridWrapper>
    </Wrapper>
  );
}

export { RelatedArticles };
