import React from "react";
import { v4 } from "uuid";
import { GridItem, GridWrapper, Wrapper } from "./styled";
import Pagination from "./Pagination";
import { useWindowSize } from "@/context/WindowSizeContext";

function PaginatedGridView({
  items = [],
  gap,
  totalPages,
}: {
  items?: React.ReactNode[];
  gap?: number;
  totalPages: number;
}) {
  const { isMobile } = useWindowSize();

  return (
    <Wrapper>
      <GridWrapper id="paginated_grid_content" gap={gap}>
        {items.map((el) => (
          <GridItem key={v4()}>{el}</GridItem>
        ))}
      </GridWrapper>
      {totalPages >= 2 && (
        <Pagination maxLength={isMobile ? 5 : 7} lastPage={totalPages} />
      )}
    </Wrapper>
  );
}

export { PaginatedGridView };
