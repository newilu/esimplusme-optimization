import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import type { ICountry, IState } from "country-cities";
import { useTranslation } from "next-i18next";
import { createColumnHelper } from "@tanstack/react-table";
import {
  formatAreaCode,
  formatStringToKebabCase,
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
  const router = useRouter();
  const { t } = useTranslation("virtual-phone-number");

  const params = new URLSearchParams(router.query as {})
  const paramsString = params.toString().length > 0 ? `?${params.toString()}` : '';

  const getHref = useCallback((state: IState) => {
    const formatedCountryName = formatStringToKebabCase(country.name);
    if (state.name === 'Mobile') {
      return `/virtual-phone-number/${formatedCountryName}/mobile${paramsString}`
    }
    const formatedStateName = formatStringToKebabCase(
      removeExcludedWords(state.name, STATE_NAME_DEPRECATED_WORDS),
    )
    return `/virtual-phone-number/${formatedCountryName}/${formatedStateName}${paramsString}`
  }, [paramsString, country.name])

  const stateAreaCodeColumn = useMemo(
    () =>
      columnHelper.accessor("countryCode", {
        id: TableIDS.AreaCode,
        header: () => t("area_code"),
        cell: () => formatAreaCode(country.phonecode),
      }),

    [country.phonecode, t]
  );

  const stateNameColumn = useMemo(
    () =>
      columnHelper.accessor("name", {
        id: TableIDS.State,
        header: () => t("state"),
        cell: (info) => (
          <StateNameWrapper href={getHref(info.row.original)}>
            <CountryFlag
              width={28}
              height={21}
              name={info.row.original.countryCode}
            />
            {removeExcludedWords(info.getValue(), STATE_NAME_DEPRECATED_WORDS)}
          </StateNameWrapper>
        ),
      }),

    [getHref, t]
  );

  const phoneNumberPriceColumn = useMemo(
    () =>
      columnHelper.accessor("latitude", {
        id: TableIDS.MonthlyFee,
        header: () => t("monthly_fee"),
        cell: () => `${(phoneNumberStartingPrice || MINIMAL_PHONE_NUMBER_PRICE) + 1}$`,
      }),
    [phoneNumberStartingPrice, t]
  );

  const stateISOColumn = useMemo(
    () =>
      columnHelper.accessor("isoCode", {
        id: TableIDS.ISOCode,
        header: () => t("iso_code"),
        cell: (info) => info.getValue(),
      }),
    [t]
  );

  const purchaseButtonColumn = useMemo(
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

  const statesWithMobile = useMemo(() => {
    if (states.length > 0) {
      const mobileField = {
        name: "Mobile",
        phonecode: country.phonecode,
        countryCode: country.isoCode,
        isoCode: '',
        flag: '',
        currency: '',
        latitude: '',
        longitude: '',
      } as IState;
      const start = states.length - 1 > 10 ? 10 : states.length - 1
      return [...states.slice(0, start), mobileField, ...states.slice(start + 1)]
    }
    return states
  }, [states, country.phonecode, country.isoCode])

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
      onRowClick={(data) => { router.push(getHref(data)) }}
      data={statesWithMobile}
    />
  );
}

export { StatesTable, type StatesTableProps };
