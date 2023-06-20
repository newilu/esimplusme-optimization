import React from "react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "@/api";
import { Article } from "@/utils/types";
import { SectionTitle } from "@/utils/styled";
import Navbar from "@/widgets/Navbar";
import EsimAppBanner from "features/DownloadAppSection";
import Footer from "@/components/Footer";
import PaginatedGridView from "@/components/PaginatedGridView";
import BlogPreviewCard from "@/components/BlogPreviewCard";
import { MAX_ELEMENTS_PER_VIEW } from "@/utils/constants";
import Head from "next/head";

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
      <Head>
        <title>{categoryName}</title>
        <meta name="description" content={categoryName} />
        <meta property="og:title" content={categoryName} />
        <meta property="og:description" content={categoryName} />
        <meta name="twitter:title" content={categoryName} />
        <meta name="twitter:description" content={categoryName} />
        <link
          rel="canonical"
          href={`https://esimplus.me/categories/${categoryName}`}
        />
        <meta name="robots" content="index,follow" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://esimplus.me/categories/${categoryName}`}
        />
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
        <SectionTitle>
          {t("category")} {categoryName}
        </SectionTitle>
        <PaginatedGridView
          totalPages={totalPages}
          items={articles.map(({ preview, id }) => (
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
  const { page = 1 } = query;

  const categoryId = params?.id as string;

  let articles = await api.categories.listArticlesByCategoryName(
    categoryId,
    MAX_ELEMENTS_PER_VIEW,
    (+page - 1) * MAX_ELEMENTS_PER_VIEW
  );

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
    redirect: {
      destination: "/",
      statusCode: 301,
    },
  };

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
