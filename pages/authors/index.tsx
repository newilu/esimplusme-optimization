import React from "react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ph from "public/staticfiles/author-placeholder.svg";
import api from "@/api";
import { Author } from "@/utils/types";
import { MAX_AUTHORS_PER_VIEW } from "@/utils/constants";
import { SectionTitle, Text } from "@/shared/ui/styled";
import Navbar from "@/widgets/Navbar";
import EsimAppBanner from "features/DownloadAppSection";
import Footer from "@/components/Footer";
import PaginatedGridView from "@/components/PaginatedGridView";
import AuthorPreviewCard from "@/components/AuthorPreviewCard";
import Head from "next/head";

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
      <Head>
        <title>eSIM Plus: Helpful Blog with eSIM Good Advices</title>
        <meta
          name="description"
          content="Learn more about eSIM advantages and ways to use in big travel or inside a country. In the blog, you can find only trusted, up-to-date information about eSIM."
        />
        <link rel="canonical" href="https://esimplus.me/authors" />
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
        <meta property="og:url" content="https://esimplus.me/authors" />
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
        <Text>{t("catalog")}</Text>
        <SectionTitle>{t("authors_list")}</SectionTitle>
        <PaginatedGridView
          totalPages={totalPages}
          gap={6}
          items={authors.map((el) => (
            <AuthorPreviewCard
              key={el.id}
              {...el}
              image={el.image ?? ph}
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
  const { page = 1, ...rest } = query;

  if (locale !== "en") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const params = new URLSearchParams({
      ...(page > 1 ? { page } : {}),
      ...rest,
    } as any);

    return {
      redirect: {
        destination: `/authors?${params.toString()}`,
        statusCode: 301,
      },
    };
  }

  const { data, headers } = await api.authors.listAuthors(
    MAX_AUTHORS_PER_VIEW,
    (+page - 1) * MAX_AUTHORS_PER_VIEW
  );
  const totalArticlesCount =
    Number(headers.get("x-pagination-total-count")) || 0;
  const totalPages = Math.ceil(totalArticlesCount / MAX_AUTHORS_PER_VIEW);

  return {
    props: {
      ...(await serverSideTranslations("en", ["common"])),
      authors: data,
      totalPages,
    },
  };
};

export default Authors;
