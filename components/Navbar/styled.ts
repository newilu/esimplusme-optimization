import styled, { css } from "styled-components";
import { default as NavLink } from "next/link";
import { Container as BaseContainer } from "../../utils/styled";

export const HotMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between !important;
  grid-gap: 10px;
  padding: 0 1rem;

  > div {
    border-right: 1px solid ${(props) => props.theme.borderColor};
    flex: 1;
    display: flex;
    padding: 0 5px;
    justify-content: center;

    &:first-child {
      min-width: fit-content;
    }

    &:last-child {
      border: none;
    }
  }

  @media (max-width: 500px) {
    grid-gap: 5px;

    > div {
      border-right: none;
    }
  }
`;

export const NavMenuItem = styled.li`
  cursor: pointer;
  text-align: center;
  display: flex;
  justify-content: space-between;
  padding: 15px 0;

  a {
    text-decoration: navajowhite;
    color: ${(props) => props.theme.primaryText};
    display: flex;
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    justify-content: space-between;
    align-items: center;
  }

  > button {
    color: ${(props) => props.theme.primaryText};
    cursor: pointer;
    font-size: inherit;
    padding: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
    background: transparent;
  }
`;

export const NavMenu = styled.div<{ isOpen?: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
  max-height: 0;
  height: 100vh;
  background: ${(props) => props.theme.bg};
  padding: 0 16px;
  transition: 0.3s all var(--easing-func);

  ul {
    flex: 1;
    overflow: hidden scroll;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
  }

  > button {
    margin: 35px 0;
    width: 100%;
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
  cursor: pointer;
  color: ${(props) => props.theme.primaryText};
  -webkit-tap-highlight-color: transparent;

  @media (min-width: 1025px) {
    display: none !important;
  }
`;

export const Link = styled(NavLink)<{ isOpen?: boolean }>`
  > div:first-child {
    display: flex;
    align-items: center;
    grid-gap: 5px;

    svg {
      transform: rotate(${(props) => (props.isOpen ? "180deg" : "0")});
    }

    > * {
      pointer-events: none;
    }
  }

  &.active {
    color: ${(props) => props.theme.primary};
  }
`;

export const LinksWrapper = styled.div`
  display: flex;
  grid-gap: 25px;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;

  > * {
    cursor: pointer;
    text-align: center;
    position: relative;
    text-decoration: none;
    padding: 1rem 0;
    color: ${(props) => props.theme.primaryText};
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
  }
`;

export const Container = styled(BaseContainer)`
  display: flex;
  position: relative;
`;

export const Wrapper = styled.nav`
  backdrop-filter: blur(10px);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 65px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  transition: 0.3s var(--easing-func);
  z-index: 7;
  background: ${(props) => props.theme.navbarBg};

  ${Container} {
    max-width: 1372px;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1 1 auto;
      border-left: 1px solid ${(props) => props.theme.borderColor};
      &:first-child {
        padding: 1rem 1rem 1rem 0;
        justify-content: start;
        border-left: none;
        flex: 0 1 auto;
      }
    }

    @media (max-width: 1024px) {
      > div {
        &:nth-child(2) {
          display: none;
        }
      }
    }

    @media (max-width: 375px) {
      grid-gap: 5px;
    }
  }

  @media (max-width: 500px) {
    ${Container} {
      > div {
        padding: 1rem 0;
        border-left: none;
        flex: 0 0 auto;

        &:first-child {
          flex: 1 1 auto;
        }
      }
    }
  }
`;
