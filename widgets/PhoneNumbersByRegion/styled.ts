import styled from "styled-components";
import BaseHeader from "@/shared/ui/BaseHeader";
import { Section, SectionTitle } from "@/shared/ui/BaseHeader/styled";
import { Wrapper as TableWrapper } from "@/shared/ui/BaseTable/styled";
import BaseTable from "@/shared/ui/BaseTable";

export const SectionsWrapper = styled.div`
  display: flex;
  grid-gap: 5px;
  max-width: 900px;
  margin: 0 auto;

  > ${Section}:first-child {
    border-radius: 25px 5px 5px 25px;
    flex: 1 1 40%;
    display: flex;
    flex-direction: column;

    ${TableWrapper} {
      height: 100%;
      > div {
        max-height: unset !important;
        position: absolute;
        height: 100%;
        width: 100%;
      }
    }

    ${SectionTitle}:first-child {
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

  > ${Section}:last-child {
    border-radius: 5px 25px 25px 5px;
    flex: 1 1 60%;
    min-height: 400px;
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
