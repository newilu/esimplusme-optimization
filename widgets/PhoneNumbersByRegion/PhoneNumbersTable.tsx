import React from "react";
import { format } from "libphonenumber-js";
import { useRouter } from "next/router";
import { createColumnHelper } from "@tanstack/react-table";
import { PhoneToBuy } from "@/utils/types";
import PhoneSvg from "@/shared/assets/PhoneSVG";
import SmsSvg from "@/shared/assets/SmsSVG";
import { useTranslation } from "next-i18next";
import {
  PhoneNumber,
  PhoneNumberType,
  SvgWrapper,
  PurchasePhoneNumberButton,
  StyledBaseTable,
} from "@/features/PhoneNumbersTable/styled";

const columnHelper = createColumnHelper<PhoneToBuy>();

function PhoneNumbersTable({
  phones,
  onRowClick = () => { },
}: {
  phones: PhoneToBuy[];
  onRowClick?: (props: PhoneToBuy) => void;
}) {
  const { query, pathname, replace, asPath } = useRouter();
  const { t } = useTranslation("virtual-phone-number");

  const { city } = query;

  const phoneNumberColumn = React.useMemo(
    () =>
      columnHelper.accessor("phoneNumber", {
        header: () => <PhoneNumberType>{phones[0].numberType}</PhoneNumberType>,
        cell: (info) => (
          <div>
            <PhoneNumber>
              {format(info.getValue(), "INTERNATIONAL")}
            </PhoneNumber>
          </div>
        ),
      }),

    []
  );
  const phoneNumberSMSCapabilityColumn = React.useMemo(
    () =>
      columnHelper.accessor("capabilities.SMS", {
        header: () => t("sms"),
        cell: (info) => (
          <SvgWrapper active={info.getValue()}>
            <SmsSvg />
          </SvgWrapper>
        ),
      }),

    [t]
  );
  const phoneNumberCallsCapabilityColumn = React.useMemo(
    () =>
      columnHelper.accessor("capabilities.voice", {
        header: () => t("calls"),
        cell: (info) => (
          <SvgWrapper active={info.getValue()}>
            <PhoneSvg />
          </SvgWrapper>
        ),
      }),
    [t]
  );
  const purchaseButtonColumn = React.useMemo(
    () =>
      columnHelper.accessor("region", {
        header: "",
        cell: (info) => {
          const search = new URLSearchParams();
          search.append("phone", info.row.original.phoneNumber);

          return (
            <PurchasePhoneNumberButton
              href={`${asPath.split("?")[0]}?${search.toString()}`}
            >
              {t("buy")}
            </PurchasePhoneNumberButton>
          );
        },
      }),
    [asPath, t]
  );

  const columns = React.useMemo(
    () => [
      phoneNumberColumn,
      phoneNumberCallsCapabilityColumn,
      phoneNumberSMSCapabilityColumn,
      ...(pathname.includes("/payment") || pathname.includes("/mobile") || city
        ? []
        : [purchaseButtonColumn]),
    ],
    [
      city,
      pathname,
      phoneNumberCallsCapabilityColumn,
      phoneNumberColumn,
      phoneNumberSMSCapabilityColumn,
      purchaseButtonColumn,
    ]
  );

  const handleRowClick = async (_phone: PhoneToBuy) => {
    onRowClick(_phone);


    if (pathname.includes("/payment")) {
      const { phone, ...rest } = query;
      await replace(
        { query: { ...rest, phone: _phone.phoneNumber } },
        undefined,
        {
          shallow: true,
        }
      );
    }
  };

  return (
    <StyledBaseTable
      maxVisibleElements={null}
      enableRowSelection
      onRowClick={handleRowClick}
      data={phones}
      columns={columns}
    />
  );
}

export default PhoneNumbersTable;
