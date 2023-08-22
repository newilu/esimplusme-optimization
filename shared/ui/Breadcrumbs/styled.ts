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
  }

  > a {
    text-transform: capitalize;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    display: inline-flex;

    &:last-child {
      color: ${(props) => props.theme.primary};
    }
  }
`;

export const Slash = styled.span`
  display: inline-flex;
  padding: 0 10px;
  color: ${(props) => props.theme.secondaryText};
`
