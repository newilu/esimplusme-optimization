import React from "react";
import type { ICountry, IState } from "country-cities";
import { Trans, useTranslation } from "next-i18next";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import {
  formatAreaCode,
  formatStringToKebabCase,
  getCountryByIsoCode,
} from "@/shared/lib";
import BaseTable from "@/shared/ui/BaseTable";
import CountryFlag from "@/shared/ui/CountryFlag";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import Button from "@/shared/ui/Button";
import {
  PanelSection,
  PanelSectionTitle,
  NoDataWrapper,
  PanelSectionsWrapper,
} from "@/shared/ui/styled";
import { StateNameWrapper, Wrapper } from "./styled";

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

  const purchaseButtonColumn = React.useMemo(
    () =>
      columnHelper.accessor("isoCode", {
        header: () => t("buy"),
        cell: (info) => {
          const countryName =
            getCountryByIsoCode(info.row.original.countryCode)?.name ?? "";

          return (
            <Button
              style={{ margin: "0 auto" }}
              as="a"
              href={`/virtual-phone-number/${formatStringToKebabCase(
                countryName
              )}/mobile`}
              label={t("buy")}
              size="small"
            />
          );
        },
      }),
    [country, t]
  );

  return (
    <Wrapper>
      <h1>
        {t("phone_number_regions_by_country_title", { country: country.name })}
      </h1>
      <p>
        <Trans
          i18nKey="virtual-phone-number:phone_number_regions_by_country_text"
          values={{
            country: country.name,
          }}
        />
      </p>
      <Breadcrumbs>
        <Link href="/">{t("common:home")}</Link>
        <Link href="/virtual-phone-number/pricing">
          {t("common:virtual_numbers")}
        </Link>
        <Link
          href={`/virtual-phone-number/${formatStringToKebabCase(
            country.name
          )}`}
        >
          {country.name}
        </Link>
      </Breadcrumbs>
      <PanelSectionsWrapper>
        <PanelSection>
          <PanelSectionTitle>
            {t("regions")}{" "}
            <Link href="/virtual-phone-number/pricing">{t("change")}</Link>
          </PanelSectionTitle>
          {states.length ? (
            <BaseTable
              maxVisibleElements={null}
              columns={[
                stateAreaCodeColumn,
                stateNameColumn,
                purchaseButtonColumn,
              ]}
              data={states}
            />
          ) : (
            <NoDataWrapper>{t("no_states_for_this_country")}</NoDataWrapper>
          )}
        </PanelSection>
      </PanelSectionsWrapper>
    </Wrapper>
  );
}

export { PhoneNumberRegionsByCountry, type PhoneNumberRegionsByCountryProps };
