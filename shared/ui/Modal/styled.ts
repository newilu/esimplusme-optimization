import styled, { css } from "styled-components";

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);

  > div > div:first-child {
    padding: 0;
    margin: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: ${(props) => props.theme.primaryText};
  }

  button {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 8px 4px;
    border: none;
    background: rgba(237, 240, 250, 0.1);
    filter: invert(${(props) => (props.theme.name === "light" ? "1" : "0")});
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    padding: 25px 16px 16px 16px;
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;

  > div:last-child {
    position: relative;
  }

  @media (max-width: 430px) {
    > div:last-child {
      ::-webkit-scrollbar {
        width: 2px;
      }
      ::-webkit-scrollbar-thumb {
        background: #54c7fc;
        border-radius: 12px;
        border: none;
        background-clip: padding-box;
      }
    }
  }
`;

export const Blur = styled.div`
  display: ${(props) => (props.theme.name === "light" ? "none" : "block")};
  background: #0077ff;
  height: 100%;
  opacity: 0.85;
  filter: blur(165px);
  backdrop-filter: blur(165px);
  mix-blend-mode: difference;
  position: absolute;
  width: 100%;
  z-index: 2;
`;

export const Wrapper = styled.dialog`
  padding: 0;
  border: none;
  overflow: hidden;
  position: fixed;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${(props) => props.theme.cardsBg};
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  max-width: 650px;
  max-height: 80%;
  width: 100%;
  height: fit-content;
  transition: 0.2s all;
  z-index: 6;

  > div {
    position: relative;
    width: 100%;
  }

  @media (max-width: 650px) {
    max-width: 95%;
  }
`;

export const FullscreenWrapper = styled.div<{ isOpen: boolean }>`
  z-index: 7;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  visibility: hidden;
  opacity: 0;
  transition: 0.2s all;
  background: rgba(0, 0, 0, 0.1);

  ${(props) =>
    props.isOpen &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;
