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

function VirtualNumbers() {
  const { t } = useTranslation();
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
      <DownloadAppSection sectionTitle="download_the_esimplus_app_mobile_data" />
      <FAQSection />
      <Footer />
    </div>
  );
}

export default VirtualNumbers;

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
