import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Navbar from "@/widgets/Navbar";
import Footer from "@/components/Footer";
import EsimAppBanner from "features/DownloadAppSection";
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
        <link
          rel="canonical"
          href={`https://esimplus.me/blog/${article.url ?? article.id}`}
        />
        <meta
          property="article:published_time"
          content={article.createdAt.date}
        />
        <meta
          property="article:modified_time"
          content={article.updatedAt.date}
        />
        <meta name="robots" content="index,follow" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://esimplus.me/blog/${article.url ?? article.id}`}
        />
        <meta property="og:image" content={article.preview.image.src ?? ""} />
        <meta
          property="og:image:width"
          content={String(article.preview.image.width)}
        />
        <meta
          property="og:image:height"
          content={String(article.preview.image.height)}
        />
        <meta name="twitter:image" content={article.preview.image.src ?? ""} />
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
  query,
}) => {
  const id = params?.id as string;
  let article: Article | null | undefined;

  if (locale !== "en") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const queryParams = new URLSearchParams({
      ...Object.fromEntries(
        Object.entries(query).filter(([label]) => !params?.[label])
      ),
    } as any);

    return {
      redirect: {
        destination: `/blog/${id}?${queryParams.toString()}`,
        statusCode: 301,
      },
    };
  }

  const articleByURL = await api.articles
    .getArticleByCustomUrl(id)
    .catch(() => undefined);
  article = articleByURL?.data;

  if (!articleByURL?.data) {
    article = await api.articles.getArticleById(id)?.then(({ data }) => data);
  }

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
      ...(await serverSideTranslations("en", ["common"])),
      article,
    },
  };
};

export default BlogById;
