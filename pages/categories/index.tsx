import React from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Navbar from "@/widgets/Navbar";
import Footer from "@/components/Footer";
import EsimAppBanner from "features/DownloadAppSection";
import Head from "next/head";

function Categories() {
  return (
    <>
      <Head>
        <title>eSIM Plus: Helpful Blog with eSIM Good Advices</title>
        <meta
          name="description"
          content="Learn more about eSIM advantages and ways to use in big travel or inside a country. In the blog, you can find only trusted, up-to-date information about eSIM."
        />
        <link rel="canonical" href="https://esimplus.me/categories" />
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
        <EsimAppBanner />
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  redirect: {
    destination: "/",
    statusCode: 301,
  },
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

export default Categories;
