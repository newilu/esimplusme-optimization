import React from "react";
import { format } from "libphonenumber-js";
import { createColumnHelper } from "@tanstack/react-table";
import { PhoneToBuy } from "@/utils/types";
import PhoneSvg from "@/shared/assets/PhoneSVG";
import SmsSvg from "@/shared/assets/SmsSVG";
import BaseTable from "@/shared/ui/BaseTable";
import { PhoneNumber, PhoneNumberType, SvgWrapper } from "./styled";
import { useTranslation } from "next-i18next";

const columnHelper = createColumnHelper<PhoneToBuy>();

function PhoneNumbersTable({
  phones,
  onRowClick,
}: {
  phones: PhoneToBuy[];
  onRowClick?: (props: PhoneToBuy) => void;
}) {
  const { t } = useTranslation("virtual-phone-number");

  const phoneNumberColumn = React.useMemo(
    () =>
      columnHelper.accessor("phoneNumber", {
        header: () => t("all_numbers"),
        cell: (info) => (
          <div>
            <PhoneNumberType>{info.row.original.numberType}</PhoneNumberType>
            <PhoneNumber>{format(info.getValue(), "NATIONAL")}</PhoneNumber>
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

  return (
    <>
      <BaseTable
        onRowClick={onRowClick}
        data={phones}
        columns={[
          phoneNumberColumn,
          phoneNumberCallsCapabilityColumn,
          phoneNumberSMSCapabilityColumn,
        ]}
      />
    </>
  );
}

export default PhoneNumbersTable;
