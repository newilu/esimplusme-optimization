import styled, { css } from "styled-components";
import { Container as BaseContainer } from "shared/ui/styled";
import NavLink from "@/shared/ui/NavLink";

export const BurgerMenu = styled.div`
  color: ${(props) => props.theme.primaryText};

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

export const Link = styled(NavLink)<{ $isOpen?: boolean }>`
  > div:first-child {
    svg {
      transform: rotate(${(props) => (props.$isOpen ? "180deg" : "0")});

      > * {
        pointer-events: none;
      }
    }
  }
`;

export const LinksWrapper = styled.div`
  display: flex;
  grid-gap: 25px;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
`;

export const SelectedRegionTitle = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  color: ${(props) => props.theme.primaryText};
  display: flex;
  align-items: center;
  grid-gap: 15px;

  button {
    background: ${(props) => props.theme.howitworksSecondaryBg};
    padding: 15px !important;
    border-radius: 15px !important;

    svg {
      color: white;
      transform: rotate(180deg);
    }
  }
`;

export const Chat = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  cursor: pointer;
  display: flex;
  align-items: center;
  grid-gap: 10px;
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.primaryText};

  > div {
    border-radius: 3px;
    width: 22px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      width: 24px;
      height: 24px;
    }
  }

  > a {
    color: inherit;
    text-decoration: none;
  }

  span {
    cursor: pointer;
    color: ${(props) => props.theme.primary};
  }
`;
export const SelectedRegion = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 0;
  height: 100%;
  overflow: hidden;

  > ul {
    flex: 1;
    overflow: hidden scroll;
    grid-gap: 15px;

    li {
      border-radius: 5px;
      background: ${(props) => props.theme.howitworksSecondaryBg};
    }

    a {
      padding: 15px;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${(props) => props.theme.primaryText};
    }
  }
`;

export const NavMenuItem = styled.li<{ isDropdownOpen?: boolean }>`
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 35px 0;
  border-top: 1px solid ${(props) => props.theme.borderColor};

  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > svg {
      color: ${(props) => props.theme.secondaryText};
      transform: rotate(
        ${(props) => (props.isDropdownOpen ? "-90deg" : "90deg")}
      );
    }
  }

  ul {
    margin: ${(props) =>
      props.isDropdownOpen ? "0 0 0 24px !important" : "0 !important"};
    padding: 0;
    transition: 0.3s max-height ease;
    max-height: ${(props) => (props.isDropdownOpen ? "150px" : "0")};
    visibility: ${(props) => (props.isDropdownOpen ? "visible" : "hidden")};
    opacity: ${(props) => (props.isDropdownOpen ? "1" : "0")};

    li {
      color: ${(props) => props.theme.secondaryText};
      padding-top: 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: 0.3s all ease;

      &:first-child {
        padding-top: ${(props) => (props.isDropdownOpen ? "25px" : "0")};
      }
    }
  }

  > a {
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
  }

  img {
    filter: invert(${(props) => (props.theme.name === "light" ? "1" : "0")});
  }
`;

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
