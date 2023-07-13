import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 0 30px 0;

  > div {
    color: ${(props) => props.theme.secondaryText};
    text-transform: capitalize;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    display: inline-flex;
    padding-right: 24px;
  }

  > a {
    text-transform: capitalize;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    display: inline-flex;
    position: relative;
    padding-right: 24px;

    &:after {
      content: "/";
      color: ${(props) => props.theme.secondaryText};
      position: absolute;
      right: 10px;
    }

    &:last-child {
      color: ${(props) => props.theme.primary};

      &:after {
        display: none;
      }
    }
  }
`;
