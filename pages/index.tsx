import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "components/Footer";
import Navbar from "widgets/Navbar";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import user4 from "features/Reviews/assets/user4.jpeg";
import user5 from "features/Reviews/assets/user5.jpeg";
import user6 from "features/Reviews/assets/user6.jpeg";
import AvailableMobileDataPlans from "widgets/AvailableMobileDataPlans";
import api from "api";
import { Country, Region, RegionById } from "utils/types";
import Reviews from "features/Reviews";
import { Trans, useTranslation } from "next-i18next";
import { generateRandomReviewsCount } from "@/shared/lib";
import DownloadAppSection from "features/DownloadAppSection";
import FAQSection from "features/FAQSection";
import SetupGuide from "features/MobiledataSetupGuide";
import Header from "features/Header";
import { LANGS_LIST } from "@/shared/constants";

type HomeProps = {
  countries: Country[];
  regions: Region[];
  worldwideRegion?: RegionById;
  countryCode: string;
};

export default function Home({
  countries,
  regions,
  worldwideRegion,
  countryCode,
}: HomeProps) {
  const { pathname } = useRouter();
  const { t, i18n } = useTranslation();
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{t("mobile_data_title")}</title>
        <meta name="description" content={t("mobile_data_page_description")} />
        <meta property="og:locale" content={i18n.language} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://esimplus.me${pathname}`} />
        <meta property="og:site_name" content="ESIM+" />
        <meta
          property="og:image"
          content="https://static.esimplus.net/storage/logos/logo.png"
        />
        <meta property="og:image:width" content="112" />
        <meta property="og:image:height" content="93" />
        <meta property="og:title" content={t("mobile_data_title")} />
        <meta
          property="og:description"
          content={t("mobile_data_page_description")}
        />
        <meta name="twitter:card" content="app" />
        <meta name="twitter:title" content={t("mobile_data_title")} />
        <meta
          name="twitter:description"
          content={t("mobile_data_page_description")}
        />
        <meta
          name="twitter:image"
          content="https://static.esimplus.net/storage/logos/logo.png"
        />
        <meta property="article:modified_time" content="2023-06-15" />
        <link
          rel="canonical"
          href={`https://esimplus.me${
            i18n.language.startsWith("en")
              ? ""
              : `/${i18n.language.slice(0, 2)}`
          }`}
        />
        {LANGS_LIST.map((lng) => (
          <link
            key={lng.concat("2")}
            rel="alternate"
            href={`https://esimplus.me${
              lng.startsWith("en") ? "" : `/${lng.slice(0, 2)}`
            }`}
            hrefLang={lng.toLowerCase()}
          />
        ))}
      </Head>
      <Navbar color="white" />
      <Header />
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
      <Footer
        countryCode={countryCode}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  locale,
  req,
}) => {
  const countryCode = (req.headers["cf-ipcountry"] ?? "") as string;

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
      countryCode,
    },
  };
};
