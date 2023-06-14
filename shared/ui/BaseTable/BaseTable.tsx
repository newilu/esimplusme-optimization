import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  TableBody,
  TableHead,
  TableRow,
  Td,
  Th,
  Table,
  Wrapper,
} from "./styled";

type BaseTableProps<TData extends {}> = {
  maxVisibleElements?: number;
  data: TData[];
  columns: ColumnDef<TData, any>[];
  onRowClick?: (props: TData) => void;
  enableRowSelection?: boolean;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

function BaseTable<TData extends {} = {}>({
  maxVisibleElements = 5,
  data,
  columns,
  onRowClick = () => {},
  enableRowSelection = false,
  ...props
}: BaseTableProps<TData>) {
  const [maxTableHeight, setMaxTableHeight] = React.useState(
    maxVisibleElements * 50
  );

  const tableId = React.useId();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const tableRowNodeList = document
        .getElementById(tableId)
        ?.getElementsByTagName("tr");

      if (tableRowNodeList && tableRowNodeList.length > 1) {
        const nodesArray = Array.from(tableRowNodeList);
        setMaxTableHeight(
          maxVisibleElements * nodesArray[1].scrollHeight +
            nodesArray[0].scrollHeight
        );
      }
    }
  }, [tableId, maxVisibleElements]);

  const table = useReactTable({
    data,
    columns,
    enableRowSelection,
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: false,
  });

  return (
    <Wrapper
      id={tableId}
      ref={props.ref as any}
      scrollable={data.length >= maxVisibleElements}
      {...props}
    >
      <div style={{ maxHeight: maxTableHeight }}>
        <Table cellSpacing={0} cellPadding={0}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => {
                  row.toggleSelected();
                  onRowClick(row.original);
                }}
                selected={row.getIsSelected()}
              >
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </TableRow>
            ))}
            {data.length >= maxVisibleElements && (
              <TableRow>
                <Td />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Wrapper>
  );
}

export { BaseTable, type BaseTableProps };
