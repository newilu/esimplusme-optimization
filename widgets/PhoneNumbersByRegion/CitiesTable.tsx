import React from "react";
import { ICity } from "country-cities";
import { createColumnHelper } from "@tanstack/react-table";
import {
  formatAreaCode,
  formatStringToKebabCase,
  getCountryByIsoCode,
  getStateByCode,
} from "@/shared/lib";
import Link from "next/link";
import { StyledCitiesTable } from "./styled";
import { useTranslation } from "next-i18next";

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
            state?.name ?? ""
          )}/${formatStringToKebabCase(info.getValue())}`;

          return <Link href={href}>{info.getValue()}</Link>;
        },
      }),

    [t]
  );
  return (
    <StyledCitiesTable
      columns={[areaCodeColumn, cityNameColumn]}
      data={cities}
    />
  );
}

export default CitiesTable;
