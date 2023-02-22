import styled from "styled-components";
import { Container } from "utils/styled";

export const ImageWrapper = styled.div`
  padding-top: 90px;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    position: relative;
    display: block;
    margin: 0;
    max-height: 570px;
    max-width: 100%;
    height: auto;
    width: auto;
  }

  @media (max-width: 768px) {
    padding-top: 40px;
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
        width: auto;
        height: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    margin: 0 auto;
  }
  @media (max-width: 430px) {
    width: auto;
  }
`;

export const Content = styled.div`
  width: 100%;
  padding-top: 90px;

  > div:first-child {
    font-weight: 700;
    font-size: 42px;
    line-height: 50px;
    color: ${(props) => props.theme.primaryText};
    text-align: left;
    margin: 0 0 15px 0;

    @media (max-width: 768px) {
      font-size: 28px;
      line-height: 33px;
    }
  }

  ul {
    padding: 50px 0;
    display: grid;
    grid-gap: 2rem;
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

      li {
        font-weight: 400;
      }
    }
  }
`;

export const Wrapper = styled.div`
  position: relative;

  > ${Container} {
    display: flex;
    padding: 0;
  }

  > div:first-child {
    height: 100%;
    width: 50%;
    position: absolute;
    left: calc(50% + 16px);
    top: 0;
    background: ${(props) => props.theme.notificationsBg};
    border-radius: 0px 0px 0px 100px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
    > ${Container} {
      flex-direction: column-reverse;
    }

    > div:first-child {
      left: 0;
      width: 100%;
      border-radius: 6px;
    }

    h1 {
      margin: 0;
    }
  }
`;
