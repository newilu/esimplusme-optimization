import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { ICity } from "country-cities";
import { useTranslation } from "next-i18next";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import {
  formatStringToKebabCase,
  getCountryByIsoCode,
  getStateByCode,
  removeExcludedWords,
} from "@/shared/lib";
import { STATE_NAME_DEPRECATED_WORDS } from "@/shared/constants";
import { StyledCitiesTable } from "./styled";

const columnHelper = createColumnHelper<ICity>();

function CitiesTable({
  cities,
  areaCode,
}: {
  cities: ICity[];
  areaCode: string;
}) {
  const { t } = useTranslation("virtual-phone-number");
  const router = useRouter();
  const queryString = router.asPath.split("?")[1];

  const getHrefData = useCallback((city: ICity) => {
    const country = getCountryByIsoCode(city.countryCode);
    const state = getStateByCode(city.stateCode, city.countryCode);
    const countryName = formatStringToKebabCase(country?.name ?? "")
    const stateName = formatStringToKebabCase(
      removeExcludedWords(state?.name ?? "", STATE_NAME_DEPRECATED_WORDS),
    )
    const name = formatStringToKebabCase(city.name)

    return { pathname: `/virtual-phone-number/${countryName}/${stateName}/${name}`, query: queryString }
  }, [queryString])

  const areaCodeColumn = React.useMemo(
    () =>
      columnHelper.accessor("countryCode", {
        header: () => t("area_code"),
        cell: () => areaCode,
      }),

    [t, areaCode]
  );
  const cityNameColumn = React.useMemo(
    () =>
      columnHelper.accessor("name", {
        header: () => t("destination"),
        cell: (info) => (
          <Link href={getHrefData(info.row.original)}>
            {removeExcludedWords(info.getValue(), STATE_NAME_DEPRECATED_WORDS)}
          </Link>
        ),
      }),

    [t, getHrefData]
  );
  return (
    <StyledCitiesTable
      maxVisibleElements={null}
      columns={[areaCodeColumn, cityNameColumn]}
      data={cities}
      onRowClick={(data) => router.push(getHrefData(data))}
    />
  );
}

export default CitiesTable;
