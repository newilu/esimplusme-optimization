import styled from "styled-components";
import { Container } from "@/shared/ui/styled";

export const SelectedBg = styled.div`
  background: ${(props) => props.theme.primary};
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 8px;
  z-index: 1;
  color: white;
`;

export const SwitchButton = styled.button<{ $isSelected?: boolean }>`
  cursor: pointer;
  z-index: 2;
  padding: 12px;
  position: relative;
  border-radius: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  border: none;
  background: transparent;
  color: ${(props) => (props.$isSelected ? "white" : "#777E90")};
  transition: 0.3s color;

  > div:first-child {
    text-transform: capitalize;
    position: relative;
    z-index: 2;
  }

  @media (max-width: 920px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    display: flex;
    grid-gap: 5px;
    align-items: center;
    justify-content: flex-start;
    color: ${(props) =>
      props.$isSelected ? props.theme.primaryText : props.theme.secondaryText};

    &:first-child {
      > div:first-child {
        border-right: 1px solid ${(props) => props.theme.borderColor};
      }
    }

    > div:first-child {
      text-align: left;
      width: 100%;
    }
  }
`;

export const ButtonsWrapper = styled.div<{ isOpen?: boolean }>`
  display: flex;
  grid-gap: 20px;
  padding: 5px;
  background: ${(props) => props.theme.cardsBg};
  box-shadow: 0 5px 100px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

  @media (max-width: 920px) {
    grid-gap: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    max-height: ${(props) => (props.isOpen ? "130px" : "50px")};
    overflow: hidden;

    ${SwitchButton} {
      &:first-child {
        img {
          filter: invert(${(props) => Number(props.theme.name === "light")});
          transition: 0.3s all var(--easing-func);
          transform: rotate(${(props) => (props.isOpen ? "-90deg" : "90deg")});
        }
      }
    }
  }
`;

export const Title = styled.div`
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  > div:first-child {
    > h2 {
      margin: 0 0 15px 0;
      font-weight: 600;
      font-size: 48px;
      line-height: 56px;
      letter-spacing: -0.02em;
      color: ${(props) => props.theme.primaryText};
    }
  }

  h2 {
    margin: 0;
    font-weight: 300;
    font-size: 16px;
    line-height: 26px;
    color: ${(props) => props.theme.secondaryText};
  }

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
    grid-gap: 40px;

    > div {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 28px;
      line-height: 33px;
    }

    h2 {
      font-size: 16px;
      line-height: 26px;
    }
  }
`;

export const Wrapper = styled(Container)`
  margin-bottom: 150px;

  @media (max-width: 768px) {
    margin-bottom: 100px;
  }
`;
