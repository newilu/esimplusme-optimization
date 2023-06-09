import React from "react";
import {
  CountryFlagWrapper,
  CountryNameWrapper,
} from "@/widgets/PhoneNumbersRates/styled";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Td,
  Th,
} from "@/shared/ui/BaseHeader/styled";
import CountryFlag from "@/shared/ui/CountryFlag";
import Link from "next/link";
import { SecondPhoneCountry } from "@/utils/types";
import { CountriesTableWrapper } from "./styled";

const MAX_VISIBLE_ELEMENTS = 10;

function CountriesTable({ countries }: { countries: SecondPhoneCountry[] }) {
  const [maxTableHeight, setMaxTableHeight] = React.useState(
    MAX_VISIBLE_ELEMENTS * 50
  );

  const countriesTableId = React.useId();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const tableRowNodeList = document
        .getElementById(countriesTableId)
        ?.getElementsByTagName("tr");

      if (tableRowNodeList) {
        const nodesArray = Array.from(tableRowNodeList);
        setMaxTableHeight(
          MAX_VISIBLE_ELEMENTS * nodesArray[1].scrollHeight +
            nodesArray[0].scrollHeight
        );
      }
    }
  }, [countriesTableId]);

  return (
    <CountriesTableWrapper
      id={countriesTableId}
      scrollable={countries.length >= MAX_VISIBLE_ELEMENTS}
    >
      <div style={{ maxHeight: maxTableHeight }}>
        <Table cellSpacing={0} cellPadding={0}>
          <TableHead>
            <TableRow>
              <Th>Area code</Th>
              <Th>Destination</Th>
              <Th>Monthly fee</Th>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map(({ country, code, prefix }) => (
              <TableRow key={code}>
                <Td>+{prefix}</Td>
                <Td>
                  <CountryNameWrapper>
                    <CountryFlagWrapper>
                      <CountryFlag width={28} height={28} name={code} />
                    </CountryFlagWrapper>{" "}
                    <Link
                      href={`/virtual-phone-number/${country
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {country}
                    </Link>
                  </CountryNameWrapper>
                </Td>
                <Td>$2</Td>
              </TableRow>
            ))}
            {countries.length >= MAX_VISIBLE_ELEMENTS && (
              <TableRow>
                <Td />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </CountriesTableWrapper>
  );
}

export default CountriesTable;
