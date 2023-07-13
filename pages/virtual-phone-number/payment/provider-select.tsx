import React from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Navbar from "@/widgets/Navbar";
import SelectProviderAndPurchaseHeader from "@/widgets/SelectProviderAndPurchaseHeader";
import DownloadAppSection from "@/features/DownloadAppSection";
import Footer from "@/components/Footer";

function ProviderSelect() {
  return (
    <>
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
    ])),
  },
});

export default ProviderSelect;
