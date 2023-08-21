import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { SecondPhoneCountry } from "@/utils/types";
import { Paragraph } from "@/shared/ui/styled";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
  formatStringToKebabCase,
  generateFakeNumber,
  getRandomInt,
} from "@/shared/lib";
import BaseTable from "@/shared/ui/BaseTable";
import {
  MINIMAL_PHONE_NUMBER_PRICE,
  SECOND_PHONE_SUPPORTED_COUNTRIES,
} from "@/shared/constants";
import { format } from "libphonenumber-js";
import CountryFlag from "@/shared/ui/CountryFlag";
import searchIcon from "./assets/search.svg";
import { PhoneNumberWrapper, Wrapper } from "./styled";

const columnHelper = createColumnHelper<
  SecondPhoneCountry & { phoneNumber: string }
>();

type NoNumbersAvailableViewProps = {
  countries: SecondPhoneCountry[];
};

function NoNumbersAvailableView({ countries }: NoNumbersAvailableViewProps) {
  const router = useRouter();
  const { t } = useTranslation("virtual-phone-number");
  const [phoneNumbersList, setPhoneNumbersList] = React.useState<
    (SecondPhoneCountry & { phoneNumber: string })[]
  >([]);

  const phoneNumberColumn = React.useMemo(
    () =>
      columnHelper.accessor("phoneNumber", {
        header: () => t("numbers"),
        cell: (info) => (
          <PhoneNumberWrapper>
            <CountryFlag width={28} height={20} name={info.row.original.code} />{" "}
            {format(info.getValue(), "INTERNATIONAL")}
          </PhoneNumberWrapper>
        ),
      }),

    [t]
  );

  const connectionFeeColumn = React.useMemo(
    () =>
      columnHelper.accessor("prices.cheapest.price", {
        header: () => t("connection_monthly_fee"),
        cell: (info) =>
          `${(info.getValue() || MINIMAL_PHONE_NUMBER_PRICE) + 1}$`,
      }),
    [t]
  );

  const handleRowClick = React.useCallback(
    ({
      country,
      phoneNumber,
    }: SecondPhoneCountry & { phoneNumber: string }) => {
      const search = new URLSearchParams([
        ["country", formatStringToKebabCase(country)],
        ["phone", phoneNumber],
      ]);

      router.push(`/virtual-phone-number/payment?${search.toString()}`);
    },
    [router]
  );

  React.useEffect(() => {
    setPhoneNumbersList(
      Array.from(Array(20))
        .map(() => {
          const randCountryIso =
            SECOND_PHONE_SUPPORTED_COUNTRIES[
              getRandomInt(0, SECOND_PHONE_SUPPORTED_COUNTRIES.length - 1)
            ];

          const country = countries.find(({ code }) => code === randCountryIso);
          if (!country) return null;

          return {
            ...country,
            phoneNumber: generateFakeNumber(country.code, country.prefix),
          };
        })
        .filter(
          (i): i is SecondPhoneCountry & { phoneNumber: string } => i !== null
        )
    );
  }, [countries]);

  return (
    <Wrapper>
      <div>
        <Image width={120} height={100} src={searchIcon} alt="" />
        <Paragraph>
          We&apos;re sorry, there are currently no available numbers. Feel free
          to check back later, select a different country or region, or{" "}
          <Link href="mailto:ask.esimplus@appvillis.com" target="_blank">
            Request Number
          </Link>{" "}
          to notify us about your preference. Your patience and understanding
          are greatly appreciated!
        </Paragraph>
      </div>
      {Boolean(phoneNumbersList.length) && (
        <div>
          <BaseTable
            onRowClick={handleRowClick}
            maxVisibleElements={null}
            data={phoneNumbersList}
            columns={[phoneNumberColumn, connectionFeeColumn]}
          />
        </div>
      )}
    </Wrapper>
  );
}

export { NoNumbersAvailableView, type NoNumbersAvailableViewProps };
