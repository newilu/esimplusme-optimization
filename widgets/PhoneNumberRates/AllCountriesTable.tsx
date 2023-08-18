import React from "react";
import {
  CountryFlagWrapper,
  CountryNameWrapper,
} from "@/widgets/PhoneNumberRates/styled";

import CountryFlag from "@/shared/ui/CountryFlag";
import Link from "next/link";
import BaseTable from "@/shared/ui/BaseTable";
import { createColumnHelper } from "@tanstack/react-table";
import { formatAreaCode, formatStringToKebabCase } from "@/shared/lib";
import { useTranslation } from "next-i18next";
import { ICountry } from "country-cities";
import { useRouter } from "next/router";

const columnHelper = createColumnHelper<ICountry>();

function PopularCountriesTable({ countries }: { countries: ICountry[] }) {
  const router = useRouter();
  const { t } = useTranslation("virtual-phone-number");

  const areaCodeColumn = React.useMemo(
    () =>
      columnHelper.accessor("phonecode", {
        header: () => t("area_code"),
        cell: (info) => {
          const prefix = info.getValue();
          return formatAreaCode(prefix);
        },
      }),

    [t]
  );
  const countryNameColumn = React.useMemo(
    () =>
      columnHelper.accessor("name", {
        header: () => t("destination"),
        cell: (info) => (
          <CountryNameWrapper>
            <CountryFlagWrapper>
              <CountryFlag
                width={28}
                height={28}
                name={info.row.original.isoCode}
              />
            </CountryFlagWrapper>{" "}
            <Link
              href={{
                pathname: `/virtual-phone-number/${formatStringToKebabCase(
                  info.getValue()
                )}`,
                query: router.query
              }}
            >
              {info.getValue()}
            </Link>
          </CountryNameWrapper>
        ),
      }),

    [t]
  );

  return (
    <BaseTable
      onRowClick={({ name }) => {
        router.push({
          pathname: `/virtual-phone-number/${formatStringToKebabCase(name)}`,
          query: router.query
        })
      }}
      maxVisibleElements={null}
      data={countries}
      columns={[areaCodeColumn, countryNameColumn]}
    />
  );
}

export default PopularCountriesTable;
