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
  SvgWrapper,
  PurchasePhoneNumberButton,
  StyledBaseTable,
} from "./styled";

const columnHelper = createColumnHelper<PhoneToBuy>();

function PhoneNumbersTable({
  phones,
  maxVisibleElements = 5,
  onRowClick = () => {},
}: {
  phones: PhoneToBuy[];
  onRowClick?: (props: PhoneToBuy) => void;
  maxVisibleElements?: number | null;
}) {
  const { query, pathname, replace } = useRouter();
  const { t } = useTranslation("virtual-phone-number");

  const { country, state, city } = query;

  const phoneNumberColumn = React.useMemo(
    () =>
      columnHelper.accessor("phoneNumber", {
        header: () => t('all_type_numbers', { type: phones[0].numberType }),
        cell: (info) => (
          <div>
            <PhoneNumber>
              {format(info.getValue(), "INTERNATIONAL")}
            </PhoneNumber>
          </div>
        ),
      }),

    [t]
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
        header: () => t("buy"),
        cell: (info) => {
          const search = new URLSearchParams();
          if (typeof country === "string") search.append("country", country);
          if (typeof state === "string") search.append("state", state);
          search.append("phone", info.row.original.phoneNumber);

          return (
            <PurchasePhoneNumberButton
              href={`/virtual-phone-number/payment?${search.toString()}`}
            >
              {t("buy")}
            </PurchasePhoneNumberButton>
          );
        },
      }),
    [country, state, t]
  );

  const columns = React.useMemo(() => {
    return [
      phoneNumberColumn,
      phoneNumberCallsCapabilityColumn,
      phoneNumberSMSCapabilityColumn,
      ...(pathname.includes("/payment") || pathname.includes("/mobile") || city
        ? []
        : [purchaseButtonColumn]),
    ];
  }, [
    city,
    pathname,
    phoneNumberCallsCapabilityColumn,
    phoneNumberColumn,
    phoneNumberSMSCapabilityColumn,
    purchaseButtonColumn,
  ]);

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
      maxVisibleElements={maxVisibleElements}
      enableRowSelection
      onRowClick={handleRowClick}
      data={phones}
      columns={columns}
    />
  );
}

export default PhoneNumbersTable;
