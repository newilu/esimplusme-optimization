import React from "react";
import FakeNumberGeneratorHeader from "@/widgets/FakeNumberGeneratorHeader";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Navbar from "@/widgets/Navbar";
import Footer from "@/components/Footer";

function RandomPhoneNumberGenerator() {
  return (
    <>
      <Navbar />
      <FakeNumberGeneratorHeader />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "random-number",
      ])),
    },
  };
};

export default RandomPhoneNumberGenerator;
