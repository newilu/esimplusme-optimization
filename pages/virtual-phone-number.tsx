import React from "react";
import { GetServerSideProps } from "next";
import { Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import user1 from "features/Reviews/assets/user1.jpeg";
import user2 from "features/Reviews/assets/user2.jpeg";
import user3 from "features/Reviews/assets/user3.jpeg";
import { generateRandomReviewsCount } from "@/shared/lib";
import Navbar from "@/widgets/Navbar";
import VirtualNumbersHeader from "@/features/VirtualNumbersHeader";
import HowToGetSms from "@/features/HowToGetSms";
import EsimFeaturesSection from "@/features/EsimFeaturesSection";
import Reviews from "@/features/Reviews";
import GetFreeNumberSection from "@/features/GetFreeNumberSection";
import DownloadAppSection from "@/features/DownloadAppSection";
import FAQSection from "@/features/FAQSection";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Head from "next/head";
import { LANGS_LIST } from "@/shared/constants";

function VirtualPhoneNumber() {
  const { pathname } = useRouter();
  const { t, i18n } = useTranslation();
  const [reviewsCount, setReviesCount] = React.useState("350000");

  const reviewsList = React.useMemo(
    () => [
      {
        name: t("virtual_numbers_fake_review_1_name"),
        title: t("virtual_numbers_fake_review_1_title"),
        text: t("virtual_numbers_fake_review_1_text"),
        rating: 5,
      },
      {
        icon: user3,
        name: t("virtual_numbers_fake_review_2_name"),
        title: t("virtual_numbers_fake_review_2_title"),
        text: t("virtual_numbers_fake_review_2_text"),
        rating: 5,
      },
      {
        icon: user2,
        name: t("virtual_numbers_fake_review_3_name"),
        title: t("virtual_numbers_fake_review_3_title"),
        text: t("virtual_numbers_fake_review_3_text"),
        rating: 4,
      },
      {
        name: t("virtual_numbers_fake_review_4_name"),
        title: t("virtual_numbers_fake_review_4_title"),
        text: t("virtual_numbers_fake_review_4_text"),
        rating: 5,
      },
      {
        icon: user1,
        name: t("virtual_numbers_fake_review_5_name"),
        title: t("virtual_numbers_fake_review_5_title"),
        text: t("virtual_numbers_fake_review_5_text"),
        rating: 5,
      },
    ],
    [t]
  );

  React.useEffect(() => {
    const interval = generateRandomReviewsCount(setReviesCount);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>{t("virtual_numbers_title")}</title>
        <meta
          name="description"
          content={t("virtual_numbers_page_description")}
        />
        <meta property="og:locale" content={i18n.language} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://esimplus.me${pathname}`} />
        <meta property="og:site_name" content="eSIM+" />
        <meta
          property="og:image"
          content="https://static.esimplus.net/storage/logos/logo.png"
        />
        <meta property="og:image:width" content="112" />
        <meta property="og:image:height" content="93" />
        <meta property="og:title" content={t("virtual_numbers_title")} />
        <meta
          property="og:description"
          content={t("virtual_numbers_page_description")}
        />
        <meta name="twitter:card" content="app" />
        <meta name="twitter:title" content={t("virtual_numbers_title")} />
        <meta
          name="twitter:description"
          content={t("virtual_numbers_page_description")}
        />
        <meta
          name="twitter:image"
          content="https://static.esimplus.net/storage/logos/logo.png"
        />
        <meta property="article:modified_time" content="2022-10-06" />
        <link
          rel="canonical"
          href={`https://esimplus.me${
            i18n.language.startsWith("en")
              ? ""
              : `/${i18n.language.slice(0, 2)}`
          }/virtual-phone-number`}
        />
        {LANGS_LIST.map((lng) => (
          <link
            key={lng.concat("2")}
            rel="alternate"
            href={`https://esimplus.me${
              lng.startsWith("en") ? "" : `/${lng.slice(0, 2)}`
            }/virtual-phone-number`}
            hrefLang={lng.toLowerCase()}
          />
        ))}
      </Head>
      <div style={{ overflow: "hidden" }}>
        <Navbar />
        <VirtualNumbersHeader />
        <HowToGetSms />
        <EsimFeaturesSection />
        <Reviews
          reviewsList={reviewsList}
          sectionTitle={
            <Trans
              i18nKey="users_choose_esim_plus_virtual_numbers"
              values={{
                count: reviewsCount,
              }}
            />
          }
        />
        <GetFreeNumberSection />
        <DownloadAppSection sectionTitle="download_the_esimplus_app_virtual_numbers" />
        <FAQSection />
        <Footer />
      </div>
    </>
  );
}

export default VirtualPhoneNumber;

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
