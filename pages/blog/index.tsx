import React from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import EsimAppBanner from "@/components/EsimAppBanner";
import api from "@/api";
import { Article, Category } from "@/utils/types";
import ArticleCategories from "@/components/ArticleCategories";
import { MAX_ELEMENTS_PER_VIEW } from "@/utils/constants";

function Blog({
  articles,
  categories,
  totalPages,
}: {
  articles: Article[];
  categories: Category[];
  totalPages: number;
}) {
  return (
    <>
      <Navbar />
      <main>
        <BlogList articles={articles} totalPages={totalPages} />
        <ArticleCategories categories={categories} />
        <EsimAppBanner />
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  const { page = 1 } = query;

  const [articles, categories] = await Promise.all([
    api.articles.listArticles(
      MAX_ELEMENTS_PER_VIEW,
      (+page - 1) * MAX_ELEMENTS_PER_VIEW
    ),
    api.categories.listCategories(),
  ]);

  const totalArticlesCount =
    Number(articles.headers.get("x-pagination-total-count")) || 0;
  const totalPages = Math.ceil(totalArticlesCount / MAX_ELEMENTS_PER_VIEW);
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
      articles: articles.data,
      categories: categories.data,
      totalPages,
    },
  };
};

export default Blog;
