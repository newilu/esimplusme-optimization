import React from "react";
import MobileDataPlanHeader from "@/widgets/MobileDataPlanHeader";
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
import Footer from "@/components/Footer";
import user5 from "@/features/Reviews/assets/user5.jpeg";
import user4 from "@/features/Reviews/assets/user4.jpeg";
import user6 from "@/features/Reviews/assets/user6.jpeg";
import { generateRandomReviewsCount } from "@/shared/lib";

type CountryProps<_Region extends RegionById | undefined = undefined> =
  _Region extends RegionById
    ? {
        country?: never;
        region: _Region;
        countries: CountryType[];
        regions: Region[];
        worldwideRegion?: RegionById;
      }
    : {
        country: CountryByISO;
        region?: never;
        countries: CountryType[];
        regions: Region[];
        worldwideRegion?: RegionById;
      };
function Country({
  country,
  region,
  regions,
  worldwideRegion,
  countries,
}: CountryProps) {
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
      <MobileDataPlanHeader
        title={`Mobile data with eSIM for travelers in ${
          (region as any)?.name ?? country.country
        }`}
        subtitle="Get a fast, secure, and stable Internet connection without overpaying mobile carriers!"
        region={region}
        country={country}
      />
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
      <Footer
        countries={countries}
        regions={regions}
        worldwideRegion={worldwideRegion}
      />
    </div>
  );
}

export default Country;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const { country } = params ?? {};

  if (typeof country !== "string") {
    return { redirect: { destination: "/", statusCode: 301 } };
  }

  const [countries, regions, worldwideRegion] = await Promise.all([
    api.profiles.listCountries(),
    api.profiles.listRegions(),
    api.profiles.getWorldwideRegion(),
  ]);

  const isRegionalProfile = regions.data?.data.regions.find(
    (el) => el.name.toLowerCase() === country
  );
  const isWorldwideProfile =
    worldwideRegion.data?.data.region.name.toLowerCase() === country;

  if (isWorldwideProfile) {
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", [
          "common",
          "navbar",
          "footer",
        ])),
        countries: countries.data?.data.countries ?? [],
        regions: regions.data?.data.regions ?? [],
        region: worldwideRegion.data?.data.region,
        worldwideRegion: worldwideRegion.data?.data.region,
      },
    };
  }

  const currentRegion = regions.data?.data.regions.find(
    (el) => el.name.toLowerCase() === country
  );

  if (isRegionalProfile && currentRegion) {
    const { data } = await api.profiles.getRegionById(currentRegion.id);

    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", [
          "common",
          "navbar",
          "footer",
        ])),
        region: data?.data.region,
        countries: countries.data?.data.countries ?? [],
        regions: regions.data?.data.regions ?? [],
        worldwideRegion: worldwideRegion.data?.data.region,
      },
    };
  }

  const currentCountry = countries.data?.data.countries.find((el) =>
    el.country
      .toLowerCase()
      .match(new RegExp(country.replaceAll("-", " ").replace(" esim", "")))
  );

  if (!currentCountry) {
    return { redirect: { destination: "/", statusCode: 301 } };
  }

  const { data } = await api.profiles.getCountryByIsoName(
    currentCountry.isoName2
  );

  if (!data?.data.country) {
    return { redirect: { destination: "/", statusCode: 301 } };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "navbar",
        "footer",
      ])),
      country: data.data.country,
      countries: countries.data?.data.countries ?? [],
      regions: regions.data?.data.regions ?? [],
      worldwideRegion: worldwideRegion.data?.data.region,
    },
  };
};
