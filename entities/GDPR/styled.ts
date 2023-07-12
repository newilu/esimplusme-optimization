import styled from "styled-components";

export const ButtonsWrapper = styled.div`
  width: 100%;

  @media (max-width: 600px) {
    flex-wrap: wrap;
    grid-gap: 10px;

    button {
      width: 100% !important;
    }
  }

  @media (max-width: 375px) {
    flex: 0;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  max-width: 400px;
  background: ${(props) => props.theme.cardsBg};
  backdrop-filter: blur(85px);
  position: fixed;
  bottom: 8px;
  left: 16px;
  z-index: 167770000;
  color: white;

  > div:first-child {
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    position: absolute;
    display: ${(props) => (props.theme.name === "light" ? "none" : "block")};
    background: #0077ff;
    opacity: 0.25;
    z-index: 1;
    height: 100%;
  }

  > div:last-child {
    padding: 5px 16px;
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 20px;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: ${(props) => props.theme.secondaryText};

    @media (max-width: 500px) {
      grid-gap: 20px;
    }
  }

  a {
    display: inline-flex;
    text-decoration: none;
    color: ${(props) => props.theme.secondaryText};
  }

  button {
    width: 20px;
    height: 20px;
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: invert(${(props) => Number(props.theme.name === "light")});
  }

  @media (max-width: 430px) {
    width: calc(100% - 32px);
  }
`;
