import React from "react";
import { ICity } from "country-cities";
import { useTranslation } from "next-i18next";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import {
  formatAreaCode,
  formatStringToKebabCase,
  getCountryByIsoCode,
  getStateByCode,
  removeExcludedWords,
} from "@/shared/lib";
import { STATE_NAME_DEPRECATED_WORDS } from "@/shared/constants";
import { StyledCitiesTable } from "./styled";

const columnHelper = createColumnHelper<ICity>();

function CitiesTable({ cities }: { cities: ICity[] }) {
  const { t } = useTranslation("virtual-phone-number");

  const areaCodeColumn = React.useMemo(
    () =>
      columnHelper.accessor("countryCode", {
        header: () => t("area_code"),
        cell: (info) =>
          formatAreaCode(
            getCountryByIsoCode(info.row.original.countryCode)?.phonecode ?? ""
          ),
      }),

    [t]
  );
  const cityNameColumn = React.useMemo(
    () =>
      columnHelper.accessor("name", {
        header: () => t("destination"),
        cell: (info) => {
          const country = getCountryByIsoCode(info.row.original.countryCode);
          const state = getStateByCode(
            info.row.original.stateCode,
            info.row.original.countryCode
          );

          const href = `/virtual-phone-number/${formatStringToKebabCase(
            country?.name ?? ""
          )}/${formatStringToKebabCase(
            removeExcludedWords(state?.name ?? "", STATE_NAME_DEPRECATED_WORDS)
          )}/${formatStringToKebabCase(info.getValue())}`;

          return <Link href={href}>{removeExcludedWords(info.getValue(), STATE_NAME_DEPRECATED_WORDS)}</Link>;
        },
      }),

    [t]
  );
  return (
    <StyledCitiesTable
      maxVisibleElements={null}
      columns={[areaCodeColumn, cityNameColumn]}
      data={cities}
    />
  );
}

export default CitiesTable;
