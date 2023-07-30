import styled from "styled-components";
import glist from "./assets/glist.svg";
import arrowRight from "./assets/right-arrow-white.svg";
import arrowLeft from "./assets/left-arrow-white.svg";

export const Wrapper = styled.div`
  margin: 50px 0 100px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 20px;
  position: relative;
  overflow: hidden;
  border-radius: 25px;
  padding: 100px 80px;
  background: ${(props) =>
    props.theme.name === "light"
      ? "radial-gradient(110.67% 411.15% at 5.33% -31.58%, #040D30 0%, #000006 100%)"
      : "radial-gradient(110.67% 411.15% at 5.33% -31.58%,#879cde 0%,#0076ff 100%)"};
  box-shadow: 0 5px 100px rgba(0, 0, 0, 0.4);

  &::before {
    content: url(${glist.src});
    width: 100%;
    height: 100%;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
  }

  > div:first-child {
    max-width: 630px;

    h2 {
      font-style: normal;
      font-weight: 700;
      font-size: 42px;
      line-height: 50px;
      color: #ffffff;
      margin: 0 0 15px 0;
    }

    p {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 26px;
      color: #f1f1f1;
    }
  }

  button {
    position: relative;
    white-space: nowrap;
    cursor: pointer;
    padding: 12px 24px;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    text-align: center;
    letter-spacing: 0.01em;
    color: ${(props) => (props.theme.name === "light" ? "#ffffff" : "#000000")};
    background: ${(props) =>
      props.theme.name === "light" ? props.theme.primary : "#ffffff"};
    border-radius: 10px;
    border: none;

    img {
      position: absolute;
      left: -50%;
      top: 0;
    }

    a {
      color: inherit;
      font-size: inherit;
      font-weight: inherit;
    }

    &::before {
      content: url(${arrowRight.src});
      position: absolute;
      left: -50%;
      top: -100%;
      display: block;
    }
    &::after {
      content: url(${arrowLeft.src});
      position: absolute;
      left: -25%;
      bottom: -120%;
      display: block;
    }
  }

  @media (max-width: 900px) {
    grid-gap: 70px;
    flex-direction: column;
    text-align: center;
    padding: 50px 16px;

    button {
      &::before {
        transform: translateX(-50%);
        left: 0;
      }
      &::after {
        content: url(${arrowRight.src});
        right: -50%;
        top: -100%;
        bottom: unset;
        left: unset;
        transform: scaleX(-1);
      }
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 60px;
  }

  @media (max-width: 460px) {
    > div:first-child {
      h1 {
        font-size: 28px;
        line-height: 33px;
      }

      p {
        font-size: 16px;
        line-height: 26px;
      }
    }
    > div:last-child {
      button {
        padding: 12px;
      }
    }
  }

  @media (max-width: 280px) {
    > div:last-child {
      button {
        white-space: normal;
      }
    }
  }
`;
