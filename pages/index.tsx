import Head from "next/head";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  return (
    <>
      <Head>
        <title>eSIM+ blog</title>
        <meta name="description" content="eSIM+ blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  redirect: {
    destination: "/blog",
    statusCode: 301,
  },
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "common",
      "navbar",
      "footer",
    ])),
  },
});
