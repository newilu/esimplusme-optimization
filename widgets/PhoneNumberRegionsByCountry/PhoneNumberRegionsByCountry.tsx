import { PanelSection, PanelSectionTitle } from "@/shared/ui/styled";
import BaseTable from "@/shared/ui/BaseTable";
import React from "react";
import { StateNameWrapper, Wrapper } from "./styled";
import { createColumnHelper } from "@tanstack/react-table";
import { ICountry, IState } from "country-cities";
import CountryFlag from "@/shared/ui/CountryFlag";
import { formatAreaCode, formatStringToKebabCase } from "@/shared/lib";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { NoDataWrapper } from "@/shared/ui/styled";

type PhoneNumberRegionsByCountryProps = {
  states: IState[];
  country: ICountry;
};

const columnHelper = createColumnHelper<IState>();

function PhoneNumberRegionsByCountry({
  country,
  states,
}: PhoneNumberRegionsByCountryProps) {
  const { t } = useTranslation("virtual-phone-number");
  const stateAreaCodeColumn = React.useMemo(
    () =>
      columnHelper.accessor("countryCode", {
        header: () => t("area_code"),
        cell: () => formatAreaCode(country.phonecode),
      }),

    [country.phonecode, t]
  );
  const stateNameColumn = React.useMemo(
    () =>
      columnHelper.accessor("name", {
        header: () => t("state"),
        cell: (info) => (
          <StateNameWrapper
            href={`/virtual-phone-number/${formatStringToKebabCase(
              country.name
            )}/${formatStringToKebabCase(info.getValue())}`}
          >
            <CountryFlag
              width={28}
              height={21}
              name={info.row.original.countryCode}
            />
            {info.getValue()}
          </StateNameWrapper>
        ),
      }),

    [country.name, t]
  );
  return (
    <Wrapper>
      <h1>{t("phone_number_regions_by_country_title")}</h1>
      <h5>
        in{" "}
        <CountryFlag
          name={country.isoCode}
          width={32}
          height={24}
          borderRadius={5}
        />{" "}
        {country.phonecode} {country.name}
      </h5>
      <PanelSection>
        <PanelSectionTitle>
          {t("regions")}{" "}
          <Link href={`/virtual-phone-number/pricing`}>{t("change")}</Link>
        </PanelSectionTitle>
        {states.length ? (
          <BaseTable
            maxVisibleElements={8}
            columns={[stateAreaCodeColumn, stateNameColumn]}
            data={states}
          />
        ) : (
          <NoDataWrapper>{t("no_states_for_this_country")}</NoDataWrapper>
        )}
      </PanelSection>
    </Wrapper>
  );
}

export { PhoneNumberRegionsByCountry, type PhoneNumberRegionsByCountryProps };
