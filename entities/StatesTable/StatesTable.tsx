import React from "react";
import type { ICountry, IState } from "country-cities";
import { useTranslation } from "next-i18next";
import { createColumnHelper } from "@tanstack/react-table";
import {
  formatAreaCode,
  formatStringToKebabCase,
  getCountryByIsoCode,
  removeExcludedWords,
} from "@/shared/lib";
import {
  MINIMAL_PHONE_NUMBER_PRICE,
  STATE_NAME_DEPRECATED_WORDS,
} from "@/shared/constants";
import CountryFlag from "@/shared/ui/CountryFlag";
import Button from "@/shared/ui/Button";
import { StateNameWrapper, Wrapper } from "./styled";

enum TableIDS {
  AreaCode = "area_code",
  State = "stete",
  ISOCode = "iso_code",
  MonthlyFee = "monthly_fee",
  Purchase = "purchase",
}

type StatesTableProps = {
  states: IState[];
  country: ICountry;
  phoneNumberStartingPrice: number | null;
  maxVisibleElements?: number | null;
};

const columnHelper = createColumnHelper<IState>();

function StatesTable({
  states,
  country,
  phoneNumberStartingPrice,
  maxVisibleElements = null,
}: StatesTableProps) {
  const { t } = useTranslation("virtual-phone-number");

  const stateAreaCodeColumn = React.useMemo(
    () =>
      columnHelper.accessor("countryCode", {
        id: TableIDS.AreaCode,
        header: () => t("area_code"),
        cell: () => formatAreaCode(country.phonecode),
      }),

    [country.phonecode, t]
  );

  const stateNameColumn = React.useMemo(
    () =>
      columnHelper.accessor("name", {
        id: TableIDS.State,
        header: () => t("state"),
        cell: (info) => (
          <StateNameWrapper
            href={`/virtual-phone-number/${formatStringToKebabCase(
              country.name
            )}/${formatStringToKebabCase(
              removeExcludedWords(info.getValue(), STATE_NAME_DEPRECATED_WORDS)
            )}`}
          >
            <CountryFlag
              width={28}
              height={21}
              name={info.row.original.countryCode}
            />
            {removeExcludedWords(info.getValue(), STATE_NAME_DEPRECATED_WORDS)}
          </StateNameWrapper>
        ),
      }),

    [country.name, t]
  );

  const phoneNumberPriceColumn = React.useMemo(
    () =>
      columnHelper.accessor("latitude", {
        id: TableIDS.MonthlyFee,
        header: () => t("monthly_fee"),
        cell: () =>
          t("from_amount_month", {
            price: (phoneNumberStartingPrice || MINIMAL_PHONE_NUMBER_PRICE) + 1,
          }),
      }),
    [phoneNumberStartingPrice, t]
  );

  const stateISOColumn = React.useMemo(
    () =>
      columnHelper.accessor("isoCode", {
        id: TableIDS.ISOCode,
        header: () => t("iso_code"),
        cell: (info) => info.getValue(),
      }),
    [t]
  );

  const purchaseButtonColumn = React.useMemo(
    () =>
      columnHelper.accessor("isoCode", {
        id: TableIDS.Purchase,
        header: () => t("buy"),
        cell: (info) => {
          return (
            <Button
              style={{ margin: "0 auto" }}
              as="a"
              href={`/virtual-phone-number/${formatStringToKebabCase(
                country.name
              )}/${formatStringToKebabCase(
                removeExcludedWords(
                  info.row.original.name,
                  STATE_NAME_DEPRECATED_WORDS
                )
              )}`}
              label={t("buy")}
              size="small"
            />
          );
        },
      }),
    [t]
  );

  return (
    <Wrapper
      maxVisibleElements={maxVisibleElements}
      columns={[
        stateAreaCodeColumn,
        stateNameColumn,
        stateISOColumn,
        phoneNumberPriceColumn,
        purchaseButtonColumn,
      ]}
      data={states}
    />
  );
}

export { StatesTable, type StatesTableProps };
