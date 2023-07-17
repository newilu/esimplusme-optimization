import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/widgets/Navbar";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageNotFoundSection from "@/widgets/PageNotFoundSection";

function ErrorPage() {
  return (
    <>
      <Navbar />
      <PageNotFoundSection />
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "navbar",
        "footer",
      ])),
    },
  };
};

export default ErrorPage;
