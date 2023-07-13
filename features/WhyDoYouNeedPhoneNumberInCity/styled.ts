import styled from "styled-components";
import { Container, Paragraph } from "@/shared/ui/styled";

export const AppButtonsWrapper = styled.div`
  display: flex;
  gap: 15px;
`;
export const AppBlockWrapper = styled.div`
  padding: 50px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  grid-gap: 50px;
  font-size: 18px;
  line-height: 30px;
  color: ${(props) => props.theme.primaryText};
  background: ${(props) => props.theme.downloadAppBg};
`;

export const Wrapper = styled(Container)`
  display: flex;
  align-items: center;
  grid-gap: 100px;
  padding-top: 100px;
  padding-bottom: 100px;

  ul {
    display: flex;
    flex-direction: column;
    grid-gap: 25px;

    li {
      display: flex;
      align-items: flex-start;
      grid-gap: 10px;

      img {
        flex: 0 0 20px;
      }
    }
  }

  > div {
    &:first-child {
      display: flex;
      flex-direction: column;
      gap: 50px;
      flex: 1 1 60%;

      > * {
        margin: 0;
      }

      ${Paragraph}:last-of-type {
        display: flex;
        grid-gap: 10px;
        align-items: center;
      }
    }
    &:last-child {
      flex: 1 1 40%;
    }
  }

  @media (max-width: 900px) {
    flex-direction: column;
    grid-gap: 35px;

    > div {
      &:first-child {
        gap: 35px;
      }

      &:last-child {
        padding: 25px;
        gap: 25px;
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
`;
