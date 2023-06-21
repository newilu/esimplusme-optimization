import React from "react";
import { Trans, useTranslation } from "next-i18next";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Image from "next/image";
import api from "api";
import type { Bundle, Country } from "utils/types";
import { formatDataSize, scrollToId } from "@/shared/lib";
import { DEFAULT_SELECTED_DATA_SIZE, SectionIDS } from "shared/constants";
import CountryFlag from "shared/ui/CountryFlag";
import Loader from "shared/ui/Loader";
import { NoMatchesText } from "shared/ui/styled";
import { useModalControls } from "shared/hooks";
import SearchInput from "shared/ui/SearchInput";
import xmark from "shared/assets/xmark.svg";
import MobileDataBundleCard from "entities/MobileDataBundleCard";
import CoverageCountriesModal from "entities/CoverageCountriesModal";
import CoverageCountriesOpenModalButton from "entities/CoverageCountriesOpenModalButton";
import GetPlanButton from "entities/GetPlanButton";
import SeeAllIcon from "./assets/SeeAll";
import {
  CountriesCards,
  CountryCard,
  DataSizeButton,
  SelectDataSizeButtons,
  SelectDataSizeButtonsWrapper,
  SelectedCountry,
  SelectedCountryFlagWrapper,
  SelectedCountryNameWrapper,
  BundlesWrapper,
  SeeAllCard,
  // SpecialOfferWrapper,
} from "./styled";

