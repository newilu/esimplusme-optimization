import styled from "styled-components";
import { Container } from "shared/ui/styled";

export const ImageWrapper = styled.div`
  padding-top: 90px;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    height: 100%;
    width: 1000000px;
    position: absolute;
    left: 50%;
    top: 0;
    background: ${(props) => props.theme.notificationsBg};
    border-radius: 0px 0px 0px 100px;
  }

  img {
    position: relative;
    display: block;
    margin: 0;
    max-height: 570px;
    max-width: 100%;
    height: 100%;
    width: auto;
  }

  @media (max-width: 768px) {
    padding-top: 40px;
    > div {
      left: 50%;
    }
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 15px;
  align-items: center;
  padding: 25px;
  background: ${(props) => props.theme.downloadAppBg};
  border-radius: 15px;
  width: max-content;

  > div:first-child {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: ${(props) => props.theme.primaryText};
  }

  > div:last-child {
    display: flex;
    grid-gap: 16px;

    > button {
      cursor: pointer;
      color: ${(props) =>
        props.theme.name === "light" ? "#ffffff" : "#000000"};
      display: flex;
      justify-content: center;
      align-items: center;
      width: fit-content;
      border: none;
      border-radius: 6px;
      height: 40px;
      background: ${(props) =>
        props.theme.name === "light" ? "#000000" : "#ffffff"};

      > a {
        width: 100%;
        height: 100%;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  @media (max-width: 430px) {
    width: auto;
  }
`;

export const Content = styled.div`
  width: 100%;
  padding-top: 90px;

  ul {
    padding: 50px 0;
    display: grid;
    grid-gap: 32px;

    li {
      display: flex;
      grid-gap: 15px;
      font-weight: 600;
      font-size: 16px;
      line-height: 26px;
      color: ${(props) => props.theme.secondaryText};
    }
  }

  @media (max-width: 768px) {
    padding-top: 50px;

    ul {
      padding: 2rem 0;
      gap: 16px;

      li {
        font-weight: 400;
      }
    }
  }
`;

export const Wrapper = styled(Container)`
  display: flex;
  padding: 0 16px 200px 16px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 0 16px 100px 16px;

    h1 {
      margin: 0;
    }
  }

  @media (max-width: 420px) {
    padding: 0 16px 50px 16px;
  }
`;
