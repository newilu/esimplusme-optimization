import React from "react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "@/api";
import { Article, Author as AuthorType } from "@/utils/types";
import Navbar from "@/widgets/Navbar";
import PaginatedGridView from "@/components/PaginatedGridView";
import BlogPreviewCard from "@/components/BlogPreviewCard";
import EsimAppBanner from "features/DownloadAppSection";
import Footer from "@/components/Footer";
import AuthorComponent from "@/components/AuthorComponent";
import { MAX_ELEMENTS_PER_VIEW } from "@/utils/constants";
import Head from "next/head";

function Author({
  articles,
  author,
  totalPages,
}: {
  articles: Article[];
  author: AuthorType;
  totalPages: number;
}) {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>eSIM Plus: {author.name} Blogs</title>
        <meta
          name="description"
          content={`Look for a useful blog from ${author.name}`}
        />
        <link rel="canonical" href="https://esimplus.me/categories" />
        <meta property="og:title" content={`eSIM Plus: ${author.name} Blogs`} />
        <meta
          property="og:description"
          content={`Look for a useful blog from ${author.name}`}
        />
        <meta
          property="twitter:title"
          content={`eSIM Plus: ${author.name} Blogs`}
        />
        <meta
          property="twitter:description"
          content={`Look for a useful blog from ${author.name}`}
        />
        <meta
          property="article:published_time"
          content="2022-02-28T21:15:42+00:00"
        />
        <meta
          property="article:modified_time"
          content="2022-02-28T21:15:42+00:00"
        />
        <meta name="robots" content="index,follow" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://esimplus.me/categories" />
        <meta
          property="og:image"
          content="https://static.esimplus.net/storage/logos/logo.png"
        />
        <meta property="og:image:width" content="112" />
        <meta property="og:image:height" content="93" />
        <meta
          name="twitter:image"
          content="https://static.esimplus.net/storage/logos/logo.png"
        />
      </Head>

      <Navbar />
      <main>
        <AuthorComponent
          name={author.name}
          image={author.image}
          subtitle={t("public_author")}
        />
        <PaginatedGridView
          totalPages={totalPages}
          items={articles.map(({ preview }, id) => (
            <BlogPreviewCard key={id} {...preview} />
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
  const { page = 1, ...rest } = query;
  const authorId = params?.id as string | undefined;

  if (locale !== "en") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const queryParams = new URLSearchParams({
      ...(page > 1 ? { page } : {}),
      ...Object.fromEntries(
        Object.entries(rest).filter(([label]) => !params?.[label])
      ),
    } as any);

    return {
      redirect: {
        destination: `/authors/${authorId}?${queryParams.toString()}`,
        statusCode: 301,
      },
    };
  }

  const { data: articles, headers } = await api.articles.getArticlesByAuthorId(
    authorId,
    MAX_ELEMENTS_PER_VIEW,
    (+page - 1) * MAX_ELEMENTS_PER_VIEW
  );
  const { data: author } = await api.authors.getAuthorById(authorId);

  const totalArticlesCount =
    Number(headers.get("x-pagination-total-count")) || 0;
  const totalPages = Math.ceil(totalArticlesCount / MAX_ELEMENTS_PER_VIEW);

  if (!articles || !author) {
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
      articles,
      author,
      totalPages,
    },
  };
};

export default Author;
