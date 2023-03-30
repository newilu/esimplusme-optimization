import styled from "styled-components";

export const ActiveLanguage = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  grid-gap: 5px;
  width: 32px;
  height: 24px;
  border-radius: 6px;
  overflow: hidden;
  justify-content: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const LanguageMenuList = styled.ul<{ show: boolean }>`
  z-index: 4;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  opacity: ${(props) => (props.show ? "1" : "0")};
  max-width: 350px;
  width: max-content;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 4px;
  position: absolute;
  top: 100%;
  right: 50%;
  transform: translateX(50%);
  padding: 16px;
  background: ${(props) => props.theme.cardsBg};
  backdrop-filter: blur(125px);
  box-shadow: 0 0 20px rgba(15, 15, 15, 0.2);
  border-radius: 15px;

  li {
    overflow: hidden;
    width: 150px;
    flex: 1 1 150px;
    margin: 0;
    padding: 0;
    list-style: none;
    &::before {
      display: none;
    }
  }

  @media (max-height: 500px) {
    max-width: unset;
  }

  @media (max-width: 768px) {
    right: 16px;
    transform: none;
  }
  @media (max-width: 375px) {
    right: 0;
    width: 100%;
  }
`;

export const LanguageMenuItem = styled.li<{ active?: boolean }>`
  width: 100%;

  button {
    cursor: pointer;
    width: 100%;
    height: auto;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 10px;
    border: none;
    background: ${(props) =>
      props.active ? "#0076FF" : props.theme.benefitsBg};

    > div {
      text-align: left;
      font-weight: 400;
      color: ${(props) => (props.active ? "white" : props.theme.primaryText)};

      &:first-child {
        flex: 0 0 30px;
        width: 30px;
        font-size: 0;
        border-radius: 4px;
        overflow: hidden;
        height: 26px;
        display: flex;
        justify-content: center;
        align-items: center;

        > img {
          width: 32px;
          height: 32px;
        }
      }

      > div:first-child {
        font-size: 14px;
        line-height: 17px;
        letter-spacing: -0.01em;
      }

      > div:last-child {
        font-size: 12px;
        line-height: 14px;
        opacity: 0.4;
        white-space: nowrap;
      }
    }
  }
`;

export const Wrapper = styled.div`
  position: relative;

  @media (max-width: 768px) {
    position: unset;
  }
`;
