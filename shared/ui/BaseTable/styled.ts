import styled, { css } from "styled-components";

export const Td = styled.td`
  padding: 15px 5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.primaryText};
  text-align: center;

  &:first-child {
    text-align: left;
    padding-left: 25px;
  }
  &:last-child {
    padding-right: 25px;
  }

  @media (max-width: 430px) {
    &:first-child {
      padding-left: 16px;
    }
    &:last-child {
      padding-right: 16px;
    }
  }
`;
export const Th = styled.th`
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 15px;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  color: ${(props) => props.theme.secondaryText};

  &:first-child {
    text-align: left;
    padding-left: 25px;
  }
  &:last-child {
    padding-right: 25px;
  }

  @media (max-width: 430px) {
    &:first-child {
      padding-left: 16px;
    }
    &:last-child {
      padding-right: 16px;
    }
  }
`;
export const TableBody = styled.tbody`
  tr {
    &:hover {
      background: ${(props) => props.theme.borderColor};
    }
  }
`;
export const TableRow = styled.tr<{ selected?: boolean }>`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  &:last-of-type {
    border: none;
  }

  ${(props) =>
    props.selected &&
    css`
      background: ${props.theme.borderColor};
    `}
`;
export const TableHead = styled.thead`
  ${TableRow} {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }
`;
export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const Wrapper = styled.div<{
  scrollable?: boolean;
}>`
  > div {
    overflow: auto;
  }

  position: relative;

  ${(props) =>
    props.scrollable &&
    css`
      ${TableRow} {
        &:nth-last-of-type(2) {
          border-bottom: none;
        }
      }
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background: ${props.theme.tableBottomBlur};
      }
    `}
`;
