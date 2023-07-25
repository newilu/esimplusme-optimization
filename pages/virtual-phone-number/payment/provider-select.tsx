import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Navbar from "@/widgets/Navbar";
import SelectProviderAndPurchaseHeader from "@/widgets/SelectProviderAndPurchaseHeader";
import DownloadAppSection from "@/features/DownloadAppSection";
import Footer from "@/components/Footer";
import { generateMeta } from "@/shared/lib";

function ProviderSelect() {
  const { asPath } = useRouter();
  const { t, i18n } = useTranslation();

  const meta = generateMeta({
    language: i18n.language,
    title: t("payment_provider_select_title"),
    description: t("payment_provider_select_description"),
    asPath,
    supportedLangs: ["en"],
  });

  return (
    <>
      <Head>{meta}</Head>
      <Navbar />
      <SelectProviderAndPurchaseHeader />
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

export default ProviderSelect;
