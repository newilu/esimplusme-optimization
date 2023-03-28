import React from "react";
import Head from "next/head";
import Footer from "@/components/Footer";
import Navbar from "widgets/Navbar";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import user4 from "features/Reviews/assets/user4.jpeg";
import user5 from "features/Reviews/assets/user5.jpeg";
import user6 from "features/Reviews/assets/user6.jpeg";
import AvailableMobileDataPlans from "@/widgets/AvailableMobileDataPlans";
import api from "@/api";
import { Country, Region, RegionById } from "@/utils/types";
import Reviews from "@/features/Reviews";
import { Trans, useTranslation } from "next-i18next";
import { generateRandomReviewsCount } from "@/shared/lib";
import DownloadAppSection from "@/features/DownloadAppSection";
import FAQSection from "@/features/FAQSection";
import SetupGuide from "@/features/MobiledataSetupGuide";
import { MobileDataHeader } from "@/features/MobileDataHeader/MobileDataHeader";

type HomeProps = {
  countries: Country[];
  regions: Region[];
  worldwideRegion?: RegionById;
};

export default function Home({
  countries,
  regions,
  worldwideRegion,
}: HomeProps) {
  const { t } = useTranslation();
  const [reviewsCount, setReviesCount] = React.useState("350000");

  const reviewsList = React.useMemo(
    () => [
      {
        name: t("mobile_data_fake_review_1_name"),
        title: t("mobile_data_fake_review_1_title"),
        text: t("mobile_data_fake_review_1_text"),
        rating: 5,
      },
      {
        icon: user5,
        name: t("mobile_data_fake_review_2_name"),
        title: t("mobile_data_fake_review_2_title"),
        text: t("mobile_data_fake_review_2_text"),
        rating: 5,
      },
      {
        icon: user4,
        name: t("mobile_data_fake_review_3_name"),
        title: t("mobile_data_fake_review_3_title"),
        text: t("mobile_data_fake_review_3_text"),
        rating: 4,
      },
      {
        name: t("mobile_data_fake_review_4_name"),
        title: t("mobile_data_fake_review_4_title"),
        text: t("mobile_data_fake_review_4_text"),
        rating: 5,
      },
      {
        icon: user6,
        name: t("mobile_data_fake_review_5_name"),
        title: t("mobile_data_fake_review_5_title"),
        text: t("mobile_data_fake_review_5_text"),
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
      <Head>
        <title>eSIM+ blog</title>
        <meta name="description" content="eSIM+ blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar color="white" />
      <MobileDataHeader />
      <SetupGuide />
      <AvailableMobileDataPlans
        countries={countries}
        regions={regions}
        worldwideRegion={worldwideRegion}
      />
      <Reviews
        reviewsList={reviewsList}
        sectionTitle={
          <Trans
            i18nKey="users_choose_esim_plus_mobile_data"
            values={{
              count: reviewsCount,
            }}
          />
        }
      />
      <DownloadAppSection sectionTitle="download_the_esimplus_app_mobile_data" />
      <FAQSection />
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  locale,
}) => {
  const [countries, regions, worldwideRegion] = await Promise.all([
    api.profiles.listCountries(),
    api.profiles.listRegions(),
    api.profiles.getWorldwideRegion(),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "navbar",
        "footer",
      ])),
      countries: countries.data?.data.countries ?? [],
      regions: regions.data?.data.regions ?? [],
      worldwideRegion: worldwideRegion.data?.data.region,
    },
  };
};
