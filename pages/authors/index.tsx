import React from "react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "@/api";
import { Author } from "@/utils/types";
import { MAX_ELEMENTS_PER_VIEW } from "@/utils/constants";
import { SectionTitle, Text } from "@/utils/styled";
import Navbar from "@/components/Navbar";
import EsimAppBanner from "@/components/EsimAppBanner";
import Footer from "@/components/Footer";
import PaginatedGridView from "@/components/PaginatedGridView";
import AuthorPreviewCard from "@/components/AuthorPreviewCard";

function Authors({
  authors,
  totalPages,
}: {
  authors: Author[];
  totalPages: number;
}) {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <main>
        <Text>{t("catalog")}</Text>
        <SectionTitle>{t("authors_list")}</SectionTitle>
        <PaginatedGridView
          totalPages={totalPages}
          gap={6}
          items={authors.map((el, id) => (
            <AuthorPreviewCard
              key={id}
              {...el}
              description={`${el.articleCount} ${t("articles")}`}
            />
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
  query,
}) => {
  const { page = 1 } = query;
  const { data, headers } = await api.authors.listAuthors(
    MAX_ELEMENTS_PER_VIEW,
    (+page - 1) * MAX_ELEMENTS_PER_VIEW
  );

  const totalArticlesCount =
    Number(headers.get("x-pagination-total-count")) || 0;
  const totalPages = Math.round(totalArticlesCount / MAX_ELEMENTS_PER_VIEW);

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
      authors: data,
      totalPages,
    },
  };
};

export default Authors;