function LocalEsim({ countries }: { countries: Country[] }) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [coverageCountries, setCoverageCountries] = React.useState<
    Bundle["countries"]
  >([]);
  const [isWorldwidePlanSelected, setIsWorldwidePlanSelected] =
    React.useState(false);
  const [activeCountry, setActiveCountry] = React.useState<Country | null>(
    countries.find((el) => el.isoName2.toLowerCase() === router.query.region) ??
      null
  );
  const [filteredCountries, setFilteredCountries] = React.useState<Country[]>(
    []
  );
  const [selectedDataSize, setSelectedDataSize] = React.useState(
    DEFAULT_SELECTED_DATA_SIZE
  );
  const [bundlesByDataAmount, setBundlesByDataAmount] = React.useState<
    Bundle[] | undefined
  >();
  const [isViewingAll, setIsViewingAll] = React.useState(false);
  const [filterText, setFilterText] = React.useState<string>("");
  const [debouncedFilterText] = useDebounce(filterText, 500);
  const sectionRef = React.useRef<HTMLDivElement | null>(null);

  const {
    isOpen: isCoverageCountriesModalOpen,
    closeModal: closeCoverageCountriesModal,
    openModal: openCoverageCountriesModal,
  } = useModalControls(false, { disableBodyScroll: true });

  const {
    data: countryByIsoName = null,
    isLoading,
    isFetching,
  } = useQuery(
    ["country-by-iso", { isoName2: activeCountry?.isoName2 }] as const,
    async ({ queryKey }) => {
      const { data } = await api.profiles.getCountryByIsoName(
        queryKey[1].isoName2 ?? ""
      );

      return data?.data.country;
    },
    {
      enabled: Boolean(activeCountry?.isoName2),
    }
  );

  React.useEffect(
    function updateBundlesByDataAmount() {
      if (!countryByIsoName) return;
      const existingBundlesBySelectedDataAmount = countryByIsoName.bundles[
        selectedDataSize
      ] as Bundle[] | undefined;

      // update the data size if there is no match for the currently selected data size
      if (!existingBundlesBySelectedDataAmount) {
        setSelectedDataSize(countryByIsoName.availableDataAmounts[0]);
      }

      setBundlesByDataAmount(
        existingBundlesBySelectedDataAmount ??
          countryByIsoName.bundles[countryByIsoName.availableDataAmounts[0]]
      );
    },
    [countryByIsoName, selectedDataSize]
  );

  const handleActiveCountryChange = (country: Country | null) => {
    scrollToId(SectionIDS.SearchYourDestination, 65);
    setActiveCountry(country);
    void router.push(
      { query: { ...router.query, region: country?.isoName2.toLowerCase() } },
      undefined,
      { scroll: false, shallow: true }
    );
  };

  React.useEffect(
    function searchForCountriesByFilterText() {
      if (debouncedFilterText) {
        void api.profiles
          .getCountriesByFilterText(debouncedFilterText, i18n.language)
          .then(({ data }) => {
            setFilteredCountries(data?.data ?? []);
            const existingActiveCountryInNewCountriesList = data?.data.find(
              ({ isoName2 }) => isoName2 === activeCountry?.isoName2
            );

            if (
              activeCountry &&
              !existingActiveCountryInNewCountriesList &&
              debouncedFilterText
            ) {
              setActiveCountry(null);
              void router.push("/");
            }
          });
      } else {
        setFilteredCountries(countries);
      }
    },
    [activeCountry, countries, debouncedFilterText, i18n.language, router]
  );

  React.useEffect(() => {
    setActiveCountry(
      (prev) =>
        countries.find(
          (el) => el.isoName2.toLowerCase() === router.query.region
        ) ?? prev
    );
  }, [countries, router.query.region]);

  return (
    <>
      <CoverageCountriesModal
        worldwide={isWorldwidePlanSelected}
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
      {activeCountry && (
        <SelectDataSizeButtons>
          <SelectedCountry>
            <div>
              <SelectedCountryFlagWrapper>
                <CountryFlag name={activeCountry.isoName2} />
              </SelectedCountryFlagWrapper>
              <SelectedCountryNameWrapper>
                <div>{activeCountry.country}</div>
                <div>{activeCountry.isoName2}</div>
              </SelectedCountryNameWrapper>
            </div>
            <button onClick={() => handleActiveCountryChange(null)}>
              <Image width={14} height={14} src={xmark} alt="x mark" />
            </button>
          </SelectedCountry>
          <SelectDataSizeButtonsWrapper>
            {countryByIsoName?.availableDataAmounts &&
              countryByIsoName.availableDataAmounts.map((size) => (
                <DataSizeButton
                  key={size}
                  active={selectedDataSize === size}
                  onClick={() => setSelectedDataSize(size)}
                >
                  {formatDataSize(size)}
                </DataSizeButton>
              ))}
          </SelectDataSizeButtonsWrapper>
        </SelectDataSizeButtons>
      )}
      {isLoading && isFetching && <Loader />}
      {activeCountry && !isLoading && (
        <BundlesWrapper>
          {bundlesByDataAmount
            ?.sort(
              (prevBundle, nextBundle) => prevBundle.price - nextBundle.price
            )
            .map(
              (
                {
                  name,
                  image,
                  price,
                  duration,
                  worldwide,
                  countries: supportedCountries,
                  currency,
                  ...rest
                },
                idx
              ) => (
                <MobileDataBundleCard
                  key={rest.paymentCode}
                  dataSize={rest.dataAmount}
                  title={name}
                  duration={duration}
                  img={image}
                  price={price}
                  supportedCountries={supportedCountries}
                  worldwide={worldwide}
                  embeddedHeader={
                    <CoverageCountriesOpenModalButton
                      onClick={() => {
                        setCoverageCountries(supportedCountries);
                        setIsWorldwidePlanSelected(!!worldwide);
                        openCoverageCountriesModal();
                      }}
                    />
                  }
                  embeddedFooter={
                    <GetPlanButton
                      dataAmount={rest.dataAmount}
                      providerType={rest.providerType}
                      price={price}
                      isoName2={rest.isoName2}
                      currency={currency}
                      isBestPrice={!idx}
                    />
                  }
                />
              )
            )}
        </BundlesWrapper>
      )}
      <CountriesCards ref={sectionRef}>
        {filteredCountries
          .slice(0, isViewingAll ? filteredCountries.length : 11)
          .map(({ country, isoName2, isoName, ...props }) => (
            <CountryCard
              key={country}
              onClick={() =>
                handleActiveCountryChange({
                  country,
                  isoName2,
                  isoName,
                  ...props,
                })
              }
            >
              <div>
                <CountryFlag
                  height={58}
                  width={58}
                  alt={isoName}
                  src={`https://static.esimplus.net/storage/flags/${isoName2.toLowerCase()}.svg`}
                />
              </div>
              <div>{country}</div>
            </CountryCard>
          ))}
        {!isViewingAll && filteredCountries.length > 9 && (
          <SeeAllCard onClick={() => setIsViewingAll(true)}>
            <div>
              <SeeAllIcon />
            </div>
            <div>See All</div>
          </SeeAllCard>
        )}
      </CountriesCards>
      {!filteredCountries.length && (
        <NoMatchesText>
          <Trans
            i18nKey="countries_not_found_by_filter"
            values={{ filter: debouncedFilterText }}
          />
        </NoMatchesText>
      )}
    </>
  );
}

export { LocalEsim };
