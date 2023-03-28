import React from "react";
import { useDebounce } from "use-debounce";
import { Trans, useTranslation } from "next-i18next";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import api from "api";
import Image from "next/image";
import { useRouter } from "next/router";
import { Bundle, Country, Region } from "utils/types";
import { useModalControls } from "shared/hooks";
import xmark from "shared/assets/xmark.svg";
import { getErrorMessage, scrollToId } from "shared/lib";
import { BASE_STORAGE_URL, SectionIDS } from "shared/constants";
import Loader from "shared/ui/Loader";
import SearchInput from "shared/ui/SearchInput";
import CountryFlag from "shared/ui/CountryFlag";
import { NoMatchesText } from "shared/ui/styled";
import MobileDataBundleCard from "entities/MobileDataBundleCard";
import CoverageCountriesModal from "entities/CoverageCountriesModal";
import GetPlanButton from "entities/GetPlanButton";
import CoverageCountriesOpenModalButton from "entities/CoverageCountriesOpenModalButton";
import {
  CountriesCards,
  CountryCard,
  SelectDataSizeButtons,
  SelectedCountry,
  SelectedCountryNameWrapper,
  SelectedCountryFlagWrapper,
} from "../LocalEsim/styled";
import { Wrapper } from "./styled";

function RegionalEsim({
  countries,
  regions,
}: {
  countries: Country[];
  regions: Region[];
}) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [filteredCountries, setFilteredCountries] = React.useState<Country[]>(
    []
  );
  const [selectedRegion, setSelectedRegion] = React.useState<Region | null>(
    null
  );
  const [coverageCountries, setCoverageCountries] = React.useState<
    Bundle["countries"]
  >([]);
  const [isFilteredCountriesLoading, setIsFilteredCountriesLoading] =
    React.useState(false);
  const [filterText, setFilterText] = React.useState("");
  const [debouncedFilterText] = useDebounce(filterText, 500);

  const {
    isOpen: isCoverageCountriesModalOpen,
    closeModal: closeCoverageCountriesModal,
    openModal: openCoverageCountriesModal,
  } = useModalControls(false);

  const {
    data: regionById = null,
    isLoading: isRegionByIdLoading,
    isFetching: isRegionByIdFetching,
  } = useQuery(
    ["region-by-id", { id: selectedRegion?.id }] as const,
    async ({ queryKey }) => {
      const { data } = await api.profiles.getRegionById(queryKey[1].id ?? 0);

      return data?.data.region;
    },
    {
      enabled: Boolean(selectedRegion?.id),
    }
  );

  const filteredRegions = React.useMemo(() => {
    const newBundlesFilteredByCountries = regions.filter(({ id }) =>
      filteredCountries.find(({ regionlist }) => regionlist.includes(id))
    );
    const existingActiveBundleInNewBundlesList =
      newBundlesFilteredByCountries.find(
        ({ name }) => name === selectedRegion?.name
      );
    if (!existingActiveBundleInNewBundlesList) setSelectedRegion(null);

    return newBundlesFilteredByCountries;
  }, [selectedRegion?.name, filteredCountries, regions]);

  const handleRegionChange = (region: Region | null) => {
    scrollToId(SectionIDS.SearchYourDestination, 65);
    setSelectedRegion(region);
    void router.push(
      { query: { ...router.query, region: region?.name.toLowerCase() } },
      undefined,
      { scroll: false, shallow: true }
    );
  };

  React.useEffect(() => {
    if (debouncedFilterText) {
      setIsFilteredCountriesLoading(true);
      void api.profiles
        .getCountriesByFilterText(debouncedFilterText, i18n.language)
        .then(({ data }) => {
          setFilteredCountries(data?.data ?? []);
          setIsFilteredCountriesLoading(false);
        })
        .catch((e: unknown) => {
          toast.error(getErrorMessage(e));
          setIsFilteredCountriesLoading(false);
        });
    } else {
      setFilteredCountries(countries);
    }
  }, [i18n.language, debouncedFilterText, countries]);

  return (
    <Wrapper>
      <CoverageCountriesModal
        closeModal={closeCoverageCountriesModal}
        isOpen={isCoverageCountriesModalOpen}
        supportedCountries={coverageCountries}
      />
      <SearchInput
        placeholder={t("search_by_country")}
        onChange={(e) => {
          setFilterText(e.currentTarget.value.replaceAll(/[/|\\]/g, ""));
        }}
        value={filterText}
      />
      {selectedRegion && (
        <SelectDataSizeButtons>
          <SelectedCountry>
            <div>
              <SelectedCountryFlagWrapper>
                <Image
                  width={46}
                  height={46}
                  src={`${BASE_STORAGE_URL}130x80/${selectedRegion.name}350.jpg`}
                  alt={selectedRegion.name}
                />
              </SelectedCountryFlagWrapper>
              <SelectedCountryNameWrapper>
                <div>{selectedRegion.name}</div>
                <div>{selectedRegion.name}</div>
              </SelectedCountryNameWrapper>
            </div>
            <button onClick={() => handleRegionChange(null)}>
              <Image width={14} height={14} src={xmark} alt="x mark" />
            </button>
          </SelectedCountry>
        </SelectDataSizeButtons>
      )}
      {(isFilteredCountriesLoading ||
        (isRegionByIdLoading && isRegionByIdFetching)) && <Loader />}
      <CountriesCards>
        {!isFilteredCountriesLoading && regionById && (
          <CountriesCards style={{ width: "100%" }}>
            {Object.values(regionById.bundles)
              .flat()
              .map(
                ({
                  countries: supportedCountries,
                  name,
                  dataAmount,
                  duration,
                  image,
                  regionId,
                  price,
                  worldwide,
                  currency,
                  ...rest
                }) => (
                  <MobileDataBundleCard
                    key={rest.paymentCode}
                    dataSize={dataAmount}
                    title={name}
                    duration={duration}
                    img={image}
                    supportedCountries={supportedCountries}
                    price={price}
                    worldwide={worldwide}
                    embeddedHeader={
                      <CoverageCountriesOpenModalButton
                        onClick={() => {
                          setCoverageCountries(supportedCountries);
                          openCoverageCountriesModal();
                        }}
                      />
                    }
                    embeddedFooter={
                      <GetPlanButton
                        dataAmount={dataAmount}
                        providerType={rest.providerType}
                        price={price}
                        isoName2={rest.isoName2}
                        currency={currency}
                      />
                    }
                  />
                )
              )}
          </CountriesCards>
        )}
        {!isFilteredCountriesLoading &&
          filteredRegions.map(({ name, ...props }) => (
            <CountryCard
              key={name}
              onClick={() => handleRegionChange({ name, ...props })}
            >
              <div style={{ width: "100%", height: 80 }}>
                <CountryFlag
                  width={130}
                  height={80}
                  alt={name}
                  src={`${BASE_STORAGE_URL}130x80/${name}350.jpg`}
                />
              </div>
              <div>
                <div>{name}</div>
              </div>
            </CountryCard>
          ))}
      </CountriesCards>
      {!filteredRegions.length && !isFilteredCountriesLoading && (
        <NoMatchesText>
          <Trans
            i18nKey="regions_not_found_by_filter"
            values={{ filter: debouncedFilterText }}
          />
        </NoMatchesText>
      )}
    </Wrapper>
  );
}

export { RegionalEsim };
