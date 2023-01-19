import React from "react";
import { v4 } from "uuid";
import { GridItem, GridWrapper, Wrapper } from "./styled";
import Pagination from "./Pagination";
import { useWindowSize } from "@/context/WindowSizeContext";

function PaginatedGridView({ items = [] }: { items?: React.ReactNode[] }) {
  const { isMobile } = useWindowSize();
  const [pageCount, setPageCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setPageCount(Math.ceil(items.length / 6));
  }, [items]);

  return (
    <Wrapper>
      <GridWrapper id="paginated_grid_content">
        {items.slice(6 * currentPage, 6 * currentPage + 6).map((el) => (
          <GridItem key={v4()}>{el}</GridItem>
        ))}
      </GridWrapper>
      {pageCount >= 2 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          maxLength={isMobile ? 5 : 7}
          lastPage={pageCount - 1}
        />
      )}
    </Wrapper>
  );
}

export { PaginatedGridView };
