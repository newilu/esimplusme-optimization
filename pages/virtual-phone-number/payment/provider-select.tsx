import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "@/api";
import Navbar from "@/widgets/Navbar";
import SelectProviderAndPurchaseHeader from "@/widgets/SelectProviderAndPurchaseHeader";
import DownloadAppSection from "@/features/DownloadAppSection";
import Footer from "@/components/Footer";

function ProviderSelect() {
  const { query } = useRouter();

  const { phone_number: phone, country } = query;

  React.useEffect(() => {
    if (typeof phone === "string" && typeof country === "string") {
      api.secondPhone.buyNumber({ phone, country_code: country });
    }
  }, [country, phone]);

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
