import styled, { css } from "styled-components";
import blur from "./assets/blur-min.png";

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
export const TableBody = styled.tbody``;
export const TableRow = styled.tr`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  &:last-of-type {
    border: none;
  }
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

export const TableWrapper = styled.div<{
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

export const SectionTitle = styled.div`
  padding: 25px 25px 15px 25px;
  color: ${(props) => props.theme.primaryText};
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
`;

export const Section = styled.section`
  background: ${(props) => props.theme.translucentCardsBg};
  border-radius: 5px;

  overflow: hidden;
  margin: 5px auto;
  max-width: 900px;

  &:first-of-type {
    border-radius: 25px 25px 5px 5px;
  }

  &:last-of-type {
    border-radius: 5px 5px 25px 25px;
  }

  &:only-of-type {
    border-radius: 25px;
  }
`;

export const Wrapper = styled.div`
  padding-bottom: 50px;
  position: relative;
  z-index: 2;
  padding-top: 50px;

  &:before {
    content: "";
    z-index: -1;
    display: block;
    position: absolute;
    top: -65px;
    width: 100%;
    height: 500px;
    background: url(${blur.src}) top center no-repeat;
    background-size: cover;
  }

  h1 {
    margin: 0;
    text-align: center;
    font-weight: 700;
    font-size: 64px;
    line-height: 64px;
    color: ${(props) => props.theme.primaryText};
  }
  h5 {
    text-align: center;
    font-weight: 700;
    font-size: 32px;
    line-height: 32px;
    color: ${(props) => props.theme.primaryText};
    margin: 20px auto 50px auto;

    > * {
      display: inline-flex !important;
    }
  }
  p {
    margin: 15px 0 50px 0;
    text-align: center;
    font-weight: 400;
    font-size: 24px;
    line-height: 35px;
    color: ${(props) => props.theme.secondaryText};
  }
`;
