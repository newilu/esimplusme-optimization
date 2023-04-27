import styled from "styled-components";

export const Wrapper = styled.div`
  color: ${(props) => props.theme.primaryText};

  > a {
    text-decoration: none;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
      > div {
        display: flex;

        > div {
          font-size: 24px;
          line-height: 28px;
          text-align: center;
          margin-left: 5px;

          &:first-child {
            font-weight: 500;
          }

          &:last-child {
            font-weight: 200;
          }
        }
      }
    }
  }
`;
