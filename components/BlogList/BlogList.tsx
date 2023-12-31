import React from "react";
import { useTranslation } from "next-i18next";
import { SectionTitle } from "@/shared/ui/styled";
import { Article } from "utils/types";
import PaginatedGridView from "components/PaginatedGridView";
import BlogPreviewCard from "../BlogPreviewCard";
import { Wrapper } from "./styled";

function BlogList({
  articles,
  totalPages,
}: {
  articles: Article[];
  totalPages: number;
}) {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <SectionTitle>{t("blog_page_title")}</SectionTitle>
      <PaginatedGridView
        totalPages={totalPages}
        items={articles.map(({ preview, id }) => (
          <BlogPreviewCard key={id} {...preview} />
        ))}
      />
    </Wrapper>
  );
}

export { BlogList };
