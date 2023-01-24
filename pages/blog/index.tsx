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

function Blog({
  articles,
  categories,
}: {
  articles: Article[];
  categories: Category[];
}) {
  return (
    <>
      <Navbar />
      <main>
        <BlogList articles={articles} />
        <ArticleCategories categories={categories} />
        <EsimAppBanner />
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const [articles, categories] = await Promise.all([
    api.articles.listArticles(),
    api.categories.listCategories(),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
      articles,
      categories,
    },
  };
};

export default Blog;
