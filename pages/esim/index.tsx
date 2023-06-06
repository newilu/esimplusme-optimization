import React from "react";
import Navbar from "@/widgets/Navbar";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "@/api";
import {
  CountryByISO,
  Region,
  RegionById,
  Country as CountryType,
} from "@/utils/types";
import SetupGuide from "@/features/MobiledataSetupGuide";
import Reviews from "@/features/Reviews";
import { Trans, useTranslation } from "next-i18next";
import DownloadAppSection from "@/features/DownloadAppSection";
import FAQSection from "@/features/FAQSection";
import Footer from "@/components/Footer";
import user5 from "@/features/Reviews/assets/user5.jpeg";
import user4 from "@/features/Reviews/assets/user4.jpeg";
import user6 from "@/features/Reviews/assets/user6.jpeg";
import { generateRandomReviewsCount } from "@/shared/lib";
import MobileDataPlanHeader from "@/widgets/MobileDataPlanHeader";

function Index({
  regions,
  worldwideRegion,
  countries,
}: {
  countries: CountryType[];
  regions: Region[];
  worldwideRegion?: RegionById;
}) {
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
      <Navbar />
      <MobileDataPlanHeader countries={countries} regions={regions} />
      <SetupGuide />
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
      <Footer
        countries={countries}
        regions={regions}
        worldwideRegion={worldwideRegion}
      />
    </div>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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
