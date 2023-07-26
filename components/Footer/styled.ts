import styled from "styled-components";
import { Container } from "shared/ui/styled";

export const LinksWrapper = styled.div`
  padding-left: 50px;
  display: flex;
  grid-gap: 10px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  &:first-child {
    margin-bottom: 50px;
  }

  @media (max-width: 768px) {
    padding: 25px 0;
    flex-direction: column;
    grid-gap: 32px;

    &:first-child {
      margin-bottom: 0;
    }
    > div {
      align-items: flex-start;
    }
  }
`;

export const SocialNetworksWrapper = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  grid-gap: 15px;

  button {
    border: none;
    background: transparent;
    cursor: pointer;
    margin: 0;
    padding: 0;
    width: 40px;
    height: 40px;
    border-radius: 100vmax;

    img {
      width: 40px;
      height: 40px;
    }
  }

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

export const ListItem = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #6f6f6f;
  cursor: pointer;

  > a {
    color: inherit;
    text-decoration: none;
  }

  span {
    cursor: pointer;
    color: ${(props) => props.theme.primary};
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 15px;
`;

export const ListTitle = styled.div`
  text-transform: capitalize;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: white;
`;

export const Chat = styled(ListItem)`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  margin: 0;
  padding: 0;
  color: rgba(255, 255, 255, 0.85) !important;

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
`;

export const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 35px;

  @media (max-width: 768px) {
    grid-gap: 16px;
  }
`;

export const BottomSection = styled.div`
  background: #101010;
  padding-bottom: 70px;

  ${Container} {
    padding: 26px 16px;
    border-top: 1px solid rgba(111, 111, 111, 0.15);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #6f6f6f;

    > div:last-child {
      width: min-content;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      grid-gap: 5px;
    }

    ul {
      justify-content: center;
      flex: 1;
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0;
      grid-gap: 50px;

      li {
        a {
          text-transform: capitalize;
          text-decoration: none;
          color: inherit;
        }
      }
    }
  }

  @media (max-width: 900px) {
    ${Container} {
      ul {
        grid-gap: 20px;
      }
    }
  }
  @media (max-width: 768px) {
    ${Container} {
      ul {
        display: none;
      }
    }
  }
`;

export const TopSection = styled.div`
  background: #101010;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  border-left: 0;
  border-right: 0;
  padding: 50px 0;

  ${Container} {
    display: flex;

    > div {
      &:first-child {
        padding-right: 80px;
        border-right: 1px solid rgba(111, 111, 111, 0.15);
      }

      &:last-child {
        width: 100%;
      }

      > ul {
        display: none;
        flex-direction: column;
        margin: 0 0 25px 0;
        padding: 0;
        grid-gap: 16px;
        color: #6f6f6f;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;

        li {
          a {
            text-decoration: none;
            color: inherit;
          }
        }
      }

      @media (max-width: 768px) {
        > ul {
          display: flex;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0;

    ${Container} {
      flex-direction: column;

      > div:first-child {
        padding: 25px 0;
        border-right: none;
        border-bottom: 1px solid rgba(111, 111, 111, 0.15);
      }
    }
  }
`;

export const Wrapper = styled.footer``;
