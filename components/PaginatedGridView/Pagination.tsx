import React from "react";
import { getPaginationItems } from "lib/pagination";
import Image from "next/image";
import arrow from "public/staticfiles/arrow-right-black.svg";
import {
  NextPageButton,
  PageSwitchButton,
  PageSwitchButtonsWrapper,
  PaginationButtonsWrapper,
  PrevPageButton,
} from "./styled";

export type Props = {
  currentPage: number;
  lastPage: number;
  maxLength: number;
  setCurrentPage: (page: number) => void;
};

export default function Pagination({
  currentPage = 1,
  lastPage,
  maxLength,
  setCurrentPage,
}: Props) {
  const pageNums = getPaginationItems(currentPage, lastPage, maxLength);

  return (
    <PaginationButtonsWrapper>
      <PrevPageButton
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <Image width={24} height={24} src={arrow} alt="" />
        Previous
      </PrevPageButton>
      <PageSwitchButtonsWrapper>
        {pageNums.map((pageNum, idx) => (
          <PageSwitchButton
            key={idx}
            active={currentPage === pageNum}
            disabled={isNaN(pageNum)}
            onClick={() => setCurrentPage(pageNum)}
          >
            {!isNaN(pageNum) ? pageNum : "..."}
          </PageSwitchButton>
        ))}
      </PageSwitchButtonsWrapper>
      <NextPageButton
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
        <Image width={24} height={24} src={arrow} alt="" />
      </NextPageButton>
    </PaginationButtonsWrapper>
  );
}
