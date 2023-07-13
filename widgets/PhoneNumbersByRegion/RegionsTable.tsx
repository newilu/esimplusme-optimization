import React from "react";
import type { ICountry, IState } from "country-cities";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import BaseTable from "@/shared/ui/BaseTable";

const columnHelper = createColumnHelper<IState>();

function RegionsTable({
  country,
  regions,
}: {
  country: ICountry;
  regions: IState[];
}) {
  const phoneCodeColumn = React.useMemo(
    () =>
      columnHelper.accessor("countryCode", {
        header: () => "Все номера",
        cell: () => country.phonecode,
      }),

    [country.phonecode]
  );
  const destinationColumn = React.useMemo(
    () =>
      columnHelper.accessor("name", {
        header: () => "Все номера",
        cell: (info) => <Link href="/">{info.getValue()}</Link>,
      }),

    []
  );

  return (
    <BaseTable
      maxVisibleElements={7}
      data={regions}
      columns={[phoneCodeColumn, destinationColumn]}
    />
  );
}

export default RegionsTable;
