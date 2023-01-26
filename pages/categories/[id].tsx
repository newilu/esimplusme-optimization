import React from "react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "@/api";
import { Article } from "@/utils/types";
import { SectionTitle, Text } from "@/utils/styled";
import Navbar from "@/components/Navbar";
import EsimAppBanner from "@/components/EsimAppBanner";
import Footer from "@/components/Footer";
import PaginatedGridView from "@/components/PaginatedGridView";
import BlogPreviewCard from "@/components/BlogPreviewCard";
import { MAX_ELEMENTS_PER_VIEW } from "@/utils/constants";

function Category({
  articles,
  categoryName,
  totalPages,
}: {
  articles: Article[];
  categoryName: string;
  totalPages: number;
}) {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <main>
        <Text>{t("category")}</Text>
        <SectionTitle>{categoryName}</SectionTitle>
        <PaginatedGridView
          totalPages={totalPages}
          items={articles.map((el, id) => (
            <BlogPreviewCard key={id} {...el} />
          ))}
        />
        <EsimAppBanner />
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
  query,
}) => {
  const { page = 1 } = query;

  const categoryId = params?.id as string;

  let articles = await api.categories.listArticlesByCategoryName(
    categoryId,
    MAX_ELEMENTS_PER_VIEW,
    (+page - 1) * MAX_ELEMENTS_PER_VIEW
  );
  console.log(articles.headers);

  if (!articles.data) {
    articles = await api.categories.listArticlesByCategory(
      categoryId,
      MAX_ELEMENTS_PER_VIEW,
      (+page - 1) * MAX_ELEMENTS_PER_VIEW
    );
  }

  if (!articles.data) {
    return {
      redirect: {
        destination: "/",
        statusCode: 301,
      },
    };
  }

  const categoryName = Number(categoryId)
    ? await api.categories
        .getCategoryById(categoryId)
        ?.then(({ data }) => data?.name)
    : categoryId;

  const totalArticlesCount =
    Number(articles.headers.get("x-pagination-total-count")) || 0;
  const totalPages = Math.ceil(totalArticlesCount / MAX_ELEMENTS_PER_VIEW);

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
      articles: articles.data,
      categoryName,
      totalPages,
    },
  };
};

export default Category;
