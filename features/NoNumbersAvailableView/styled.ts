import styled from "styled-components";
import { Paragraph } from "@/shared/ui/styled";

export const PhoneNumberWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex: 1;

  th:not(:first-child) {
    text-align: center !important;
  }

  td {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    cursor: pointer;
  }

  > div {
    &:first-child {
      padding: 10px 16px;
      text-align: center;

      ${Paragraph} {
        font-size: 13px;
        line-height: 16px;
      }
    }
  }
`;
