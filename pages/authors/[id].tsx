import React from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "@/api";
import { Article, Author as AuthorType } from "@/utils/types";
import Navbar from "@/components/Navbar";
import PaginatedGridView from "@/components/PaginatedGridView";
import BlogPreviewCard from "@/components/BlogPreviewCard";
import EsimAppBanner from "@/components/EsimAppBanner";
import Footer from "@/components/Footer";
import AuthorComponent from "@/components/AuthorComponent";
import { useTranslation } from "next-i18next";

function Author({
  articles,
  author,
}: {
  articles: Article[];
  author: AuthorType;
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
}) => {
  const authorId = params?.id as string | undefined;

  const articles = await api.articles.getArticlesByAuthorId(authorId);
  const author = await api.authors.getAuthorById(authorId);

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
    },
  };
};

export default Author;
