import styled from "styled-components";
import blur from "./assets/blur-min.png";

export const Wrapper = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
  position: relative;
  z-index: 2;
  flex: 1;

  &:before {
    content: "";
    z-index: -1;
    display: block;
    position: absolute;
    top: -65px;
    width: 100%;
    height: 500px;
    background: url(${blur.src}) bottom center no-repeat;
    background-size: cover;
  }

  h1 {
    max-width: 750px;
    white-space: pre-line;
    margin: 0 auto 50px auto;
    text-align: center;
    font-weight: 700;
    font-size: 48px;
    line-height: 52px;
    color: ${(props) => props.theme.primaryText};
  }
  h5 {
    text-align: center;
    font-weight: 700;
    font-size: 32px;
    line-height: 32px;
    color: ${(props) => props.theme.primaryText};
    margin: 20px auto 50px auto;

    > * {
      display: inline-flex !important;
      vertical-align: middle;
    }
  }
  p {
    max-width: 600px;
    margin: 15px auto 50px auto;
    text-align: center;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: ${(props) => props.theme.secondaryText};
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 32px;
      line-height: 32px;
    }

    p {
      font-size: 16px;
      line-height: 20px;
      margin: 15px auto 25px auto;
    }

    h5 {
      font-size: 18px;
      line-height: 18px;
      margin: 15px auto 25px auto;
    }
  }
`;
