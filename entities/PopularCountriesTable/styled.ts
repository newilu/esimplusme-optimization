import styled from "styled-components";
import BaseTable from "@/shared/ui/BaseTable";

export const Wrapper = styled(BaseTable)`
  td {
    cursor: pointer;
  }

  th {
    &:first-child {
      width: 105px;
    }
    &:nth-child(2) {
      text-align: left;
    }
    &:nth-child(3),
    &:nth-child(4) {
      width: 20%;
      text-align: center;
    }
  }

  td {
    &:nth-child(3),
    &:nth-child(4) {
      text-align: center;
    }
  }

  @media (max-width: 768px) {
    th {
      &:first-child {
        width: 70px;
      }
      &:nth-child(3),
      &:nth-child(4) {
        width: unset;
      }
    }
  }
` as typeof BaseTable;
