import styled from "styled-components";
import BaseHeader from "@/shared/ui/BaseHeader";
import { PanelSection, PanelSectionTitle } from "@/shared/ui/styled";
import { Wrapper as TableWrapper } from "@/shared/ui/BaseTable/styled";
import BaseTable from "@/shared/ui/BaseTable";

export const SectionsWrapper = styled.div`
  display: flex;
  grid-gap: 5px;
  max-width: 900px;
  margin: 0 auto;

  > ${PanelSection}:first-child {
    border-radius: 25px 5px 5px 25px;
    flex: 1 1 40%;
    display: flex;
    flex-direction: column;

    ${PanelSectionTitle}:first-child {
      border-bottom: 1px solid ${(props) => props.theme.borderColor};
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
  }

  > ${PanelSection}:last-child {
    border-radius: 5px 25px 25px 5px;
    flex: 1 1 60%;
    min-height: 400px;
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
      margin: 0;
      width: 100%;

      &:first-child {
        border-radius: 25px 25px 5px 5px;

        ${TableWrapper} {
          height: 100%;

          > div {
            position: unset;
            height: 100%;
            width: 100%;
          }
        }
      }

      &:last-child {
        border-radius: 5px 5px 25px 25px;
        min-height: 300px;
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
