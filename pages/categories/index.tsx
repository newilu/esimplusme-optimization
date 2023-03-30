import React from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Navbar from "@/widgets/Navbar";
import Footer from "@/components/Footer";
import EsimAppBanner from "features/DownloadAppSection";

function Categories() {
  return (
    <>
      <Navbar />
      <main>
        <EsimAppBanner />
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    redirect: {
      destination: "/",
      statusCode: 301,
    },
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Categories;
