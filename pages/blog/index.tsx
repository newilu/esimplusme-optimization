import React from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Navbar from "@/widgets/Navbar";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import EsimAppBanner from "@/features/DownloadAppSection";
import api from "@/api";
import { Article } from "@/utils/types";
import { MAX_ELEMENTS_PER_VIEW } from "@/utils/constants";

function Blog({
  articles,
  totalPages,
}: {
  articles: Article[];
  totalPages: number;
}) {
  return (
    <>
      <Head>
        <title>eSIM Plus: Helpful Blog with eSIM Good Advices</title>
        <meta
          name="description"
          content="Learn more about eSIM advantages and ways to use in big travel or inside a country. In the blog, you can find only trusted, up-to-date information about eSIM."
        />
        <link rel="canonical" href="https://esimplus.me/blog" />
        <meta
          property="og:title"
          content="eSIM Plus: Helpful Blog with eSIM Good Advices"
        />
        <meta
          property="og:description"
          content="Learn more about eSIM advantages and ways to use in big travel or inside a country. In the blog, you can find only trusted, up-to-date information about eSIM."
        />
        <meta
          property="twitter:title"
          content="eSIM Plus: Helpful Blog with eSIM Good Advices"
        />
        <meta
          property="twitter:description"
          content="Learn more about eSIM advantages and ways to use in big travel or inside a country. In the blog, you can find only trusted, up-to-date information about eSIM."
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
        <meta property="og:url" content="https://esimplus.me/blog" />
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
        <BlogList articles={articles} totalPages={totalPages} />
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
  const { page = 1, ...rest } = query;
  if (locale !== "en") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const params = new URLSearchParams({
      ...(page > 1 ? { page } : {}),
      ...rest,
    } as any);

    return {
      redirect: {
        destination: `/blog?${params.toString()}`,
        statusCode: 301,
      },
    };
  }

  const [articles] = await Promise.all([
    api.articles.listArticles(
      MAX_ELEMENTS_PER_VIEW,
      (+page - 1) * MAX_ELEMENTS_PER_VIEW
    ),
  ]);

  const totalArticlesCount =
    Number(articles.headers.get("x-pagination-total-count")) || 0;
  const totalPages = Math.ceil(totalArticlesCount / MAX_ELEMENTS_PER_VIEW);
  return {
    props: {
      ...(await serverSideTranslations("en", ["common"])),
      articles: articles.data,
      totalPages,
    },
  };
};

export default Blog;
