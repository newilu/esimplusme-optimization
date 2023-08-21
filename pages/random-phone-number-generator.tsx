import React from "react";
import FakeNumberGeneratorHeader from "@/widgets/FakeNumberGeneratorHeader";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Navbar from "@/widgets/Navbar";
import Footer from "@/components/Footer";
import { generateMeta } from "@/shared/lib";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Head from "next/head";

function RandomPhoneNumberGenerator() {
  const { t, i18n } = useTranslation();
  const { asPath } = useRouter();

  const meta = generateMeta({
    supportedLangs: ["en"],
    asPath,
    language: i18n.language,
    description: t(""),
    title: t(""),
  });

  return (
    <>
      <Head>{meta}</Head>
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
