import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 0 30px 0;

  > a {
    text-transform: capitalize;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: ${(props) => props.theme.secondaryText};
    display: inline-flex;
    position: relative;
    padding-right: 24px;
    text-decoration: underline;

    &:after {
      content: "/";
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
