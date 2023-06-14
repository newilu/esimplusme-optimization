import React from "react";
import {
  CountryFlagWrapper,
  CountryNameWrapper,
} from "@/widgets/PhoneNumberRates/styled";

import CountryFlag from "@/shared/ui/CountryFlag";
import Link from "next/link";
import { SecondPhoneCountry } from "@/utils/types";
import BaseTable from "@/shared/ui/BaseTable";
import { createColumnHelper } from "@tanstack/react-table";
import { formatAreaCode } from "@/shared/lib";
import { useTranslation } from "next-i18next";

const columnHelper = createColumnHelper<SecondPhoneCountry>();

function PopularCountriesTable({
  countries,
}: {
  countries: SecondPhoneCountry[];
}) {
  const { t } = useTranslation("virtual-phone-number");

  const areaCodeColumn = React.useMemo(
    () =>
      columnHelper.accessor("prefix", {
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
      columnHelper.accessor("country", {
        header: () => t("destination"),
        cell: (info) => (
          <CountryNameWrapper>
            <CountryFlagWrapper>
              <CountryFlag
                width={28}
                height={28}
                name={info.row.original.code}
              />
            </CountryFlagWrapper>{" "}
            <Link
              href={`/virtual-phone-number/${info
                .getValue()
                .toLowerCase()
                .replaceAll(/[^a-zA-Z -]/gi, "")
                .replaceAll(" ", "-")}`}
            >
              {info.getValue()}
            </Link>
          </CountryNameWrapper>
        ),
      }),

    [t]
  );
  const monthlyFeeColumn = React.useMemo(
    () =>
      columnHelper.accessor("prices.cheapest.price", {
        header: () => (
          <div style={{ textAlign: "left" }}>{t("monthly_fee")}</div>
        ),
        cell: (info) => (
          <div style={{ textAlign: "left" }}>
            <b>${info.getValue()}</b> / Month
          </div>
        ),
      }),

    [t]
  );

  return (
    <BaseTable
      maxVisibleElements={10}
      data={countries}
      columns={[areaCodeColumn, countryNameColumn, monthlyFeeColumn]}
    />
  );
}

export default PopularCountriesTable;
