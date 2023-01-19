import styled from "styled-components";
import { CardCategory } from "@/components/BlogPreviewCard/styled";

export const BlogInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 25px 0 35px 0;
  grid-gap: 15px;

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
`;
export const DocumentTocHeading = styled.header`
  h2 {
    color: ${(props) => props.theme.primaryText};
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
  }
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
`;

export const Wrapper = styled.div`
  padding-bottom: 100px;
  display: grid;
  gap: 3rem;
  grid-template-areas: "main toc";
  grid-template-columns: minmax(0, 2.5fr) minmax(0, 15rem);

  @media (max-width: 768px) {
    padding-bottom: 50px;
  }
`;
