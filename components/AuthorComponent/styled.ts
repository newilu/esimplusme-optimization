import styled, { css } from "styled-components";
import { AuthorComponentProps } from "@/components/AuthorComponent/AuthorComponent";

export const AuthorTagline = styled.div`
  opacity: 0.5;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => props.theme.secondaryText};

  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 14px;
  }
`;
export const AuthorName = styled.div`
  font-weight: 700;
  font-size: 42px;
  line-height: 42px;
  color: ${(props) => props.theme.primaryText};
  margin-bottom: 4px;

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 32px;
  }
`;
export const AuthorImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100vmax;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    min-width: 100%;
    width: auto;
    height: auto;
    min-height: 100%;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;
export const Wrapper = styled.div<Pick<AuthorComponentProps, "size">>`
  display: flex;
  align-items: center;
  grid-gap: 10px;

  ${(props) => {
    switch (props.size) {
      case "small":
        return css`
          ${AuthorImageWrapper} {
            width: 40px;
            height: 40px;
          }
          ${AuthorName} {
            font-weight: 500;
            font-size: 14px;
            line-height: 14px;
          }
          ${AuthorTagline} {
            font-size: 12px;
            line-height: 14px;
          }
        `;
      default:
        return css``;
    }
  }}
`;
