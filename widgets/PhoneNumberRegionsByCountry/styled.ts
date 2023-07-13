import styled from "styled-components";
import BaseHeader from "@/shared/ui/BaseHeader";
import { Wrapper as TableWrapper } from "@/shared/ui/BaseTable/styled";
import { PanelSection, PanelSectionTitle } from "@/shared/ui/styled";

export const Wrapper = styled(BaseHeader)`
  ${PanelSection} {
    min-height: 400px;
  }

  ${PanelSectionTitle} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: capitalize;
  }

  th:nth-child(2) {
    text-align: left;
  }

  @media (min-width: 769px) {
    ${PanelSection}:first-child:not(:only-child) {
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
`;
