import styled, { css } from "styled-components";
import Button from "@/shared/ui/Button";
import bestPrice from "./assets/best-price.svg";

export const StyledButton = styled(Button)<{ isBestPrice?: boolean }>`
  ${(props) =>
    props.isBestPrice &&
    css`
      position: relative;
      &:after {
        content: "";
        background: url(${bestPrice.src}) no-repeat center center;
        background-size: cover;
        width: 44px;
        height: 48px;
        position: absolute;
        right: 10px;
        top: -10px;
      }
    `}
`;
