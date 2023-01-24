import React from "react";
import Navbar from "@/components/Navbar";
import BlogList from "@/components/BlogList";
import EsimAppBanner from "@/components/EsimAppBanner";
import Footer from "@/components/Footer";
import { GetServerSideProps } from "next";
import api from "@/api";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Article } from "@/utils/types";
import { SectionTitle, Text } from "@/utils/styled";
import PaginatedGridView from "@/components/PaginatedGridView";
import BlogPreviewCard from "@/components/BlogPreviewCard";
import { useTranslation } from "next-i18next";

function Category({
  articles,
  categoryName,
}: {
  articles: Article[];
  categoryName: string;
}) {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <main>
        <Text>{t("category")}</Text>
        <SectionTitle>{categoryName}</SectionTitle>
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
  const categoryId = params?.id as string | undefined;

  const articles = await api.categories.listArticlesByCategory(categoryId);

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
      categoryName: articles[0].categories.find((el) => el.id === +categoryId!)!
        .name,
    },
  };
};

export default Category;
