import styled, { css } from "styled-components";
import BaseHeader from "@/shared/ui/BaseHeader";
import Link from "next/link";
import { PanelSection, PanelSectionsWrapper } from "@/shared/ui/styled";

export const GetNumberButton = styled(Link)`
  width: 100%;
  max-width: 300px;
  margin: 75px auto 0 auto;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: white;
  background: ${(props) => props.theme.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  border-radius: 10px;
  transition: 0.3s all var(--easing-func);

  &:active {
    scale: 0.95;
  }
`;

export const RegeneratePhoneNumberButton = styled.button`
  margin: 0 auto;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 4px;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: ${(props) => props.theme.primary};
  background: transparent;
  border: none;
`;

export const GeneratedPhoneNumber = styled.div`
  margin: 15px 0;
  text-align: center;
  font-weight: 700;
  font-size: 42px;
  line-height: 42px;
  color: ${(props) => props.theme.primaryText};

  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 42px;
  }
`;

export const SelectedCountryNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 8px;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  color: ${(props) => props.theme.primaryText};

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

export const CountryWrapper = styled.div<{ active?: boolean }>`
  padding: 16px;
  display: flex;
  align-items: center;
  grid-gap: 8px;
  font-weight: 600;
  font-size: 14.0733px;
  line-height: 21px;
  color: ${(props) => props.theme.primaryText};

  &:hover {
    background: ${(props) => props.theme.tableItemHoverBg};
  }

  span {
    font-weight: 400;
    font-size: 14.0733px;
    line-height: 21px;
    color: ${(props) => props.theme.primary};
  }

  ${(props) =>
    props.active &&
    css`
      background: ${props.theme.tableItemHoverBg};
    `}
`;

export const CountryListWrapper = styled.div`
  height: 100%;
  flex: 1;
  max-height: 400px;
  overflow: auto;
`;

export const Wrapper = styled(BaseHeader)`
  ${PanelSection}:first-of-type {
    position: relative;

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      background: ${(props) => props.theme.tableBottomBlur};
    }
  }
  ${PanelSection}:last-of-type {
    padding: 50px 16px;
  }

  @media (max-width: 768px) {
    ${PanelSectionsWrapper} {
      flex-direction: column;
      ${PanelSection} {
        flex: 1;
        &:first-of-type:not(&:only-of-type) {
          background: ${(props) => props.theme.translucentCardsBg};
          border-radius: 25px 25px 5px 5px;
        }
        &:last-of-type:not(&:only-of-type) {
          background: ${(props) => props.theme.panelSectionBg};
          border-radius: 5px 5px 25px 25px;
        }
      }
    }
  }
`;
