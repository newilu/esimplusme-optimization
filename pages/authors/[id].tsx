import React from "react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "@/api";
import { Article, Author as AuthorType } from "@/utils/types";
import Navbar from "@/widgets/Navbar";
import PaginatedGridView from "@/components/PaginatedGridView";
import BlogPreviewCard from "@/components/BlogPreviewCard";
import EsimAppBanner from "@/components/EsimAppBanner";
import Footer from "@/components/Footer";
import AuthorComponent from "@/components/AuthorComponent";
import { MAX_ELEMENTS_PER_VIEW } from "@/utils/constants";

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
  const { page = 1 } = query;
  const authorId = params?.id as string | undefined;

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
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
      articles,
      author,
      totalPages,
    },
  };
};

export default Author;
