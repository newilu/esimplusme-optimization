import React from "react";
import Navbar from "@/components/Navbar";
import { SectionTitle, Text } from "@/utils/styled";
import PaginatedGridView from "@/components/PaginatedGridView";
import BlogPreviewCard from "@/components/BlogPreviewCard";
import EsimAppBanner from "@/components/EsimAppBanner";
import Footer from "@/components/Footer";
import { GetServerSideProps } from "next";
import api from "@/api";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Article, Author as AuthorType } from "@/utils/types";
import AuthorComponent from "@/components/AuthorComponent";

function Author({
  articles,
  author,
}: {
  articles: Article[];
  author: AuthorType;
}) {
  return (
    <>
      <Navbar />
      <main>
        <AuthorComponent
          name={author.name}
          image={author.image}
          subtitle={author.description}
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

  const articles = await api.authors.listArticlesByAuthor(authorId);

  if (!articles) {
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
      author: articles[0].author,
    },
  };
};

export default Author;
