import MobileDataBundleCard from "@/entities/MobileDataBundleCard";
import Button from "@/shared/ui/Button";
import CountryFlag from "@/shared/ui/CountryFlag";
import SearchInput from "@/shared/ui/SearchInput";
import { Container } from "@/shared/ui/styled";
import {
  Bundle,
  CountryByISO,
  Country as CountryType,
  RegionById,
  Region,
} from "@/utils/types";
import React from "react";
import CoverageCountriesOpenModalButton from "@/entities/CoverageCountriesOpenModalButton";
import GetPlanButton from "@/entities/GetPlanButton";
import { useModalControls } from "@/shared/hooks";
import CoverageCountriesModal from "@/entities/CoverageCountriesModal";
import { formatDataSize, getCurrencySymbol } from "@/shared/lib";
import { Trans, useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { BASE_STORAGE_URL } from "@/shared/constants";
import NotSelectedView from "@/widgets/MobileDataPlanHeader/NotSelectedView";
import {
  AvailableDataSizes,
  BundleCapability,
  BundleCapabilities,
  CardsWrapper,
  MobileDataBundleBanner,
  SelectedCountry,
  SelectedCountryImageWrapper,
  Wrapper,
  MobileDataBundleBannerHeader,
} from "./styled";

type MobileDataPlanHeaderProps<
  Country extends CountryByISO | undefined = undefined,
  _Region extends RegionById | undefined = undefined
> = Country extends CountryByISO
  ? {
      country: Country;
      countries?: never;
      regions?: never;
      region?: never;
    }
  : _Region extends RegionById
  ? {
      country?: never;
      countries?: never;
      regions?: never;
      region: _Region;
    }
  : {
      country?: never;
      region?: never;
      regions: Region[];
      countries: CountryType[];
    };

function MobileDataPlanHeader<
  Country extends CountryByISO | undefined = undefined,
  Region extends RegionById | undefined = undefined
>({
  country,
  countries,
  regions,
  region,
}: MobileDataPlanHeaderProps<Country, Region>) {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedDataAmount, setSelectedDataAmount] = React.useState<
    number | null
  >(null);
  const [searchForCountryInputValue, setSearchForCountryInputValue] =
    React.useState(country?.country ?? region?.name);
  const [coverageCountries, setCoverageCountries] = React.useState<
    Bundle["countries"]
  >([]);
  const [isWorldwidePlanSelected, setIsWorldwidePlanSelected] =
    React.useState(false);

  const {
    isOpen: isCoverageCountriesModalOpen,
    closeModal: closeCoverageCountriesModal,
    openModal: openCoverageCountriesModal,
  } = useModalControls(false, { disableBodyScroll: true });

  const handleSearchForCountryInputChange = (value: string) => {
    void router.push("/esim", undefined, {
      scroll: false,
      shallow: true,
    });
    setSearchForCountryInputValue(value);
  };

  return (
    <Wrapper>
      <CoverageCountriesModal
        worldwide={isWorldwidePlanSelected}
        closeModal={closeCoverageCountriesModal}
        isOpen={isCoverageCountriesModalOpen}
        supportedCountries={coverageCountries}
      />
      <h1>Mobile data with eSIM</h1>
      <h2>
        Get a fast, secure, and stable Internet connection without overpaying
        mobile carriers!
      </h2>
      <Container>
        {typeof regions !== "undefined" && typeof countries !== "undefined" && (
          <NotSelectedView countries={countries} regions={regions} />
        )}
        {(country || region) && (
          <>
            <SearchInput
              value={searchForCountryInputValue}
              onChange={(e) =>
                handleSearchForCountryInputChange(e.target.value)
              }
              onClear={() => handleSearchForCountryInputChange("")}
              placeholder={t("search_by_country")}
            />
            <SelectedCountry>
              <SelectedCountryImageWrapper>
                <CountryFlag
                  width={64}
                  height={64}
                  name={country?.isoName2}
                  src={
                    region &&
                    `${BASE_STORAGE_URL}130x80/${
                      region.worldwide ? "Pay-as-you-go" : region.name
                    }350.jpg`
                  }
                />
              </SelectedCountryImageWrapper>
              {country?.country ?? region?.name}
            </SelectedCountry>
            <AvailableDataSizes>
              <Button
                label="All"
                variant={selectedDataAmount ? "outlined" : "secondary"}
                onClick={() => setSelectedDataAmount(null)}
                size="small"
              />
              {(
                country?.availableDataAmounts ??
                region?.availableDataAmounts ??
                []
              ).map((el) => (
                <Button
                  key={el}
                  label={formatDataSize(el)}
                  variant={el === selectedDataAmount ? "secondary" : "outlined"}
                  onClick={() => setSelectedDataAmount(el)}
                  size="small"
                />
              ))}
            </AvailableDataSizes>
            <CardsWrapper>
              <MobileDataBundleBanner>
                <MobileDataBundleBannerHeader>
                  <div>
                    <CountryFlag
                      width={40}
                      height={40}
                      name={country?.isoName2}
                      src={
                        region &&
                        `${BASE_STORAGE_URL}130x80/${
                          region.worldwide ? "Pay-as-you-go" : region.name
                        }350.jpg`
                      }
                    />
                  </div>
                  Получи 5 GB
                </MobileDataBundleBannerHeader>
                <BundleCapabilities>
                  <BundleCapability>
                    <div>{formatDataSize(5000)}</div>
                    <div>{t("traffic")}</div>
                  </BundleCapability>{" "}
                  <BundleCapability>
                    <div>
                      <Trans
                        i18nKey="duration_in_days"
                        values={{
                          days: 7,
                        }}
                      />
                    </div>
                    <div>{t("duration")}</div>
                  </BundleCapability>{" "}
                  <BundleCapability>
                    <div>11</div>
                    <div>{t("countries")}</div>
                  </BundleCapability>
                </BundleCapabilities>
                <Button
                  label={`${t("buy_a_plan_for")} ${getCurrencySymbol(
                    "USD"
                  )}${66.99}`}
                />
              </MobileDataBundleBanner>
              {(selectedDataAmount
                ? Object.values(
                    (country?.bundles ?? region?.bundles)?.[
                      selectedDataAmount
                    ] ?? {}
                  )
                : Object.values(country?.bundles ?? region?.bundles ?? {})
              )
                .flat()
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
            </CardsWrapper>
            <Button
              style={{ margin: "0 auto 35px auto" }}
              variant="outlined"
              label={t("show_all_countries")}
              onClick={() => router.push("/esim")}
            />
          </>
        )}
      </Container>
    </Wrapper>
  );
}

export { MobileDataPlanHeader, type MobileDataPlanHeaderProps };
