import styled from "styled-components";
import pedr from "./assets/pedr-min.webp";

export const Wrapper = styled.header`
  margin-top: -65px;
  padding: 100px;
  min-height: 800px;
  height: 100vh;
  height: --webkit-fill-available;
  background: url(${pedr.src}) center center;
  background-size: cover;

  > div {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  h1 {
    white-space: pre-line;
    margin: 0 auto;
    padding: 0;
    font-weight: 700;
    font-size: 120px;
    line-height: 120px;
    color: #ffffff;
  }

  p {
    margin: 40px auto 80px auto;
    white-space: pre-line;
    font-weight: 500;
    font-size: 20px;
    line-height: 35px;
    letter-spacing: -0.02em;
    color: #ffffff;
  }

  button {
    box-shadow: 0px 15px 80px rgba(0, 118, 255, 0.8);
    margin: 0 auto;
    animation: pulse 1.5s infinite;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    max-width: 350px;
    width: 100%;
    &:active {
      background: #fff;
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
    }
    70% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.95);
    }
  }

  @media (max-width: 768px) {
    padding: 0;
    min-height: 600px;

    h1 {
      font-size: 64px;
      line-height: 64px;
    }

    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      margin: 40px auto 25px auto;
    }

    button {
      margin: 0 auto;
    }
  }

  @media (max-width: 430px) {
    h1 {
      font-size: 58px;
      line-height: 58px;
    }

    h1,
    p {
      white-space: normal;
    }
  }
`;
