import React from "react";
import { SectionTitle, Text } from "@/utils/styled";
import { Wrapper } from "./styled";
import PaginatedGridView from "@/components/PaginatedGridView";
import BlogPreviewCard from "../BlogPreviewCard";
import { Article } from "@/utils/types";
import { useTranslation } from "next-i18next";

function BlogList({ articles }: { articles: Article[] }) {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <SectionTitle>{t("blog_page_title")}</SectionTitle>
      <Text>{t("blog_page_descr")}</Text>
      <PaginatedGridView
        items={articles.map((el, id) => (
          <BlogPreviewCard key={id} {...el} />
        ))}
      />
    </Wrapper>
  );
}

export { BlogList };
