import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableWrapper,
  Td,
  Th,
} from "@/shared/ui/BaseHeader/styled";
import { PhoneToBuy } from "@/utils/types";
import PhoneSvg from "@/shared/assets/PhoneSVG";
import SmsSvg from "@/shared/assets/SmsSVG";
import { PhoneNumber, PhoneNumberType, SvgWrapper } from "./styled";
import { format } from "libphonenumber-js";

const MAX_VISIBLE_ELEMENTS = 5;

function PhoneNumbersTable({ phones }: { phones: PhoneToBuy[] }) {
  const [maxTableHeight, setMaxTableHeight] = React.useState(
    MAX_VISIBLE_ELEMENTS * 50
  );

  const phoneNumbersTableId = React.useId();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const tableRowNodeList = document
        .getElementById(phoneNumbersTableId)
        ?.getElementsByTagName("tr");

      if (tableRowNodeList) {
        const nodesArray = Array.from(tableRowNodeList);
        setMaxTableHeight(
          MAX_VISIBLE_ELEMENTS * nodesArray[1].scrollHeight +
            nodesArray[0].scrollHeight
        );
      }
    }
  }, [phoneNumbersTableId]);

  return (
    <TableWrapper
      id={phoneNumbersTableId}
      scrollable={phones.length >= MAX_VISIBLE_ELEMENTS}
    >
      <div style={{ maxHeight: maxTableHeight }}>
        <Table cellSpacing={0} cellPadding={0}>
          <TableHead>
            <TableRow>
              <Th>Все номера</Th>
              <Th>Звонки</Th>
              <Th>СМС</Th>
            </TableRow>
          </TableHead>
          <TableBody>
            {phones.map(({ phoneNumber, capabilities, numberType }) => (
              <TableRow key={phoneNumber}>
                <Td>
                  <div>
                    <PhoneNumberType>{numberType}</PhoneNumberType>
                    <PhoneNumber>{format(phoneNumber, "NATIONAL")}</PhoneNumber>
                  </div>
                </Td>
                <Td>
                  <SvgWrapper active={capabilities.SMS}>
                    <PhoneSvg />
                  </SvgWrapper>
                </Td>
                <Td>
                  <SvgWrapper active={capabilities.voice}>
                    <SmsSvg />
                  </SvgWrapper>
                </Td>
              </TableRow>
            ))}
            {phones.length >= MAX_VISIBLE_ELEMENTS && (
              <TableRow>
                <Td />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </TableWrapper>
  );
}

export default PhoneNumbersTable;
