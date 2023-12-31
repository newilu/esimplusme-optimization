import React from "react";
import {
  CountryFlagWrapper,
  CountryNameWrapper,
} from "@/widgets/PhoneNumberRates/styled";

import CountryFlag from "@/shared/ui/CountryFlag";
import Link from "next/link";
import { SecondPhoneCountry } from "@/utils/types";
import { createColumnHelper } from "@tanstack/react-table";
import { formatAreaCode, formatStringToKebabCase } from "@/shared/lib";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Wrapper } from "./styled";
import { DEFAULT_PHONE_NUMBER_PRICE } from "@/shared/constants";

const columnHelper = createColumnHelper<SecondPhoneCountry>();

function PopularCountriesTable({
  countries,
}: {
  countries: SecondPhoneCountry[];
}) {
  const router = useRouter();
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
              href={{
                pathname: `/virtual-phone-number/${formatStringToKebabCase(info.getValue())}`,
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
  const monthlyFeeColumn = React.useMemo(
    () =>
      columnHelper.accessor("prices.cheapest.price", {
        header: () => (
          <div style={{ textAlign: "left" }}>{t("monthly_fee")}</div>
        ),
        cell: (info) => {
          const price = info.getValue() || DEFAULT_PHONE_NUMBER_PRICE;
          return (
            <div style={{ textAlign: "left" }}>
              <b>${price + 1}</b>
            </div>
          );
        },
      }),

    [t]
  );

  return (
    <Wrapper
      onRowClick={({ country }) =>
        router.push({
          pathname: `/virtual-phone-number/${formatStringToKebabCase(country)}`,
          query: router.query,
        })
      }
      maxVisibleElements={10}
      data={countries}
      columns={[areaCodeColumn, countryNameColumn, monthlyFeeColumn]}
    />
  );
}

export { PopularCountriesTable };
