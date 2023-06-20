import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/widgets/Navbar";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "@/api";
import SuccessfulPurchaseHeader from "@/widgets/SuccessfulPurchaseHeader";

function Success() {
  const { query } = useRouter();

  const { phone_number: phone, country } = query;

  React.useEffect(() => {
    if (typeof phone === "string" && typeof country === "string") {
      void api.secondPhone.buyNumber({ phone, country_code: country });
    }
  }, [country, phone]);

  return (
    <>
      <Navbar />
      <SuccessfulPurchaseHeader />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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

export default Success;
