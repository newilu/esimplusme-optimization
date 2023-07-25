import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/widgets/Navbar";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SuccessfulPurchaseHeader from "@/widgets/SuccessfulPurchaseHeader";
import DownloadAppSection from "@/features/DownloadAppSection";
import { useTranslation } from "next-i18next";
import { generateMeta } from "@/shared/lib";

function Success() {
  const { asPath } = useRouter();
  const { t, i18n } = useTranslation("virtual-phone-number");

  const meta = generateMeta({
    language: i18n.language,
    title: t("meta:purchase_success_title"),
    description: t("meta:purchase_success_description"),
    asPath,
    supportedLangs: ["en"],
  });

  return (
    <>
      <Head>{meta}</Head>
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
      "virtual-phone-number",
      "meta",
    ])),
  },
});

export default Success;
