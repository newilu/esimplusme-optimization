import styled from "styled-components";
import BaseHeader from "@/shared/ui/BaseHeader";
import { Wrapper as TableWrapper } from "@/shared/ui/BaseTable/styled";
import { PanelSection } from "@/shared/ui/styled";

export const CountryFlagWrapper = styled.div`
  flex: 0 0 28px;
  width: 28px;
  height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 4px;
`;
export const CountryNameWrapper = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 5px;

  a {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.1px;
    color: ${(props) => props.theme.primary};
  }

  @media (max-width: 430px) {
    a {
      font-size: 14px;
      line-height: 20px;
    }
  }
`;

export const Wrapper = styled(BaseHeader)`
  ${PanelSection} {
    &:first-of-type {
      border-radius: 25px 25px 5px 5px;
      background: ${(props) => props.theme.translucentCardsBg};
    }

    &:last-of-type {
      border-radius: 5px 5px 25px 25px;
    }
  }
  ${TableWrapper} {
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
  }
`;
