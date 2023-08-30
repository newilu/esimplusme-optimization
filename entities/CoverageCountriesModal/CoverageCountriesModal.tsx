import React from "react";
import { useDebounce } from "use-debounce";
import { Trans, useTranslation } from "next-i18next";
import type { Bundle } from "utils/types";
import { NoMatchesText } from "shared/ui/styled";
import api from "api";
import Modal from "shared/ui/Modal";
import SearchInput from "shared/ui/SearchInput";
import CountryFlag from "shared/ui/CountryFlag";
import {
  CoverageCountries,
  CoverageCountry,
  CoverageCountryName,
  CoverageCountryPrice,
} from "./styled";

function CoverageCountriesModal({
  isOpen,
  worldwide,
  closeModal,
  supportedCountries = [],
  disableSearch,
}: {
  isOpen: boolean;
  disableSearch?: boolean;
  closeModal: () => void;
  supportedCountries?: Bundle["countries"];
  worldwide?: boolean;
}) {
  const { t, i18n } = useTranslation();
  const [filteredCountries, setFilteredCountries] =
    React.useState<Bundle["countries"]>(supportedCountries);
  const [filterText, setFilterText] = React.useState("");
  const [debouncedFilterText] = useDebounce(filterText, 500);

  React.useEffect(() => {
    if (debouncedFilterText && !disableSearch) {
      api.profiles
        .getCountriesByFilterText(debouncedFilterText, i18n.language)
        .then(({ data }) => {
          setFilteredCountries(
            supportedCountries.filter(({ country }) =>
              data?.data.find((el) => el.country === country)
            )
          );
        });
    } else {
      setFilteredCountries(supportedCountries);
    }
  }, [
    debouncedFilterText,
    disableSearch,
    i18n.language,
    supportedCountries,
    worldwide,
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={t("coverage_countries")}
      style={{ height: "100%" }}
      content={
        <CoverageCountries>
          {!disableSearch && (
            <SearchInput
              placeholder={t("search_by_country")}
              onChange={(e) => {
                setFilterText(e.currentTarget.value.replaceAll(/[/|\\]/g, ""));
              }}
              value={filterText}
            />
          )}
          {!filteredCountries.length && (
            <NoMatchesText>
              <Trans
                i18nKey="countries_not_found_by_filter"
                values={{ filter: debouncedFilterText }}
              />
            </NoMatchesText>
          )}
          <div>
            {filteredCountries.map(({ country, isoName2, mtx, tc }) => (
              <CoverageCountry key={country}>
                <CoverageCountryName>
                  <div>
                    <CountryFlag width={42} height={42} name={isoName2} />
                  </div>
                  {country}
                </CoverageCountryName>
                {Boolean(worldwide) && (
                  <CoverageCountryPrice>${tc || mtx}/Mb</CoverageCountryPrice>
                )}
              </CoverageCountry>
            ))}
          </div>
        </CoverageCountries>
      }
    />
  );
}

export { CoverageCountriesModal };
