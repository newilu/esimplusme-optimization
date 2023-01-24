import React from "react";
import { GetServerSideProps } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import EsimAppBanner from "@/components/EsimAppBanner";
import Blog from "@/components/Blog";
import api from "@/api";
import { Article } from "@/utils/types";

function BlogById({ article }: { article: Article }) {
  return (
    <>
      <Head>
        <title>{article.pageTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <meta property="og:title" content={article.pageTitle} />
        <meta property="og:description" content={article.metaDescription} />
        <meta name="twitter:title" content={article.pageTitle} />
        <meta name="twitter:description" content={article.metaDescription} />
      </Head>
      <Navbar />
      <main>
        <Blog {...article} />
        <EsimAppBanner />
        {/*<RelatedArticles article={article.} />*/}
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const articles = await api.articles.listArticles();
  const id = params?.id;
  const article = articles.find((el) => el.url === id || el.id === +id!);

  if (!id || !article) {
    return {
      redirect: {
        destination: "/",
        statusCode: 301,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
      article,
    },
  };
};

export default BlogById;
