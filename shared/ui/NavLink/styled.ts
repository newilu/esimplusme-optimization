import styled, { css } from "styled-components";
import Link from "next/link";

export const Wrapper = styled(Link)<{ $isActive?: boolean }>`
  position: relative;
  text-decoration: none;
  padding: 0;
  color: inherit;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) =>
    props.$isActive &&
    css`
      color: ${props.theme.primary};
      > svg {
        color: ${props.theme.primary} !important;
      }
    `}
`;
