import React from "react";
import Navbar from "@/components/Navbar";
import EsimAppBanner from "@/components/EsimAppBanner";
import Footer from "@/components/Footer";
import { SectionTitle, Text } from "@/utils/styled";
import PaginatedGridView from "@/components/PaginatedGridView";
import { GetServerSideProps } from "next";
import api from "@/api";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Author } from "@/utils/types";
import AuthorPreviewCard from "@/components/AuthorPreviewCard";
import { useTranslation } from "next-i18next";

function Authors({ authors }: { authors: Author[] }) {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <main>
        <Text>{t("catalog")}</Text>
        <SectionTitle>{t("authors")}</SectionTitle>
        <PaginatedGridView
          gap={6}
          items={authors.map((el, id) => (
            <AuthorPreviewCard key={id} {...el} />
          ))}
        />
        <EsimAppBanner />
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const authors = await api.authors.listAuthors();

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
      authors,
    },
  };
};

export default Authors;
