import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EsimAppBanner from "@/components/EsimAppBanner";
import api from "@/api";
import { Article } from "@/utils/types";
import RelatedArticles from "@/components/RelatedArticles";

const Blog = dynamic(() => import("components/Blog"), { ssr: false });

function BlogById({ article }: { article: Article }) {
  return (
    <>
      <Head>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <meta property="og:title" content={article.metaTitle} />
        <meta property="og:description" content={article.metaDescription} />
        <meta name="twitter:title" content={article.metaTitle} />
        <meta name="twitter:description" content={article.metaDescription} />
      </Head>
      <Navbar />
      <main>
        <Blog {...article} />
        <EsimAppBanner />
        {!!article.relatedArticles.length && (
          <RelatedArticles articles={article.relatedArticles} />
        )}
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const id = params?.id as string;
  let article: Article | undefined;

  const articleByURL = await api.articles
    .getArticleByCustomUrl(id)
    ?.catch(() => undefined);
  article = articleByURL;

  if (!articleByURL) article = await api.articles.getArticleById(id);

  if (!article) {
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
