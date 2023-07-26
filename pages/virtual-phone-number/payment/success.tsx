import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/widgets/Navbar";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SuccessfulPurchaseHeader from "@/widgets/SuccessfulPurchaseHeader";
import DownloadAppSection from "@/features/DownloadAppSection";

function Success() {
  return (
    <>
      <Navbar />
      <SuccessfulPurchaseHeader />
      <DownloadAppSection />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "common",
      "navbar",
      "footer",
    ])),
  },
});

export default Success;
