import styled from "styled-components";
import BaseHeader from "@/shared/ui/BaseHeader";
import {
  PanelSection,
  PanelSectionsWrapper,
  PanelSectionTitle,
} from "@/shared/ui/styled";
import BaseTable from "@/shared/ui/BaseTable";

export const SectionsWrapper = styled(PanelSectionsWrapper)`
  display: flex;
  grid-gap: 5px;
  max-width: 900px;
  margin: 50px auto;

  ${PanelSectionTitle}:first-child {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;
      grid-gap: 10px;
    }

    a {
      font-weight: 400;
      font-size: 16px;
      line-height: 26px;
    }
  }

  ${PanelSectionTitle}:nth-child(2) {
    padding-top: 0 !important;
  }

  @media (max-width: 768px) {
    flex-direction: column !important;
    grid-gap: 10px;

    ${PanelSection} {
      &:first-of-type:not(:only-of-type) {
        border-radius: 25px 25px 5px 5px !important;
        background: ${(props) => props.theme.translucentCardsBg};
      }
      &:last-of-type:not(:only-of-type) {
        border-radius: 5px 5px 25px 25px !important;
      }
    }
  }
`;

export const StyledCitiesTable = styled(BaseTable)`
  th {
    width: 50%;
    text-align: left;
  }
  td {
    text-align: left;
  }
` as typeof BaseTable;

export const Wrapper = styled(BaseHeader)``;
