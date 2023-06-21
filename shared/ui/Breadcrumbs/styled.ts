import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 0 30px 0;

  > a {
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: ${(props) => props.theme.secondaryText};
    display: inline-flex;

    &:after {
      content: "/";
      padding: 0 10px;
    }

    &:last-child {
      pointer-events: none;
      color: ${(props) => props.theme.primary};

      &:after {
        display: none;
      }
    }
  }
`;
