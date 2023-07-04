import styled from "styled-components";
import { Paragraph } from "@/shared/ui/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex: 1;

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
