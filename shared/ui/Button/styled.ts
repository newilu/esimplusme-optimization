import styled, { css } from "styled-components";
import { ButtonProps } from "./Button";

export const Wrapper = styled.button<{
  variant: ButtonProps["variant"];
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  border: none;
  padding: 1.125rem 2rem;
  height: 55px;
  cursor: pointer;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  border-radius: 16px;

  &:has(> a) {
    padding: 0;

    > a {
      padding: 1.125rem 2rem;
    }
  }

  &:disabled,
  &:disabled:active {
    background: rgba(255, 255, 255, 0.25);
    color: rgba(255, 255, 255, 0.35);
    cursor: not-allowed;
  }

  > a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100% !important;
    `}

  ${(props) => {
    switch (props.variant) {
      case "secondary":
        return css`
          background: ${props.theme.primary};
          color: white;

          &:active {
            color: ${props.theme.primaryText};
            box-shadow: 0 0 0 1px ${props.theme.secondaryBtnBorder};
            background: ${props.theme.secondaryBtnBg};
          }
        `;
      case "thick-secondary":
        return css`
          height: 50px !important;
          font-weight: 400;
          background: ${props.theme.primary};
          color: white;
          border-radius: 10px;

          &:active {
            color: ${props.theme.primaryText};
            box-shadow: 0 0 0 1px ${props.theme.secondaryBtnBorder};
            background: ${props.theme.secondaryBtnBg};
          }
        `;
      case "outlined":
        return css`
          color: ${props.theme.primaryText};
          border: 1px solid ${props.theme.borderColor};
          background: transparent;

          &:active {
            color: white;
            background: ${props.theme.primary};
          }
        `;
      case "dark":
        return css`
          color: white;
          background: rgba(237, 240, 250, 0.1);

          &:active {
            color: white;
            background: rgba(237, 240, 250, 0.07);
          }
        `;
      default:
        return css`
          background: #0076ff;
          color: white;

          &:active {
            background: #ffffff;
            color: #000000;
          }
        `;
    }
  }}

  ${(props) => {
    switch (props.size) {
      case "small":
        return css`
          padding: 6px 12px;
          height: fit-content;
          width: auto;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          border-radius: 6px;
        `;
      case "medium":
        return css`
          padding: 1.125rem 2rem;
          height: 55px;
        `;
      default:
        return css`
          padding: 1.125rem 2rem;
          height: 55px;
        `;
    }
  }}
`;
