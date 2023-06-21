import styled from "styled-components";
import {
  CardCategories,
  CardCategory,
} from "@/components/BlogPreviewCard/styled";
import { Text } from "@/shared/ui/styled";

export const BlogInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0 35px 0;
  grid-gap: 15px;
  > a {
    text-decoration: none;
    display: block;
  }

  > div:last-child {
    text-align: right;
    display: flex;
    flex-direction: column;
    grid-gap: 5px;

    ${CardCategories} {
      margin: 0;
      > div {
        margin: 0 !important;
      }
    }
  }

  @media (max-width: 768px) {
    margin: 15px 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: unset;
  }
`;

export const BlogReadingTime = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => props.theme.secondaryText};
  opacity: 0.5;
`;

export const LeftSide = styled.div`
  grid-area: main;

  ${Text} {
    a {
      color: inherit;
      font-weight: bold;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${(props) => props.theme.primaryText};
    }

    p {
      margin: 15px 0;
    }
    h1 {
      font-weight: 700;
      font-size: 42px;
      line-height: 42px;
    }

    h2 {
      font-size: 36px;
      line-height: 40px;
    }
    h3 {
      font-size: 32px;
      line-height: 36px;
    }
    h4 {
      font-size: 28px;
      line-height: 32px;
    }
    h5 {
      font-size: 24px;
      line-height: 28px;
    }
    h6 {
      font-size: 20px;
      line-height: 24px;
    }
    .image-wrapper {
      margin-top: 15px;
      max-height: 400px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      img {
        width: 100% !important;
        height: auto !important;
      }
    }
  }

  ${CardCategory} {
    margin-bottom: 25px;
  }

  @media (max-width: 768px) {
    ${CardCategory} {
      margin-bottom: 15px;
    }
  }
`;

export const DocumentTocItem = styled.li<{ $active?: boolean }>`
  padding: 10px 15px;
  background: ${(props) => (props.$active ? "#0085f230" : "transparent")};
  border-left: 2px solid
    ${(props) =>
      props.$active ? props.theme.primary : props.theme.tocBorderColor};

  a {
    text-decoration: none;
    color: ${(props) =>
      props.$active ? props.theme.primaryText : props.theme.secondaryText};
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
  }
`;
export const DocumentTocList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;
export const DocumentTocHeading = styled.div`
  color: ${(props) => props.theme.primaryText};
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  margin: 0;
`;
export const DocumentToc = styled.section`
  display: flex;
  flex-direction: column;
  grid-gap: 50px;
`;

export const RightSide = styled.div`
  flex: 0 0 440px;
  position: sticky;
  display: block;
  overflow: auto;
  top: 65px;
  max-height: calc(100vh - 65px);
  grid-area: toc;
  padding-top: 3rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Wrapper = styled.article`
  padding-bottom: 100px;
  display: grid;
  gap: 3rem;
  grid-template-areas: "main toc";
  grid-template-columns: minmax(0, 2.5fr) minmax(0, 15rem);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas: "main";
    padding-bottom: 50px;
  }
`;
