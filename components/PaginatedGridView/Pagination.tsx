import React from "react";
import { getPaginationItems } from "lib/pagination";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import arrow from "public/staticfiles/arrow-right-black.svg";
import {
  NextPageButton,
  PageSwitchButton,
  PageSwitchButtonsWrapper,
  PaginationButtonsWrapper,
  PrevPageButton,
} from "./styled";

export type Props = {
  lastPage: number;
  maxLength: number;
};

export default function Pagination({ lastPage, maxLength }: Props) {
  const router = useRouter();
  const { t } = useTranslation();
  const currentPage = React.useMemo(() => {
    const { page = 1 } = router.query;
    return +page;
  }, [router.query]);
  const pageNums = getPaginationItems(currentPage, lastPage, maxLength);

  return (
    <PaginationButtonsWrapper>
      <PrevPageButton
        disabled={currentPage === 1}
        onClick={() =>
          void router.push({
            query: { ...router.query, page: currentPage - 1 },
          })
        }
      >
        <Image width={24} height={24} src={arrow} alt="" />
        {t("prev_page")}
      </PrevPageButton>
      <PageSwitchButtonsWrapper>
        {pageNums.map((pageNum, idx) => (
          <PageSwitchButton
            key={idx}
            active={currentPage === pageNum}
            disabled={isNaN(pageNum)}
            onClick={() =>
              void router.push({
                query: { ...router.query, page: pageNum },
              })
            }
          >
            {isNaN(pageNum) ? "..." : pageNum}
          </PageSwitchButton>
        ))}
      </PageSwitchButtonsWrapper>
      <NextPageButton
        disabled={currentPage === lastPage}
        onClick={() =>
          void router.push({
            query: { ...router.query, page: currentPage + 1 },
          })
        }
      >
        {t("next_page")}
        <Image width={24} height={24} src={arrow} alt="" />
      </NextPageButton>
    </PaginationButtonsWrapper>
  );
}
