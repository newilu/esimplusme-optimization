import React from "react";
import { GetServerSideProps } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import EsimAppBanner from "@/components/EsimAppBanner";
import Blog from "@/components/Blog";
import RelatedArticles from "@/components/RelatedArticles";

function BlogById({ blogs }: { blogs: any[] }) {
  return (
    <>
      <Head>
        <title>blog title</title>
        <meta name="description" content="blog descr" />
        <meta property="og:title" content="blog title" />
        <meta property="og:description" content="blog descr" />
        <meta name="twitter:title" content="blog title" />
        <meta name="twitter:description" content="blog descr" />
      </Head>
      <Navbar />
      <main>
        <Blog />
        <EsimAppBanner />
        <RelatedArticles />
      </main>
      <Footer />
    </>
  );
}

export default BlogById;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      blogs: [],
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
