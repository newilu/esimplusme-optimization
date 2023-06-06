import React from "react";
import SwitchButtons from "@/entities/SwitchButtons";
import { CountriesCards, CountryCard, SeeAllCard } from "./styled";
import CountryFlag from "@/shared/ui/CountryFlag";
import SeeAllIcon from "@/features/LocalEsim/assets/SeeAll";
import SearchInput from "@/shared/ui/SearchInput";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";
import { Trans, useTranslation } from "next-i18next";
import { Country, Region } from "@/utils/types";
import { useRouter } from "next/router";
import { BASE_STORAGE_URL } from "@/shared/constants";
import { NoMatchesText } from "@/shared/ui/styled";

enum Regions {
  Local = "local_esim",
  Regional = "regional_esim",
  Global = "global_esim",
}

function NotSelectedView({
  countries,
  regions,
}: {
  regions: Region[];
  countries: Country[];
}) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [selectedRegion, setSelectedRegion] = React.useState(Regions.Local);
  const [searchForCountryInputValue, setSearchForCountryInputValue] =
    React.useState("");
  const [debouncedSearchForCountryInputValue] = useDebounce(
    searchForCountryInputValue,
    250
  );
  const [filteredCountries, setFilteredCountries] =
    React.useState<Country[]>(countries);
  const [filteredRegions, setFilteredRegions] =
    React.useState<Region[]>(regions);
  const [isViewingAll, setIsViewingAll] = React.useState(false);
  console.log(filteredRegions);
  useQuery(
    [
      "zxc-penis",
      { filter: debouncedSearchForCountryInputValue, lng: i18n.language },
    ] as const,
    ({ queryKey }) =>
      api.profiles.getCountriesByFilterText(
        queryKey[1].filter,
        queryKey[1].lng
      ),
    {
      enabled: Boolean(countries),
      onSuccess: ({ data }) => {
        setFilteredCountries(data?.data ?? countries);
        setFilteredRegions(
          data?.data
            ? regions.filter(({ id }) =>
                data.data.some(({ regionlist }) => regionlist.includes(id))
              )
            : regions
        );
      },
    }
  );

  const handleRegionSelect = async (_region: Regions) => {
    if (_region === Regions.Global) {
      await router.push("/esim/worldwide");
    }
    setSelectedRegion(_region);
  };

  return (
    <>
      <SearchInput
        value={searchForCountryInputValue}
        onChange={(e) => setSearchForCountryInputValue(e.target.value)}
        onClear={() => setSearchForCountryInputValue("")}
        placeholder={t("search_by_country")}
      />
      <SwitchButtons
        styledAsDropdown
        style={{ width: "fit-content", margin: "50px auto 35px auto" }}
        value={{ label: t(selectedRegion), value: selectedRegion }}
        onChange={({ value }) => handleRegionSelect(value as Regions)}
        options={Object.values(Regions).map((val) => ({
          label: t(val),
          value: val,
        }))}
      />
      {selectedRegion === Regions.Local && (
        <CountriesCards>
          {filteredCountries
            .slice(0, isViewingAll ? filteredCountries.length : 11)
            .map(({ country: _country, isoName2, isoName }) => (
              <CountryCard
                key={_country}
                onClick={() =>
                  router.push(
                    `/esim/${_country.toLowerCase().replaceAll(" ", "-")}`
                  )
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
                <div>{_country}</div>
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
      )}
      {selectedRegion === Regions.Regional && (
        <CountriesCards>
          {filteredRegions.map(({ name }) => (
            <CountryCard
              key={name}
              onClick={() =>
                router.push(`/esim/${name.toLowerCase().replaceAll(" ", "-")}`)
              }
            >
              <div>
                <CountryFlag
                  height={58}
                  width={58}
                  alt={name}
                  src={`${BASE_STORAGE_URL}130x80/${name}350.jpg`}
                />
              </div>
              <div>{name}</div>
            </CountryCard>
          ))}
        </CountriesCards>
      )}
      {selectedRegion === Regions.Local && !filteredCountries.length && (
        <NoMatchesText>
          <Trans
            i18nKey="countries_not_found_by_filter"
            values={{ filter: debouncedSearchForCountryInputValue }}
          />
        </NoMatchesText>
      )}
      {selectedRegion === Regions.Regional && !filteredRegions.length && (
        <NoMatchesText>
          <Trans
            i18nKey="regions_not_found_by_filter"
            values={{ filter: debouncedSearchForCountryInputValue }}
          />
        </NoMatchesText>
      )}
    </>
  );
}

export default NotSelectedView;
