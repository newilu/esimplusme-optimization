import styled from "styled-components";
import BaseHeader from "@/shared/ui/BaseHeader";
import { PanelSection, PanelSectionTitle } from "@/shared/ui/styled";
import { Wrapper as TableWrapper } from "@/shared/ui/BaseTable/styled";

export const SectionsWrapper = styled.div`
  display: flex;
  grid-gap: 5px;
  max-width: 900px;
  margin: 0 auto;
  min-height: 400px;

  ${PanelSection} {
    &:first-of-type {
      &:not(&:only-of-type) {
        border-radius: 25px 5px 5px 25px;
      }

      display: flex;
      flex-direction: column;
      flex: 1 1 45%;

      > button {
        margin: 20px auto;
        width: calc(100% - 32px);
      }

      ${PanelSectionTitle}:first-child {
        border-bottom: 1px solid ${(props) => props.theme.borderColor};
        display: flex;
        align-items: center;
        justify-content: space-between;

        > div {
          > * {
            display: inline-flex !important;
            vertical-align: middle;
          }
        }

        a {
          font-weight: 400;
          font-size: 16px;
          line-height: 26px;
        }
      }
    }

    &:last-of-type {
      &:not(&:only-of-type) {
        border-radius: 5px 25px 25px 5px;
      }

      flex: 1 1 55%;
    }
  }

  @media (min-width: 769px) {
    ${PanelSection}:first-child {
      ${TableWrapper} {
        height: 100%;
        > div {
          max-height: unset !important;
          position: absolute;
          height: 100%;
          width: 100%;
        }
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    grid-gap: 5px;

    ${PanelSection} {
      width: 100%;
      margin: 0;

      &:first-child {
        &:not(&:only-of-type) {
          border-radius: 25px 25px 5px 5px;
        }
      }

      &:last-child {
        &:not(&:only-of-type) {
          border-radius: 5px 5px 25px 25px;
        }
      }
    }
  }
`;

export const Wrapper = styled(BaseHeader)``;
