import styled, { css } from "styled-components";
import { Container as BaseContainer } from "shared/ui/styled";
import Link from "next/link";

export const NavMenu = styled.div<{ isOpen?: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
  overflow: hidden;
  max-height: 0;
  height: 100vh;
  background: ${(props) => props.theme.bg};
  padding: 0 16px;
  transition: 0.3s all var(--easing-func);

  ul {
    overflow: hidden scroll;
    height: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
  }

  > button {
    margin: 35px 0;
    width: 100%;
    padding: 0;

    > a {
      text-decoration: none;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      color: inherit;
    }
  }

  > div {
    position: relative;
    margin: 0 auto;
    max-width: 1272px;
    width: 100%;
    padding-bottom: 25px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};

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
  }

  ${(props) =>
    props.isOpen &&
    css`
      padding: 20px 16px;
      max-height: 100vh;
    `}
`;

export const BurgerMenu = styled.div`
  color: ${(props) => props.theme.primaryText};

  a {
    color: ${(props) => props.theme.primaryText};
  }

  > img {
    filter: invert(${(props) => Number(props.theme.name !== "light")});
  }

  @media (min-width: 1025px) {
    display: none !important;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;

  @media (max-width: 1024px) {
    flex: 1 1 auto;
  }

  @media (max-width: 1024px) {
    display: none !important;
  }
`;

export const NavLink = styled(Link)<{ $isOpen?: boolean }>`
  position: relative;
  text-decoration: none;
  padding: 0;
  color: inherit;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div:first-child {
    display: flex;
    align-items: center;
    grid-gap: 5px;

    svg {
      transform: rotate(${(props) => (props.$isOpen ? "180deg" : "0")});

      > * {
        pointer-events: none;
      }
    }
  }

  &.active,
  &.active > svg {
    color: ${(props) => props.theme.primary} !important;
  }
`;

export const LinksWrapper = styled.div`
  display: flex;
  grid-gap: 25px;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
`;

export const Container = styled(BaseContainer)`
  display: flex;
  position: relative;
`;

export const Wrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 65px;
  transition: 0.3s var(--easing-func);
  z-index: 7;
  background: ${(props) => props.theme.navbarBg};
  backdrop-filter: blur(50px);
  color: ${(props) => props.theme.primaryText};

  ${Container} {
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1 1 auto;
      padding: 1rem;
      &:first-child {
        justify-content: start;
        padding-left: 0;
      }

      &:nth-child(2) {
        justify-content: space-between;
      }
    }

    @media (max-width: 1024px) {
      > div {
        &:nth-child(2) {
          display: none;
        }
      }
    }
    @media (max-width: 500px) {
      grid-gap: 15px;
      > div {
        padding: 1rem 0;
        border-left: none;
        flex: 0 0 auto;

        &:first-child {
          flex: 1 1 auto;
        }
      }
    }
    @media (max-width: 335px) {
      grid-gap: 5px;
    }
  }
`;
